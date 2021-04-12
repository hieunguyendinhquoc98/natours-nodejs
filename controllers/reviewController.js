const Review = require('./../models/reviewModel');
const factory = require('./handlers/controllerFactory');

exports.getAllReviews = factory.getAllDocs(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
