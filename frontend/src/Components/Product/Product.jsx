import { useEffect } from "react";
import { getProduct, getThreeProducts, getProducts, getLatestUplodedProducts, getTopFiveProducts } from "../../services/ProductServices";
import { Card, CardContent, CardMedia, makeStyles, Button, Input, TextField } from "@material-ui/core"
import Header from "./../../UI/Header/Header"
import CardProduct from "./../../UI/CardProduct/CardProduct"
import "./../../App.css"
import { useState } from "react"
import { useParams } from "react-router-dom";
import Footer from "../../UI/Footer/Footer";
import "./../../App.css"
import { useStyles } from "./style/ProductStyles";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg"
import { ReactComponent as TopSVG } from "./../../assets/images/star.svg"
import { ReactComponent as HomeSVG } from "./../../assets/images/home.svg"
// TopSVG
import { getCategorys } from "./../../services/AdminServices.js"
import PhotoList from "./../../UI/PhotoList/PhotoList.jsx"
const Product = (props) => {
  const classes = useStyles()

  const [productCard, setProductCard] = useState(null);
  const [infoProduct, setInfoProduct] = useState({})
  // const [threeProductCards, setThreeProductCards] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [latestUpdate, setLatestUpdate] = useState([]);
  const [topFiveProducts, setTopFiveProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState();
  const { id } = useParams()
  console.log(id);

  useEffect(() => {
    async function renderProducts() {
      const result = await getProducts();
      const someArr = result;
      const bool = result.some(el => el._id === id);
      if (bool) {
        const arr = someArr.filter(el => {
          return el._id === id;
        });
        let card;
        arr.forEach(el => {
          card = <div
            className={classes.borderStyle}
            style={{
              background: `url("http://localhost:2000/image/products/${el.fotoPath}")`,
            }}
            title={el.name}
          />
        });

        setInfoProduct(arr[0])
        setProductCard(card);
        console.log(infoProduct);
        return
      }
    }
    renderProducts()
  }, [])


  useEffect(() => {
    async function renderLatest() {
      try {
        const result = await getTopFiveProducts();
        console.log(result);
        if (result !== null) {
          let arr = [];
          result.forEach((el, i) => {
            const product = <div className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor`} key={el._id}>
              {el.name.toUpperCase()}
            </div >;
            arr.push(product);
          });
          setTopFiveProducts(arr)
          return;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    renderLatest()
  }, [])


  useEffect(() => {
    try {
      async function renderLastsProducts() {
        const result = await getLatestUplodedProducts();
        if (result !== null) {
          const arr = []
          result.forEach((el, i) => {
            console.log(el.fotoPath);
            const card = <CardProduct
              clas={`servic ${classes.servic}`}
              classActions={`${classes.paddingCard}`}
              classContent={`${classes.paddingCard}`}
              alt={el.name}
              imagePath={"http://localhost:2000/image/products/" + el.fotoPath}
              title={"dahuia dea text prichini  "}
              buttonHandler={""}
              link={"Procurati"}
              type={el.type}
              redirectToProduct="asd"
              keys={i}
            />;
            arr.push(card)
          })
          setLatestUpdate(arr)
        }
      }
      renderLastsProducts()
    } catch (error) {
      console.log("error: ", error);
    }
  }, [])


  useEffect(() => {
    try {
      //getProducts

      async function renderRecommendedProducts() {
        const result = await getProducts(3);
        if (result !== null) {
          const arr = []
          result.forEach((el, i) => {
            console.log(el.fotoPath);
            const card = <CardProduct
              clas={`servic ${classes.servic}`}
              classActions={`${classes.paddingCard}`}
              classContent={`${classes.paddingCard}`}
              alt={el.name}
              imagePath={"http://localhost:2000/image/products/" + el.fotoPath}
              title={"dahuia dea text prichini  "}
              buttonHandler={""}
              link={"Procurati"}
              type={el.type}
              redirectToProduct="asd"
              keys={i}
            />;
            arr.push(card)
          })
          setRecommendedProducts(arr)
        }
      }
      renderRecommendedProducts()
    } catch (error) {
      console.log("error: ", error);
    }
  }, [])


  useEffect(() => {
    async function renderCategorys(params) {
      try {
        const result = await getCategorys();
        if (result !== null) {
          const arr = [];
          result.forEach((el, i) => {
            const product = <div className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor`} key={el._id}>
              {el.name}
            </div >
            arr.push(product);
          });
          setCategorys(arr);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    renderCategorys()
  }, [])

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
  }


  return (
    <>
      <Header />
      <div
        className="backgr2">
        <h3 className={`center whiteColor  ${classes.h3Text}`}>Product: <span className={`${classes.h3Text} greenColor`}>Lolo</span></h3>
        <div className={`max displayFlex ${classes.widthMax}`}>
          <div>
            <div className={`${classes.categoryList} `}>
              <div className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign`}>
                <ListSVG className={`${classes.list}`} />
                <div>All Categorys</div>
              </div>
              {categorys}
            </div>
            <br />
            <div className={`${classes.categoryList} `}>
              <div className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign`} >
                <TopSVG className={`${classes.top}`} fill="#fff" />
                <div>Top 5 Producte</div>
              </div>
              {topFiveProducts}
            </div>
          </div>
          <div className={`${classes.widthMax} ${classes.margin} `}>
            <div className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName} justifyAlign`}>
              <div><HomeSVG className={`${classes.home}`} /> {'>'} Category {'>'} Type {'>'} Name</div>
              <div>Un text Special</div>
            </div>
            <div className={`flex ${classes.marginFlex}`}>
              <div className="inline-flex">
                <div className={`${classes.photo}`}>
                  {productCard}
                </div>
                <div className={`${classes.infoPartProduct}`}>
                  <div>Denumire Produs: </div>
                  <div>Brand:</div>
                  <div>Tipul:</div>
                  <div>Vizualizari:</div>
                  <div>In Stoc:</div>
                  <Button style={style} variant="contained">Link</Button>
                </div>
              </div>
            </div>
            <div className={`${classes.greenBorder} ${classes.widthMax}`}>
              Despre Produs:<br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <br />
            <h4 className="center whiteColor">Produse Recomandate</h4>
            <hr />

            <div className="serv">
              {recommendedProducts}
            </div>
            {/* <br /> */}
            <hr />
            <h4 className="center whiteColor">Produsele nu de mult adaugate</h4>
            <hr />
            <div className="serv">
              {latestUpdate}
            </div>
            <hr />
          </div>
        </div>
        <br />
      </div>
      <Footer />
    </>
  )
}

export default Product