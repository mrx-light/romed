import Header from "./../../UI/Header/Header";
import Footer from "./../../UI/Footer/Footer";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  getCategorys,
  getIdCategorys,
  getOneCategory,
  getProductsByCategoryWithoutLimit,
  getProductsNumber,
} from "../../services/AdminServices";
import useStyles from "./style/CategoryTypeStyles.js";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg";
import { ReactComponent as GridSVG } from "./../../assets/images/grid.svg";
import { ReactComponent as TopSVG } from "./../../assets/images/star.svg";
import { ReactComponent as HomeSVG } from "./../../assets/images/home.svg";
import { ReactComponent as PLusSVG } from "./../../assets/images/plus.svg";
import { ReactComponent as UpSVG } from "./../../assets/images/up.svg";
import {
  getProductsAdd,
  getProductsByCategory,
} from "./../../services/CategorysServices";
import { Button, Card, CardActions, IconButton } from "@material-ui/core";
import SortBar from "../../UI/SortBar/SortBar";
import "./style/CategoryTypeStyles.css";
import {
  getProductsLimit,
  getTopFiveProducts,
} from "./../../services/ProductServices.js";
import CardProduct from "../../UI/CardProduct/CardProduct";
import PhotoList from "../../UI/PhotoList/PhotoList";

