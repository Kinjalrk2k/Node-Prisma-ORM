import express, { Request, Response } from "express";
import validateReq from "../middlewares/validateReq";
import createUserValidation from "../validators/createUser";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

// Create an user
router.post(
  "/",
  validateReq(createUserValidation),
  async (req: Request, res: Response) => {
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
  }
);

// Read an user
router.get("/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { uuid },
      include: { posts: true },
    });

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
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { uuid: true, name: true, role: true },
    });
    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

// Update an user
router.put(
  "/:uuid",
  validateReq(createUserValidation),
  async (req: Request, res: Response) => {
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
  }
);

// Delete an user
router.delete("/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    await prisma.user.delete({ where: { uuid } });
    return res.json({ success: true, message: "User Deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

export default router;
