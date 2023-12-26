/**
  Course module linked with following module:
  
  User.js --> 2 times
  Section.js
  RatingAndReview.js
  Tag.js

 */

const mongoose = require("mongoose");

const couresSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        require: true,
    },
    courseDiscription: {
        type: String, 
        require: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        require: true,
    },
    whatYouWillLearn: {
        type: String, 
        require: true,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String,
        require: true,
    },
    tag: {
        type: [String],
        require: true,
    },
    category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
})

module.exports = mongoose.model("Course", couresSchema);

