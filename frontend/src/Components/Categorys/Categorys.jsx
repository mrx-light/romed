import React from "react";
import { useEffect } from "react";
import "./../../App.css"
import CardProduct from "../../UI/CardProduct/CardProduct"
import { getProducts } from "../../services/ProductServices";
import { useState } from "react";
import Header from "../../UI/Header/Header"
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button, CardActionArea, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from "@material-ui/core";
import "./../../App.css";
import "./style/CategoryStyles.css"
import Footer from "./../../UI/Footer/Footer"
import { useStyles } from "./style/CategorysStyle"
import { getCategorys } from "../../services/AdminServices";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg"
import { ReactComponent as GridSVG } from "./../../assets/images/grid.svg"
import { ReactComponent as LoupeSVG } from "./../../assets/images/loupe.svg"
import { ReactComponent as PlusSVG } from "./../../assets/images/plus.svg"
import PhotoList from "../../UI/PhotoList/PhotoList";
import { getProductsByCategory, getProductsSerch } from "../../services/CategorysServices";
import { getProduct } from "../../services/ProductServices";


const Categorys = (props) => {

  const style = {
    backgroundColor: "#077d82",
    color: "#fff"
  };

  const flex = {
    display: "flex",
    flexDirection: "row",
    width: "960px",
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5
    }
  };

  const containerRef = React.useRef();
  const categorysRef = React.useRef();
  const sortRef = React.useRef();
  const showNumberRef = React.useRef();
  const inputSerchRef = React.useRef();

  const [products, setProducts] = useState([])
  const [productsArr, setProductsArr] = useState([]);
  const [productsSerch, setProductsSerch] = useState();
  const [categorys, setCategorys] = useState([])
  const [categorysName, setCategorysName] = useState(
    <option hidden>Categorys</option>)
  const [textClass, setTextClass] = useState("serv")
  const [textSerch, setTextSerch] = useState(<></>)
  const classes = useStyles()
  const history = useHistory()

  const linkWebsite = (element) => {
    window.open(element, "_blank")
  }

  function redirectToProduct(path) {
    history.push(`/product/${path}`);
  }

  async function renderProducts() {
    const result = await getProducts(12);
    if (result !== null) {
      let arr = [];
      result.forEach((element, i) => {
        const product = <CardProduct
          clas="servic"
          redirectToProduct={() => redirectToProduct(element._id)}
          buttonHandler={() => linkWebsite(element.link)}
          keys={i}
          alt={element.name}
          title={element.name}
          link={element.name}
          type={element.type}
          imagePath={"http://localhost:2000/image/products/" + element.fotoPath}
        />
        arr.push(product);
      });
      setProductsArr(result)
      setProducts(arr);
    }
  }
  function gridProduct(el, i) {
    return <CardProduct
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
  }
  function listProduct(el, i) {
    return <div className="marginList" key={i}>
      <Card style={flex} className="paddingListBox">
        <PhotoList
          title={el.name}
          imagePath={"http://localhost:2000/image/products/" + el.fotoPath}
        />
        <div className={`${classes.width}  paddingListBox`}>
          <CardActions
            className="paddingButtonList justifyAlign">
            <div>
              <span>Denumire: <span className="greenColor font">{el.name}</span></span><br />
              <span>Tipul: <span className="greenColor font">{el.type}</span></span>
            </div>
            <div>
              <Button style={style}>vedeti produsul</Button>
              <Button style={style} className="buttonMarginLeft">vedeti produsul</Button>
            </div>
          </CardActions>
          <div className={`content`}>
            {el.content}
          </div>
        </div>
      </Card>
    </div>
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
          })
          setProducts(arrGrid);
          return;
        }
        if (showMethod === "list") {
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
          )
        }
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }
  //                                                                                                  serch
  async function serchProducts(e) {
    e.preventDefault();
    try {
      const inputSerch = inputSerchRef.current.value;
      if (inputSerch.trim() !== "" && inputSerch.trim().length > 2) {
        const response = await getProductsSerch(inputSerch);
        if (response !== null) {
          const arr = [];
          response.forEach((el, i) => {
            const product = gridProduct(el, i);
            arr.push(product);
          })
          setProductsSerch(arr);
          setTextSerch(
            <h4 className="center whiteColor">
              Acesta Este Rezultatul Cautarii
            </h4>
          )
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
      const nameA = a[name].toUpperCase();
      const nameB = b[name].toUpperCase();
      if (nameA < nameB) {
        return num1;
      }
      if (nameA > nameB) {
        return num2;
      }
      return 0;
    })
    return arr
  }
  async function sortHandler() {
    try {
      const categorys = categorysRef.current.options[categorysRef.current.selectedIndex].value;
      const sort = sortRef.current.options[sortRef.current.selectedIndex].value;
      const showNumber = showNumberRef.current.options[showNumberRef.current.selectedIndex].value;
      let array = [];
      const result = await getCategorys();
      if (categorys === "all") {
        if (showNumber === "12" || showNumber === "24" || showNumber === "48") {
          const limit = Number(showNumber);
          const resultProducts = await getProducts(limit);
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
                })
                setProductsArr(array);
                setProducts(arrayGrid)
                return;
              }
              if (productsMethod === "list") {
                const arrayList = [];
                array.forEach((el, i) => {
                  product = listProduct(el, i);
                  arrayList.push(product);
                })
                setProductsArr(array);
                setProducts(arrayList);
                return;
              }
            }
            if (sort !== "default") {
              if (showNumber === "12" || showNumber === "24" || showNumber === "48") {
                const productsMethod = localStorage.getItem("products");
                let product;
                const newResult = resultProducts;
                if (sort === "A->Z") {
                  sortArray(newResult, "name", -1, 1)
                }
                else if (sort === "Z->A") {
                  sortArray(newResult, "name", 1, -1)
                }
                else if (sort == "A->Z-Model") {
                  sortArray(newResult, "type", -1, 1)
                }
                else if (sort == "Z->A-Model") {
                  sortArray(newResult, "type", 1, -1)
                }
                if (productsMethod === "grid") {
                  const arrayGrid = [];
                  array.forEach((el, i) => {
                    product = gridProduct(el, i);
                    arrayGrid.push(product);
                  })
                  setProductsArr(array);
                  setProducts(arrayGrid)
                  return;
                }
                if (productsMethod === "list") {
                  const arrayList = [];
                  array.forEach((el, i) => {
                    product = listProduct(el, i);
                    arrayList.push(product);
                  })
                  setProductsArr(array);
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
          if (showNumber === "12" || showNumber === "24" || showNumber === "48") {
            const limit = Number(showNumber);
            const resultProducts = await getProductsByCategory(categorys, limit)
            if (resultProducts !== null) {
              const productsMethod = localStorage.getItem("products");
              let product;
              array = resultProducts;
              if (sort === "A->Z") {
                sortArray(array, "name", -1, 1)
              }
              else if (sort === "Z->A") {
                sortArray(array, "name", 1, -1)
              }
              if (productsMethod === "grid") {
                const arrayGrid = [];
                array.forEach((el, i) => {
                  product = gridProduct(el, i);
                  arrayGrid.push(product);
                })
                setProductsArr(array);
                setProducts(arrayGrid)
                return;
              }
              if (productsMethod === "list") {
                const arrayList = [];
                array.forEach((el, i) => {
                  product = listProduct(el, i);
                  arrayList.push(product);
                })
                setProductsArr(array);

                setProducts(arrayList);
                return;
              }
              return
            }
            else {
              alert("some problems with server cod: 500")
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


  useEffect(() => {
    const Run = async () => {
      const result = await getCategorys();
      if (result) {
        const arr = [];
        const arrName = [];
        result.forEach((el, i) => {
          const category =
            <div key={i}>
              <div className="margin_center">
                <Card className="img">
                  <CardMedia
                    alt={el.name}
                    component="img"
                    height="60"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  />
                </Card>
              </div>
              <div className="center">
                {el.name}
              </div >
              <br />
            </div>;
          const categoryName = <>
            <option value={el._id}>{el.name}</option>
          </>;
          arr.push(category);
          arrName.push(categoryName)
        })
        setCategorys(arr)
        setCategorysName(arrName)
      }
    }
    Run()
  }, []);

  useEffect(() => {
    renderProducts()
  }, []);

  return (
    <>
      <Header />
      <div className="backgr">
        <div className="max">
          <br />
          <h3 className="center">Categorys</h3>
          <br />
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            centerMode={true}
          >
            {categorys}
          </Carousel>
          <br />
        </div>
      </div>
      <div className="backgreen">
        <div className="container">
          <br />
          <h3 className="center whiteColor">Search Product</h3>
          <br />
          <form className="flexCenter">
            <input placeholder="Introduceti numele produsului" className="inputSearch" ref={inputSerchRef} />
            <select className="selectSearch">
              <option value="all" >Toate</option>
              {categorysName}
            </select>
            <button className="buttonSearch" onClick={serchProducts}>
              <LoupeSVG fill="#000" className="widthIconGrid" />
            </button>
          </form>
          <br />
          <h4 className="center whiteColor">
            Cautati produsul de care aveti nevoie
          </h4>
          <div className="serv">
            {productsSerch}
          </div>
          {textSerch}
          <br />

        </div>
      </div>
      <div className="backgr">
        <div className="container"><br />
          <h3 className="center greenColor">
            Our Products
          </h3>
          <br />
          <div className="margin_center">
            <Button style={style} variant="contained">Noi</Button>
            <span className="spaceAroundButton"><Button style={style} variant="contained">Toate</Button></span>
            <Button style={style} variant="contained">Top</Button>
          </div>
        </div>
        <br />
        <div className="boxMargin">
          <div className="boxControl justifyAlign whiteColor">
            <span>
              <IconButton onClick={() => { localStorage.setItem('products', 'grid'); gridListHandler() }}>
                <GridSVG fill="#d6dee1" className="widthIconGrid" />
              </IconButton>
              <IconButton onClick={() => { localStorage.setItem('products', 'list'); gridListHandler() }}>
                <ListSVG fill="#d6dee1" className="widthIcon" />
              </IconButton>
            </span>
            <span>
              <span>Alege categoria: </span>
              <select className="lineChange lineChangeInner" ref={categorysRef} >
                <option value="all">Toate</option>
                {categorysName}
              </select>
              <span className="spaceAroundButton">
                <span>Sorteaza: </span>
                <select className="lineChange lineChangeInner" ref={sortRef} >
                  <option value="default">Default</option>
                  <option value="A->Z">De la A la Z</option>
                  <option value="Z->A">De la Z la A</option>
                  <option value="A->Z-Model">De la A la Z model</option>
                  <option value="Z->A-Model">De la Z la A model</option>
                  <option value="views">Dupa Vizualizari</option>
                </select>
              </span>
              <span>Arata: </span>
              <select className="lineChange lineChangeInner" ref={showNumberRef} >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
              <Button variant="contained" onClick={sortHandler}>Aplica</Button>
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
            <div>Sunt Afisate 6 produse din 278 </div>
            <div>6/278</div>
          </div>
          <br />
          <div className="flex">
            <IconButton
              style={style}
              variant="contained"
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
}

export default Categorys