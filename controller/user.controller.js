import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSaveCookie from "../utils/generateTokenAndSaveCookie.js";

export const SignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(404).json({ error: "All fields are require" });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: "User Already Exist" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ error: "Password length is minimum 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ error: "Error in creating a user" });
    }

    const token = generateTokenAndSaveCookie(res, user);

    if (!token) {
      return res.status(400).json({ error: "Error in creating a token" });
    }

    return res
      .status(201)
      .json({ message: "User Created Successfully!", user, token });
  } catch (error) {
    console.log("Error in SignUp: ", error);
    return res.status(500).json({ error: "Internal Server Error in SignUp" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "All fields are require" });
    }

    const user = await User.findOne({ email: email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ error: "User Does Not Exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ error: "Password Does not match" });
    }

    const token = generateTokenAndSaveCookie(res, user);

    if (!token) {
      return res.status(400).json({ error: "Error in creating a token" });
    }

    return res
      .status(200)
      .json({ message: "User LoggedIn Successfully!", user, token });
  } catch (error) {

    console.log("Error in Login: ", error);
    return res.status(500).json({ error: "Internal Server Error in Login" });
  }
};

export const Update = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // console.log("user found: ", req.id);
    // user found:  68d94171cc07b8e87ae1407a
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(400).json({ error: "User id is wrong" });
    }

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;

      await user.save();

      return res
        .status(200)
        .json({ message: "User Updated successfully!", user });
    }
  } catch (error) {
    console.log("Error in Update user: ", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error in Update User" });
  }
};

export const ChangePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await User.findById(req.id);

    if (!user) {
      return res.status(400).json({ error: "Wrong user Id" });
    }

    const checkPassword =await bcrypt.compare(password, user.password);
    console.log("checkPassword: ", checkPassword)

    if (!checkPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    if (newPassword.length < 6) {
      return res
        .status(401)
        .json({ error: "Password length is minimum 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (user) {
      user.password = hashedPassword;

      await user.save();

      return res
        .status(200)
        .json({ message: "Password Change successfully!", user });
    }
  } catch (error) {
    console.log("Error in Update user: ", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error in Change user password" });
  }
};
