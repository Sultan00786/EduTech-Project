const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const axiox = require("axios");

dotenv.config();

// database Connect
database.connect();

app.options("/", (req, res) => {
   res.setHeader("Access-Control-Allow-Origin", process.env.CLINT_SITE);
   res.sendStatus(204);
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      origin: process.env.CLINT_SITE,
      methods: "GET,PUT,POST,DELETE",
   })
);

app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: "/temp",
   })
);

// cloudinary connection
cloudinaryConnect();

const pingServer = () => {
   axiox
      .get(process.env.PING_URL + "/ping")
      .then((res) => {
         if (!res) {
            console.log("Fail to Ping Server");
            return;
         }
         console.log(
            `Server is Ping on ${new Date().toLocaleDateString()} --> ${new Date().toLocaleTimeString()}`
         );
         return {};
      })
      .catch((err) => {
         console.log(err);
      });
};

setInterval(pingServer, 1000 * 60 * 14);

app.get("/ping", (req, res) => {
   res.send("Hello");
});

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// def route
app.get("/", (req, res) => {
   return res.json({
      success: true,
      message: "Your server is up and running...",
   });
});

const port = process.env.PORT || 27017;
app.listen(port, () => {
   console.log(`App is running at ${port}`);
});
