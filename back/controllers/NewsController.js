const NewsModel = require("../models/newsModel");

const getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.find({});
    res.status(200).json({ data: news, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await NewsModel.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News is not defined!" });
    }
    res.status(200).json({ data: news, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNews = await NewsModel.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News is not defined!" });
    }
    res.status(200).json({
      deletedNews,
      message: "Succesfully deleted!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const postNews = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a image !" });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please fill of title and description!" });
    }

    const newNews = new NewsModel({
      title,
      description,
      image: req.file.path,
    });

    await newNews.save();
    res
      .status(201)
      .json({ data: newNews, message: "News created correctly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editNews = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, desription } = req.body;
    const updateData = { title, desription };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedNews = await NewsModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedNews) {
      return res.status(404).json({ message: "News is not defined!" });
    }

    res
      .status(200)
      .json({ data: updatedNews, message: "News succesfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  deleteNews,
  editNews,
  postNews,
};
