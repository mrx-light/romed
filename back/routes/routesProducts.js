import express from 'express';
import mongodb from 'mongodb';
import multer from 'multer'
import fs from "fs"
import path from 'path';



const routerProducts = express.Router();

const ObjectId = mongodb.ObjectId;
const __dirname = path.resolve();


const storageProducts = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\products");
  },
  filename: (req, file, callback) => {
    callback(null, path.parse(file.originalname).name + '_' + Date.now() + "" + path.parse(file.originalname).ext);
  }
})

const uploadProducts = multer({
  storage: storageProducts,
})

routerProducts.get("/posts", async function (req, res) {
  try {
    let arr = [];
    await fs.readdirSync(__dirname + "\\images\\products").forEach(file => {
      arr.push(file)
    });
    res.status(200).send({ stat: "ok", arr: arr })
  } catch (error) {
    console.log("error: ", error)
    res.status(500).send({ stat: null, message: "Some Error At get '/posts'" })
  }
})

//products image

routerProducts.post("/posts", uploadProducts.single("myImage"), async function (req, res) {
  try {
    res.status(201).send({ message: "Image Uploaded" })
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Some Error At post '/posts'" })
  }
})



routerProducts.delete("/posts/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (id) {
      let arr = [];
      await fs.readdirSync(__dirname + "\\images\\products").forEach(file => {
        arr.push(file)
      });
      const bool = arr.some(el => el === id);
      console.log(bool);
      if (bool) {
        await fs.unlinkSync(__dirname + `\\images\\products\\${id}`);
        res.status(201).send({ message: "Image deleted" });
        return
      }
      res.status(404).send({ stat: null, message: "There is not such id like this" });
      return
    }
    res.status(404).send({ stat: null, message: "There is not such id like this" });
    return
  } catch (error) {
    console.log("error: ", error)
    res.status(500).send({ stat: null, message: "Some Error At delete '/posts'" });
  }
})


export default routerProducts