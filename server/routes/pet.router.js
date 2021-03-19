const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*** GET ROUTES ***/
router.get('/:id', (req, res) => {
  const petID = req.params.id;

  const sqlQuery = `
  SELECT 
    "pets".id, 
    "pets".name, 
    "pets".image_url, 
    "pets".breed,
    "pets".age,
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
    "pets".breed;`;

  pool
    .query(sqlQuery, [petID])
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((err) => {
      console.log('Error in GET /api/pet/id');
    });
});

/*** POST ROUTES ***/
router.post('/add', (req, res) => {
  console.log('in /add', req.body);
  const pet = req.body;

  const petSql = `INSERT INTO "pets" ("name", "owner_id", "image_url", "age", "breed")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";`;

  pool
    .query(petSql, [pet.name, req.user.id, pet.picture, pet.age, pet.breed])
    .then((dbRes) => {
      console.log('made it here');
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
          if (i !== pet.allergies.length) {
            allergySql = allergySql.concat(`,
          `);
          } else {
            allergySql = allergySql.concat(`;`);
          }

          console.log(allergySql);
        }

        pool
          .query(allergySql, pet.allergies)
          .then((dbRes) => {
            console.log('We did it!');
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

module.exports = router;
