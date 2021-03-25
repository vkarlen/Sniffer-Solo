const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*** GET ROUTES ***/
// Searches DB for foods not including selected allergies
router.get('/search', rejectUnauthenticated, (req, res) => {
  const allergyList = req.query.allergies;

  let sqlQuery = `
  SELECT 
    "foods".id,
    "brands".name,
    "foods".description,
    "foods".image,
    ARRAY_AGG(
      "ingredients".description 
      ORDER BY "foods_ingredients".id)
      AS ingredientList
  FROM "foods"
  JOIN (SELECT 
        "foods_ingredients".food_id, 
        ARRAY_AGG(DISTINCT "ingredients".allergy_id )
          FILTER (WHERE "ingredients".allergy_id > '1')
          AS list
      FROM "foods_ingredients"
      JOIN "ingredients" 
        ON "ingredients".id = "foods_ingredients".ingredients_id
      GROUP BY "foods_ingredients".food_id
      ORDER BY "foods_ingredients".food_id) AS allergy_lists
    ON "foods".id = "allergy_lists".food_id
  JOIN "brands"
    ON "brands".id = "foods".brand_id
  JOIN "foods_ingredients"
    ON "foods_ingredients".food_id = "foods".id
  JOIN "ingredients"
    ON "foods_ingredients".ingredients_id = "ingredients".id
  WHERE `;

  // For each ingredient on the list, add a placeholder
  for (let i = 1; i < allergyList.length + 1; i++) {
    sqlQuery = sqlQuery.concat(`NOT $${i} =ANY(list)`);

    // Add AND to all lines except the last
    //  Add ; to last line
    if (i !== allergyList.length) {
      sqlQuery = sqlQuery.concat(`
          AND `);
    } else {
      sqlQuery = sqlQuery.concat(`
      GROUP BY
        "foods".id,
        "brands".name,
        "foods".description,
        "foods".image;`);
    }
  }

  pool
    .query(sqlQuery, allergyList)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in GET /search', err);
      res.sendStatus(500);
    });
});

// Get a list of the allergies, not including Unassigned/None
router.get('/allergy', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  SELECT * 
  FROM "allergies"
  WHERE id > 1
  ORDER BY description;`;

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

// Get a list of all foods, their ingredients, and their allergens for comparison tool
router.get('/compare', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `SELECT 
    "foods".id, 
    "brands".name,
    "foods".description,
    ARRAY_AGG(
      "ingredients".description 
      ORDER BY "foods_ingredients".id)
      AS ingredientlist,
    ARRAY_AGG(DISTINCT "allergies".description)
      FILTER (WHERE "ingredients".allergy_id > '1')
      AS allergenlist
  FROM "foods_ingredients"
  JOIN "ingredients" 
    ON "ingredients".id = "foods_ingredients".ingredients_id
  JOIN "foods"
    ON "foods".id = "foods_ingredients".food_id
  JOIN "allergies"
    ON "allergies".id = "ingredients".allergy_id
  JOIN "brands"
    ON "brands".id = "foods".brand_id
  GROUP BY "foods".id, "brands".name, "foods".description
  ORDER BY "foods".id;`;

  pool
    .query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in /compare', err);
      res.sendStatus(500);
    });
});

module.exports = router;
