import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
const app = express();
const port = 3000;

// Ensure that the frontend and backend run on different ports

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//connect the database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "learningWDfromAY",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src"));

//enter the new user details in the database
app.post("/submit", async (req,res) => {
    const { username, dob, contact, email, desc } = req.body;

    try {
      const result = await db.query(
        'INSERT INTO users (username, dob, contact, email, description) VALUES ($1, $2, $3, $4, $5)',
        [username, dob, contact, email, desc]
      );
  
      res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
      console.error('Error inserting data into the database:', error);
      res.status(500).json({ message: 'Error inserting data into the database' });
    }

});

//display the user list
app.get('/display', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

//delete the user whose id is selected
app.delete('/api/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await db.query(`DELETE FROM users WHERE id = $1`, [id]);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user from the database:', error);
      res.status(500).json({ message: 'Error deleting user from the database' });
    }
  });

//update the user's description
app.put('/api/update/:id', async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
  
    try {
      const result = await db.query('UPDATE users SET description = $1 WHERE id = $2', [description, id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
