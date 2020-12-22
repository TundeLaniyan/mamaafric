const AppError = require("../../utils/appError");
const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/asyncFunctions");

const deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    const _id = req.params.id;

    const check = await model.findOne({ _id, owner: req.user.id });

    if (!check) {
      return next(
        new AppError("you cannot delete this project please again later", 404)
      );
    }

    const doc = await model.findOneAndDelete({ _id });

    res.status(204).json({
      status: "success",
      data: doc,
    });
  });

const deactivateOne = (model) =>
  catchAsync(async (req, res, next) => {
    const _id = req.params.id;

    const doc = await model.findOneAndUpdate(
      { _id, owner: req.user._id },
      { active: false }
    );

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: doc,
    });
  });

const findAllWithQuery = (model, modale) =>
  catchAsync(async (req, res, next) => {
    const keyword = (queryString = req.query.keyword, keyword = null) => {
      if (queryString) {
        keyword = {
          $or: [
            { slug: { $regex: queryString, $options: "i" } },
            { email: { $regex: queryString, $options: "i" } },
            { team: { $regex: queryString, $options: "i" } },
            { role: { $regex: queryString, $options: "i" } },
          ],
        };
        return keyword;
      }
    };

    let filter = { ...keyword() };

    const features = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const doc2 = await model.countDocuments({ ...keyword() });
    const doc = await features.query.select(
      "-gender -dob -passwordChangedAt -sentRequests -requests -createdAt -updatedAt"
    );

    if (!features.queryString.keyword)
      return next(new AppError("Please put in a search term !!!!!", 400));

    if (doc.length === 0) {
      return next(
        new AppError("those credentials were not found sorry :(", 404)
      );
    }

    res.status(200).json({
      status: "success",
      pages: Math.ceil(doc2 / req.query.limit),
      pageNumber: Number(req.query.page),
      results: doc2,
      data: {
        data: doc,
      },
    });
  });

const creator = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.create({ ...req.body, owner: req.user.id });

    if (doc === undefined || !doc) {
      return next(
        new AppError("unable to process this application please try again", 404)
      );
    }

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const updator = (model) =>
  catchAsync(async (req, res, next) => {
    const _id = req.params.id;

    if (req.file) req.body.images = req.file.filename;

    if (!req.body) {
      return next(new AppError("please put in a vaild input", 404));
    }

    const doc = model.findOne({ _id });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const info = await model.findByIdAndUpdate(_id, req.body, {
      new: true,
      validateBeforeSave: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: info,
      },
    });
  });

const createOne = (Model, ModelName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create({ ...req.body, owner: req.user._id });

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const getByIdAndPopulate = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model
      .findOne({ _id: req.params.id })
      .select("-__v -passwordChangedAt -dob");

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    doc.populated("projects");

    await doc
      .populate({
        path: "projects",
        select: "-image -images",
      })
      .execPopulate();

    const spread = { ...doc, ...doc.projects };

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
        projects: doc.projects,
      },
    });
  });

const getByIdAndPopulateOwner = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model
      .findOne({ _id: req.params.id })
      .select("-__v -comments");

    if (!doc || doc === null) {
      return next(new AppError("No document found with that ID", 404));
    }

    const project = {
      id: doc.project._id,
      name: doc.project.name,
      difficulty: doc.project.difficulty,
      projectowner: doc.project.owner.name,
      projectid: doc.project.owner._id,
      name: doc.project.name,
      name: doc.project.name,
    };

    const obj = {
      id: doc._id,
      to: doc.for.name,
      type: doc.type,
      description: doc.description,
      complete: doc.complete,
      name: doc.name,
      by: doc.owner.name,
      project,
    };

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// const moment = require('moment');
// var ageYears = 30;
// var latestBirthdate = new moment().add(moment.duration(-ageYears, 'years')).startOf('day');
// var earliestBirthdate = new moment().add(moment.duration(-(ageYears + 1), 'years')).add(moment.duration(1, 'days')).startOf('day');
// var ageRange = earliestBirthdate.format("DD MMM, YYYY") + ' to ' + latestBirthdate.format("DD MMM, YYYY");

const getOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model
      .findOne({ _id: req.params.id })
      .select("-__v");

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

module.exports = {
  deleteOne,
  findAllWithQuery,
  getByIdAndPopulate,
  getByIdAndPopulateOwner,
  creator,
  updator,
  createOne,
  getOne,
};
