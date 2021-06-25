const router = require("express").Router();
const validateReq = require("../middlewares/validateReq");
const createuserValidation = require("../validators/createUser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create an user
router.post("/", validateReq(createuserValidation), async (req, res) => {
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
router.get("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { uuid } });

    if (!user) {
      throw { message: "User not found" };
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ err: error.message });
  }
});

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
router.put("/:uuid", validateReq(createuserValidation), async (req, res) => {
  const { name, email, role } = req.body;
  const { uuid } = req.params;

  try {
    let user = await prisma.user.findUnique({ where: { uuid } });
    if (!user) {
      throw { message: "User not found" };
    }

    user = await prisma.user.update({
      where: { uuid },
      data: { name, email, role },
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ msg: error.message.replace(/(\r\n|\n|\r)/gm, "") });
  }
});

// Delete an user
router.delete("/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    await prisma.user.delete({ where: { uuid } });
    return res.json({ success: true, message: "User Deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