const CategoryType = () => {
  const classes = useStyles();

  const [nameType, setNameType] = useState([]);
  // const [productCard, setProductCard] = useState(null);
  // const [infoProduct, setInfoProduct] = useState({});
  const [categorys, setCategorys] = useState([]);
  // const [latestUpdate, setLatestUpdate] = useState([]);
  const [topFiveProducts, setTopFiveProducts] = useState([]);
  // const [recommendedProducts, setRecommendedProducts] = useState();
  const [photo, setPhoto] = useState(
    <div className={`${classes.photo}`}></div>
  );
  const [productsByCategory, setProductsByCategory] = useState();
  const [productsArr, setProductsArr] = useState([]);
  const [routes, setRoutes] = useState(<></>);
  const [typeName, setTypeName] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(0);
  const [maxDisplayedProducts, setMaxDisplayedProducts] = useState(0);
  const { type } = useParams();
  const history = useHistory();
  const redirect = (param) => {
    if (param) {
      history.push(param);
      return;
    }
    history.push("/");
    return;
  };
  const refSort = useRef();
  const categorysRef = useRef();
  const sortRef = useRef();
  const showNumberRef = useRef();
  const inputSerchRef = useRef();

  const refShowNumber = useRef();

  function clickRedirect(st) {
    history.push(st);
  }

  const style = {
    background: "#e7f6fc",
    color: "#077d82",
    fontWeight: "700",
    fontSize: "18px",
    marginTop: "5px",
    marginBottom: "3px",
  };

  const styleButtonSort = {
    backgroundColor: "white",
    marginLeft: "5px",
    marginRight: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    border: "0px",
    paddingTop: "3px",
    paddingBottom: "4px",
    borderRadius: "5px",
  };

  function photoStyle(imgUrl) {
    return {
      border: "2px solid white",
      width: "250px",
      height: "250px",
      borderRadius: "5px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundColor: "#a8bbbf",
      backgroundPosition: "50% 50%",
      backgroundImage: "url(" + imgUrl + ")",
    };
  }

  const flex = {
    // display: "flex",
    width: "100%",
    height: "180px",
    marginBottom: "10px",
    marginTop: "10px",
  };

  const linkWebsite = (element) => {
    window.open(element, "_blank");
  };

  function redirectToProduct(path) {
    history.push(`/product/${path}`);
  }

  function gridProduct(el, i) {
    return (
      <CardProduct
        clas="servic"
        redirectToProduct={() => redirectToProduct(el._id)}
        buttonHandler={() => linkWebsite(el.link)}
        keys={i}
        alt={el.name}
        title={el.name}
        link={el.name}
        type={el.type}
        imagePath={"http://localhost:2000/image/products/" + el.fotoPath}
        classContent={`${classes.noPadding}`}
      />
    );
  }
  function listProduct(el, i) {
    return (
      <>
        <div className="clearfix" style={flex} key={i}>
          <div className={`listBox clearfix`}>
            <div
              className={`photoListBox floatLeft `}
              style={{
                backgroundImage: `url("http://localhost:2000/image/products/${el.fotoPath}")`,
              }}
            />
            <div className="paddingButtonList  floatLeft">
              <div>
                <span>
                  Denumire: <span className="greenColor font">{el.name}</span>
                </span>
                <br />
                <span>
                  Tipul: <span className="greenColor font">{el.type.length > 22 ? el.type.slice(0, 22) : el.type}</span>
                </span>
                <br />
                <div>
                  <Button style={style}>vedeti produsul</Button>
                  <br />
                  <Button style={style}>vedeti produsul</Button>
                </div>
              </div>
            </div>
            <div className={`content floatLeft`}>
              <span className="greenColor font ">
                <div className="aboutProduse ">
                  <span className="blackColor">Despre produs: </span>{" "}
                  {el.content}
                </div>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
  async function gridListHandler() {
    try {
      const showMethod = localStorage.getItem("products");
      const result = productsArr;
      if (result) {
        const arrGrid = [];
        if (showMethod === "grid") {
          result.forEach((el, i) => {
            const productGrid = gridProduct(el, i);
            arrGrid.push(productGrid);
          });
          setProductsByCategory(arrGrid);
          return;
        }
        if (showMethod === "list") {
          const arrList = [];
          result.forEach((el, i) => {
            const productList = listProduct(el, i);
            arrList.push(productList);
          });
          setProductsByCategory(
            <>
              <span className="marginListTop" />
              {arrList}
            </>
          );
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  //                                                                                                                      sortArray
  function sortArray(arr, name, num1, num2) {
    arr.sort((a, b) => {
      const nameA = a[name].toUpperCase();
      const nameB = b[name].toUpperCase();
      if (nameA < nameB) {
        return num1;
      }
      if (nameA > nameB) {
        return num2;
      }
      return 0;
    });
    return arr;
  }
  async function sortHandler() {
    try {
      const sort = sortRef.current.options[sortRef.current.selectedIndex].value;
      const showNumber =
        showNumberRef.current.options[showNumberRef.current.selectedIndex]
          .value;
      let array = [];
      console.log(showNumber);
      if (showNumber === "12" || showNumber === "24" || showNumber === "48") {
        const limit = Number(showNumber);
        const resultProducts = await getProductsByCategory(type, limit);
        array = resultProducts;
        if (resultProducts !== null) {
          if (sort === "default") {
            const productsMethod = localStorage.getItem("products");
            let product;
            if (productsMethod === "grid") {
              const arrayGrid = [];
              array.forEach((el, i) => {
                product = gridProduct(el, i);
                arrayGrid.push(product);
              });
              setProductsArr(array);
              setProductsByCategory(arrayGrid);
              return;
            }
            if (productsMethod === "list") {
              const arrayList = [];
              array.forEach((el, i) => {
                product = listProduct(el, i);
                arrayList.push(product);
              });
              setProductsArr(array);
              setProductsByCategory(arrayList);
              return;
            }
          }
          if (sort !== "default") {
            if (
              showNumber === "12" ||
              showNumber === "24" ||
              showNumber === "48"
            ) {
              const productsMethod = localStorage.getItem("products");
              let product;
              const newResult = resultProducts;
              if (sort === "A->Z") {
                sortArray(newResult, "name", -1, 1);
              } else if (sort === "Z->A") {
                sortArray(newResult, "name", 1, -1);
              } else if (sort == "A->Z-Model") {
                sortArray(newResult, "type", -1, 1);
              } else if (sort == "Z->A-Model") {
                sortArray(newResult, "type", 1, -1);
              }
              if (productsMethod === "grid") {
                const arrayGrid = [];
                array.forEach((el, i) => {
                  product = gridProduct(el, i);
                  arrayGrid.push(product);
                });
                setProductsArr(array);
                setProductsByCategory(arrayGrid);
                return;
              }
              if (productsMethod === "list") {
                const arrayList = [];
                array.forEach((el, i) => {
                  product = listProduct(el, i);
                  arrayList.push(product);
                });
                setProductsArr(array);
                setProductsByCategory(arrayList);
                return;
              }
            }
          }
        }
      }

      if (showNumber === "12" || showNumber === "24" || showNumber === "48") {
        const limit = Number(showNumber);
        const resultProducts = await getProductsByCategory(categorys, limit);
        if (resultProducts !== null) {
          const productsMethod = localStorage.getItem("products");
          let product;
          array = resultProducts;
          if (sort === "A->Z") {
            sortArray(array, "name", -1, 1);
          } else if (sort === "Z->A") {
            sortArray(array, "name", 1, -1);
          }
          if (productsMethod === "grid") {
            const arrayGrid = [];
            array.forEach((el, i) => {
              product = gridProduct(el, i);
              arrayGrid.push(product);
            });
            setProductsArr(array);
            setProductsByCategory(arrayGrid);
            return;
          }
          if (productsMethod === "list") {
            const arrayList = [];
            array.forEach((el, i) => {
              product = listProduct(el, i);
              arrayList.push(product);
            });
            setProductsArr(array);
            setProductsByCategory(arrayList);
            return;
          }
          return;
        } else {
          alert("some problems with server cod: 500");
        }
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function toTop() {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function addProducts() {
    try {
      const showNumber =
        showNumberRef.current.options[showNumberRef.current.selectedIndex]
          .value;
      const arr = productsArr;
      const arrLenght = productsArr.length;
      const result = await getProductsAdd(arrLenght, showNumber, type);
      if (result !== null) {
        setDisplayedProducts((prevState) => {
          return prevState + result.length;
        });
        result.forEach((el) => {
          arr.push(el);
        });
        const method = localStorage.getItem("products");
        console.log(method);
        if (method === "list") {
          const arrayState = [];
          arr.forEach((el, i) => {
            const product = listProduct(el, i);
            arrayState.push(product);
          });
          setProductsArr(arr);
          setProductsByCategory(arrayState);
          return;
        }
        if (method === "grid") {
          const arrayState = [];
          arr.forEach((el, i) => {
            const product = gridProduct(el, i);
            arrayState.push(product);
          });
          setProductsArr(arr);
          setProductsByCategory(arrayState);
          return;
        }
        return;
      }
      return;
    } catch (error) {
      console.log("error: ", error);
    }
  }
  useEffect(() => {
    try {
      async function checkType() {
        const result = await getIdCategorys();
        if (result !== null) {
          const bool = result.some((el) => el._id === type);
          if (bool) {
            let name;
            result.filter((el, i) => {
              if (el._id === type) {
                name = el.name;
              }
              setNameType(name);
            });
            return;
          }
          return redirect();
        }
      }
      checkType();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    async function renderCategorys() {
      try {
        const result = await getCategorys();
        if (result !== null) {
          const arr = [];
          result.forEach((el, i) => {
            console.log(el._id);
            const product = (
              <div
                className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor cursor`}
                key={el._id}
                onClick={() => window.open(`/categorys/${el._id}`, "_self")}
              >
                {el.name}
              </div>
            );
            arr.push(product);
          });
          setCategorys(arr);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    renderCategorys();
  }, []);

  useEffect(() => {
    async function renderLatest() {
      try {
        const result = await getTopFiveProducts();
        if (result !== null) {
          let arr = [];
          result.forEach((el, i) => {
            const product = (
              <div
                className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor cursor`}
                key={el._id}
                onClick={() => window.open(`/product/${el._id}`, "_self")}
              >
                {el.name.toUpperCase()}
              </div>
            );
            arr.push(product);
          });
          setTopFiveProducts(arr);
          return;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    renderLatest();
  }, []);

  useEffect(() => {
    async function renderCategory() {
      try {
        const result = await getOneCategory(type);
        const resultCount = await getProductsNumber(type);
        console.log(type, "ashd");
        if (result !== null && resultCount !== null) {
          const category = result[0];
          setPhoto(
            <div
              className="photoCategorys"
              style={photoStyle(
                "http://localhost:2000/image/categorys/" + category.photoId
              )}
            ></div>
          );
          setTypeName(category.name);
          const route = (
            <>
              <HomeSVG
                onClick={() => clickRedirect("/")}
                className={`${classes.home} cursor act`}
              />{" "}
              {">"}{" "}
              <span
                onClick={() => clickRedirect("/categorys")}
                className="cursor act"
              >
                Categorys
              </span>{" "}
              {">"}{" "}
              <span
                onClick={() => clickRedirect(`/categorys/${category._id}`)}
                className="cursor act"
              >
                {category.name}
              </span>
            </>
          );
          setMaxDisplayedProducts(resultCount);
          setRoutes(route);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    renderCategory();
  }, []);

  useEffect(() => {
    try {
      async function render() {
        const result = await getProductsByCategory(type, 12);
        localStorage.setItem("products", "grid");

        if (result !== null) {
          let arr = [];
          result.forEach((element, i) => {
            const product = (
              <CardProduct
                clas="servic"
                redirectToProduct={() => redirectToProduct(element._id)}
                buttonHandler={() => linkWebsite(element.link)}
                keys={i}
                alt={element.name}
                title={element.name}
                link={element.name}
                type={element.type}
                imagePath={
                  "http://localhost:2000/image/products/" + element.fotoPath
                }
              />
            );
            arr.push(product);
          });
          setDisplayedProducts(result.length);
          setProductsArr(result);
          setProductsByCategory(arr);
        }
      }
      render();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="backgr2">
        <h3 className={`whiteColor center ${classes.h3Text}`}>
          Categoria:
          <span className={`greenColor ${classes.h3Text}`}>{typeName}</span>
        </h3>
        <div className={`max displayFlexCategorys ${classes.widthMax}`}>
          <div>
            <div className={`${classes.categoryList} `}>
              <div
                className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign`}
              >
                <ListSVG className={`${classes.list}`} />
                <div>All Categorys</div>
              </div>
              {categorys}
            </div>
            <br />
            <div className={`${classes.categoryList} `}>
              <div
                className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign`}
              >
                <TopSVG className={`${classes.top}`} fill="#fff" />
                <div>Top 5 Producte</div>
              </div>
              {topFiveProducts}
            </div>
            <br />
          </div>
          <div className={`${classes.widthMax} ${classes.margin} `}>
            <div
              className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName} justifyAlign`}
            >
              <div>
                {routes}
                {nameType}{" "}
              </div>
              <div>Un text Special</div>
            </div>
            <div className={`flex ${classes.marginFlex}`}>
              <div className={`${classes.marginContent} inlineFlexCategorys`}>
                {photo}
                <div className={`${classes.infoPartProduct}`}>
                  Despre tipul {nameType}: Lorem Ipsum is simply dummy text of
                  the printing and typesetting industry. Lorem Ipsum has been
                  the industry's standard dummy text ever since the 1500s, when
                  an unknown printer took a galley of type and scrambled it to
                  make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </div>
              </div>
            </div>
            <div className="boxMargin">
              <div className="boxControl justifyAlign whiteColor">
                <span>
                  <IconButton
                    onClick={() => {
                      localStorage.setItem("products", "grid");
                      gridListHandler();
                    }}
                  >
                    <GridSVG fill="#d6dee1" className="widthIconGrid" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      localStorage.setItem("products", "list");
                      gridListHandler();
                    }}
                  >
                    <ListSVG fill="#d6dee1" className="widthIcon" />
                  </IconButton>
                </span>
                <span>
                  <span className="spaceAroundButton">
                    <span>Sorteaza: </span>
                    <select
                      className="lineChange lineChangeInner"
                      ref={sortRef}
                    >
                      <option value="default">Default</option>
                      <option value="A->Z">De la A la Z</option>
                      <option value="Z->A">De la Z la A</option>
                      <option value="A->Z-Model">De la A la Z model</option>
                      <option value="Z->A-Model">De la Z la A model</option>
                      <option value="views">Dupa Vizualizari</option>
                    </select>
                  </span>
                  <span>Arata: </span>
                  <select
                    className="lineChange lineChangeInner"
                    ref={showNumberRef}
                  >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                  </select>
                  <button style={styleButtonSort} onClick={sortHandler}>
                    Aplica
                  </button>
                </span>
              </div>
            </div>
            <div className="container">
              <div className="">
                <div className="serv">{productsByCategory}</div>
              </div>
            </div>
            <div className="boxMargin">
              <div className="boxControl justifyAlign whiteColor">
                <div>
                  <IconButton onClick={addProducts}>
                    <PLusSVG fill="white" className="widthIcon" />
                  </IconButton>
                  <IconButton onClick={toTop}>
                    <UpSVG fill="white" className={classes.iconWidth} />
                  </IconButton>
                </div>
                <div className="displayFlex">
                  <div>
                    Sunt Afisate {displayedProducts} produse din{" "}
                    {maxDisplayedProducts}{" "}
                  </div>
                  <div className={`${classes.marginEndNumbers}`}>
                    {displayedProducts}/{maxDisplayedProducts}
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryType;
