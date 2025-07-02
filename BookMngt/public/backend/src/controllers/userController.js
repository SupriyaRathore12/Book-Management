const userModel = require("../models/userModel");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidPassword,
} = require("./validator");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

// Add Users
const addUsers = async (req, res) => {
  try {
    let userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { name, email, contactNo, password, address, gender, age } = userData;

    // Name Validation
    if (!isValid(name)) {
      return res.status(400).json({ msg: "Name is Required" });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ msg: "Invalid Name" });
    }

    // UserEmail Validation
    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    let duplicateEmail = await userModel.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // User Contact Validation
    if (!isValid(contactNo)) {
      return res.status(400).json({ msg: "Contact is Required" });
    }
    if (!isValidPhone(contactNo)) {
      return res.status(400).json({ msg: "Invalid Contact" });
    }

    let duplicateContact = await userModel.findOne({ contactNo });
    if (duplicateContact) {
      return res.status(400).json({ msg: "Contact Already Exists" });
    }

    // Address Validation
    if (!isValid(address)) {
      return res.status(400).json({ msg: "Address is Required" });
    }

    // Gender Validation
    if (!isValid(gender)) {
      return res.status(400).json({ msg: "Gender is Required" });
    }

    let validGenders = ["male", "female", "others"];
    if (!validGenders.includes(gender.trim().toLowerCase())) {
      return res
        .status(400)
        .json({ msg: "Gender must be 'male', 'female' and 'Others'" });
    }

    // Password Validation
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        msg: "Password must be contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    // Age Validation
    if (!isValid(age)) {
      return res.status(400).json({ msg: "Age is Required" });
    }

    let user = await userModel.create({
      name,
      email,
      contactNo,
      password: hashedPassword,
      address,
      gender,
      age,
    });
    return res.status(201).json({ msg: "User Added Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get Users
const getUsers = async (req, res) => {
  try {
    let users = await userModel.find();
    if (users.length === 0) {
      return res.status(404).json({ msg: "No User Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;

    let loggedInUserId = req.user.userId;
    if (userId !== loggedInUserId) {
      return res.status(403).json({ msg: "Access Denied! Invalid User!!!" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { name, email, contactNo, password, address, gender, age } = data;

    // Validate Name
    if (name !== undefined) {
      if (!isValid(name)) {
        return res.status(400).json({ msg: "Name is Required" });
      }

      if (!isValidName(name)) {
        return res.status(400).json({ msg: "Invalid Name" });
      }
    }

    // Validate User Email

    if (email !== undefined) {
      if (!isValid(email)) {
        return res.status(400).json({ msg: "Email is Required" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      let duplicateEmail = await userModel.findOne({ email });
      if (duplicateEmail) {
        return res.status(400).json({ msg: "Email Already Exists" });
      }
    }

    // Validate Contact
    if (contactNo !== undefined) {
      if (!isValid(contactNo)) {
        return res.status(400).json({ msg: "Contact is Required" });
      }

      if (!isValidPhone(contactNo)) {
        return res.status(400).json({ msg: "Invalid Contact" });
      }

      let duplicateContact = await userModel.findOne({ contactNo });
      if (duplicateContact) {
        return res.status(400).json({ msg: "Contact Already Exists" });
      }
    }

    // Password Validation
    let salt;
    let hashedPassword;
    if (password !== undefined) {
      if (!isValid(password)) {
        return res.status(400).json({ msg: "Password is Required" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          msg: "Password must be contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
        });
      }
      salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Validate user Address
    if (address !== undefined && !isValid(address)) {
      return res.status(400).json({ msg: "Address is Required" });
    }

    // validate Gender
    if (gender !== undefined) {
      if (!isValid(gender)) {
        return res.status(400).json({ msg: "Gender is Required" });
      }

      let validGenders = ["male", "female", "others"];
      if (!validGenders.includes(gender.trim().toLowerCase())) {
        return res
          .status(400)
          .json({ msg: "Gender must be 'male', 'female' and 'Others'" });
      }
    }

    // validate Age
    if (age !== undefined && !isValid(age)) {
      return res.status(400).json({ msg: "Age is Required" });
    }

    let update = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        contactNo,
        password: hashedPassword,
        address,
        gender,
        age,
      },
      { new: true }
    );

    if (!update) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    return res.status(200).json({ msg: "User Updated Successfully", update });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ mag: "User Not Found" });
    }

    await userModel.findByIdAndDelete(userId);
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not Found with this email" });
    }

    let matchedUser = await bcrypt.compare(password, user.password);
    if (!matchedUser) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    let token = jwt.sign(
      { userId: user._id, email: user.email },
      "my-secret-key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ msg: "Login Successfull", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { addUsers, getUsers, updateUser, deleteUser, loginUser };
