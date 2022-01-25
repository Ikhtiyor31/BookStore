import express from "express";
import bookController from "../controllers/bookController.js";
import authenticateToken from "../middleware/verify-access-token.js";
import upload from "../middleware/uploadImage.js";
const router = express.Router()

router.route('/book')
    .post(upload.any(), bookController.createBook)
    .get(bookController.searchBook) // search by book name, featured, latest ==> /api/book?search=storybook&date=2021_12_20 & get 20 books per page
    


// view books details
router.route('/book/:id')
    .get(bookController.getBookDeatil)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook)
    // get book by cateogry name /api/category?name=science_book
router.route('/book/search')
    .get(bookController.searchBook)  
router.route('/category')
    .post(bookController.createCategory)    

// select book category
router.route('/category/:id')
    .get(bookController.getBooksByCategory)
    .patch(bookController.updateCategory)
    .delete(bookController.deleteCategory)
    
// view all category of books
router.route('/categories')
    .get(bookController.getAllCategory)




export default router;





