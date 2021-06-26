import express from "express";
import usersRoutes from "./routes/users";
import postsRoutes from "./routes/posts";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// Create a post

// List all posts

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at PORT ${PORT} 🚀`));
