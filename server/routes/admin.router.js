const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*** GET ROUTES ***/
router.get('/food', (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  const sqlQuery = `SELECT 
    "foods".id, 
    "brands".name 
      AS brand, 
    "foods".description, 
    "foods".image, 
    ARRAY_AGG("ingredients".description 
    ORDER BY "foods_ingredients".id) 
      AS ingredients
  FROM "foods"
  JOIN "brands" 
    ON "brands".id = "foods".brand_id
  JOIN "foods_ingredients" 
    ON "foods".id = "foods_ingredients".food_id
  JOIN "ingredients" 
    ON "ingredients".id = "foods_ingredients".ingredients_id
  GROUP BY 
    "foods".id, "brands".name, 
    "foods".description, 
    "foods".image
  ORDER BY brand, "foods".description;`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /', err);
      res.sendStatus(500);
    });
});

router.get('/brands', (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  const sqlQuery = `SELECT * FROM "brands";`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /brands', err);
      res.sendStatus(500);
    });
});

// Get a list of the allergies
router.get('/allergy', (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  const sqlQuery = `
  SELECT * 
  FROM "allergies"
  ORDER BY 
    ("id" = 0) DESC, 
    ("id" = 1) DESC, 
    description;`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /allergy', err);
      res.sendStatus(500);
    });
});

router.get('/ingredients', rejectUnauthenticated, (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  const sqlQuery = `
  SELECT 
    "ingredients".id, 
    "ingredients".description as Ingredient, 
    "ingredients".allergy_id as all_id, 
    "allergies".description as Group 
  FROM "ingredients"
  JOIN "allergies" ON "ingredients".allergy_id = "allergies".id
  ORDER BY 
    ("allergy_id" = 0) DESC, 
    "ingredients".description;`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in db GET /allergy', err);
      res.sendStatus(500);
    });
});

/*** POST ROUTES ***/
router.post('/food/add', rejectUnauthenticated, (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  // Save ingredients array as variable
  const ingredients = req.body.ingredients;

  // SQL to add initial food entry and return the ID
  const sqlFoods = `
  INSERT INTO "foods" 
    ("brand_id", "description", "image")
  VALUES 
    ($1, $2, $3)
  RETURNING "id";`;

  pool
    .query(sqlFoods, [req.body.brand, req.body.description, req.body.image])
    .then((dbRes) => {
      // Save new food ID
      const newFoodID = dbRes.rows[0].id;

      // Start the SQL statement for adding the Ingredients
      let sqlIngredients = `
      INSERT INTO "ingredients" ("description")
      VALUES`;

      // For each ingredient on the list, add a placeholder
      for (let i = 1; i < ingredients.length + 1; i++) {
        sqlIngredients = sqlIngredients.concat(`($${i})`);

        // Add comma to all lines except the last
        if (i !== ingredients.length) {
          sqlIngredients = sqlIngredients.concat(`,
          `);
        }
      }

      // Add argument so duplicate ingredients will not be added
      sqlIngredients = sqlIngredients.concat(`
      ON CONFLICT ("description")
      DO NOTHING;`);

      //console.log(sqlIngredients);

      pool
        .query(sqlIngredients, ingredients)
        .then((dbRes) => {
          // Start SQL for join table
          let sqlJoin = `
          INSERT INTO "foods_ingredients" 
            ("food_id", "ingredients_id")
          VALUES `;

          // Add line for each ingredient
          for (let i = 0; i < ingredients.length; i++) {
            sqlJoin = sqlJoin.concat(
              `('${newFoodID}', (SELECT "id" from "ingredients" WHERE "description" = '${ingredients[i]}'))`
            );

            // Add comma to all lines except the last
            if (i !== ingredients.length - 1) {
              sqlJoin = sqlJoin.concat(`,
              `);
            }
          }

          // Close SQL query
          sqlJoin = sqlJoin.concat(';');

          //console.log(sqlJoin);

          pool
            .query(sqlJoin)
            .then((dbRes) => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log('Error in making join', err);
            });
        })
        .catch((err) => {
          console.log('Error adding Ingredients', err);
        });
    })
    .catch((err) => {
      console.log('Error in /add', err);
      res.sendStatus(500);
    });
});

router.post('/allergy/add', rejectUnauthenticated, (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  const sqlQuery = `
  INSERT INTO "allergies" 
    ("description")
  VALUES ($1);`;

  pool
    .query(sqlQuery, [req.body.description])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in db ADD /allergy', err);
      res.sendStatus(500);
    });
});

/*** PUT ROUTES ***/
router.put('/ingredient/update', rejectUnauthenticated, (req, res) => {
  // Boot any requests that do not come from the Admin
  if (req.user.authLevel !== 'ADMIN') {
    res.sendStatus(403);

    return;
  }

  const sqlQuery = `
  UPDATE "ingredients"
  SET "allergy_id" = $1
  WHERE "id" = $2;`;

  pool
    .query(sqlQuery, [req.body.newGroup, req.body.ingredient])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in PUT /update');
      res.sendStatus(500);
    });
});

module.exports = router;
