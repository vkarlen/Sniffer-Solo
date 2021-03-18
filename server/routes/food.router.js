const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/search', (req, res) => {
  console.log('in /search', req.query.allergies);

  const sqlQuery = `
  SELECT 
    "foods".id, 
    "brands".name as brand,
    "foods".description, 
    "foods".image,
    ARRAY_AGG("ingredients".description
      ORDER BY "foods_ingredients".id)
    	AS ingredients
  FROM "foods"
  JOIN "foods_ingredients" 
    ON "foods_ingredients".food_id = "foods".id
  JOIN "ingredients" 
    ON "ingredients".id = "foods_ingredients".ingredients_id
  JOIN "brands"
    ON "brands".id = "foods".brand_id
  WHERE "ingredients".allergy_id <> '2'
    AND "ingredients".allergy_id <> '12'
  GROUP BY 
    "foods".id, 
    "brands".name,
    "foods".description, 
    "foods".image
  ORDER BY RANDOM ()
  LIMIT 20;`;
});

// Get a list of the allergies, not including Unassigned/None
router.get('/allergy', (req, res) => {
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
