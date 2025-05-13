const ParksModel = require("../models/parksModel");

const getAllParks = async (req, res) => {
  try {
    const parks = await ParksModel.find({});
    res.status(200).json({ data: parks, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getParksById = async (req, res) => {
  const { id } = req.params;
  try {
    const parks = await ParksModel.findById(id);
    if (!parks) {
      return res.status(404).json({ message: "Parks is not defined!" });
    }
    res.status(200).json({ data: parks, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteParks = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedParks = await ParksModel.findByIdAndDelete(id);
    if (!deletedParks) {
      return res.status(404).json({ message: "Parks is not defined!" });
    }
    res.status(200).json({
      deletedParks,
      message: "Successfully deleted!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const postParks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a image!" });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are necessary" });
    }

    const newParks = new ParksModel({
      title,
      description,
      image: req.file.path,
    });

    await newParks.save();
    res
      .status(201)
      .json({ data: newParks, message: "Parks are created!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editParks = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, desription } = req.body;
    const updateData = { title, desription };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedParks = await ParksModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedParks) {
      return res.status(404).json({ message: "Park is not defined" });
    }

    res
      .status(200)
      .json({ data: updatedParks, message: "Park is updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllParks,
  getParksById,
  deleteParks,
  editParks,
  postParks,
};
