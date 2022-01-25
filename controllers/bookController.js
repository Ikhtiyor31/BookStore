import asyncWrapper from "../middleware/async.js";
import { connectDB } from "../database/connect.js";
import bookModel from "../models/bookModel.js";
import { createCustomError } from "../errors/custom-error.js";
import {generateAccessToken, refreshAccessToken, } from '../middleware/generator-access-token.js';

const bookController = {
    
    createCategory: asyncWrapper(async(req, res, next) => {
        const { category_name } = req.body;
        if (!category_name) {
            return next(createCustomError(`input filed is missing`, 400))
        }
        const newCategory = await bookModel.createCategory(category_name);
        return res.status(201).json({
            status: `success`,
            msg: newCategory
        })
    }),
    updateCategory: asyncWrapper(async(req, res, next) => {
        const { category_name } = req.body;
       
        if (!category_name) {
            return next(createCustomError(`input filed is missing`, 400))
        }
        const updatedCategory = await bookModel.updateCategory({category_id: req.params.id, category_name: category_name});

        if (!updatedCategory) {
            return next(createCustomError(`no category with provided id`, 500))
        }
        return res.status(200).json({
            status: `success`,
            msg: updatedCategory
        })
    }),
    deleteCategory: asyncWrapper(async(req, res, next) => {
        const category_id  = req.params.id;
        console.log(category_id)
        if (!category_id) {
            return next(createCustomError(`input filed is missing`, 400))
        }
       
        const deletedCategory = await bookModel.deleteCategory(category_id);
        if (!deletedCategory) {
            return next(createCustomError(`no category with provided id`, 500))
        }
        return res.status(200).json({
            status: `success`,
            msg: deletedCategory
        })
    }),
    createBook: asyncWrapper(async ( req, res, next ) => {
       
        
        const {category_id}= req.query;
        var obj = req.body;
        obj.category_id = category_id;
       
        const newBookId = await bookModel.createBook(obj); 
       /* 
        var imgObj = req.files;
        imgObj.book_id = 5;
        console.log(imgObj)
        const uploadImage = await bookModel.createImage(imgObj)*/
      
        return res.status(201).json({
            status: `success`,
            data: `new book inserted!`
        })
    }),

    getBookDeatil: asyncWrapper(async ( req, res, next ) => {
       
        const book_id = req.params.id;
        if (!book_id) {
            return next(createCustomError('book id is missing', 400))
        }
        const fetchBook = await bookModel.getBookById(book_id)
        if (!fetchBook) {
            return next(createCustomError(`no book exists with provided id`, 404))
        }
        return res.status(200).json({
            status: 'success',
            data: `${fetchBook}`
        })
    }),

    updateBook: asyncWrapper(async ( req, res, next ) => {
        var obj = req.body;
        obj.book_id = req.params.id;
        
        if (obj == undefined || !obj) {
            return next(createCustomError(`input's missing`, 400))
        }
        const updatedBook = await bookModel.updatedBook(obj)
        if (!updatedBook) {
            return next(createCustomError(`no book exists with provided id`, 404))
        }
        return res.status(204).json({
            status: `succes`,
            msg: updatedBook
        })
    }),

    deleteBook: asyncWrapper(async ( req, res, next ) => {
        const book_id = req.params.id;
        if (!book_id) {
            return next(createCustomError(`book id is missing`, 400))
        }
        const deletedBook = await bookModel.deleteBook(book_id)
        if (!deletedBook) {
            return next(createCustomError(`no book exists with provided id`, 404))
        }
        return res.status(200).json({
            status: 'success',
            msg: `book deleted with id ${deletedBook}`
        })
    }),

    getBooks: asyncWrapper(async (req, res, next) => {
        return res.send('books')
    }),

    searchBook: asyncWrapper(async (req, res, next) => {
       
        res.send(req.query)
    }),

    getBooksByCategory: asyncWrapper(async (req, res, next) => {
        const  category_name  = req.query.category_name;
       
        if (!category_name) {
            return next(createCustomError(`input filed is missing`, 400))
        }
        
        const query_array = category_name.split("_")
        const actual_category_name = query_array.join(" ")
        console.log(actual_category_name)
        const categoryBooks = await bookModel.getBooksByCategory(actual_category_name);
        return res.status(200).json({
            status: `success`,
            data: categoryBooks
        })
    }),

    getAllCategory: asyncWrapper(async (req, res, next) => {
    
    })
}

export default bookController;