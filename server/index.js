const express = require('express');
const cors = require('cors');
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CRUD Operations for Pets

// GET all pets
app.get("/pets", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM pets");
  
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No pets found' });
        }
  
        return res.status(200).json(result.rows); 
  
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
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
  
        return res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

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
        return res.status(409).json({ message: 'A pet with the same details already exists.' });
    }

    // Insert the new pet into the database
    const result = await pool.query(
        "INSERT INTO pets (name, age, pet_type, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, age, pet_type, description]
    );

    // Respond with the created pet and a 201 status
    res.status(201).json({ message: 'Pet created successfully', pet: result.rows[0] });

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

      res.status(200).json({ message: 'Pet updated successfully', pet: result.rows[0] });
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

      res.status(204).json(); // No content to return
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// CRUD Operations for Applications

// GET all applications
app.get("/applications", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM applications");
  
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No applications found' });
        }
  
        res.status(200).json({ message: 'Applications retrieved successfully', response: result.rows });
  
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
  
        res.status(200).json({ message: 'Application retrieved successfully', response: result.rows[0] });
  
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
// POST a new application
app.post("/applications", async (req, res) => {
    const { pet_id, full_name, email, phone, address, preferred_pet_type, age_preference, gender_preference, previous_pet_ownership } = req.body;
  
    // Check if any required fields are missing
    if (!pet_id || !full_name || !email || !phone || !address) {
        return res.status(400).json({ message: 'Missing required fields: pet_id, full_name, email, phone, and address are required.' });
    }
  
    try {
        // Check if application with specified details already exists
        const existingApplication = await pool.query(
            "SELECT * FROM applications WHERE pet_id = $1 AND full_name = $2 AND email = $3 AND phone = $4 AND address = $5",
            [pet_id, full_name, email, phone, address]
        );
  
        // If application exists, respond with 409 status
        if (existingApplication.rows.length > 0) {
            return res.status(409).json({ message: 'Application already exists' });
        }
  
        // Insert the new application into the database
        const result = await pool.query(
            `INSERT INTO applications (pet_id, full_name, email, phone, address, preferred_pet_type, age_preference, gender_preference, previous_pet_ownership)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [pet_id, full_name, email, phone, address, preferred_pet_type, age_preference, gender_preference, previous_pet_ownership]
        );
  
        // Respond with the created application and a 201 status
        res.status(201).json({ message: 'Application created successfully', response: result.rows[0] });
  
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
// PUT (update) an application by ID
app.put("/applications/:id", async (req, res) => {
    const applicationId = req.params.id;
    const { status } = req.body; // Updating the status
  
    try {
        const result = await pool.query(
            `UPDATE applications SET status = $1 WHERE application_id = $2 RETURNING *`,
            [status, applicationId]
        );
  
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Application not found' });
        }
  
        res.status(200).json({ message: 'Application updated successfully', response: result.rows[0] });
  
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
  
        res.status(204).json(); // No content to return
  
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// CRUD Operations for Events

// GET all events
app.get("/events", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events");

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }

        res.status(200).json({ message: 'Events retrieved successfully', response: result.rows });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET a specific event by ID
app.get("/events/:id", async (req, res) => {
    const eventId = req.params.id;

    try {
        const result = await pool.query("SELECT * FROM events WHERE event_id = $1", [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event retrieved successfully', response: result.rows[0] });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new event
app.post("/events", async (req, res) => {
    const { event_name, event_date, location, description } = req.body;

    // Check if any required fields are missing
    if (!event_name || !event_date || !location) {
        return res.status(400).json({ message: 'Missing required fields: event_name, event_date, and location are required.' });
    }

    try {
        // Check if an event with the specified name and date already exists
        const existingEvent = await pool.query(
            "SELECT * FROM events WHERE event_name = $1 AND event_date = $2",
            [event_name, event_date]
        );

        // If event exists, respond with 409 status
        if (existingEvent.rows.length > 0) {
            return res.status(409).json({ message: 'Event already exists' });
        }

        // Insert the new event into the database
        const result = await pool.query(
            `INSERT INTO events (event_name, event_date, location, description)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [event_name, event_date, location, description]
        );

        // Respond with the created event and a 201 status
        res.status(201).json({ message: 'Event created successfully', response: result.rows[0] });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE an event by ID
app.delete("/events/:id", async (req, res) => {
    const eventId = req.params.id;

    try {
        const result = await pool.query("DELETE FROM events WHERE event_id = $1 RETURNING *", [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(204).json(); // No content to return

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