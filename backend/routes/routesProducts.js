import express from "express";
import mongodb from "mongodb";
import multer from "multer";
import fs from "fs";
import path from "path";

const routerProducts = express.Router();

const ObjectId = mongodb.ObjectId;
const __dirname = path.resolve();

const storageProducts = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\products");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      path.parse(file.originalname).name +
        "_" +
        Date.now() +
        "" +
        path.parse(file.originalname).ext
    );
  },
});

const uploadProducts = multer({
  storage: storageProducts,
});

routerProducts.get("/posts", async function (req, res) {
  try {
    let arr = [];
    await fs.readdirSync(__dirname + "\\images\\products").forEach((file) => {
      arr.push(file);
    });
    res.status(200).send({ stat: "ok", arr: arr });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Some Error At get '/posts'" });
  }
});

//products image

routerProducts.post(
  "/posts",
  uploadProducts.single("myImage"),
  async function (req, res) {
    try {
      res.status(201).send({ message: "Image Uploaded" });
    } catch (error) {
      console.log("error: ", error);
      res
        .status(500)
        .send({ stat: null, message: "Some Error At post '/posts'" });
    }
  }
);

routerProducts.delete("/posts/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (id) {
      let arr = [];
      await fs.readdirSync(__dirname + "\\images\\products").forEach((file) => {
        arr.push(file);
      });
      const bool = arr.some((el) => el === id);
      console.log(bool);
      if (bool) {
        await fs.unlinkSync(__dirname + `\\images\\products\\${id}`);
        res.status(201).send({ message: "Image deleted" });
        return;
      }
      res
        .status(404)
        .send({ stat: null, message: "There is not such id like this" });
      return;
    }
    res
      .status(404)
      .send({ stat: null, message: "There is not such id like this" });
    return;
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .send({ stat: null, message: "Some Error At delete '/posts'" });
  }
});

routerProducts.get(
  "/products/:wasAdded/:limit/:type?",
  async function (req, res) {
    try {
      const wasAdded = req.params.wasAdded;
      const limit = req.params.limit;
      if (wasAdded && limit) {
        const collectionProducts = req.app.locals.collectionProducts;
        let result = await collectionProducts.find().toArray();
        if (result) {
          const typeProd = req.params.type;
          if (typeProd !== undefined) {
            if (typeProd !== "all") {
              const arrType = [];
              result.forEach((el) => {
                if (el.type === typeProd) {
                  arrType.push(el);
                }
              });

              result = arrType;
            }
          }
          const arrLength = result.length;
          const minus = arrLength - wasAdded;
          console.log(minus);
          if (minus > 0) {
            const sliceArray = result.slice(wasAdded);
            const limitArray = sliceArray.slice(0, limit);
            res.status(201).send({ stat: "ok", arr: limitArray });
            return;
          }
          res
            .status(201)
            .send({ stat: null, message: "All Products are allready posted" });
          return;
        }
        res.status(500).send({
          stat: null,
          message: "Server can't connect to the data base",
        });
        return;
      }
      res
        .status(201)
        .send({ stat: null, message: "The data has not reached the server" });
      return;
    } catch (error) {
      console.log("error: ", error);
      res.status(500).send({
        stat: null,
        message: "Some Error At Get '/products/:wasAdded/:limit'",
      });
    }
  }
);

routerProducts.get("/productsNumber/:type", async function (req, res) {
  try {
    if (req.params.type) {
      const type = req.params.type;
      if (type === "all") {
        const collectionProducts = req.app.locals.collectionProducts;
        let result = await collectionProducts.count();
        if (result || result === 0) {
          res.status(201).send({
            stat: "ok",
            arr: result,
          });
          return;
        }
        res.status(500).send({
          stat: null,
          message: "Some Problems, Plese Try Later",
        });
        return;
      }
      const collectionProducts = req.app.locals.collectionProducts;
      let result = await collectionProducts.count({ type: type });
      if (result || result === 0) {
        res.status(201).send({
          stat: "ok",
          arr: result,
        });
        return;
      }
      res.status(500).send({
        stat: null,
        message: "Some Problems, Plese Try Later wdasd",
      });
      return;
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({
      stat: null,
      message: "Some Error At Get '/products/:wasAdded/:limit'",
    });
  }
});

export default routerProducts;

//productsNumber
