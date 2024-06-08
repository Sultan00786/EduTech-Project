const Category = require("../models/Category");
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
    console.log("Category Details is: ", CategoryDetails);

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
    );

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
        populate: "ratingAndReviews",
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
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

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

    console.log("Different Course: ", differentCategory);

    // * Step: 5 --> get top selling courses
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
