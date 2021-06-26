import express, { Request, Response } from "express";
import validateReq from "../middlewares/validateReq";
import createPostValidation from "../validators/createPost";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

router.post(
  "/",
  validateReq(createPostValidation),
  async (req: Request, res: Response) => {
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
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: error.message.replace(/(\r\n|\n|\r)/gm, "") });
  }
});

export default router;
