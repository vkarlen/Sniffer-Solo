const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*** GET ROUTES ***/
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const petID = req.params.id;

  const sqlQuery = `
  SELECT 
    "pets".id, 
    "pets".name, 
    "pets".image_url, 
    "pets".breed,
    "pets".age,
    "pets".owner_id,
    ARRAY_AGG("allergies".description)
      AS allergies
  FROM "pets_allergies"
  FULL OUTER JOIN "pets" 
    ON "pets".id = "pets_allergies".pet_id
  FULL OUTER JOIN "allergies" 
    ON "allergies".id = "pets_allergies".allergy_id
  WHERE "pets".id = $1
  GROUP BY 
    "pets".id, 
    "pets".name, 
    "pets".image_url, 
    "pets".breed,
    "pets".owner_id;`;

  pool
    .query(sqlQuery, [petID])
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((err) => {
      console.log('Error in GET /api/pet/id');
      res.sendStatus(500);
    });
});

router.get('/log/:id', (req, res) => {
  const petID = req.params.id;

  const sqlQuery = `
  SELECT 
    "food_log".id,
    "foods".id AS foodid,
    "brands".name,
    "foods".description,
    "food_log".rating,
    "food_log".current
  FROM "food_log"
  JOIN "foods"
    ON "foods".id = "food_log".food_id
  JOIN "brands"
    ON "brands".id = "foods".brand_id
  WHERE "pet_id" = $1
  ORDER BY "food_log".current DESC, "brands".name, "foods".description;`;

  pool
    .query(sqlQuery, [petID])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in /log/id', err);
      res.sendStatus(500);
    });
});

