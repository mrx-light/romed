import express from "express";
import mongodb from "mongodb";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import path from "path";

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
const storageAbout = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\about");
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
const storageBrands = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\brands");
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
const storageNews = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\news");
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
const storageCategorys = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "\\images\\categorys");
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
const uploadAbout = multer({
  storage: storageAbout,
});
const uploadBrands = multer({
  storage: storageBrands,
});
const uploadNews = multer({
  storage: storageNews,
});
const uploadCategorys = multer({
  storage: storageCategorys,
});

// uploadCategorys

router.post(
  "/categorysPhoto",
  uploadCategorys.single("CategorysPhoto"),
  async function (req, res) {
    try {
      res.status(201).send({ message: "Image Uploaded" });
    } catch (error) {
      console.log("error:", error);
    }
  }
);

router.get("/categorysPhoto", async function (req, res) {
  try {
    let arr = [];
    await fs.readdirSync(__dirname + "\\images\\categorys").forEach((file) => {
      arr.push(file);
    });
    res.send(arr);
  } catch (error) {
    console.log("error:", error);
  }
});

router.delete("/categorysPhoto/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (id) {
      let arr = [];
      await fs
        .readdirSync(__dirname + "\\images\\categorys")
        .forEach((file) => {
          arr.push(file);
        });
      const bool = arr.some((el) => el === id);
      if (bool) {
        await fs.unlinkSync(__dirname + `\\images\\categorys\\${id}`);
        res.status(201).send({ message: "Image deleted" });
        return;
      }
    }
    res.status(404).send({ message: null });
    return;
  } catch (error) {
    console.log("error:", error);
  }
});

router.get("/products/:limit", async function (req, res) {
  try {
    const limit = Number(req.params.limit);
    if (limit) {
      res.setHeader("Content-Type", "application/json");
      const collectionProducts = req.app.locals.collectionProducts;

      const array = await collectionProducts.find({}).limit(limit).toArray();
      if (array.length > 0) {
        res.status(201).send({ stat: "ok", arr: array });
        return;
      }
      res.status(201).send({ stat: null, message: "Nu Exista Produse" });
      return;
    }
    res.status(500).send({ stat: null, message: "Nu A Fost Descrisa Limita" });
    return;
  } catch (error) {
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
    console.log("error:", error);
  }
});

//productsByCategory

router.get("/productsByCategory/:category", async function (req, res) {
  try {
    if (req.params.category) {
      const category = req.params.category;
      const collectionProducts = req.app.locals.collectionProducts;
      const product = await collectionProducts.find({}).toArray();
      if (product && product.length > 0) {
        const filtred = product.filter((el) => {
          if (el.type === category) {
            return el;
          }
        });
        console.log(filtred);
        res.status(201).send({ stat: "ok", arr: filtred });
        return;
      }
      res.status(201).send({ stat: "ok", message: "Nu sunt Produse" });
      return;
    }
    res.status(201).send({ stat: "ok", message: "Nu A Fost Descris Id " });
    return;
  } catch (error) {
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
    console.log(error, error);
  }
});

router.get("/productsSerch/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (req.params.id) {
      const collectionProducts = req.app.locals.collectionProducts;
      const product = await collectionProducts.find({}).toArray();
      const filtred = product.filter((country) => {
        return country.name.toLowerCase().includes(id.toLowerCase());
      });
      res.status(201).send({ stat: "ok", arr: filtred });
      return;
    }
    res.status(500).send({ stat: null, message: "Nu A Fost Descris Id " });
    return;
  } catch (error) {
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
    console.log(error, error);
  }
});

router.get("/product/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const collectionProducts = req.app.locals.collectionProducts;
      const product = await collectionProducts.find({ _id: id }).toArray();
      if (!product[0]) {
        res.status(201).send({ stat: null, message: "Nu Exista Asa Producte" });
        return;
      }
      req.app.locals.product = product;
      res.status(201).send({ stat: "ok", arr: product });
      return;
    }
    res.status(500).send({ stat: null, message: "Nu A Fost Descris Id " });
    return;
  } catch (error) {
    console.log("error:", error);

    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
  }
});

