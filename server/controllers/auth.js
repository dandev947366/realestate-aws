import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from '../models/user.js';
import { nanoid } from "nanoid";
import validator from 'email-validator';
export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api auth"
  });
};

export const preRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!validator.validate(email)){
      return res.json({error:"A valid email is required"})
    }
    if (!password){
      return res.json({error: "Password is required"})
    }
    if (password && password?.length < 6) {
      return res.json({error: "Password should be at least 6 characters"})
    }
    const user = await User.findOne({email})
    if(user) {
      return res.json({error: "Email is taken"})
    }
    const token = jwt.sign({ email, password }, config.JWT_SECRET, {
      expiresIn: "1h" //1 hour -options: 1w 1y
    });
    config.AWSSES.sendEmail(
      emailTemplate(
        email,
        `<p>Please click the link below to activate your account</p>
                      <a href="${config.DEV_CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>`,
        config.REPLY_TO,
        "Activate your account"
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false, error: err.message });
        } else {
          return res.json({ ok: true, message: "Email sent successfully!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.json({ error: "Somthine went wrong. Try again." });
  }
};

export const register = async (req, res) => {
  try {
    const {email, password} = jwt.verify(req.body.token, config.JWT_SECRET)
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered. Please log in." });
    }
    const hashedPassword = await hashPassword(password)
    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword
    }).save()
    const token = jwt.sign({_id: user._id}, config.JWT_SECRET, {
      expiresIn: "1h"
    })
    const refreshToken = jwt.sign({_id: user._id}, config.JWT_SECRET, {
      expiresIn: "7d"
    })
    user.password = undefined // password not sent to res
    user.resetCode = undefined
    return res.json({
      token, refreshToken, user
    })
  } catch (err) {
    console.log(err);
    return res.json({ error: "Somthine went wrong. Try again." });
  }
};
