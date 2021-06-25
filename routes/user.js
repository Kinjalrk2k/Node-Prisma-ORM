const router = require("express").Router();
const validateRequest = require("../middlewares/validateReq");
const createuserValidation = require("../validators/createUser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create an user
router.post("/", validateRequest(createuserValidation), async (req, res) => {
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

module.exports = router;