router.get("/threeProducts", async function (req, res) {
  try {
    const collectionProducts = req.app.locals.collectionProducts;
    const product = req.app.locals.product;
    const type = product[0].type;
    if (type) {
      const threeProducts = await collectionProducts
        .find({ type: type })
        .limit(3)
        .toArray();
      res.status(201).send({ stat: "ok", arr: threeProducts });
      return;
    }
    res.status(500).send({ stat: null, message: "Nu Exista Asa Type" });
    return;
  } catch (error) {
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
    console.log("error:", error);
  }
});

router.post("/product", async function (req, res) {
  try {
    if (req.body) {
      const collectionProducts = req.app.locals.collectionProducts;
      const result = await collectionProducts.insertOne(req.body);
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send({ stat: "ok", message: "The Product Added" });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Datele Nu Au Putut fi Adugate " });
    }
    res
      .status(500)
      .send({ stat: null, message: "Datele Nu Au Ajuns La Server " });
  } catch (error) {
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
    console.log("error: ", error);
  }
});

router.put("/products/:id", async function (req, res) {
  try {
    if (req.params.id && req.body) {
      const collectionProducts = req.app.locals.collectionProducts;
      const result = await collectionProducts.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      );
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send({ stat: "ok", message: "The Product Changed" });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Datele Nu Au Putut fi Schimbate" });
      return;
    }
    res.status(500).send({
      stat: null,
      message: "Datele Nu Au Ajuns La Server Sau Nu Exista Asa Id ",
    });
    return;
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });
  }
});

router.delete("/products/:id", async function (req, res) {
  try {
    if (req.params.id) {
      const collectionProducts = req.app.locals.collectionProducts;
      const result = await collectionProducts.findOneAndDelete({
        _id: req.params.id,
      });
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send({ stat: "ok", message: "The Product Changed" });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Datele Nu Au Putut Fi Sterse" });
      return;
    }
    res.status(500).send({
      stat: null,
      message: "Datele Nu Au Ajuns La Server Sau Nu Exista Asa Id ",
    });
    return;
  } catch (error) {
    console.log("error: ", error);
  }
});

router.get("/productsLatest", async function (req, res) {
  try {
    const collectionProducts = req.app.locals.collectionProducts;
    if (collectionProducts) {
      const result = await collectionProducts.find({}).toArray();
      if (result) {
        if (result.length > 0) {
          const arr = result.sort((a, b) => {
            const data1 = Number(a.data);
            const data2 = Number(b.data);
            if (data1 < data2) {
              return 1;
            }
            if (data1 > data2) {
              return -1;
            }
            return 0;
          });
          const array = arr.slice(0, 3);
          res.status(201).send({ stat: "ok", arr: array });
          return;
        }
        res
          .status(201)
          .send({ stat: "ok", message: "Nu Exista Produse In Baza De Date" });
        return;
      }
      res.status(500).send({
        stat: null,
        message: "Nu Au Putut Sa Se Extraga Datele Din Baza De Date",
      });
      return;
    }
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme La Server Reveniti Mai Tirziu",
    });
    return;
  } catch (error) {
    res.status(500).send("some problems with server 500");

    console.log("error:", error);
  }
});

router.get("/topFiveProducts", async function (req, res) {
  try {
    const collectionProducts = req.app.locals.collectionProducts;
    if (collectionProducts) {
      const result = await collectionProducts.find({}).toArray();
      if (result) {
        if (result.length > 0) {
          const arr = result.sort((a, b) => {
            const data1 = Number(a.views);
            const data2 = Number(b.views);
            if (data1 < data2) {
              return 1;
            }
            if (data1 > data2) {
              return -1;
            }
            return 0;
          });
          const array = arr.slice(0, 5);
          res.status(201).send({ stat: "ok", arr: array });
          return;
        }
        res
          .status(201)
          .send({ stat: "ok", message: "Nu Exista Produse In Baza De Date" });
        return;
      }
      res.status(500).send({
        stat: null,
        message: "Nu Au Putut Sa Se Extraga Datele Din Baza De Date",
      });
      return;
    }
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme La Server, Reveniti Mai Tirziu",
    });
    return;
  } catch (error) {
    res.status(500).send("some problems with server 500");
    console.log("error:", error);
  }
});
//recommendedProducts

