const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
   {
      name: {
         type: String,
         require: true,
      },
      description: {
         type: String,
         require: true,
      },
      courses: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            require: true,
         },
      ],
   },
   { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
