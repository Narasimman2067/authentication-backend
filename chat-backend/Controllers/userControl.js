import bcrypt from "bcryptjs";
import User from "../Models/Users.js";

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(409)
        .json({ message: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Incorrect Username or Password", status: false });
    }
    delete user.password;
    return res
      .status(200)
      .json({ message: `${username} login succesfully`, status: true, user });
  } catch (error) {
    next(error);
 
    res.status(500).json({ message: "internal servor error", error });
  }
};

export const Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res
        .status(405)
        .json({ message: "Username already exist", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res
        .status(304)
        .json({ message: "Email already exist", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res
      .status(200)
      .json({
        message: `${username} registeration succesfully`,
        status: true,
        user,
      });
  } catch (error) {
    next(error);
 
    res.status(500).json({ message: "internal server error", error });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json({ message: "users find and shown", users });
  } catch (error) {
    next(error);
 
    res.status(500).json({ message: "internal servor error", error });
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
 
    res.status(500).json({ message: "internal servor error", error });
  }
};

export const logOut = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json({ message: "User id is required " });
    }
    onlineUsers.delete(req.params.id);

    return res.status(200).send({ message: "logout successfully" });
  } catch (error) {
    next(error);
 
    res.status(500).json({ message: "internal servor error", error });
  }
};
