// const express = require('express');
// const router = express.Router();

// const Book = require('../models/Book.model');



// // GET /books
// router.get("/books", (req, res, next) => {
//     Book.find()
//         .then( (booksFromDB) => {

//             const data = {
//                 books: booksFromDB
//             }

//             res.render("books/books-list", data);
//         })
//         .catch( e => {
//             console.log("error getting list of books from DB", e);
//             next(e);
//         });
// });




// // GET /books/create (display the form)
// router.get("/books/create", (req, res, next) => {
//     res.render("books/book-create");
// })


// // POST /books/create   (process form)
// router.post("/books/create", (req, res, next) => {

//     const newBook = {
//         title: req.body.title,              //keys here come from the model
//         description: req.body.description,  //I store in those keys what comes from the form in books-create.hbs -> name = "..."
//         author: req.body.author,
//         rating: req.body.rating

//     }

//     console.log(req.body);

//     Book.create(newBook)
//     .then( (newBook) => {
//         // console.log(newBook);
//         // res.send("your book was created sir")

//         res.redirect("/books")
//     })
//     .catch( e => {
//         console.log("error creating new book", e);
//         next(e);
//     });


// });




// // GET /books/:bookId
// router.get("/books/:bookId", (req, res, next) => {
//     const id = req.params.bookId;

//     Book.findById(id)
//         .then( bookFromDB => {
//             res.render("books/book-details", bookFromDB);
//         })
//         .catch( e => {
//             console.log("error getting book details from DB", e);
//             next(e);
//         });
// });




// module.exports = router;





const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model");

// GET /books
router.get("/books", (req, res, next) => {
  Book.find()
    .then((booksFromDB) => {
      const data = {
        books: booksFromDB,
      };
      console.log(booksFromDB);
      res.render("books/books-list", data);
    })
    .catch((e) => {
      console.log("error getting list of books from DB", e);
      next(e);
    });
});

// GET creating a book --- /books/create

router.get("/books/create", (req, res, next) => {
  res.render("books/book-create"); //it is an empty from therefore, we don't pass any data.
});

// POST process the form to create a book --- /books/create

router.post("/books/create", (req, res, next) => {
  const newBook = {
    titel: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  };
  //const newBook= req.body(but he doesn't recommedn this cause we shouldn't trust the data coming from the users)
  //cause with this i will get whatever data the user gives me

  Book.create(newBook)
    .then((newBook) => {
      res.redirect("/books");
    })
    .catch((e) => {
      console.log("error creating a book", e);
      next(e);
    });
});


// GET route to display the form to update a specific book

router.get("/books/:bookId/edit", (req, res, next) => {
    const { bookId } = req.params;

    Book.findById(bookId)
    .then(bookToEdit => {
      console.log(bookToEdit);
    })
    .catch(error => next(error));
});





// GET /book-details

router.get("/books/:bookId", (req, res, next) => {
  const id = req.params.bookId;

  Book.findById(id)

    .then((oneBookFromDB) => {
      // const data = {
      //bookDetails: oneBookFromDB
      //}
      res.render("books/book-details", oneBookFromDB);
    })
    .catch((e) => {
      console.log("error getting this book from DB", e);
      next(e);
    });
});

module.exports = router;
