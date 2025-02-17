const Paper = require("../models/paper.model");
const { successResponse, errorResponse } = require("../utils/response.dto");


exports.createPaper = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Set from auth middleware
  try {
    const paper = new Paper({ title, content, author: userId });
    await paper.save();
    return successResponse(res, 201, "Paper created successfully", paper);
  } catch (error) {
    return errorResponse(res, err);
  }
};

exports.getPapers = async (req, res) => {
  try {
    const papers = await Paper.find().populate("author", "name email");
    return successResponse(res, 201, "Papers fetched successfully", papers);
  } catch (error) {
    return errorResponse(res, err);
  }
};
exports.showPaper = async (req, res) => {
    const { id } = req.params;
    try {
      // Find the paper by ID and populate the author details
      const paper = await Paper.findById(id).populate("author", "name email");
  
      // If the paper doesn't exist, return a 404 response
      if (!paper) {
        return successResponse(res, 404, "Paper not found");
      }
  
      // Return the paper data in the response
      return successResponse(res, 200, "Paper fetched successfully", paper);
    } catch (error) {
      // Handle any server-side errors
      return errorResponse(res, 500, "Error fetching paper", error);
    }
  };

exports.updatePaper = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const paper = await Paper.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!paper) return successResponse(res, 404, "Paper not found")
    return successResponse(res, 201, "Paper updated successfully", paper);
  } catch (error) {
    return errorResponse(res, err);
  }
};

exports.deletePaper = async (req, res) => {
  const { id } = req.params;
  try {
    const paper = await Paper.findByIdAndDelete(id);
    if (!paper) return successResponse(res, 404, "Paper not found");
    return successResponse(res, 201, "Paper deleted successfully!");
  } catch (error) {
    return errorResponse(res, err);
  }
};
