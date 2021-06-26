const router = require("express").Router();
const validateReq = require("../middlewares/validateReq");
const createPostValidation = require("../validators/createPost");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", validateReq(createPostValidation), async (req, res) => {
  const { title, body, userUuid } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, body, user: { connect: { uuid: userUuid } } },
    });

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: error.message.replace(/(\r\n|\n|\r)/gm, "") });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: error.message.replace(/(\r\n|\n|\r)/gm, "") });
  }
});

module.exports = router;
