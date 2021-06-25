const express = require("express");

const app = express();
app.use(express.json());

app.use("/users", require("./routes/user"));

// Create a post

// List all posts

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at PORT ${PORT} 🚀`));
