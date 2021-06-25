const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Create an user
app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, role },
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

// Read an user

// Update an user

// Delete an user

// Find users

// Create a post

// List all posts

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at PORT ${PORT} 🚀`));
