import { useEffect } from "react";
import {
  getProduct,
  getThreeProducts,
  getProductsLimit,
  getLatestUplodedProducts,
  getTopFiveProducts,
} from "../../services/ProductServices";
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Button,
  Input,
  TextField,
  IconButton,
} from "@material-ui/core";
import Header from "./../../UI/Header/Header";
import CardProduct from "./../../UI/CardProduct/CardProduct";
import "./../../App.css";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Footer from "../../UI/Footer/Footer";
import "./../../App.css";
import { useStyles } from "./style/ProductStyles";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg";
import { ReactComponent as TopSVG } from "./../../assets/images/star.svg";
import { ReactComponent as HomeSVG } from "./../../assets/images/home.svg";
// TopSVG
import { getCategorys } from "./../../services/AdminServices.js";
import PhotoList from "./../../UI/PhotoList/PhotoList.jsx";
import { ReactComponent as UpSVG } from "./../../assets/images/up.svg";

const Product = (props) => {
  const classes = useStyles();

  const [productCard, setProductCard] = useState(null);
  const [infoProduct, setInfoProduct] = useState({});
  // const [threeProductCards, setThreeProductCards] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [latestUpdate, setLatestUpdate] = useState([]);
  const [topFiveProducts, setTopFiveProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState();
  const [aboutProduct, setAboutProduct] = useState(<></>);
  const [routes, setRoutes] = useState(<></>);
  const [productName, setProductName] = useState("");
  const [productDescriptions, setProductDescriptions] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const buttonStyle = {
    padding: "6px",
  };

  function clickRedirect(st) {
    history.push(st);
  }

  function toTop() {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    try {
      async function checkID() {
        const result = await getProduct(id);
        if (result !== null) {
          console.log(result);
          let product, route, name, description;

          result.forEach((el, i) => {
            description = el.content;
            name = el.name;
            product = (
              <>
                <div className="gray" key={i}>
                  Denumire Produs:{" "}
                  <span className="whiteColor fontWeight">{el.name}</span>
                </div>
                <div className="gray">
                  Brand:{" "}
                  <span className="whiteColor fontWeight">{el.name}</span>
                </div>
                <div className="gray">
                  Tipul:{" "}
                  <span className="whiteColor fontWeight">{el.type}</span>
                </div>
                <div className="gray">
                  Vizualizari:{" "}
                  <span className="whiteColor fontWeight">{el.views}</span>
                </div>
                <div className="gray">
                  In Stoc:{" "}
                  <span className="whiteColor fontWeight">{el.inStock}</span>
                </div>
                <Button
                  style={style}
                  variant="contained"
                  onClick={() => {
                    window.open(el.link);
                  }}
                >
                  Link
                </Button>
              </>
            );
            route = (
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
                  onClick={() => clickRedirect(`/categorys/${el.type}`)}
                  className="cursor act"
                >
                  {el.type}
                </span>{" "}
                {">"} <span>{el.name}</span>
              </>
            );
          });
          setProductDescriptions(description);
          setProductName(name);
          setRoutes(route);
          setAboutProduct(product);

          return;
        }
        history.push("/");
        return;
      }
      checkID();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    async function renderProducts() {
      const result = await getProductsLimit(12);
      console.log(result);
      if (result !== null) {
        const someArr = result;
        console.log(result);
        const bool = result.some((el) => el._id === id);
        if (bool) {
          const arr = someArr.filter((el) => {
            return el._id === id;
          });
          let card;
          arr.forEach((el) => {
            card = (
              <div
                className={classes.borderStyle}
                style={{
                  background: `url("http://localhost:2000/image/products/${el.fotoPath}")`,
                }}
                title={el.name}
              />
            );
          });

          setInfoProduct(arr[0]);
          setProductCard(card);
          console.log(infoProduct);
          return;
        }
        return;
      }
      return alert("Nu S-a Putut Extrage Datele De La Server");
    }
    renderProducts();
  }, []);

  useEffect(() => {
    async function renderLatest() {
      try {
        const result = await getTopFiveProducts();
        console.log(result);
        if (result !== null) {
          let arr = [];
          result.forEach((el, i) => {
            const product = (
              <div
                key={i}
                className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor`}
                key={el._id}
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
    try {
      async function renderLastsProducts() {
        const result = await getLatestUplodedProducts();
        if (result !== null) {
          const arr = [];
          result.forEach((el, i) => {
            console.log(el.fotoPath);
            const card = (
              <CardProduct
                clas={`servic ${classes.servic}`}
                classActions={`${classes.paddingCard}`}
                classContent={`${classes.paddingCard}`}
                alt={el.name}
                imagePath={
                  "http://localhost:2000/image/products/" + el.fotoPath
                }
                title={"dahuia dea text prichini  "}
                buttonHandler={() => {}}
                link={"Procurati"}
                type={el.type}
                redirectToProduct={() => {}}
                keys={i}
              />
            );
            arr.push(card);
          });
          setLatestUpdate(arr);
        }
      }
      renderLastsProducts();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    try {
      async function renderRecommendedProducts() {
        const result = await getProductsLimit(3);
        if (result !== null) {
          const arr = [];
          result.forEach((el, i) => {
            console.log(el.fotoPath);
            const card = (
              <CardProduct
                clas={`servic ${classes.servic}`}
                classActions={`${classes.paddingCard}`}
                classContent={`${classes.paddingCard}`}
                alt={el.name}
                imagePath={
                  "http://localhost:2000/image/products/" + el.fotoPath
                }
                title={"dahuia dea text prichini  "}
                buttonHandler={() => {}}
                link={"Procurati"}
                type={el.type}
                redirectToProduct={() => {}}
                keys={i}
              />
            );
            arr.push(card);
          });
          setRecommendedProducts(arr);
        }
      }
      renderRecommendedProducts();
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
            const product = (
              <div
                className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor`}
                key={i}
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

  const style = {
    background: "#e7f6fc",
    color: "#077d82",
    fontWeight: "700",
    fontSize: "18px",
    paddingLeft: "25px",
    paddingRight: "25px",
    width: "100%",
    marginTop: "5px",
    marginBottom: "3px",
  };

  return (
    <>
      <Header />
      <div className="backgr2">
        <h3 className={`center whiteColor  ${classes.h3Text}`}>
          Product:{""}
          <span className={`${classes.h3Text} greenColor`}>{productName}</span>
        </h3>
        <div className={`max displayFlex ${classes.widthMax}`}>
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
          </div>
          <div className={`${classes.widthMax} ${classes.margin} `}>
            <div
              className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName} justifyAlign`}
            >
              <div>{routes}</div>
              <div>Un text Special</div>
            </div>
            <div className={`flex ${classes.marginFlex}`}>
              <div className="inline-flex">
                <div className={`${classes.photo}`}>{productCard}</div>
                <div className={`${classes.infoPartProduct}`}>
                  {aboutProduct}
                </div>
              </div>
            </div>
            <div
              className={`${classes.greenBorder} ${classes.widthMax} ${classes.heightContent}`}
            >
              Despre Produs:
              <br />
              {productDescriptions}
            </div>
            <br />
            <div
              className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName}`}
            >
              <h4 className="center whiteColor marginZero">
                Produse Recomandate
              </h4>
            </div>

            <div className="serv">{recommendedProducts}</div>

            <div
              className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName}`}
            >
              <h4 className="center whiteColor marginZero">
                Produsele nu de mult adaugate
              </h4>
            </div>

            <div className="serv">{latestUpdate}</div>
            <div
              className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName} justifyAlign`}
            >
              <div>{routes}</div>
              <IconButton onClick={toTop} style={buttonStyle}>
                <UpSVG fill="white" className={classes.iconWidth} />
              </IconButton>
            </div>
          </div>
        </div>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Product;
