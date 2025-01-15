import User from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwtToken.js";

export const userRegister = async (req, res) => {
  console.log("working");
  console.log("Received request body:", req.body);

  try {
    const { fullname, username, email, gender, password, profilepic } =
      req.body;

    const user = await User.findOne({ username, email });
    if (user) {
      return res
        .status(500)
        .send({ success: false, message: "UserName or Email Already Exist" });
    }
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    const profileboy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const profilegirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      gender,
      profilepic: gender === "male" ? profileboy : profilegirl,
    });
    if (newUser) {
      await newUser.save();
      jwtToken(newUser._id, res);
    } else {
      res.status(500).send({ success: false, message: "Invalid user Data" });
    }

    res.status(201).send({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      profilepic: newUser.profilepic,
      message: "Successfully Resistor",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: error,
    });
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: "Email Does Exist Register" });

    const comparePass = bcrypt.compareSync(password, user.password || "");

    if (!comparePass)
      return res
        .status(500)
        .send({ success: false, message: "Email or Password  does not match" });

    jwtToken(user._id, res);

    res.status(200).send({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
      messgae: "Successfully login",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: error,
    });
    console.log(error);
  }
};

export const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).send({ message: "User Logout" });
  } catch {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: error,
    });
    console.log(error);
  }
};
