const Categeoty = require("../models/Categeoty");



// createe Categeoty ka handler function

exports.createrCategeoty = async (req, res) => {

    /**
     * Step: 1 --> data fetch
     * Step: 2 --> validation of data
     * Step: 3 --> create entry in DB
     * Step: 4 --> return res
     */

    try {

        // fetch data 
        const {name, description} = req.body;

        // data validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //  create entry in DB
        const CategeotyDetails = await Categeoty.create({
            name: name,
            description: description,
        });
        console.log("Categeoty Details is: ",CategeotyDetails);

        // return res
        return res.status(200).json({
            success: truek,
            message: "Categeoty created successfully",
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}



// Get All Categeotys ka handler function

exports.showAllCategeotys = async(req, res) => {
    try {

        const allCategeotys = await Categeoty.find(
            // find all Categeotys 
            {},
            // name and description is mendatary
            {
                name:true,
                description: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "All Categeotys returned successfully",
            allCategeotys,
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
		console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.courses;

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("courses");
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

