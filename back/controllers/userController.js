const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ data: users, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User is not defined!" });
    }
    res.status(200).json({ data: user, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User is not defined!" });
    }
    res.status(200).json({
      deletedUser,
      message: "Successfully deleted!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image!" });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please fill in the title and description!" });
    }

    const newUser = new UserModel({
      title,
      description,
      image: req.file.path,
    });

    await newUser.save();
    res.status(201).json({ data: newUser, message: "User created correctly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User is not defined!" });
    }

    res
      .status(200)
      .json({ data: updatedUser, message: "User successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
  postUser,
};
