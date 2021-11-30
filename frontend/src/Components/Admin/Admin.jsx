import Navbar from "../../UI/Header/Header";
import "./../../App.css";
import { useStyles } from "./style/AdminStyle";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  deleteAboutPhoto,
  deleteAboutText,
  deleteCategorys,
  deleteImageCategorys,
  deleteImageNews,
  deletePhotoProducts,
  deleteProduct,
  getAboutArrImages,
  getArrImagesCategorys,
  getArrImagesNews,
  getArrPhotoProducts,
  getCategorys,
  getIdAboutText,
  getIdProducts,
  getNews,
  getOneNew,
  getPasswordLogin,
  postAboutImage,
  postAboutText,
  postCategorys,
  postImageCategorys,
  postImageNews,
  postNews,
  postPhotoProducts,
  postProduct,
  putAboutText,
  putCategorys,
  putNews,
  putProduct,
} from "../../services/AdminServices";
import { getProduct } from "../../services/ProductServices";
import { useHistory } from "react-router";
import { loginBool } from "../../GlobalVar/LoginBool";
import { loginPassword } from "../../GlobalVar/LoginPassword";
import { adminBool } from "../../GlobalVar/AdminBool";

const AdminComponent = () => {
  function redirect(param) {
    history.push(param);
  }

  const classes = useStyles();

  const refFormProducts = useRef();
  const refMethodProducts = useRef();
  const refImageProducts = useRef();
  const refMethodImageProduct = useRef();
  const refIdImageProducts = useRef();
  const refCategorysMethod = useRef();
  const refIdCategory = useRef();
  const refNameCategory = useRef();
  const refCategorysSelect = useRef();
  const refCategoryProduct = useRef();
  const refImagePath = useRef();
  const refSelectProductId = useRef();
  const refAboutImage = useRef();
  const refIdTextAbout = useRef();
  const refAboutText = useRef();
  const refAboutId = useRef();
  const refNewsImage = useRef();
  const refMethodImageNews = useRef();
  const refIdImageNews = useRef();
  const refFormNews = useRef();
  const refCategoryAbout = useRef();
  const refMethodCategorysPhoto = useRef();
  const refFileCategorys = useRef();
  const refSelectCategoryPhoto = useRef();
  const refCategoryPhoto = useRef();

  const inputsFormNewsJSX = (
    <>
      <input type="text" placeholder="text" />
      <br />
      <input type="text" placeholder="content" />
      <br />
      <input type="date" />
      <br />
      <br />
    </>
  );
  const selectImageFormNewsJSX = (
    <>
      <select name="selectImage">
        <option hidden>Id Image</option>
      </select>
      <br />
    </>
  );
  const inputIdFormNewsJSX = <input type="text" placeholder="id text" />;
  const selectIdNewsImageJSX = (
    <select ref={refIdImageNews} name="selectImage">
      <option hidden defaultValue>
        Id
      </option>
    </select>
  );
  const inputImageNewsJSX = (
    <>
      <input ref={refNewsImage} type="file" name="imageNews" accept="image/*" />{" "}
      <br />
      <br />
    </>
  );

  // const formProductsJSX = <><form ref={refFormProducts}>
  //     {idInputProducts}
  //     <input type="text" name="name" placeholder="text" /> <br />
  //     <input type="text" name="content" placeholder="continut" /><br />
  //     <input type="text" name="link" placeholder="link" /><br />
  //     <select name="categoryProduct" ref={refCategoryProduct}>
  //         <option hidden>Categorys</option>
  //         {arrCategorysProduct}
  //     </select><br />
  //     <select name="imagesPath" ref={refImagePath}>
  //         <option hidden>Image Path</option>
  //         {arrImagePath}
  //     </select><br />
  //     <select name="inStock">
  //         <option value="true">true</option>
  //         <option value="false">false</option>
  //     </select><label >In stock </label><br /><br />
  //     <button onClick={sendDataHandler}>Add/Delete/Put</button>
  // </form><hr /></>

  const [isPutOrDelete, setIsPutOrDelete] = useState(
    <>
      <input ref={refIdCategory} type="text" placeholder="id text" />
    </>
  );
  const [selectIdImageProducts, setSelectIdImageProducts] = useState(<></>);
  const [arrCategorysProduct, setArrCategorysProduct] = useState([]);
  const [optionsCategoryAbout, setOptionsCategoryAbout] = useState([]);
  const [nameInputCategorys, setNameInputCategorys] = useState([]);
  const [idInputProducts, setIdInputProducts] = useState();
  const [arrImagePath, setArrImagePath] = useState([]);
  const [imageAbout, setImageAbout] = useState(null);
  const [methodImageAbout, setMethodImageAbout] = useState(null);
  const [jsxFormImagesAbout, setJsxFormImagesAbout] = useState("");
  const [selectImageName, setSelectImageName] = useState("");
  const [formAboutImages, setFormAboutImages] = useState(
    <form encType="multipart/form-data">
      <input
        type="file"
        ref={refAboutImage}
        name="aboutImage"
        accept="image/*"
      />{" "}
      <br />
      <br />
    </form>
  );
  const [idInputSelect, setIdInputSelect] = useState(
    <input ref={refIdTextAbout} type="text" placeholder="id text" />
  );
  const [inputContentTextAbout, setInputContentTextAbout] = useState(
    <>
      <input ref={refAboutText} type="text" placeholder="content" />
      <br />
      <br />
    </>
  );
  const [methodAboutText, setMethodAboutText] = useState("");
  const [inputImageNews, setInputImageNews] = useState(inputImageNewsJSX);
  const [selectIdImageNews, setSelectIdImageNews] = useState("");
  const [inputCategorysPhoto, setInputCategorysPhoto] = useState(
    <>
      <input
        ref={refFileCategorys}
        type="file"
        name="myImage"
        accept="image/*"
      />{" "}
      <br />
      <br />
    </>
  );
  const [selectFormNews, setSelectFormNews] = useState("");
  const [inputIdFormNews, setInputIdFormNews] = useState("");
  const [selectImageFormNews, setSelectImageFormNews] = useState("");
  const [inputsFormNews, setInputsFormNews] = useState("");
  const [methods, setMethods] = useState({ methodNews: "" });
  const [formNews, setFormNews] = useState();
  const [data, setData] = useState({
    idImage: "",
    text: "",
    content: "",
    day: "",
  });
  const [formProducts, setFormProducts] = useState(<></>);
  const history = useHistory();
  const [display, setDisplay] = useState("displayNone");

  async function changeMethodPhotoProducts() {
    try {
      const val =
        refMethodImageProduct.current.options[
          refMethodImageProduct.current.selectedIndex
        ].value;

      if (val) {
        if (val === "delete") {
          const result = await getArrPhotoProducts();
          if (result !== null) {
            const arr = [];
            result.forEach((el, i) => {
              const option = (
                <option key={i} value={el}>
                  {el}
                </option>
              );
              arr.push(option);
            });
            setSelectIdImageProducts(
              <>
                <select ref={refIdImageProducts}>{arr}</select>
                <br />
                <br />
              </>
            );
            return;
          }
          return alert("Ne Cerem Scuze\nNu Putem Sa Luam Datele Din Server ");
        }
        if (val === "post") {
          setSelectIdImageProducts(
            <>
              <input
                ref={refImageProducts}
                type="file"
                name="myImage"
                accept="image/*"
              />
              <br />
              <br />
            </>
          );
          return;
        }
        alert("Nu Exista Asa Metode");
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function clickImageProducts(e) {
    e.preventDefault();
    try {
      const val =
        refMethodImageProduct.current.options[
          refMethodImageProduct.current.selectedIndex
        ].value;
      if (val) {
        if (val == "post") {
          if (refImageProducts.current.files.length > 0) {
            const image = refImageProducts.current.files[0];
            const result = await postPhotoProducts(image);
            if (result !== null) {
              alert("Imagine A fost adaugata");
              return;
            }
            return;
          }
          alert("Nu Ati Ales Nici O Fotografie");
          return;
        }
        if (val == "delete") {
          const result = await getArrPhotoProducts();
          const id =
            refIdImageProducts.current.options[
              refIdImageProducts.current.selectedIndex
            ].value;
          if (id) {
            if (result !== null) {
              const bool = result.includes(refIdImageProducts.current.value);
              if (bool) {
                const deleteResult = await deletePhotoProducts(id);
                if (deleteResult !== null) {
                  const resultArr = await getArrPhotoProducts();
                  if (resultArr !== null) {
                    const arr = [];
                    resultArr.forEach((el, i) => {
                      const option = (
                        <option key={i} value={el}>
                          {el}
                        </option>
                      );
                      arr.push(option);
                    });
                    setSelectIdImageProducts(
                      <>
                        <select ref={refIdImageProducts}>{arr}</select>
                        <br />
                        <br />
                      </>
                    );
                  }
                  alert("Imaginea A Fost Stearsa");
                  return;
                }
                alert(
                  "Imaginea Nu Putut Fi Stearsa \n Dati Refresh La Pagina Si Incercati Din Nou "
                );
                return;
              }
              alert("Nu Exista Asa Id");
              return;
            }
            alert(
              "Ceva Probleme Cu Serverul Nu Sa Putut Sa Se Face Conexiunea Cu El "
            );
            return;
          }
          alert("Ceva Probleme Cu Id-ul\nDati Refresh La Pagina");
          return;
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function changeMethodImageAbout(e) {
    try {
      const val = e.target.value;
      setMethodImageAbout(val);
      if (val === "post") {
        setJsxFormImagesAbout(
          <form encType="multipart/form-data">
            <input
              type="file"
              ref={refAboutImage}
              name="aboutImage"
              accept="image/*"
            />
            <br />
            <br />
          </form>
        );
        return;
      }
      if (val === "delete") {
        const arr = [];
        const result = await getAboutArrImages();
        if (result == null) {
          setJsxFormImagesAbout("");
          return alert("Nu Sunt Imagini De Sters");
        }
        result.forEach((el, i) => {
          arr.push(
            <option value={el} key={i}>
              {el}
            </option>
          );
        });
        setJsxFormImagesAbout(
          <>
            <select onChange={(e) => setSelectImageName(e.target.value)}>
              <option hidden>Photos</option>
              {arr}
            </select>
            <br />
            <br />
          </>
        );
        return;
      }
      return alert("Nu sunt asa Metode");
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function imageAboutClickHandler(e) {
    e.preventDefault();
    try {
      console.log(methodImageAbout);
      if (methodImageAbout === "post") {
        if (refAboutImage.current.files.length == 0) {
          setJsxFormImagesAbout("");
          return alert("you do not choose an image");
        }
        const image = refAboutImage.current.files[0];
        const result = await postAboutImage(image);
        if (result !== null) {
          return alert("Imaginea A fost Adaugata");
        }
        return alert("Imagine Nu A Fost Adaugata Va Rog Incercati Mai Tirziu");
      }
      if (methodImageAbout === "delete") {
        const resultArray = await getAboutArrImages();
        if (resultArray == null) {
          return alert("Sunt Ceve Probleme Cu Serverul");
        }
        const bool = resultArray.some((el) => el === selectImageName);
        if (bool) {
          const result = await deleteAboutPhoto(selectImageName);
          if (result !== null) {
            setJsxFormImagesAbout(
              <>
                <select onChange={(e) => setSelectImageName(e.target.value)}>
                  <option hidden>Photos</option>
                </select>{" "}
                <br />
                <br />
              </>
            );
            alert("Imaginea A Fost Stearsa");
            return;
          }
          return alert("Ceva Probleme Cu Serverul");
        }
        return alert("Nu Sunt Asa Imagini In Server");
      }
      return alert("Nu exista asa metode ca acestea");
    } catch (error) {
      console.log("error: ", error);
    }
  }

  //Facut
  async function changeIdProduct() {
    const val =
      refMethodProducts.current.options[refMethodProducts.current.selectedIndex]
        .value;
    if (val === "put") {
      const id =
        refSelectProductId.current.options[
          refSelectProductId.current.selectedIndex
        ].value;
      const product = await getProduct(id);
      const bool = product[0].some((el) => el._id === id);
      const obj = product[0][0];
      if (bool) {
        refFormProducts.current.name.value = obj.name;
        refFormProducts.current.content.value = obj.content;
        refFormProducts.current.link.value = obj.link;
        refCategoryProduct.current.value = obj.type;
        refImagePath.current.value = obj.fotoPath;
        refFormProducts.current.inStock.options[
          refFormProducts.current.inStock.selectedIndex
        ].value = obj.inStock;
        return;
      }
      alert("Nu Sunt Asa Id Ca Acesta");
      return;
    }
    alert("Puteti sa folositi aceasta metoda numai cind folositi put");
    return;
  }
  async function changeMethodProduct() {
    const method =
      refMethodProducts.current.options[refMethodProducts.current.selectedIndex]
        .value;
    if (method === "put") {
      const arrId = await getIdProducts();
      let arr = [];
      arrId.forEach((el, i) => {
        arr.push(
          <option key={i} value={el}>
            {el}
          </option>
        );
      });
      setFormProducts(
        <>
          <form ref={refFormProducts}>
            <select ref={refSelectProductId} onChange={changeIdProduct}>
              <option hidden>ID </option>
              {arr}
            </select>
            <br />
            <br />
            <input type="text" name="name" placeholder="text" /> <br />
            <input type="text" name="content" placeholder="continut" />
            <br />
            <input type="text" name="link" placeholder="link" />
            <br />
            <select name="categoryProduct" ref={refCategoryProduct}>
              <option hidden>Categorys</option>
              {arrCategorysProduct}
            </select>
            <br />
            <select name="imagesPath" ref={refImagePath}>
              <option hidden>Image Path</option>
              {arrImagePath}
            </select>
            <br />
            <select name="inStock">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <label>In stock </label>
            <br />
            <br />
            <button onClick={sendDataHandler}>Add/Delete/Put</button>
          </form>
          <hr />
        </>
      );
    }
    if (method === "post") {
      setFormProducts(
        <>
          <form ref={refFormProducts}>
            <>
              <input type="text" name="id" placeholder="id text" />
              <br />
              <br />
            </>
            <input type="text" name="name" placeholder="text" /> <br />
            <input type="text" name="content" placeholder="continut" />
            <br />
            <input type="text" name="link" placeholder="link" />
            <br />
            <select name="categoryProduct" ref={refCategoryProduct}>
              <option hidden>Categorys</option>
              {arrCategorysProduct}
            </select>
            <br />
            <select name="imagesPath" ref={refImagePath}>
              <option hidden>Image Path</option>
              {arrImagePath}
            </select>
            <br />
            <select name="inStock">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <label>In stock </label>
            <br />
            <br />
            <button onClick={sendDataHandler}>Add/Delete/Put</button>
          </form>
          <hr />
        </>
      );
    }
    if (method === "delete") {
      const result = await getIdProducts();
      if (result !== null) {
        const arr = [];
        result.forEach((el, i) => {
          arr.push(
            <option key={i} value={el}>
              {el}
            </option>
          );
        });
        setFormProducts(
          <>
            <form ref={refFormProducts}>
              <select>
                <option hidden>Id</option>
                {arr}
              </select>
              <br />
              <br />
              <button onClick={sendDataHandler}>Add/Delete/Put</button>
            </form>
            <hr />
          </>
        );
        return;
      }
      alert("Ceva Probleme Cu Serverul ");
      return;
    }
  }

  async function sendDataHandler(e) {
    e.preventDefault();
    try {
      const method =
        refMethodProducts.current.options[
          refMethodProducts.current.selectedIndex
        ].value;
      const product = {};
      const confirm = window.confirm("A you sure ?");
      let dt = new Date();
      dt = dt.getFullYear() + "" + (dt.getMonth() + 1) + dt.getDate();
      if (confirm) {
        if (method === "post") {
          product.name = refFormProducts.current.name.value;
          product.content = refFormProducts.current.content.value;
          product.link = refFormProducts.current.link.value;
          product.type =
            refCategoryProduct.current.options[
              refCategoryProduct.current.selectedIndex
            ].value;
          product.fotoPath =
            refImagePath.current.options[
              refImagePath.current.selectedIndex
            ].value;
          product.inStock =
            refFormProducts.current.inStock.options[
              refFormProducts.current.inStock.selectedIndex
            ].value;
          product.data = Number(dt);
          product._id = refFormProducts.current.id.value;
          product.views = 0;
          const resultPost = await postProduct(product);
          if (resultPost !== null) {
            return alert("Produsul A Fost Adaugat");
          }
          return alert("Produsul Nu A Putut Sa Fie Adaugat");
        }
        if (method === "put" || method === "delete") {
          product._id =
            refSelectProductId.current.options[
              refSelectProductId.current.selectedIndex
            ].value;
          const id = product._id;
          const result = await getIdProducts();
          if (result !== null) {
            const bool = result.some((el) => el === id);
            if (bool) {
              const resultProduct = await getProduct(id);
              if (resultProduct == null) {
                alert("NU exista Asa Produse");

                return;
              }
              if (method === "put") {
                product.name = refFormProducts.current.name.value;
                product.content = refFormProducts.current.content.value;
                product.link = refFormProducts.current.link.value;
                product.type =
                  refCategoryProduct.current.options[
                    refCategoryProduct.current.selectedIndex
                  ].value;
                product.fotoPath =
                  refImagePath.current.options[
                    refImagePath.current.selectedIndex
                  ].value;
                product.inStock =
                  refFormProducts.current.inStock.options[
                    refFormProducts.current.inStock.selectedIndex
                  ].value;
                product.data = Number(dt);
                // product.views = result
                await putProduct(product, product._id);
              }
              if (method === "delete") {
                product._id =
                  refSelectProductId.current.options[
                    refSelectProductId.current.selectedIndex
                  ].value;
                const resultDelete = await deleteProduct(product._id);
                const result = await getIdProducts();

                if (result !== null) {
                  const arr = [];
                  result.forEach((el, i) => {
                    arr.push(
                      <option key={i} value={el}>
                        {el}
                      </option>
                    );
                  });
                  setFormProducts(
                    <>
                      <form ref={refFormProducts}>
                        <select>
                          <option hidden>Id</option>
                          {arr}
                        </select>
                        <br />
                        <br />
                        <button onClick={sendDataHandler}>
                          Add/Delete/Put
                        </button>
                      </form>
                      <hr />
                    </>
                  );
                  if (resultDelete !== null) {
                    alert("Produsul A fost Adaugat");
                    return;
                  }
                  alert("Imaginea Nu A Putut Sa Fie Stearsa");
                  return;
                }
                alert(
                  "Ceva Probleme Cu Serverul Imaginea Nu A Putut Sa Fie Stearsa"
                );
                return;
              }
              alert("Nu Exista Asa Metode");
              return;
            }
            alert("NU exista Asa Produse");
            return;
          }
          alert("Nu Sa Putut Sa Optinem Datele De La Server");
        }
        alert("Nu Exista Asa Metode");
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function clickCategorys() {
    const val =
      refCategorysMethod.current.options[
        refCategorysMethod.current.selectedIndex
      ].value;
    if (val == "post") {
      const id = refIdCategory.current.value;
      const name = refNameCategory.current.value;
      const content = refCategoryAbout.current.value;
      const photoId =
        refCategoryPhoto.current.options[refCategoryPhoto.current.selectedIndex]
          .value;
      if (id.length === 0 && name.length === 0 && content.length === 0) {
        return alert("You must put an id in the input");
      }
      await postCategorys({ _id: id, name, content, photoId });
    }
    if (val == "put") {
      const name = refNameCategory.current.value;
      const content = refCategoryAbout.current.value;
      const photoId =
        refCategoryPhoto.current.options[refCategoryPhoto.current.selectedIndex]
          .value;
      const idSelect =
        refCategorysSelect.current.options[
          refCategorysSelect.current.selectedIndex
        ].value;
      await putCategorys({ name, content, photoId }, idSelect);
    }
    if (val == "delete") {
      const idSelect =
        refCategorysSelect.current.options[
          refCategorysSelect.current.selectedIndex
        ].value;
      await deleteCategorys(idSelect);
    }
  }
  async function changeMethodCategorysPhoto() {
    try {
      const val =
        refMethodCategorysPhoto.current.options[
          refMethodCategorysPhoto.current.selectedIndex
        ].value;
      if (val === "delete") {
        const result = await getArrImagesCategorys();
        if (result !== null) {
          // const id =
          let arr = [];
          result.forEach((el, i) => {
            const option = (
              <option key={i} value={el}>
                {el}
              </option>
            );
            arr.push(option);
          });
          setInputCategorysPhoto(
            <>
              <select ref={refSelectCategoryPhoto}>
                <option hidden>Fotografii</option>
                {arr}
              </select>
              <br />
              <br />
            </>
          );
          return;
        }
        alert(
          " Ups anuntati programatorul care e responsabil pentru acesta eroare"
        );
        setInputCategorysPhoto(
          <>Ups anuntati programatorul care e responsabil pentru aces eroare</>
        );
        return;
      }
      if (val === "post") {
        setInputCategorysPhoto(
          <>
            <input
              ref={refFileCategorys}
              type="file"
              name="CategorysPhoto"
              accept="image/*"
            />{" "}
            <br />
            <br />
          </>
        );
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function clickCategorysPhoto(e) {
    e.preventDefault();
    try {
      const val =
        refMethodCategorysPhoto.current.options[
          refMethodCategorysPhoto.current.selectedIndex
        ].value;
      if (val === "delete") {
        const id =
          refSelectCategoryPhoto.current.options[
            refSelectCategoryPhoto.current.selectedIndex
          ].value;
        if (id) {
          const resultGetArr = await getArrImagesCategorys();
          const bool = resultGetArr.some((el) => el === id);
          if (bool) {
            if (resultGetArr !== null) {
              const result = await deleteImageCategorys(id);
              if (result !== null) {
                let arr = [];
                result.forEach((el, i) => {
                  const option = (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  );
                  arr.push(option);
                });
                setInputCategorysPhoto(
                  <>
                    <select ref={refSelectCategoryPhoto}>
                      <option hidden>Fotografii</option>
                      {arr}
                    </select>
                    <br />
                    <br />
                  </>
                );
                return;
              }
              return alert("Ups ceva probleme cu serverul ");
            }
          }
          return alert(
            "Nu ati ales nici un id sau nu sunt asa id sau nu sunt fotografii ca sa stergi"
          );
        }
        return;
      }
      if (val === "post") {
        const file = refFileCategorys.current.files[0];
        if (file) {
          const result = await postImageCategorys(file);
          if (result) alert("Imaginea a fost adaugata");
          return;
        }
        return alert("Nu Ati Ales Nici O Fotografie");
      }
      return alert("Nu Ati Ales Nici O Metoda");
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function changeMethodCategorys() {
    const method =
      refCategorysMethod.current.options[
        refCategorysMethod.current.selectedIndex
      ].value;
    const result = await getArrImagesCategorys();
    if (!result) {
      return;
    }
    let arr = [];
    result.forEach((el, i) => {
      const option = (
        <option key={i} value={el}>
          {el}
        </option>
      );
      arr.push(option);
    });
    setNameInputCategorys(
      <>
        <input ref={refNameCategory} type="text" placeholder="name" />
        <br />
        <input
          ref={refCategoryAbout}
          type="text"
          placeholder="despre categorie"
        />
        <br />
        <select ref={refCategoryPhoto}>
          <option hidden>Fotografie categorie</option>
          {arr}
        </select>
        <br />
        <br />
      </>
    );
    if (method == "put") {
      const arrCategorys = await getCategorys();
      const met = [];
      let name = refNameCategory.current.value;

      arrCategorys.forEach((el, i) => {
        met.push(
          <option key={i} value={el._id}>
            {el._id}
          </option>
        );
      });
      setIsPutOrDelete(<select ref={refCategorysSelect}>{met}</select>);
    }
    if (method == "post") {
      setIsPutOrDelete(
        <input ref={refIdCategory} type="text" placeholder="id text" />
      );
    }
    if (method == "delete") {
      setNameInputCategorys("");
    }
  }

  async function changeMethodAboutText(e) {
    setInputContentTextAbout(
      <>
        <input ref={refAboutText} type="text" placeholder="content" />
        <br />
        <br />
      </>
    );
    const val = e.target.value;
    setMethodAboutText(val);
    if (val === "post") {
      console.log(val);
      setIdInputSelect(
        <input ref={refIdTextAbout} type="text" placeholder="id text" />
      );
      // if (refIdTextAbout.current.value.trim() === "") {
      //     return alert("The input is empty")
      // }
    }
    if (val === "put") {
      const result = await getIdAboutText();
      let arrOptions = [];
      result.forEach((el, i) => {
        arrOptions.push(
          <option value={el._id} key={i}>
            {el._id}
          </option>
        );
      });
      setIdInputSelect(
        <select
          onChange={() => {
            const id =
              refAboutId.current.options[refAboutId.current.selectedIndex]
                .value;
            const obj = result.find((el) => el._id === id);
            refAboutText.current.value = obj.text;
          }}
          ref={refAboutId}
        >
          <option hidden>Id</option>
          {arrOptions}
        </select>
      );
      return;
    }
    if (val === "delete") {
      const result = await getIdAboutText();
      let arrOptions = [];
      result.forEach((el, i) => {
        arrOptions.push(
          <option value={el._id} key={i}>
            {el._id}
          </option>
        );
      });
      setIdInputSelect(
        <select ref={refAboutId}>
          <option hidden>Id</option>
          {arrOptions}
        </select>
      );
      setInputContentTextAbout("");
      return;
    }
    return;
  }
  async function clickAboutTextHandler() {
    try {
      const confirm = window.confirm("A you sure");
      if (confirm) {
        if (methodAboutText === "post") {
          if (
            refIdTextAbout.current.value.trim() === "" ||
            refAboutText.current.value.trim() === ""
          ) {
            alert("Your id or text is empty");
            return;
          }
          const result = await getIdAboutText();
          const id = refIdTextAbout.current.value;
          const bool = result.some((el) => el._id === id);
          console.log(bool, id);
          if (!bool) {
            const obj = {
              _id: id,
              text: refAboutText.current.value,
            };
            await postAboutText(obj);
            return;
          }
          alert("there is already such  id as this");
          return;
        }
        if (methodAboutText === "put") {
          const id =
            refAboutId.current.options[refAboutId.current.selectedIndex].value;
          console.log("ot", id);
          const result = await getIdAboutText();
          const bool = result.some((el) => el._id === id);
          const content = refAboutText.current.value;
          console.log(bool);
          if (bool) {
            if (content.length === 0) {
              alert("You must write some content in input");
              return;
            }
            await putAboutText({ text: content }, id);
            console.log(content, id);
            return;
          }
          alert("there is not such id like this");
          return;
        }
        if (methodAboutText === "delete") {
          const id =
            refAboutId.current.options[refAboutId.current.selectedIndex].value;
          console.log("ot", id);
          const result = await getIdAboutText();
          const bool = result.some((el) => el._id === id);
          if (bool) {
            await deleteAboutText(id);
            const deleteArr = result.filter((el) => el._id !== id);
            let arrOptions = [];
            deleteArr.forEach((el, i) => {
              arrOptions.push(
                <option value={el._id} key={i}>
                  {el._id}
                </option>
              );
            });
            setIdInputSelect(
              <select ref={refAboutId}>
                <option hidden selected>
                  Id
                </option>
                {arrOptions}
              </select>
            );
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  useEffect(() => {
    async function run() {
      const result = await getCategorys();
      const resultPhotoArr = await getArrPhotoProducts();
      let arr = [];
      let arrPhoto = [];
      result.forEach((el, i) => {
        arr.push(
          <option value={el._id} key={i}>
            {el.name}
          </option>
        );
      });
      resultPhotoArr.forEach((el, i) => {
        arrPhoto.push(
          <option value={el} key={i}>
            {el}
          </option>
        );
      });

      setArrImagePath(arrPhoto);
      setArrCategorysProduct(arr);
    }
    run();
  }, []);

  async function changeMethodNewsImageHandler() {
    try {
      const method =
        refMethodImageNews.current.options[
          refMethodImageNews.current.selectedIndex
        ].value;
      if (method === "post") {
        setSelectIdImageNews("");
        setInputImageNews(inputImageNewsJSX);
        return;
      }
      if (method === "delete") {
        setInputImageNews("");
        const result = await getArrImagesNews();
        const arr = [];
        result.forEach((el, i) => {
          arr.push(
            <option value={el} key={i}>
              {el}
            </option>
          );
        });
        setSelectIdImageNews(
          <select ref={refIdImageNews}>
            <option hidden defaultValue>
              Id
            </option>
            {arr}
          </select>
        );
        return;
      }
      return;
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function clickImageNewsHandler(e) {
    e.preventDefault();
    try {
      const method =
        refMethodImageNews.current.options[
          refMethodImageNews.current.selectedIndex
        ].value;
      const confirm = window.confirm("A you sure?");
      if (confirm) {
        if (method === "post") {
          const image = refNewsImage.current.files[0];
          await postImageNews(image);
          return;
        }
        if (method === "delete") {
          const result = await getArrImagesNews();
          if (result && result.length > 0) {
            const id =
              refIdImageNews.current.options[
                refIdImageNews.current.selectedIndex
              ].value;
            const bool = result.some((el) => el === id);
            if (!bool) {
              alert("You have not chosen any id");
              return;
            }
            await deleteImageNews(id);
            const resultDeleted = await getArrImagesNews();
            const arr = [];
            resultDeleted.forEach((el, i) => {
              arr.push(
                <option value={el} key={i}>
                  {el}
                </option>
              );
            });
            setSelectIdImageNews(
              <select>
                <option hidden defaultValue></option>
                {arr}
              </select>
            );
            return;
          }
          alert("there is not photos to delete");
          return;
        }
        alert("You have not chosen any method\nChoose a method");
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function changeMethodNewsHandler(e) {
    const method = e.target.options[e.target.selectedIndex].value;
    setMethods((preState) => {
      return { ...preState, methodNews: method };
    });

    console.log(methods);
    if (method === "post") {
      const arrImages = await getArrImagesNews();
      const arrOptions = [];
      arrImages.forEach((el, i) => {
        arrOptions.push(
          <option value={el} key={i}>
            {el}
          </option>
        );
      });
      setSelectImageFormNews(
        <>
          <select>
            <option hidden>Id Images</option>
            {arrOptions}
          </select>
          <br />
        </>
      );
      setInputIdFormNews(inputIdFormNewsJSX);
      setInputsFormNews(inputsFormNewsJSX);
      setSelectFormNews("");
    }
    if (method === "put") {
      const arrImages = await getArrImagesNews();
      const arrOptions = [];
      arrImages.forEach((el, i) => {
        arrOptions.push(
          <option value={el} key={i}>
            {el}
          </option>
        );
      });
      setSelectImageFormNews(
        <>
          <select>
            <option hidden>Id Images</option>
            {arrOptions}
          </select>
          <br />
        </>
      );
      const result = await getNews();
      setInputIdFormNews("");
      setInputsFormNews(inputsFormNewsJSX);
      if (result) {
        const arrId = [];
        result.forEach((el) => {
          arrId.push(el._id);
        });
        const array = [];
        arrId.forEach((el, i) => {
          array.push(
            <option value={el} key={i}>
              {el}
            </option>
          );
        });
        setSelectFormNews(
          <select>
            <option hidden defaultValue>
              Id
            </option>
            {array}
          </select>
        );
        return;
      }
    }
    if (method === "delete") {
      const result = await getNews();
      console.log(result);
      setInputIdFormNews("");
      setSelectImageFormNews("");
      setInputsFormNews("");
      if (result) {
        const arrId = [];
        result.forEach((el) => {
          arrId.push(el._id);
        });
        const array = [];
        arrId.forEach((el, i) => {
          array.push(
            <option value={el} key={i}>
              {el}
            </option>
          );
        });
        async function clickSelectFormNews(e) {
          const bool = arrId.some((el) => el === e.target.value);
          if (bool) {
            const oneNew = await getOneNew(e.target.value);
            console.log(oneNew);
          }
        }
        setSelectFormNews(
          <select onClick={clickSelectFormNews}>
            <option hidden defaultValue>
              Id
            </option>
            {array}
          </select>
        );
        return;
      }
    }
  }

  async function clickNewsHandler(e) {
    e.preventDefault();
    if (methods.methodNews === "post") {
      const arrImages = await getArrImagesNews();
      const _id = refFormNews.current[0].value;
      if (arrImages && arrImages.length > 0) {
        const idImage = refFormNews.current[2].value;
        const title = refFormNews.current[3].value;
        const content = refFormNews.current[4].value;
        const day = refFormNews.current[5].value;
        const obj = {
          _id,
          idImage,
          title,
          content,
          day,
        };
        console.log(obj);
        await postNews(obj);
        alert("user added");
        return;
      }
      alert("plese first add some photo to news to add a new");
      return;
    }
    if (methods.methodNews === "put") {
      const result = await getNews();
      const arrId = [];
      const _id = refFormNews.current[0].value;
      result.forEach((el) => {
        arrId.push(el._id);
      });
      const bool = arrId.some((el) => el === _id);

      if (bool) {
        const idImage = refFormNews.current[2].value;
        const title = refFormNews.current[3].value;
        const content = refFormNews.current[4].value;
        const day = refFormNews.current[5].value;
        if (
          idImage.length === 0 ||
          title.length === 0 ||
          content.length === 0 ||
          day.length === 0
        ) {
          alert(
            "One of the inputs is empty\nPlese introduce/chose some content to change your new"
          );
          return;
        }
        const obj = {
          _id,
          idImage,
          title,
          content,
          day,
        };
        await putNews(obj, _id);
        return;
      }
      alert("You didn't choose an id");
      return;
    }
    if (methods.methodNews === "delete") {
      return;
    }
    alert("You didn't choose the method");
  }
  useEffect(() => {
    try {
      async function checkBoolAndPassword() {
        setDisplay("");

        const bool = adminBool();
        if (bool) {
          redirect("/home");
          return;
        }
      }
      checkBoolAndPassword();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    try {
      async function renderPhotoCategory() {
        const result = await getArrImagesCategorys();
        if (result !== null) {
        }
        let arr = [];
        result.forEach((el, i) => {
          const option = (
            <option key={i} value={el}>
              {el}
            </option>
          );
          arr.push(option);
        });
        setNameInputCategorys(
          <>
            <input ref={refNameCategory} type="text" placeholder="name" />
            <br />
            <input
              ref={refCategoryAbout}
              type="text"
              placeholder="despre categorie"
            />
            <br />
            <select ref={refCategoryPhoto}>
              <option hidden>Fotografie categorie</option>
              {arr}
            </select>
            <br />
            <br />
          </>
        );
      }
      renderPhotoCategory();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);
  useEffect(() => {
    try {
      setTimeout(() => {
        loginBool();
        redirect("/home");
      }, 120000);
    } catch (error) {
      console.log(error, error);
    }
  }, []);
  return (
    <div className={`${display}`}>
      <Navbar />
      <div className="displayFlex">
        <div className={classes.width}>
          <br />
          <h2>Add New Product Photo</h2>
          <div>Choose Image</div>
          <br />
          <select
            ref={refMethodImageProduct}
            name="imageProduct"
            onChange={changeMethodPhotoProducts}
          >
            <option hidden>Metoda</option>
            <option value="post">Post</option>
            <option value="delete">Delete</option>
          </select>
          <br />
          <br />
          <form encType="multipart/form-data">
            {selectIdImageProducts}
            <button onClick={clickImageProducts}>Add/remove</button>
          </form>
          <hr />
          <h2>Add New Product</h2>
          <br />
          <select
            ref={refMethodProducts}
            name="methodProducts"
            onChange={changeMethodProduct}
          >
            <option hidden>Metoda</option>

            <option value="post">Post</option>
            <option value="delete">Delete</option>
            <option value="put">Put</option>
          </select>
          <br />
          <br />
          {formProducts}
          <h2>Categorys</h2>
          <div>
            <h6>Here you must put an id</h6>
            {isPutOrDelete}
            <select
              name="categorys"
              ref={refCategorysMethod}
              onChange={changeMethodCategorys}
            >
              <option value="post">Post</option>
              <option value="put">Put</option>
              <option value="delete">Delete</option>
            </select>
            <br />
            <br />
            {nameInputCategorys}
            <button onClick={clickCategorys}>Add/Delete/Put</button>
          </div>
          <hr />
          <h2>Categorys Photo</h2>
          <div>
            <select
              onChange={changeMethodCategorysPhoto}
              ref={refMethodCategorysPhoto}
            >
              <option hidden>Metoda</option>

              <option value="post">Post</option>
              <option value="delete">Delete</option>
            </select>
            <br />
            <br />
            <form encType="multipart/form-data">
              {inputCategorysPhoto}
              <button onClick={clickCategorysPhoto}>Add/Delete/Put</button>
            </form>
          </div>
          <hr />
          {/* <h2>About Us Image</h2> */}
          <div>
            <h6>Choose Image</h6>

            <select onChange={changeMethodImageAbout}>
              <option hidden>Method</option>
              <option value="post">Post</option>
              <option value="delete">Delete</option>
            </select>
            <br />
            <br />
            {jsxFormImagesAbout}
            <button onClick={imageAboutClickHandler}>Post/Delete</button>
            <br />
            <br />
            <hr />
            <h2>Text About us</h2>
            {idInputSelect}
            <select onChange={changeMethodAboutText}>
              <option hidden>Methods</option>
              <option value="put">Put</option>
              <option value="delete">Delete</option>
              <option value="post">Post</option>
            </select>
            <br />
            <br />
            {inputContentTextAbout}
            <button onClick={clickAboutTextHandler}>Add/Delete/Put</button>
            <hr />
          </div>
          <div>
            <h2>Image News </h2>
            <br />
            <form encType="multipart/form-data">
              {selectIdImageNews}
              <select
                ref={refMethodImageNews}
                onChange={changeMethodNewsImageHandler}
              >
                <option hidden defaultValue>
                  Method
                </option>
                <option value="post">Post</option>
                <option value="delete">Delete</option>
              </select>
              <br />
              <br />
              {inputImageNews}
              <button onClick={clickImageNewsHandler}>Add/Delete</button>
              <hr />
            </form>
          </div>
          <h2>News</h2>
          <div>Create A New Post</div>
          <br />
          <form ref={refFormNews}>
            {selectFormNews}
            {inputIdFormNews}
            <select onChange={changeMethodNewsHandler}>
              <option hidden>Method</option>
              <option value="put">Put</option>
              <option value="delete">Delete</option>
              <option value="post">Post</option>
            </select>
            <br />
            <br />
            {selectImageFormNews}
            {inputsFormNews}
            <button onClick={clickNewsHandler}>Add/Delete/Put</button>
            <hr />
          </form>
          <h2>Services Images</h2>
          <h6>Choose Image</h6>
          <select name="selectImage">
            <option value="asdasdasd">id_imagine</option>
          </select>
          <select>
            <option value="post">Post</option>
            <option value="delete">Delete</option>
          </select>
          <br />
          <br />
          <input type="file" name="myImage" accept="image/*" /> <br />
          <br />
          <button>Post/Delete</button>
          <br />
          <br />
          <hr />
          <h2>Servises Text</h2>
          <br />
          <h6>Here you must put an id only when you choose put</h6>
          <input type="text" placeholder="id text" />
          <select>
            <option value="put">Put</option>
          </select>
          <br />
          <br />
          <input type="text" placeholder="text" />
          <br />
          <input type="text" placeholder="content" />
          <br />
          <br />
          <button>Add/Delete/Put</button>
          <hr />
          <h2>Brands</h2>
          <select name="selectImage">
            <option value="asdasdasd">id_imagine</option>
          </select>
          <select>
            <option value="delete">Delete</option>
            <option value="post">Post</option>
          </select>
          <br />
          <br />
          <input type="file" name="myImage" accept="image/*" /> <br /> <br />
          <button>Add/Delete/Put</button>
        </div>
        <div>
          <h2>Products</h2>
          div
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
