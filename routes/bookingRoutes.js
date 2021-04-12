const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

//get tourId from params for routing in tourRoute
const router = express.Router();
router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));
router.route('/').get(bookingController.getAllBookings);
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking)
  .post(bookingController.createBooking);
module.exports = router;
