const express = require('express');
const { addProducts,getAdminProducts,getSingleProduct,updateProduct,deleteProduct, createReview, getReviews, deleteReview, getProducts} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate'); 
const router= express.Router();

router.route('/products').get(getProducts);  // authenication service to this resourse
router.route('/product/:id') .get(getSingleProduct)
router.route('/review').put(isAuthenticatedUser,createReview);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);


router.route('/admin/product/add').post(isAuthenticatedUser,authorizeRoles('admin'), addProducts); // login user details was given by isAuthenticatedUser to authorizeRoles and it use role details to give permission access this resourse 'addProducts'.
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

router.route('/admin/reviews/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getReviews);
router.route('/admin/review').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview); 
//admin can  only able to get or update  reviews.
//admin routes  

module.exports = router;