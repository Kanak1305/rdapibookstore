// const Book = require('../models/Book')
// const cloudinary = require('cloudinary').v2
// async function addBook(req, res) {
//     try {
//         if (!req.file) {
//             return res.status(400).send({ message: 'Please select a book image' })
//         }
//          cloudinary.config({
//         cloud_name : "luzsx8iq",
//         api_key:"946788623847759",
//         api_secret:"BBknXXuIA-qYLPsV83EpvCU92PU"
//         })
//         const upload = await cloudinary.uploader.upload(req.file.path)
//         req.body.bookImage = upload.secure_url;
//         let book = new Book(req.body)
//         await book.save();
//         res.status(200).send({ message: 'Data has been saved successfully' })

//     } catch (err) {
//         res.status(400).send({ message: err.message || 'Something went wrong' })
//     }
// }
// async function getBooks(req, res) {
//     try {
//         let totalBooks = await Book.countDocuments({});
//         let books = await Book.find({ bookTitle: new RegExp(req.query.searchBook, "i") }).skip((req.query.pageNo - 1) * (req.query.booksPerPage)).limit(req.query.booksPerPage);
//         res.status(200).send({ data: books, totalBooks: totalBooks })
//     } catch (err) {
//         res.status(400).send({ message: err })
//     }
// }
// async function deleteBook(req, res) {
//     try {
//         id = req.params.id;
//         await Book.deleteOne({ _id: id });
//         res.status(200).send({ success: true })
//     } catch (err) {
//         res.status(400).send({ success: false })
//     }
// }
// async function getBookForEdit(req, res) {
//     try {
//         let id = req.params.id;
//         let book = await Book.findOne({ _id: id });
//         res.status(200).send({ data: book })
//     } catch (err) {
//         res.status(400).send({ data: err })
//     }
// }
// async function editBook(req, res) {
//     try {
//         let id = req.params.id;
//         let book = req.body;
//         await Book.updateOne({ _id: id }, req.body);
//         res.status(200).send({ success: true })
//     } catch (err) {
//         res.status(400).send({ success: false })
//     }
// }
// module.exports = {
//     addBook,
//     getBooks,
//     deleteBook,
//     getBookForEdit,
//     editBook
// }

const Book = require("../models/Book");
const cloudinary = require("cloudinary").v2;

// CLOUDINARY CONFIG
cloudinary.config({
        cloud_name : "luzsx8iq",
        api_key:"946788623847759",
        api_secret:"BBknXXuIA-qYLPsV83EpvCU92PU"
        })

// ADD BOOK
const addBook = async (req, res) => {
  try {
    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a book image",
      });
    }

    console.log("BOOK DATA:", req.body);
    console.log("BOOK IMAGE:", req.file);

    // UPLOAD IMAGE TO CLOUDINARY
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "book-store",
    });
    console.log("CLOUDINARY IMAGE:", upload.secure_url);

    // CREATE BOOK
    const book = new Book({
      bookTittle: req.body.bookTittle,
      authorName: req.body.authorName,
      imprint: req.body.imprint,
      publicationYear: req.body.publicationYear,
      productFrom: req.body.productFrom,
      publisher: req.body.publisher,
      genre: req.body.genre,
      isbnNo: req.body.isbnNo,
      bookCategory: req.body.bookCategory,
      bookSubCategory: req.body.bookSubCategory,
      edition: req.body.edition,
      language: req.body.language,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      countryOfOrigin: req.body.countryOfOrigin,
      nameOfManufacturer: req.body.nameOfManufacturer,
      addressOfManufacturer: req.body.addressOfManufacturer,
      nameOfPackager: req.body.nameOfPackager,
      addressOfPackager: req.body.addressOfPackager,
      rating: req.body.rating || "0",
      reviews: req.body.reviews || "0",
      originalPrice: req.body.originalPrice,
      discount: req.body.discount || "0",
      discountType: req.body.discountType || "",
      finalPrice: req.body.finalPrice || "0",

      // Save Cloudinary URL
      bookImage: upload.secure_url,
    });

    // SAVE BOOK IN MONGODB
    const savedBook = await book.save();

    // RESPONSE
    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    console.log("Add Book Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to add book",

      error: error.message,
    });
  }
};

// ========================================
// GET ALL BOOKS
// ========================================

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,

      message: "Books fetched successfully",

      data: books,
    });
  } catch (error) {
    console.log("Get Books Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch books",

      error: error.message,
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BOOK FOR EDIT
const getBookForEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log("Get Book For Edit Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BOOK
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await Book.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log("Delete Book Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// EDIT BOOK
const editBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,

        message: "Book not found",
      });
    }

    // IF NEW IMAGE IS UPLOADED
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "book-store",
      });

      req.body.bookImage = upload.secure_url;
    }

    // UPDATE BOOK
    await Book.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log("Edit Book Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// EXPORT
module.exports = {
  addBook,
  getBooks,
  getBook,
  deleteBook,
  getBookForEdit,
  editBook,
};
