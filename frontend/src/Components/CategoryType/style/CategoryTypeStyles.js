import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  bgGr: {
    background: "#a8bbbf",
  },
  h3Text: {
    padding: "20px",
    fontWeight: "600",
  },
  padding: {
    margin: "10px 80px 10px 80px",
  },
  sticky: {
    position: "sticky",
    top: "5rem",
    paddingLeft: "4%",
  },
  margin: {
    margin: "1rem 40px",
  },
  back: {
    background: "#e7f6fc",
  },
  paddingSearch: {
    padding: "10px 300px",
  },
  height: {
    height: "8rem",
    overflow: "scroll",
    overflowX: "hidden",
    width: "300px",
  },
  categoryList: {
    width: "250px",
    borderRadius: "5px",
    border: "3px solid #077d82",
    "@media (max-width: 900px)": {
      width: "50%",
      margin: "auto",
      textAlign: "center",
    },
  },
  allCategorys: {
    padding: "5px",
  },
  list: {
    width: "20px",
    fill: "white",
    height: "20px",
  },
  listCategory: {
    fontWeight: "600",
  },
  headerList: {
    paddingRight: "40px",
    paddingLeft: "20px",
    margin: "-1px",
  },
  top: {
    width: "28px",
    fill: "white",
    height: "28px",
  },
  home: {
    width: "20px",
    fill: "white",
    height: "20px",
    marginBottom: "3px",
  },
  photo: {
    width: "250px",
    height: "250px",
    borderRadius: "5px",
    background: "white",
  },
  borderStyle: {
    width: "250px",
    height: "250px",
    backgroundRepeat: "no-repeat!important",
    backgroundSize: "cover!important",
    backgroundPosition: "50% 50% !important",
    objectFit: "fill",
    margin: "-1px",
    borderRadius: "5px",
  },

  greenBorder: {
    width: "100%",
    padding: "5px",
    backgroundColor: "#077d82",
    color: "white",
    border: "1px solid #fff",
    borderRadius: "5px",
  },
  left: {
    justifyContent: "left",
  },
  right: {
    justifyContent: "right",
  },
  widthMax: {
    width: "100%",
    "@media (max-width: 900px)": {
      width: "auto",
    },
  },
  infoPartProduct: {
    padding: "5px",
    height: "250px",
    backgroundColor: "#077d82",
    color: "white",
    border: "1px solid #fff",
    borderRadius: "5px",
    width: "400px",
    marginLeft: "20px",
    fontWeight: "700",
    fontSize: "19px",
    overflowY: "scroll",
  },
  content: {
    overflow: "hidden",
    overflowY: "scroll",
  },
  margin: {
    margin: "0px 20px ",
  },
  marginFlex: {
    margin: "10px 0px 10px 0px ",
  },
  fontName: {
    fontSize: "19px",
    fontWeight: "600",
  },
  h3Text: {
    padding: "20px",
    fontWeight: "600",
  },
  servic: {
    maxWidth: "210px!important",
  },
  paddingCard: {
    padding: "5px",
  },
  marginContent: {
    margin: "20px",
  },
  iconWidth: {
    width: "17px",
    height: "17px",
  },
  marginEndNumbers: {
    marginLeft: "65px",
    marginRight: "14px",
  },
});

export default useStyles;
