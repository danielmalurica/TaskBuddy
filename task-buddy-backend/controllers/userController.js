import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: "Success!", data: users });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    password: hash,
  });
  try {
    await user.save();
    res.status(200).json({ success: true, message: "Success!", user });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: `Failed to create. Error: ${error}` });
  }
};

export const login = async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    } else {
      const checkCorrentPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!checkCorrentPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "5d",
        });

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
            secure: true,
          })
          .status(200)
          .json({ success: true, message: "success", user });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Failed to login. Error: ${err}` });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    secure: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