/*** POST ROUTES ***/
router.post('/add', rejectUnauthenticated, (req, res) => {
  const pet = req.body;

  const petSql = `INSERT INTO "pets" ("name", "owner_id", "image_url", "age", "breed")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";`;

  pool
    .query(petSql, [pet.name, req.user.id, pet.picture, pet.age, pet.breed])
    .then((dbRes) => {
      const petID = dbRes.rows[0].id;

      if (pet.allergies.length > 0) {
        let allergySql = `
          INSERT INTO "pets_allergies" 
            ("pet_id", "allergy_id")
          VALUES `;

        // For each ingredient on the list, add a placeholder
        for (let i = 1; i < pet.allergies.length + 1; i++) {
          allergySql = allergySql.concat(
            `('${petID}', (SELECT id FROM "allergies" WHERE "allergies".description = $${i}))`
          );

          // Add comma to all lines except the last
          //  Add ; to last line
          if (i !== pet.allergies.length) {
            allergySql = allergySql.concat(`,
          `);
          } else {
            allergySql = allergySql.concat(`;`);
          }
        }

        pool
          .query(allergySql, pet.allergies)
          .then((dbRes) => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log('Error adding allergies', err);
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.log('Error in /add', error);
      res.sendStatus(500);
    });
});

router.post('/log/add', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const sqlQuery = `INSERT INTO "food_log" ("food_id", "pet_id")
  VALUES ($1, $2);`;
  const sqlParams = [req.body.foodID, req.body.pet];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      if (req.body.current) {
        const sqlCurrent = `
        UPDATE "food_log"
        SET "current" = (
          CASE
            WHEN "food_id" = $1
              THEN true
            ELSE false 
          END)
        WHERE "pet_id" = $2;`;

        pool
          .query(sqlCurrent, sqlParams)
          .then((dbRes) => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log('Error updating current', err);
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.log('Error in /log/add', err);
      res.sendStatus(500);
    });
});

/*** PUT ROUTES ***/
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const pet = req.body;

  const sqlQuery = `UPDATE "pets" 
  SET "name" = $3, "image_url" = $4, "age" = $5, "breed" = $6 
  WHERE "id" = $1 AND "owner_id" = $2
  RETURNING "id";`;
  const sqlParams = [
    pet.id,
    userId,
    pet.name,
    pet.image_url,
    pet.age,
    pet.breed,
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      const petID = dbRes.rows[0].id;

      // Builds SQL to remove any allergies deleted
      let sqlDelete = `DELETE FROM "pets_allergies"
      WHERE "pets_allergies".allergy_id NOT IN (`;

      // If there are no allergies in the array, deletes all for that pet
      if (pet.allergies.length === 0) {
        sqlDelete = sqlDelete.concat(
          `'0') AND "pets_allergies".pet_id = ${petID};`
        );
      }

      for (let i = 1; i < pet.allergies.length + 1; i++) {
        sqlDelete = sqlDelete.concat(
          `(SELECT id FROM "allergies" WHERE "allergies".description = $${i})`
        );

        // Add comma to all lines except the last
        //  Add closure to last line
        if (i !== pet.allergies.length) {
          sqlDelete = sqlDelete.concat(`, `);
        } else {
          sqlDelete = sqlDelete.concat(
            `) AND "pets_allergies".pet_id = ${petID};`
          );
        }
      }

      pool
        .query(sqlDelete, pet.allergies)
        .then((dbRes) => {
          // Check if theres anything to insert
          if (pet.allergies.length !== 0) {
            // Builds SQL to insert new allergies given
            let sqlInsert = `INSERT INTO "pets_allergies" ("pet_id","allergy_id")
            VALUES `;

            for (let i = 1; i < pet.allergies.length + 1; i++) {
              sqlInsert = sqlInsert.concat(
                `(${petID}, (SELECT id FROM "allergies" WHERE "allergies".description = $${i}))`
              );

              // Add comma to all lines except the last
              //  Add closure to last line
              if (i !== pet.allergies.length) {
                sqlInsert = sqlInsert.concat(`, `);
              } else {
                sqlInsert = sqlInsert.concat(
                  `
                  ON CONFLICT (pet_id, allergy_id)
                  DO NOTHING;`
                );
              }
            }

            pool
              .query(sqlInsert, pet.allergies)
              .then((dbRes) => {
                res.sendStatus(200);
              })
              .catch((err) => {
                console.log('Error in edit insert', err);
                res.sentStatus(500);
              });
          } else {
            // If theres nothing to insert, don't
            res.sendStatus(200);
          }
        })
        .catch((err) => {
          console.log('Error in edit delete', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('Error in PUT', err);
      res.sendStatus(500);
    });
});

router.put('/log/setcurrent', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `UPDATE "food_log"
  SET "current" = (
    CASE
      WHEN "food_id" = $1
        THEN true
      ELSE false 
    END)
  WHERE "pet_id" = $2;`;
  const sqlParams = [req.body.foodID, req.body.petID];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in /log/setcurrent');
      res.sendStatus(500);
    });
});

router.put('/log/rating', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `UPDATE "food_log"
  SET "rating" = (
    CASE
      WHEN "rating" = 'neutral'
        THEN 'good'::rating
      WHEN "rating" = 'good'
        THEN 'bad'::rating
      ELSE 'neutral'::rating
    END)
  WHERE "pet_id" = $1 AND "food_id" = $2;`;
  const sqlParams = [req.body.petID, req.body.foodID];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in /log/rating', error);
      res.sendStatus(500);
    });
});

/*** DELETE ROUTES ***/
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const petID = req.params.id;
  const ownerID = req.user.id;

  const sqlQuery = `DELETE FROM "pets"
  WHERE "pets".id = $1
  AND "pets".owner_id = $2;`;

  pool
    .query(sqlQuery, [petID, ownerID])
    .then((dbRes) => {
      console.log('deleted');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in /delete', err);
      res.sendStatus(500);
    });
});

router.delete('/log/delete/:id', rejectUnauthenticated, (req, res) => {
  const logID = req.params.id;

  const sqlQuery = `DELETE FROM "food_log"
  WHERE "food_log".id = $1;`;

  pool
    .query(sqlQuery, [logID])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in delete logs', err);
      res.sendStatus(500);
    });
});

module.exports = router;
