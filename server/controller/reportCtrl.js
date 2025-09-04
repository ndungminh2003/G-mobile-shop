const Report = require("../models/reportModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createReport = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const newReport = await Report.create(req.body);
    res.json(newReport);
  } catch (error) {
    throw new Error(error);
  }
});

const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedReport);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedReport = await Report.findByIdAndDelete(id);
    res.json(deletedReport);
  } catch (error) {
    throw new Error(error);
  }
});

const getReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaReport = await Report.findById(id);
    res.json(getaReport);
  } catch (error) {
    throw new Error(error);
  }
});
const getallReport = asyncHandler(async (req, res) => {
  try {
    const getallReport = await Report.find();
    res.json(getallReport);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createReport,
  updateReport,
  deleteReport,
  getReport,
  getallReport,
};
