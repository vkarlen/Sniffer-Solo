--- DATABASE NAME: sniffer_db

--- TABLES
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"authLevel" VARCHAR(8) NOT NULL DEFAULT 'USER'
);

CREATE TABLE "allergies" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(255) NOT NULL
);

CREATE TABLE "brands" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE "foods" (
	"id" SERIAL PRIMARY KEY,
	"brand_id" INT NOT NULL REFERENCES "brands" ON DELETE CASCADE,
	"description" VARCHAR(255) NOT NULL,
	"image" VARCHAR(2024)
);

CREATE TABLE "ingredients" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(255) NOT NULL UNIQUE,
	"allergy_id" INT REFERENCES "allergies" DEFAULT 0
);

CREATE TABLE "foods_ingredients" (
	"id" SERIAL PRIMARY KEY,
	"food_id" INT NOT NULL REFERENCES "foods" ON DELETE CASCADE,
	"ingredients_id" INT NOT NULL REFERENCES "ingredients" ON DELETE CASCADE
);

CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"owner_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
	"image_url" VARCHAR(1024),
	"breed" VARCHAR(80),
	"age" INT
);

CREATE TABLE "pets_allergies" (
	"id" SERIAL PRIMARY KEY,
	"pet_id" INT NOT NULL REFERENCES "pets" ON DELETE CASCADE,
	"allergy_id" INT NOT NULL REFERENCES "allergies" ON DELETE CASCADE,
	UNIQUE (pet_id, allergy_id)
);

CREATE TYPE rating AS ENUM ('good', 'neutral', 'bad');

CREATE TABLE "food_log" (
	"id" SERIAL PRIMARY KEY,
	"pet_id" INT NOT NULL REFERENCES "pets" ON DELETE CASCADE,
	"food_id" INT NOT NULL REFERENCES "foods" ON DELETE CASCADE,
	"current" BOOLEAN DEFAULT 'false',
	"rating" rating DEFAULT 'neutral',
	UNIQUE ("pet_ids", "food_id")
);

-- CREATE DATA
INSERT INTO "brands" ("name")
VALUES ('Acana'),
('Bil Jac'),
('Bixbi'),
('Blue Buffalo'),
('Canidae'),
('Chicken Soup'),
('Diamond'),
('Eagle Pack'),
('Earthborn'),
('Eukanuba'),
('Farmina'),
('Fromm'),
('Go!'),
('Holistic Select'),
('Inception'),
('Lotus'),
('Loyall'),
('Merrick'),
('Native'),
('Natural Balance'),
('Nature''s Logic'),
('Nature''s Variety'),
('Now Fresh'),
('Nulo'),
('Nutrisca'),
('Nutrisource'),
('Nutro'),
('Open Farm'),
('Orijen'),
('Pro Pac'),
('Pure Vita'),
('Purina Pro Plan'),
('Royal Canin'),
('Science Diet'),
('Solid Gold'),
('Stella & Chewys'),
('Taste of the Wild'),
('Victor'),
('Wellness'),
('Whole Earth Farms'),
('Zignature');

INSERT INTO "allergies" ("id", "description")
VALUES ('0', 'Unassigned'),
		('1', 'None');
		
INSERT INTO "allergies" ("description")
VALUES ('Chicken'),
		('Fish'),
		('Pork'),
		('Turkey'),
		('Venison'),
		('Duck'),
		('Lamb'),
		('Corn'),
		('Soy'),
		('Lentil'),
		('Grain'),
		('Pea'),
		('Potato');