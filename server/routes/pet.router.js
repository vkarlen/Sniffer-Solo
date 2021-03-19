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
});

module.exports = router;
