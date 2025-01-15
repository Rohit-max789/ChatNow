import jwt from "jsonwebtoken";
import User from "../Models/userModels.js";

const islogin = async (req, res, next) => {
  try {
    console.log(req.cookies.jwt);

    const token = req.cookies?.jwt;
    console.log(token);

    if (!token) {
      return res
        .status(500)
        .send({ success: false, message: "User Unauthorize" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res
        .status(500)
        .send({ success: false, message: "User Unauthorize" });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res
        .status(500)
        .send({ success: false, message: "User Unauthorize" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: error,
    });
    console.log(error);
  }
};

export default islogin;
