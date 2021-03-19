const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*** GET ROUTES ***/
// Searches DB for foods not including selected allergies
router.get('/search', (req, res) => {
  const allergyList = req.query.allergies;

  let sqlQuery = `
  SELECT 
	"foods".id,
	"brands".name,
	"foods".description,
	"foods".image,
	"allergy_lists".list
FROM "foods"
JOIN (SELECT 
			"foods_ingredients".food_id, 
			ARRAY_AGG("ingredients".allergy_id )
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
WHERE `;

  // For each ingredient on the list, add a placeholder
  for (let i = 1; i < allergyList.length + 1; i++) {
    sqlQuery = sqlQuery.concat(`NOT $${i} =ANY(list)`);

    // Add AND to all lines except the last
    if (i !== allergyList.length) {
      sqlQuery = sqlQuery.concat(`
          AND `);
    }
  }

  // close query
  sqlQuery = sqlQuery.concat(`;`);

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
