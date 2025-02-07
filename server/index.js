const express = require('express');
const cors = require('cors');
const pool = require("./db");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// CRUD Operations

// GET all pets
app.get("/pets", async (req, res) => {
  try {
      const result = await pool.query("SELECT * FROM pets");

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'No pets found' });
      }

      res.json(result.rows);

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a specific pet by ID
app.get("/pets/:id", async (req, res) => {
  const petId = req.params.id;

  try {
      const result = await pool.query("SELECT * FROM pets WHERE pet_id = $1", [petId]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      res.json(result.rows[0]);
      
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a new pet
// POST a new pet
app.post("/pets", async (req, res) => {
  const { name, age, pet_type, description } = req.body;
  
  // Check if any required fields are missing
  if (!name || !age || !pet_type || !description) {
    return res.status(400).json({ message: 'Missing required fields: name, age, pet_type, and description are required.' });
  }

  try {
  
    // Check if a pet with the same name, age, pet_type, and description already exists
    const existingPet = await pool.query(
        "SELECT * FROM pets WHERE name = $1 AND age = $2 AND pet_type = $3 AND description = $4",
        [name, age, pet_type, description]
    );

    if (existingPet.rows.length > 0) {
        return res.status(404).json({ message: 'A pet with the same details already exists.' });
    }

    // Insert the new pet into the database
    const result = await pool.query(
        "INSERT INTO pets (name, age, pet_type, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, age, pet_type, description]
    );

    // Respond with the created pet and a 201 status
    res.status(200).json({ message: 'Pet created successfully', pet: result.rows[0] });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT (update) a pet
app.put("/pets/:id", async (req, res) => {
  const petId = req.params.id;
  const { name, age, pet_type, description, adopted } = req.body;

  try {
      const result = await pool.query(
          "UPDATE pets SET name = $1, age = $2, pet_type = $3, description = $4, adopted = $5 WHERE pet_id = $6 RETURNING *",
          [name, age, pet_type, description, adopted, petId]
      );

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      res.json({ message: 'Pet updated successfully', pet: result.rows[0] });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a pet
app.delete("/pets/:id", async (req, res) => {
  const petId = req.params.id;

  try {
      const result = await pool.query("DELETE FROM pets WHERE pet_id = $1 RETURNING *", [petId]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      res.json({ message: 'Pet deleted successfully', pet: result.rows[0] });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

