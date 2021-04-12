const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgot', authController.forgotPassword);
router.patch('/reset/:token', authController.resetPassword);

//middleware running in sequence so that if we add protect here,
// any routing after that will affect it, not the others before
router.use(authController.protect);

//Loged-in User route
router.get('/myInfo', userController.getUserInfo, userController.getUser);
router.patch(
  '/updateInfo',
  userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.updateMe
);
router.patch('/updatePassword', authController.updatePassword);
router.delete('/deleteUser', userController.deleteUser);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
