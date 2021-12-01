// import Header from "./../../UI/Header/Header"
// import Footer from "./../../UI/Footer/Footer"
// import { useParams, useHistory } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { getCategorys } from "../../services/AdminServices";
// import useStyles from "./style/TypeStyles";
// import { ReactComponent as ListSVG } from "./../../assets/images/list.svg"
// import { ReactComponent as TopSVG } from "./../../assets/images/star.svg"
// import { ReactComponent as HomeSVG } from "./../../assets/images/home.svg"
// import { Button } from "@material-ui/core"
// import SortBar from "../../UI/SortBar/SortBar";



// const Type = () => {
//   const [nameType, setNameType] = useState([]);
//   const [productCard, setProductCard] = useState(null);
//   const [infoProduct, setInfoProduct] = useState({})
//   const [categorys, setCategorys] = useState([]);
//   const [latestUpdate, setLatestUpdate] = useState([]);
//   const [topFiveProducts, setTopFiveProducts] = useState([]);
//   const [recommendedProducts, setRecommendedProducts] = useState();

//   const refSort = useRef()
//   const refShowNumber = useRef()
//   const classes = useStyles()
//   const { type } = useParams()
//   console.log(type);
//   const history = useHistory();
//   const redirect = () => {
//     // history.push("/")
//   }

//   const style = {
//     background: "#e7f6fc",
//     color: "#077d82",
//     fontWeight: "700",
//     fontSize: "18px",
//     paddingLeft: "25px",
//     paddingRight: "25px",
//     width: "100%",
//     marginTop: "5px",
//     marginBottom: "3px",
//   }

//   useEffect(() => {
//     async function renderCategorys(params) {
//       try {
//         const result = await getCategorys();
//         if (result !== null) {
//           const arr = [];
//           result.forEach((el, i) => {
//             const product = <div className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor`} key={el._id}>
//               {el.name}
//             </div >
//             arr.push(product);
//           });
//           setCategorys(arr);
//         }
//       } catch (error) {
//         console.log("error: ", error);
//       }
//     }
//     renderCategorys()
//   }, [])


//   useEffect(() => {
//     try {
//       async function checkType() {
//         const result = await getCategorys();
//         if (result !== null) {
//           const bool = result.some((el) => el._id === type);
//           console.log(bool);
//           if (bool) {
//             let name;
//             result.filter((el, i) => {
//               if (el._id === type) {
//                 name = el.name;
//                 console.log(name);
//               }
//               setNameType(name);
//             })
//             return
//           }
//           return redirect()
//         }
//       }
//       checkType()
//     } catch (error) {
//       console.log("error: ", error);
//     }
//   }, [])

//   console.log(refShowNumber.current);
//   return <>
//     <Header />
//     <div
//       className="backgr2">
//       <h3 className={`whiteColor center ${classes.h3Text}`}>Tipul: <span className={`greenColor ${classes.h3Text}`}>{nameType}</span></h3>
//       <div className={`max displayFlex ${classes.widthMax}`}>
//         <div>
//           <div className={`${classes.categoryList} `}>
//             <div className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign`}>
//               <ListSVG className={`${classes.list}`} />
//               <div>All Categorys</div>
//             </div>
//             {categorys}
//           </div>
//           <br />
//           <div className={`${classes.categoryList} `}>
//             <div className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign`} >
//               <TopSVG className={`${classes.top}`} fill="#fff" />
//               <div>Top 5 Producte</div>
//             </div>
//             {/* {topFiveProducts} */}
//           </div>
//         </div>
//         <div className={`${classes.widthMax} ${classes.margin} `}>
//           <div className={`${classes.greenBorder} ${classes.widthMax} ${classes.fontName} justifyAlign`}>
//             <div><HomeSVG className={`${classes.home}`} /> {'>'} Categorys {'>'} {nameType}  </div>
//             <div>Un text Special</div>
//           </div>
//           <div className={`flex ${classes.marginFlex}`}>
//             <div className="inline-flex">
//               <div className={`${classes.photo}`}>
//                 {/* {productCard} */}
//               </div>
//               <div className={`${classes.infoPartProduct}`}>
//                 Despre tipul {nameType}: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <SortBar
//         sortFunction={""}
//         showNumberRef={refShowNumber}
//         sortRef={refSort}
//         gridListfunction={""}
//         gridListfunction={""}
//       />

//       <br />
//     </div>

//     <Footer />
//   </>
// }

// export default Type