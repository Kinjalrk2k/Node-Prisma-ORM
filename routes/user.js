const router = require("express").Router();
const validateRequest = require("../middlewares/validateReq");
const createuserValidation = require("../validators/createUser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create an user
router.post("/", validateRequest(createuserValidation), async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const exsistingUser = await prisma.user.findUnique({ where: { email } });
    if (exsistingUser) {
      throw { message: "Email already exsists" };
    }

    const user = await prisma.user.create({
      data: { name, email, role },
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: error.message.replace(/(\r\n|\n|\r)/gm, "") });
  }
});

// Read an user

// Find all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

// Update an user

// Delete an user

// Find users

module.exports = router;
