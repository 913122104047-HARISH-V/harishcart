const express=require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPasword, getUserProfile, changePassword, updateUserProfile, getUser, updateUser, deleteUser, getAllUsers } = require('../controllers/authController');
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authenticate')
const router= express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.post('/password/forgot',forgotPassword);
router.post('/password/reset/:token',resetPasword) //here token parameter is refers to restePasswordToken
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile)
router.route('/myprofile/update/password').put(isAuthenticatedUser,changePassword)
router.route('/myprofile/update').put(isAuthenticatedUser,updateUserProfile)

//admin route
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers); 
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUser)
                               .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
                            .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser) 
module.exports=router;
