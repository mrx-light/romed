import express from 'express';
import mongodb from 'mongodb';
import multer from 'multer'
import fs from "fs"
import path from 'path';



const routerAbout = express.Router();
const __dirname = path.resolve();

const storageAbout = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\about");
  },
  filename: (req, file, callback) => {
    callback(null, path.parse(file.originalname).name + '_' + Date.now() + "" + path.parse(file.originalname).ext);
  }
})
const uploadAbout = multer({
  storage: storageAbout,
})


routerAbout.get("/imagesAbout", async function (req, res) {
  try {
    const arr = [];
    const result = await fs.readdirSync(__dirname + "\\images\\about");
    result.forEach((file) => {
      arr.push(file)
    })
    res.status(200).send({ stat: "ok", arr: arr })
  } catch (error) {
    console.log("error: ", error)
    res.status(500).send({ stat: null, message: "Some Error At get '/imagesAbout'" })

  }
})

routerAbout.post("/imagesAbout", uploadAbout.single("aboutImage"), async function (req, res) {
  try {
    res.status(200).send({ stat: "ok", message: "Image Added" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Some Error At post '/imagesAbout'" })
  }
})



routerAbout.delete("/imagesAbout/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const arr = [];
      const result = await fs.readdirSync(__dirname + "\\images\\about");
      result.forEach((file) => {
        arr.push(file)
      })
      const bool = arr.some(el => el === id)
      if (bool) {
        await fs.unlinkSync(__dirname + `\\images\\about\\${id}`);
        res.status(201).send({ stat: "ok", message: "Image deleted" });
        return
      }
    }
    res.status(500).send({ stat: null, message: "Some Error At delete '/imagesAbout' there is not sush id like this" })
    return;
  } catch (error) {
    console.log("error: ", error)
    res.status(500).send({ stat: null, message: "Some Error At delete '/imagesAbout'" })

  }
})

export default routerAbout