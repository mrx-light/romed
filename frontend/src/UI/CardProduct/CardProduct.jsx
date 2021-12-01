import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  CardActions,
  Button,
} from "@material-ui/core";
import { useEffect } from "react";
import { getProduct } from "./../../services/ProductServices";
import { useHistory } from "react-router";
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  noPaddin: {
    padding: "5px 5px 0px 15px",
  },
  back: {
    backgroundColor: "#e0e0e0",
  },
});
const CardProduct = (props) => {
  const classes = useStyles();
  const history = useHistory();
  function redirectToProduct(path) {
    history.push(path);
  }
  const styleButton = {
    backgroundColor: "#077d82",
    color: "white",
  };
  const nameButton = {
    color: "black",
    fontSize: "20px",
    width: "100%",
  };

  return (
    <Card
      className={`${classes.root} ${props.clas ?? ""} ${classes.back} `}
      key={props.keys}
    >
      <CardActionArea onClick={props.redirectToProduct}>
        <CardMedia
          component="img"
          alt={props.alt}
          height="160"
          image={props.imagePath}
          title={props.title}
        />
      </CardActionArea>
      <CardContent className={`${props.classContent} ${classes.noPaddin}`}>
        <div style={nameButton} className="blackGray">
          Denumire Produs:{" "}
          <span className="greenColor fontWeight">{props.title}</span>
        </div>
      </CardContent>
      <CardActions className={`${props.classActions}`}>
        <Button style={styleButton} onClick={props.buttonHandler}>
          {props.link}
        </Button>
        <Button style={styleButton} title={props.type} onClick={props.buttonHandlerCategorys}>
          {props.type.length > 12 ? "TIPUL" : props.type}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardProduct;