//categorys
router.get("/categorys", async function (req, res) {
  try {
    const collectionCategorys = req.app.locals.collectionCategorys;
    const result = await collectionCategorys.find({}).toArray();
    if (result) {
      res.status(200).send({ stat: "ok", arr: result });
      return;
    }
    res
      .status(500)
      .send({ stat: null, message: "Ceva Probleme Cu Baza De Date" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Eroare Categorys get" });
  }
});

router.get("/categorysIds", async function (req, res) {
  try {
    const collectionCategorys = req.app.locals.collectionCategorys;
    const result = await collectionCategorys.find({}).toArray();
    if (result && result.length > 0) {
      const arr = [];
      result.forEach((el) => {
        console.log();
        arr.push({ _id: el._id });
      });
      res.status(200).send({ stat: "ok", arr: arr });
      return;
    }
    res
      .status(500)
      .send({ stat: null, message: "Ceva Probleme Cu Baza De Date" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Eroare Categorys get" });
  }
});
//oneCategory

router.get("/category/:id", async function (req, res) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const collectionCategorys = req.app.locals.collectionCategorys;
      const result = await collectionCategorys.find({ _id: id }).toArray();
      console.log(result);
      if (result) {
        res.status(200).send({ stat: "ok", arr: result });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Ceva Probleme Cu Baza De Date" });
      return;
    }
    res.status(500).send({ stat: null, message: "Nu Exista Asa ID Ca Acesta" });
    return;
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Eroare Categorys get" });
  }
});

router.post("/categorys", async function (req, res) {
  try {
    if (req.body) {
      const collectionCategorys = req.app.locals.collectionCategorys;
      const result = await collectionCategorys.insertOne(req.body);
      if (result) {
        res
          .status(200)
          .send({ stat: "ok", message: "Categoria A Fost Adaugata " });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Ceva Probleme Cu Baza De Date" });
      return;
    }
    res
      .status(500)
      .send({ stat: null, message: "Datele Nu au Fost Transmise La Server" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Eroare Categorys post" });
  }
});

router.put("/categorys/:id", async function (req, res) {
  try {
    if (req.body && req.params.id) {
      const collectionCategorys = req.app.locals.collectionCategorys;
      const id = req.params.id;
      const result = await collectionCategorys.findOneAndUpdate(
        { _id: id },
        { $set: { name: req.body.name } }
      );
      if (result) {
        res
          .status(200)
          .send({ stat: "ok", message: "Categoria A Fost Acutualizata " });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Ceva Probleme Cu Baza De Date" });
      return;
    }
    res
      .status(500)
      .send({ stat: null, message: "Datele Nu au Fost Transmise La Server" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Eroare Categorys put" });
  }
});

router.delete("/categorys/:id", async function (req, res) {
  try {
    if (req.body && req.params.id) {
      const collectionCategorys = req.app.locals.collectionCategorys;
      const id = req.params.id;
      const result = await collectionCategorys.findOneAndDelete({ _id: id });
      if (result) {
        res
          .status(200)
          .send({ stat: "ok", message: "Categoria A Fost Stearsa" });
        return;
      }
      res
        .status(500)
        .send({ stat: null, message: "Ceva Probleme Cu Baza De Date" });
      return;
    }
    res
      .status(500)
      .send({ stat: null, message: "Datele Nu au Fost Transmise La Server" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ stat: null, message: "Eroare Categorys delete" });
  }
});

router.get("/productsId", async function (req, res) {
  try {
    const collectionProducts = req.app.locals.collectionProducts;
    const result = await collectionProducts.find({}).toArray();
    let arr = [];
    result.forEach((el) => {
      arr.push(el._id);
    });
    res.status(200).send({ stat: "ok", arr: arr });
  } catch (error) {
    res.status(500).send({
      stat: null,
      message: "Ceva Probleme Cu Serverul Incercati Mai Tirziu",
    });

    console.log("error: ", error);
  }
});

//About us I
//About us text
router.post("/about", async function (req, res) {
  try {
    const collectionAboutUs = req.app.locals.collectionAboutUs;
    if (req.body) {
      const result = await collectionAboutUs.insertOne(req.body);
    }
    res.status(201).send("the text posted");
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", async function (req, res) {
  try {
    const collectionAboutUs = req.app.locals.collectionAboutUs;
    const result = await collectionAboutUs.find({}).toArray();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/about/:id", async function (req, res) {
  try {
    const collectionAboutUs = req.app.locals.collectionAboutUs;
    if (req.body) {
      const result = await collectionAboutUs.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      );
      res.status(201).send("the text posted");
      return;
    }
    res.status(300).send("the body is empty");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/about/:id", async function (req, res) {
  try {
    const collectionAboutUs = req.app.locals.collectionAboutUs;
    const result = await collectionAboutUs.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/imagesNews",
  uploadNews.single("imageNews"),
  async function (req, res) {
    try {
      res.status(201).send("ok");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/imagesNews", async function (req, res) {
  try {
    const array = [];
    await fs.readdirSync(__dirname + "\\images\\news").forEach((el) => {
      array.push(el);
    });
    res.send(array);
  } catch (error) {
    console.log("error: ", error);
  }
});
router.delete("/imagesNews/:id", async function (req, res) {
  try {
    await fs.unlinkSync(__dirname + "\\images\\news\\" + `${req.params.id}`);
    res.status(201).send("the file was deleted succesful");
  } catch (error) {
    console.log(error);
  }
});

//News

router.post("/news", async function (req, res) {
  try {
    const collectionNews = req.app.locals.collectionNews;
    if (req.body) {
      await collectionNews.insertOne(req.body);
      res.status(200).send("News Added");
      return;
    }
    res.status(300).send("The body is empty");
    return;
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Ooops Some Problem with server");
  }
});

router.get("/news", async function (req, res) {
  try {
    const collectionNews = req.app.locals.collectionNews;
    const result = await collectionNews.find({}).toArray();
    res.status(201).send(result);
  } catch (error) {
    console.log(error, error);
    res.status(500).send("Ooops Some Problem with server");
  }
});

router.get("/news/:id", async function (req, res) {
  try {
    const collectionNews = req.app.locals.collectionNews;
    const id = req.params.id;
    const result = await collectionNews.find({ _id: id }).toArray();
    res.status(201).send(result);
  } catch (error) {
    console.log(error, error);
    res.status(500).send("Ooops Some Problem with server");
  }
});

router.put("/news/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const collectionNews = req.app.locals.collectionNews;
    if (req.body && id) {
      const result = await collectionNews.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: req.body }
      );
      res.status(201).send(result, "News Changed");
      return;
    }
    res.status(300).send("The body is empty");
  } catch (error) {
    console.log("error: ", error);
  }
});

router.delete("/news/:id", async function (req, res) {
  try {
    const collectionNews = req.app.locals.collectionNews;
    const id = req.params.id;
    const result = await collectionNews.findOneAndDelete({ _id: ObjectId(id) });
    res.status(201).send("New was Deleted");
  } catch (error) {
    console.log(error, error);
    res.status(500).send("Ooops Some Problem with server");
  }
});

router.get("/productsByCategorys/:id/:limit", async function (req, res) {
  try {
    const collectionProducts = req.app.locals.collectionProducts;
    const id = req.params.id;
    const limit = Number(req.params.limit);
    const result = await collectionProducts
      .find({ type: id })
      .limit(limit)
      .toArray();
    res.status(201).send(result);
  } catch (error) {
    console.log("error:", error);
  }
});

router.get("/passwordLogin", async function (req, res) {
  try {
    const collectionPassword = req.app.locals.collectionPassword;
    const result = await collectionPassword.find().toArray();
    if (result) {
      res.status(201).send({ stat: "ok", arr: result });
      return;
    }
    res
      .status(500)
      .send({ stat: null, arr: "Some Problems With Server Please Try Later" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({
      stat: null,
      message: "Some Problems With Server Please Try Later",
    });
  }
});

router.get("/passwordAdmin", async function (req, res) {
  try {
    const collectionPasswordAdmin = req.app.locals.collectionPasswordAdmin;
    const result = await collectionPasswordAdmin.find({}).limit(1).toArray();
    if (result) {
      res.status(201).send({ stat: "ok", arr: result });
      return;
    }
    res
      .status(500)
      .send({ stat: null, arr: "Some Problems With Server Please Try Later" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({
      stat: null,
      message: "Some Problems With Server Please Try Later",
    });
  }
});
// passwordLogin
export default router;
