import ErrorResponse from "../utils/errorhandler.js";
import User from "../db/models/userSchema.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;

    //check if all fields are provided
    if (!lastName || !firstName || !email || !password) {
      return next(new ErrorResponse("all fields must be provided", 400));
    }

    //check if user does not exist in the db
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ErrorResponse("user already exists", 400));
    }

    const hashed_password = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashed_password,
    });

    await newUser.save();

    const { password: pass, ...otherData } = newUser.toObject();

    res
      .status(200)
      .json({ message: "Registered successfully", user: otherData });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return next(new ErrorResponse("All fields must be provided", 400));
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return next(new ErrorResponse("User does not exist", 400));
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return next(new ErrorResponse("Invalid email or password", 401));
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: userExists._id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
      },
    });
  } catch (error) {
    next(error);
  }
}
