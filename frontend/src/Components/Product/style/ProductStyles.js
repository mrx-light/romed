import { Hidden, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    width: "400px",
    display: "block",
    height: "300px",
  },
  rootCard: {
    width: 400,
    display: "block",
    height: "300px",
  },
  category: {
    wigth: "20rem",
  },
  padding: {
    margin: "10px 80px 10px 80px",
  },
  heightContent: {
    height: "170px",
    overflow: "hidden",
    overflowY: "scroll",
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
    "@media(max-width: 900px)": {
      width: "70%",
      margin: "auto",
      textAlign: "center"
    }
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
    border: "2px solid white",
    borderRadius: "5px",
    "@media(max-width: 900px)": {
      margin: "auto",
    }
  },
  borderStyle: {
    width: "247px",
    height: "247px",
    backgroundRepeat: "no-repeat!important",
    backgroundSize: "contain!important",
    backgroundPosition: "50% 50% !important",
    objectFit: "fill",
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
    "@media(max-width: 900px)": {
      width: "auto",
    }
  },
  infoPartProduct: {
    padding: "5px",
    backgroundColor: "#077d82",
    color: "white",
    border: "1px solid #fff",
    borderRadius: "5px",
    width: "400px",
    margin: "20px",
    fontWeight: "700",
    fontSize: "19px",
    "@media(max-width: 900px)": {
      width: "100%",
      margin: "20px 0"
    }
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
    "@media(max-width: 900px)": {
      maxWidth: "300px!Important"
    }
  },
  paddingCard: {
    padding: "5px",
  },

  iconWidth: {
    width: "15px",
    height: "15px",
  },
});
