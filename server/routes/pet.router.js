const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const petID = req.params.id;

  const sqlQuery = `SELECT 
	"pets".id, 
	"pets".name, 
	"pets".image_url, 
	"pets".breed,
	"pets".age,
	ARRAY_AGG("allergies".description)
FROM "pets_allergies"
JOIN "pets" 
  ON "pets".id = "pets_allergies".pet_id
JOIN "allergies" 
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
