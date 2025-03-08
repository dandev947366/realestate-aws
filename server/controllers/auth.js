import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api auth"
  });
};

export const preRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    console.log(req.body);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Somthine went wrong. Try again." });
  }
};
