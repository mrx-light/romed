import React from "react";
import { useEffect } from "react";
import "./../../App.css";
import CardProduct from "../../UI/CardProduct/CardProduct";
import { getProductsLimit } from "../../services/ProductServices";
import { useState } from "react";
import Header from "../../UI/Header/Header";
import { useHistory } from "react-router";
import { Carousel } from "react-bootstrap";
import { Button, IconButton } from "@material-ui/core";
import "./../../App.css";
import "./style/CategoryStyles.css";
import Footer from "./../../UI/Footer/Footer";
import { useStyles } from "./style/CategorysStyle";
import {
  getCategorys,
  getIdCategorys,
  getProductsNumber,
} from "../../services/AdminServices";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg";
import { ReactComponent as GridSVG } from "./../../assets/images/grid.svg";
import { ReactComponent as LoupeSVG } from "./../../assets/images/loupe.svg";
import { ReactComponent as PlusSVG } from "./../../assets/images/plus.svg";
import PhotoList from "../../UI/PhotoList/PhotoList";
import {
  getProductsAdd,
  getProductsByCategory,
  getProductsSerch,
} from "../../services/CategorysServices";
import { getProduct } from "../../services/ProductServices";
import CategoryList from "../../UI/CategoryList/CategoryList";

const Categorys = (props) => {
  const reportWindowSize = () => {
    try {
      let viewport = window.innerWidth;
      setViewportWidth(viewport);
      return viewport;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  window.onresize = reportWindowSize;

  const style = {
    backgroundColor: "#077d82",
    color: "#fff",
  };

  const flex = {
    display: "flex",
    flexDirection: "row",
    width: "960px",
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  const containerRef = React.useRef();
  const categorysRef = React.useRef();
  const sortRef = React.useRef();
  const showNumberRef = React.useRef();
  const inputSerchRef = React.useRef();

  const [products, setProducts] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  const [productsSerch, setProductsSerch] = useState();
  const [categorys, setCategorys] = useState([]);
  const [categorysName, setCategorysName] = useState(
    <option hidden>Categorys</option>
  );
  const [totalProductsNumber, setTotalProductsNumber] = useState(0);
  const [showedNumberOfProducts, setShowedNumberOfProducts] = useState(0);
  const [allCategorys, setAllCategorys] = useState();
  const [textClass, setTextClass] = useState("serv");
  const [textSerch, setTextSerch] = useState(<></>);
  const classes = useStyles();
  const history = useHistory();
  const [categoryNameForAdd, setCategoryNameForAdd] = useState("all");
  const [viewportWidth, setViewportWidth] = useState(0);
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
      />
    );
  }
  function listProduct(el, i) {
    const flex = {
      // display: "flex",
      width: "100%",
      height: "180px",
      marginBottom: "10px",
      marginTop: "10px",
    };

    const style = {
      background: "#e7f6fc",
      color: "#077d82",
      fontWeight: "700",
      fontSize: "18px",
      marginTop: "5px",
      marginBottom: "3px",
    };
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
                  Tipul:{" "}
                  <span
                    className="greenColor font cursorDefault"
                    title={el.type}
                  >
                    {el.type.length > 22
                      ? el.type.slice(0, 16) + "..."
                      : el.type}
                  </span>
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
          setProducts(arrGrid);
          return;
        }
        if (showMethod === "list") {
          if (viewportWidth < 810) {
            alert(
              "Din pacate aceasa functie nu poate fi folosita deoarece lungimea ecranului dmn este prea mica"
            );
            return;
          }
          const arrList = [];
          result.forEach((el, i) => {
            const productList = listProduct(el, i);
            arrList.push(productList);
          });
          setProducts(
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

  async function searchProducts(e) {
    e.preventDefault();
    try {
      const inputSerch = inputSerchRef.current.value;
      if (inputSerch.trim() !== "" && inputSerch.trim().length > 2) {
        const result = await getProductsSerch(inputSerch);
        console.log(result);
        if (result !== null) {
          if (result.length !== 0) {
            const arr = [];
            result.forEach((el, i) => {
              const product = gridProduct(el, i);
              arr.push(product);
            });
            setProductsSerch(arr);
            setTextSerch(
              <h4 className="center greenColor">
                Acesta Este Rezultatul Cautarii
              </h4>
            );
            return;
          }
          setProductsSerch("");
          setTextSerch(
            <>
              <br />
              <h4 className="center greenColor">
                Nu A fost Gasit Nici Un Rezultat
              </h4>
            </>
          );
          return;
        }
        return alert("Opps some problems with server");
      }
      return alert("Introduceti Mai Mult De 3 Simboluri Ca Sa Cautati");
    } catch (error) {
      console.log("error: ", error);
    }
  }
  //                                                                                                                      sortArray
  function sortArray(arr, name, num1, num2) {
    arr.sort((a, b) => {
      if (typeof a[name] === "number" && typeof b[name] === "number") {
        const nameA = a[name];
        const nameB = b[name];
        if (nameA < nameB) {
          return num1;
        }
        if (nameA > nameB) {
          return num2;
        }
        return 0;
      }
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
      const categorys =
        categorysRef.current.options[categorysRef.current.selectedIndex].value;
      const sort = sortRef.current.options[sortRef.current.selectedIndex].value;
      const showNumber =
        showNumberRef.current.options[showNumberRef.current.selectedIndex]
          .value;
      let array = [];
      const result = await getCategorys();
      setCategoryNameForAdd(categorys);
      if (categorys === "all") {
        if (showNumber === "12" || showNumber === "24" || showNumber === "48") {
          const limit = Number(showNumber);
          const resultProducts = await getProductsLimit(limit);
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
                setShowedNumberOfProducts(array.length);
                setProducts(arrayGrid);
                return;
              }
              if (productsMethod === "list") {
                const arrayList = [];
                array.forEach((el, i) => {
                  product = listProduct(el, i);
                  arrayList.push(product);
                });
                setProductsArr(array);
                setShowedNumberOfProducts(array.length);
                setProducts(arrayList);
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
                  setProducts(arrayGrid);
                  setShowedNumberOfProducts(array.length);
                  return;
                }
                if (productsMethod === "list") {
                  const arrayList = [];
                  array.forEach((el, i) => {
                    product = listProduct(el, i);
                    arrayList.push(product);
                  });
                  setProductsArr(array);
                  setShowedNumberOfProducts(array.length);
                  setProducts(arrayList);
                  return;
                }
              }
            }
          }
        }
        return;
      }
      if (categorys !== "all") {
        const bool = result.some((el) => el._id === categorys);
        if (bool) {
          if (
            showNumber === "12" ||
            showNumber === "24" ||
            showNumber === "48"
          ) {
            const limit = Number(showNumber);
            const resultProducts = await getProductsByCategory(
              categorys,
              limit
            );
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
                setProducts(arrayGrid);
                setShowedNumberOfProducts(array.length);
                return;
              }
              if (productsMethod === "list") {
                const arrayList = [];
                array.forEach((el, i) => {
                  product = listProduct(el, i);
                  arrayList.push(product);
                });
                setProductsArr(array);
                setShowedNumberOfProducts(array.length);
                setProducts(arrayList);
                return;
              }
              return;
            } else {
              alert("some problems with server cod: 500");
            }
            return;
          }
        }
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  function sortByNewProducts() {
    try {
      const array = productsArr;
      const productsMethod = localStorage.getItem("products");
      sortArray(array, "data", 1, -1);
      let product;
      if (productsMethod === "grid") {
        const arrayGrid = [];
        array.forEach((el, i) => {
          product = gridProduct(el, i);
          arrayGrid.push(product);
        });
        setProductsArr(array);
        setShowedNumberOfProducts(array.length);
        setProducts(arrayGrid);

        return;
      }
      if (productsMethod === "list") {
        const arrayList = [];
        array.forEach((el, i) => {
          product = listProduct(el, i);
          arrayList.push(product);
        });
        setProductsArr(array);
        setProducts(arrayList);
        setShowedNumberOfProducts(array.length);
        return;
      }
      return;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function getAllProducts() {
    try {
      const result = await getProductsLimit(totalProductsNumber);
      if (result !== null) {
        const productsMethod = localStorage.getItem("products");
        const array = result;
        let product;
        if (productsMethod === "grid") {
          const arrayGrid = [];
          array.forEach((el, i) => {
            product = gridProduct(el, i);
            arrayGrid.push(product);
          });
          setProductsArr(array);
          setShowedNumberOfProducts(array.length);
          setProducts(arrayGrid);

          return;
        }
        if (productsMethod === "list") {
          const arrayList = [];
          array.forEach((el, i) => {
            product = listProduct(el, i);
            arrayList.push(product);
          });
          setProductsArr(array);
          setProducts(arrayList);
          setShowedNumberOfProducts(array.length);
          return;
        }
        return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function addProductsHandler() {
    try {
      const showNumber =
        showNumberRef.current.options[showNumberRef.current.selectedIndex]
          .value;
      const arr = productsArr;
      const arrLenght = productsArr.length;

      if (categoryNameForAdd === "all") {
        const result = await getProductsAdd(arrLenght, showNumber, "all");

        if (result !== null) {
          setShowedNumberOfProducts((prevState) => {
            return prevState + result.length;
          });
          result.forEach((el) => {
            arr.push(el);
          });
          const method = localStorage.getItem("products");
          if (method === "list") {
            const arrayState = [];
            arr.forEach((el, i) => {
              const product = listProduct(el, i);
              arrayState.push(product);
            });
            setProductsArr(arr);
            setProducts(arrayState);
            return;
          }
          if (method === "grid") {
            const arrayState = [];
            arr.forEach((el, i) => {
              const product = gridProduct(el, i);
              arrayState.push(product);
            });
            setProductsArr(arr);
            setProducts(arrayState);
            return;
          }
          return;
        }
        return;
      }
      if (categoryNameForAdd !== "all") {
        const arrIDCategorys = await getIdCategorys();

        const bool = arrIDCategorys.some((el) => el._id === categoryNameForAdd);
        if (bool) {
          const result = await getProductsAdd(
            arrLenght,
            showNumber,
            categoryNameForAdd
          );
          console.log(result);
          if (result !== null) {
            setShowedNumberOfProducts((prevState) => {
              return prevState + result.length;
            });
            result.forEach((el) => {
              arr.push(el);
            });
            const method = localStorage.getItem("products");
            if (method === "list") {
              const arrayState = [];
              arr.forEach((el, i) => {
                const product = listProduct(el, i);
                arrayState.push(product);
              });
              setProductsArr(arr);
              setProducts(arrayState);
              return;
            }
            if (method === "grid") {
              const arrayState = [];
              arr.forEach((el, i) => {
                const product = gridProduct(el, i);
                arrayState.push(product);
              });
              setProductsArr(arr);
              setProducts(arrayState);
              return;
            }
            return;
          }
          return;
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function topProducts() {
    try {
      const arr = productsArr;
      sortArray(arr, "views", 1, -1);
      const method = localStorage.getItem("products");
      if (method === "list") {
        const arrayState = [];
        arr.forEach((el, i) => {
          const product = listProduct(el, i);
          arrayState.push(product);
        });
        setProductsArr(arr);
        setProducts(arrayState);
        return;
      }
      if (method === "grid") {
        const arrayState = [];
        arr.forEach((el, i) => {
          const product = gridProduct(el, i);
          arrayState.push(product);
        });
        setProductsArr(arr);
        setProducts(arrayState);
        return;
      }
      return;
    } catch (error) {
      console.log(error, error);
    }
  }
  useEffect(() => {
    const render = async () => {
      const result = await getCategorys();
      if (result) {
        const arrName = [];
        result.forEach((el, i) => {
          const categoryName = (
            <>
              <option value={el._id}>{el.name}</option>
            </>
          );

          arrName.push(categoryName);
        });

        setCategorysName(arrName);
      }
    };
    render();
  }, []);

  useEffect(() => {
    try {
      async function renderProducts() {
        const result = await getProductsLimit(12);
        console.log(result);
        if (result !== null) {
          let arr = [];
          result.forEach((element, i) => {
            const product = gridProduct(element, i);
            arr.push(product);
          });
          setShowedNumberOfProducts((prev) => {
            return prev + result.length;
          });
          setProductsArr(result);
          setProducts(arr);
        }
      }
      renderProducts();
    } catch (error) {
      console.log(error, error);
    }
  }, []);
  useEffect(() => {
    try {
      async function render() {
        const result = await getCategorys();
        if (result != null) {
          const array = [];
          result.forEach((el, i) => {
            const card = (
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:2000/image/categorys/${el.photoId}`}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3 className="textAbout">{el.name}</h3>
                  <p className="textAbout">{el.content}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
            array.push(card);
          });
          setAllCategorys(array);
        }
      }
      render();
    } catch (error) {
      console.log(error, error);
    }
  }, []);

  useEffect(() => {
    try {
      const method = localStorage.getItem("products");
      console.log(viewportWidth, method);
      if (method === "list") {
        if (viewportWidth < 810) {
          const arr = [];
          productsArr.forEach((el, i) => {
            const product = gridProduct(el, i);
            arr.push(product);
          });
          setProducts(arr);
        }
      }
    } catch (error) {
      console.log(error, error);
    }
  }, [viewportWidth]);

  useEffect(() => {
    try {
      async function renderProductsNumber() {
        const result = await getProductsNumber("all");
        console.log(result);
        if (result !== null) {
          setTotalProductsNumber(result);
        }
      }
      renderProductsNumber();
    } catch (error) {
      console.log(error, error);
    }
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="max">
          <br />
          <div className="margin_center">
            <div>
              <br />
              <h1 className="greenColor ">PRODUSELE NOASTRE</h1>
              <div className="underline bgGreen "></div>
            </div>
          </div>
          <h4 className="textAlign  textH4About">
            Societate comercială Romedcom S.R.L. este specializată în
            comercializarea de echipamente medicale şi serviciile conexe –
            instalarea, întreţinerea şi depanarea – precum şi consultanţă în
            constituirea de platforme tehnologice pentru servicii medicale.
          </h4>
          <div className="spaceAround">
            <CategoryList />

            <div className="containerPhotosCategorys">
              <Carousel
                fade={true}
                nextIcon={<span className="fontIcons">{"❯"}</span>}
                prevIcon={<span className="fontIcons">{"❮"}</span>}
                className="carouselCategorys"
              >
                {allCategorys}
              </Carousel>
            </div>
          </div>
          <div className="center">
            <Button
              style={style}
              variant="contained"
              onClick={() => history.push("/home")}
            >
              Acasa
            </Button>
          </div>
          <br />
          <div className="underline bgGreen "></div>

          <br />
        </div>
      </div>
      <div className="backgr">
        <div className="container">
          <br />
          <h3 className="center greenColor">Cautați Produse</h3>
          <br />
          <form className="flexCenter">
            <input
              placeholder="Introduceti numele produsului"
              className="inputSearch"
              ref={inputSerchRef}
            />
            <select className="selectSearch">
              <option value="all">Toate</option>
              {categorysName}
            </select>
            <button className="buttonSearch" onClick={searchProducts}>
              <LoupeSVG fill="#000" className="widthIconGrid" />
            </button>
          </form>
          <br />
          <h4 className="center greenColor">
            Cautați produsul de care aveți nevoie
          </h4>
          <div className="serv">{productsSerch}</div>
          {textSerch}
          <br />
        </div>
      </div>
      <div className="">
        <div className="container">
          <br />
          <h3 className="center greenColor">Produsele Noastre</h3>
          <br />
          <div className="margin_center">
            <Button
              style={style}
              variant="contained"
              onClick={sortByNewProducts}
            >
              Noi
            </Button>
            <span className="spaceAroundButton">
              <Button
                style={style}
                variant="contained"
                onClick={getAllProducts}
              >
                Toate
              </Button>
            </span>
            <Button style={style} variant="contained" onClick={topProducts}>
              Top
            </Button>
          </div>
        </div>
        <br />
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
              <span>Alege categoria: </span>
              <select className="lineChange lineChangeInner" ref={categorysRef}>
                <option value="all">Toate</option>
                {categorysName}
              </select>
              <span className="spaceAroundButton">
                <span>Sorteaza: </span>
                <select className="lineChange lineChangeInner" ref={sortRef}>
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
              <Button
                style={styleButtonSort}
                variant="contained"
                onClick={sortHandler}
              >
                Aplica
              </Button>
            </span>
          </div>
        </div>
        <div className="container">
          <div className="">
            <div className={textClass} ref={containerRef}>
              {products}
            </div>
          </div>
        </div>
        <div className="boxMargin">
          <div className="boxControl whiteColor padding flex">
            <div>
              Sunt Afisate <span>{showedNumberOfProducts}</span> produse din{" "}
              <span>{totalProductsNumber}</span>{" "}
            </div>
            <div>
              <span>{showedNumberOfProducts}</span>/
              <span>{totalProductsNumber}</span>
            </div>
          </div>
          <br />
          <div className="flex">
            <IconButton
              style={style}
              variant="contained"
              onClick={addProductsHandler}
            >
              <PlusSVG fill="#d6dee1" className="plus" />
            </IconButton>
          </div>
        </div>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Categorys;
