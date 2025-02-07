const express = require('express');
const cors = require('cors');
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CRUD Operations

// GET all applications
app.get("/applications", async (req, res) => {
  try {
      const result = await pool.query("SELECT * FROM applications");

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'No applications found' });
      }

      res.json({ message: 'Applications retrieved successfully', response: result.rows });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a specific application by ID
app.get("/applications/:id", async (req, res) => {
  const applicationId = req.params.id;

  try {
      const result = await pool.query("SELECT * FROM applications WHERE application_id = $1", [applicationId]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Application not found' });
      }

      res.json({ message: 'Application retrieved successfully', response: result.rows[0] });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET all applications with status filtering
app.get("/applications", async (req, res) => {
  const { status } = req.query; // Retrieves the status 
  try {
      let query = "SELECT * FROM applications";
      const params = [];

      if (status) {
          query += " WHERE status = $1"; // Adjust query to filter by status
          params.push(status);
      }

      const result = await pool.query(query, params);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'No applications found' });
      }

      res.json({ message: 'Applications retrieved successfully', response: result.rows });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a new application
app.post("/applications", async (req, res) => {
  const { pet_id, full_name, email, phone, address, preferred_pet_type, age_preference, gender_preference, previous_pet_ownership } = req.body;
  
  // Check if any required fields are missing
  if (!pet_id || !full_name || !email) {
    return res.status(400).json({ message: 'Missing required fields: pet_id, full_name, and email are required.' });
  }

  try {
    // Insert the new application into the database
    const result = await pool.query(
        `INSERT INTO applications (pet_id, full_name, email, phone, address, preferred_pet_type, age_preference, gender_preference, previous_pet_ownership)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [pet_id, full_name, email, phone, address, preferred_pet_type, age_preference, gender_preference, previous_pet_ownership]
    );

    // Respond with the created application and a 200 status
    res.status(200).json({ message: 'Application created successfully', response: result.rows[0] });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT (update) an application by ID
app.put("/applications/:id", async (req, res) => {
  const applicationId = req.params.id;
  const { status } = req.body; //updating the status

  try {
      const result = await pool.query(
          `UPDATE applications SET status = $1 WHERE application_id = $2 RETURNING *`,
          [status, applicationId]
      );

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Application not found' });
      }

      res.json({ message: 'Application updated successfully', response: result.rows[0] });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE an application by ID
app.delete("/applications/:id", async (req, res) => {
  const applicationId = req.params.id;

  try {
      const result = await pool.query("DELETE FROM applications WHERE application_id = $1 RETURNING *", [applicationId]);

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Application not found' });
      }

      res.json({ message: 'Application deleted successfully', response: result.rows[0] });
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