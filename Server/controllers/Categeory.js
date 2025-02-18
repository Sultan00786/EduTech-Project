const Category = require("../models/Category");
const Course = require("../models/Course");
const { sortFunc } = require("../utils/sortAvgRagtion");
function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}

// createe Category ka handler function
exports.createCategory = async (req, res) => {
   /**
    * Step: 1 --> data fetch
    * Step: 2 --> validation of data
    * Step: 3 --> create entry in DB
    * Step: 4 --> return res
    */

   try {
      // fetch data
      const { name, description } = req.body;

      // data validation
      if (!name || !description) {
         return res.status(400).json({
            success: false,
            message: "All fields are required",
         });
      }

      //  create entry in DB
      const CategoryDetails = await Category.create({
         name: name,
         description: description,
      });

      // return res
      return res.status(200).json({
         success: true,
         message: "Category created successfully",
         CategoryDetails,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// Get All Categorys ka handler function
exports.showAllCategories = async (req, res) => {
   try {
      const allCategorys = await Category.find(
         // find all Categorys
         {},
         // name and description is mendatary
         {
            name: true,
            description: true,
         }
      ).sort({ createdAt: -1 });

      return res.status(200).json({
         success: true,
         message: "All Categorys returned successfully",
         allCategorys,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// categoryPageDetail
exports.categoryPageDetails = async (req, res) => {
   /**
    * Step: 1 --> get categoryId
    * Step: 2 --> get cousrses for specified categoryId
    * Step: 3 --> validation
    * Step: 4 --> get course for different categorie
    * Step: 5 --> get top selling courses
    * Step: 6 --> return res
    */

   try {
      // * Step: 1 --> get categoryId
      const { categoryId } = req.body;
      // * Step: 2 --> get cousrses for specified categoryId
      const selectedCetogry = await Category.findById(categoryId)
         .populate({
            path: "courses",
            match: { status: "Published" },
            populate: { path: "instructor ratingAndReviews" },
         })
         .exec();

      // * Step: 3 --> validation
      if (!selectedCetogry) {
         return res.status(404).json({
            success: false,
            message: "Data Not Found",
         });
      }

      // Handle the case when there are no courses
      if (selectedCetogry.courses.length === 0) {
         return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
         });
      }

      // sorting on basis of avg rating
      selectedCetogry?.courses.sort((a, b) => sortFunc(a, b));

      // * Step: 4 --> get course for different categorie
      const categoriesExceptSelected = await Category.find({
         _id: { $ne: categoryId },
      });

      let differentCategory = await Category.findOne(
         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
      )
         .populate({
            path: "courses",
            match: { status: "Published" },
         })
         .exec();

      // const freeCategory = await Category.findOne({ name: "Free" })
      //    .populate({
      //       path: "courses",
      //       match: { status: "Published" },
      //       populate: { path: "instructor ratingAndReviews" },
      //    })
      //    .exec();
      // let freeCourses = [];
      // if (freeCategory) freeCourses = freeCategory.courses;

      // * Step: 5 --> get top selling courses
      const allCourse = await Course.find()
         .populate({
            path: "instructor ratingAndReviews",
         })
         .exec();

      const mostSellingCourses = allCourse
         .sort((a, b) => b.sold - a.sold)
         .slice(0, 10);

      // sorting on basis of avg rating
      mostSellingCourses.sort((a, b) => sortFunc(a, b));

      // * Step: 6 --> return res
      return res.status(200).json({
         success: true,
         data: {
            selectedCetogry,
            differentCategory,
            mostSellingCourses,
         },
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};
