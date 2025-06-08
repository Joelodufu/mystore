const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const carouselRoutes = require("./routes/carousel.routes");
const globalHandler = require("./controllers/error.controller.js");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
dotenv.config();

const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.use((req, res, next) => {
  console.log("Request:", req.method, req.originalUrl);
  next();
});

// Load Swagger YAML file
const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  session({
    secret: "Poll",
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

app.use("/api/carousel", carouselRoutes);

app.get("/", (req, res) => {
  res.send(" Server live ⚡️");
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} not found`,
  });
});

app.use(globalHandler);

module.exports = app;
