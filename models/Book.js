// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bookSchema = new Schema({
//     bookTittle: { type: String },
//     authorName: { type: String },
//     imprint: { type: String },
//     publicationYear: { type: String },
//     productFrom:{type: String},
//     publisher: {type:String},
//     genre: { type: String },
//     isbnNo: { type: String },
//     bookCategory: { type: String },
//     edition: { type: String },
//     language: { type: String },
//     description: { type: String },
//     shortDescription: { type: String },
//     countryOfOrigin: { type: String },
//     nameOfManufacturer: { type: String },
//     addressOfManufacturer: { type: String },
//     nameOfPackager: { type: String },
//     addressOfPackager: { type: String },
//     rating: { type: String },
//     reviews: { type: String },
//     originalPrice: { type: String },
//     discount: { type: String },
//     discountType: { type: String },
//     finalPrice: { type: String },
//     bookImage: { type: String }
// }, { timestamps : true });
// module.exports = mongoose.model('Book', bookSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookTittle: {
      type: String,
      required: true,
      trim: true,
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    imprint: {
      type: String,
      required: true,
      trim: true,
    },

    publicationYear: {
      type: String,
      required: true,
    },

    productFrom: {
      type: String,
      required: true,
      trim: true,
    },

    publisher: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    isbnNo: {
      type: String,
      required: true,
      trim: true,
    },

    bookCategory: {
      type: String,
      required: true,
      trim: true,
    },

    bookSubCategory: {
      type: String,
      required: true,
      trim: true,
    },

    edition: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    countryOfOrigin: {
      type: String,
      required: true,
    },

    nameOfManufacturer: {
      type: String,
      required: true,
    },

    addressOfManufacturer: {
      type: String,
      required: true,
    },

    nameOfPackager: {
      type: String,
      required: true,
    },

    addressOfPackager: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
      default: "0",
    },

    reviews: {
      type: String,
      default: "0",
    },

    originalPrice: {
      type: String,
      required: true,
    },

    discount: {
      type: String,
      default: "0",
    },

    discountType: {
      type: String,
      default: "",
    },

    finalPrice: {
      type: String,
      default: "0",
    },

    bookImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
