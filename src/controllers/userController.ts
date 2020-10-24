import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInterface, LoginInterface } from "../interfaces/userInterface";
import {
  validateUserRegister,
  validateUserLogin,
} from "../validation/validateUser";
// import { sendMail } from "../mail/mail";
import { Auth } from "../routes/userAuth";
import User from "../models/user.model";

export const registerUser = async (user: UserInterface) => {
  const { value, error } = validateUserRegister(user);
  if (error.email) return { status: "error", error: error.email };
  if (error.phone) return { status: "error", error: error.phone };
  if (error.password) return { status: "error", error: error.password };

  const checkUserExist = await User.findOne({
    where: { email: value.email },
  });

  if (checkUserExist) return { status: "error", error: "User exist already" };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  try {
    const registered = await User.create({
      ...value,
      password: hashedPassword,
    });

    console.log("Register === ", typeof registered);

    const token = await jwt.sign(
      { ...registered, password: null },
      process.env.SECRET_KEY
    );

    console.log("Register === ", token);

    return {
      status: "success",
      user: { ...registered, password: null },
      token,
    };
  } catch (error) {
    return error.message;
  }
};

export const VeryUser = async (
  id: any,
  user: UserInterface,
  token: string,
  res: any
) => {
  if (token) {
    let newUpdate = {
      ...user,
      isVerify: true,
    };

    let users = await User.update(newUpdate, {
      where: { id },
    });

    return {
      status: "success",
      user: await User.findOne({
        where: { id },
      }),
      token,
    };
  } else {
    return { status: "error", error: "You have not verify your account" };
  }
};

export const loginUser = async (user: LoginInterface) => {
  const { value, error } = validateUserLogin(user);

  if (error.email) return { status: "error", error: error.email };
  if (error.password) return { status: "error", error: error.password };

  const checkUser: any = await User.findOne({
    email: value.email,
  });

  if (!checkUser) return { status: "error", error: "You are yet to register" };

  // if (!checkUser.isVerify)
  //   return { status: "error", error: "Check your mail an activate"!! };

  const validPassword = await bcrypt.compare(
    value.password,
    checkUser.password
  );

  if (!validPassword)
    return { status: "error", error: "Password is not valid" };

  try {
    const token = await jwt.sign({ ...checkUser }, process.env.SECRET_KEY);

    return {
      status: "success",
      user: { ...checkUser._doc, password: null },
      token,
    };
  } catch (error) {
    return error.message;
  }
};

export const loadUser = async (id: number) => {
  console.log(id);
  try {
    const user = await User.findOne({ id });
    return { status: "success", user };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
