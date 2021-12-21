import express from "express";
import mongodb from "mongodb";
import routes from "./routes/routes.js";
import routerProducts from "./routes/routesProducts.js";
import cors from "cors";
import path from "path";
import routerAbout from "./routes/routesAbout.js";

const url = "mongodb://localhost:27017/";
const __dirname = path.resolve();
const mongoClient = new mongodb.MongoClient(url);
const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/image", express.static(__dirname + "/images"));
app.use("/", routes);
app.use("/", routerProducts);
app.use("/", routerAbout);

mongoClient.connect(function (err, client) {
  const db = client.db("romedcom");
  const collectionProducts = db.collection("products");
  const collectionCategorys = db.collection("categorys");
  const collectionNews = db.collection("news");
  const collectionAboutUs = db.collection("about");
  const collectionServises = db.collection("services");
  const collectionPassword = db.collection("passwords");
  const collectionPasswordAdmin = db.collection("passwordAdmin");
  const collectionBoolAdmin = db.collection("boolAdmin");
  const collectionBoolLogin = db.collection("boolLogin");

  app.locals.collectionProducts = collectionProducts;
  app.locals.collectionCategorys = collectionCategorys;
  app.locals.collectionNews = collectionNews;
  app.locals.collectionAboutUs = collectionAboutUs;
  app.locals.collectionServises = collectionServises;
  app.locals.collectionPassword = collectionPassword;
  app.locals.collectionPasswordAdmin = collectionPasswordAdmin;
  app.locals.collectionBoolAdmin = collectionBoolAdmin;
  app.locals.collectionBoolLogin = collectionBoolLogin;
});

app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(2000, function (req, res) {
  console.log("listening on http://localhost:2000/");
});

process.on("SIGINT", () => {
  mongoClient.close();
  process.exit();
});
