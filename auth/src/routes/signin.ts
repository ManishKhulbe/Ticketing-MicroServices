import { Password } from './../services/password';
import { BadRequestError, validateRequest } from '@manishtickets/common';

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from '../models/user';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],validateRequest,
  async (req: Request, res: Response) => {
    const {email ,password} = req.body

    const existingUser = await User.findOne({email})

    if(!existingUser){
        throw new BadRequestError('Invalid Credentials')
    }

    const passwordMatch = await Password.compare(existingUser.password , password)

    if(!passwordMatch){
        throw new BadRequestError('Invalid Credentials')
    }

    const userJwt= jwt.sign({
        id: existingUser.id,
        email:existingUser.email
      }, process.env.JWT_KEY!
      )
      req.session={
        jwt: userJwt
      }
      res.status(201).send(existingUser);
    
  }
);

export { router as signinRouter };
