const router = require('express').Router();
const books = require('./books_dumb')

let booksDirectory = books;


router.get('/books', function(req,res){
    res.send(booksDirectory)
});


// get data from database
router.get('/books/:id', function(req,res){
    const {id} = req.params

    const book = booksDirectory.find(b => b.isbn ===id)
    if(!book) return res.status(404).send('Book does not exits');

    res.send(book);

});


// post data to the database
router.post('/books', function(req,res){
    const{
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories

    }= req.send

    const bookExist = booksDirectory.find(b => b.isbn ==  isbn);
    if(bookExist)return res.send('book already exist');

    const book ={
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book);

    res.send(book);
    
});

// update a book 

router.put('/books/:id', function(req,res){
    const {id} = req.params;
    const {
        title,  
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;


// check if a book exist in the data base
    const book = booksDirectory.find(b=>b.isbn === id);
    if(!book) return res.send('Bookdoes not exist');

    const updateField = (val, prev)=>  !val ? prev : val;

    const updateBook = {
        ...book,
        title:updateField(title, book.title),
        pageCount:updateField(pageCount, book.pageCount),
        publishedDate:updateField(publishedDate, book.publishedDate),
        thumbnailUrl:updateField(publishedDate, book.publishedDate),
        shortDescription:updateField(shortDescription, book.shortDescription),
        longDescription:updateField(longDescription, book.longDescription),
        status:updateField(status, book.status),
        authors:updateField(authors, book.authors),
        categories:updateField(categories, book.categories),
    };
    const bookIndex = booksDirectory.findIndex(b => b.isbn === id);
    booksDirectory.splice(bookIndex, 1, updateBook);

    res.send(updateBook);

});

// delete from a database book


router.delete('/books', function(req,res){
    const {id} = req.params;

    //check if a book exist
    let book = booksDirectory.find(b=>b.isbn === id);

    if(!book) return res.status(404).send('Bookdoes not exist');

    //use the filter function to remove a book
    booksDirectory = booksDirectory.filter(b => b.isbn !== id);

    res.send('sucess');



});

module.exports= router