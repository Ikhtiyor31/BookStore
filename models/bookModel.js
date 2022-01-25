import { connectDB } from "../database/connect.js";

const bookModel = {

    createCategory: async(category_name) => {
         const query = connectDB('categories').insert({
             category_name: category_name,
         })
         return query;
    },

    updateCategory: async(data)=> {
        console.log(data)
        const query = connectDB('categories').update({
            category_name: data.category_name
        }).where(`category_id`, `=`, `${data.category_id}`)
        return query
    },

    deleteCategory: async(category_id) => {
        const query = connectDB.
            delete().from('categories')
            .where(`category_id`, `=`, `${category_id}`)
        return query
    },

    createImage: async(image) => {  
        let query;
        for(let i = 0; i < image.length; i++) {
            query = connectDB('images').insert({
                originalname: image[i].originalname,
                encoding: image[i].encoding,
                mimetype: image[i].mimetype,
                destination: image[i].destination,
                filename: image[i].filename,
                path: image[i].path,
                size: image[i].size,
                book_id: image.book_id
            })
        }
        return query;
    },

    updateImage: async(image) => {
        const query = connectDB('images').update({
            image_path: image.path,
            image_type: image.mimetype,
            image_size: image.size,
            image_name: image.image_name,
            encoding: image.encoding,
            book_id: image.book_id
        }).where(`image_id`, `=`, `${image.image_id}`)
        return query;
    },

    deleteImage: async(image) => {
        const query = connectDB
            .delete()
            .from('images')
            .where(`image_id`, `=`, `${iamges.image_id}`)
        return query;
    },

    createBook: async(book) => {
        let query;
        try {
             query = connectDB('book').insert({
                title: book.title,
                num_pages: book.num_pages,
                rate: book.rate,
                price: book.price,
                book_author: book.book_author,
                book_language: book.book_language,
                category_id: book.category_id,
            });
        } catch(err) {
            console.log(err)
        }
      

        return query;
    },
    updatedBook: async(book) => {
        let query;
        try {
            query = connectDB('book').update({
                title: book.title,
                num_pages: book.num_pages,
                rate: book.rate,
                price: book.price,
                book_author: book.book_author,
                book_language: book.language,
                category_id: book.category_id,
            }).where(`book_id`, `=`, `${book.book_id}`)
        }catch(err) {
            console.log(err)
        }

        return query
    },
    deleteBook: async(book_id) => {
        const query = connectDB
            .delete()
            .from('book')
            .where(`book_id`, `=`, `${book_id}`)

        return query;    

    },
    getBookDetailById: async(book_id) => {
        const query = connectDB.select('*')
        .from('book')
        .where('book_id', '=', book_id);
        return query;
    },

    getAllBooks: async(books) => {
        const query = connectDB.select('*')
        .from('book')
        return query;
    },

    getBooksByCategory: async(category_name) => {
       
        const query = connectDB.select('*')
        .from('categories')
        .innerJoin(`book`, function() {
            this.on(`book.category_id`, '=', `categories.category_id`)
        })
        .innerJoin('images', function() {
            this.on(`images.book_id`, `=`, `book.book_id`)
        })
        .where(`categories.category_name`, `${category_name}`)
        
        console.log(`query` + query)
        return query;
    }
}

export default bookModel;