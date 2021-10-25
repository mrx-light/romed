import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, CardActions, Button } from "@material-ui/core"
import { useEffect } from "react";
import { getProduct } from "./../../services/ProductServices"
import { useHistory } from "react-router";
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});
const CardProduct = (props) => {
  const classes = useStyles()
  const history = useHistory()
  function redirectToProduct(path) {
    history.push(path);
  }
  const styleButton = {
    backgroundColor: " #a8bbbf",
    //
    // color: "#077d82"
  };
  const nameButton = {
    backgroundColor: "#077d82",
    color: "#fff",
    width: "100%",
  }

  return (
    <Card className={`${classes.root} ${props.clas ?? ""} `} key={props.keys}>
      <CardActionArea onClick={props.redirectToProduct}>
        <CardMedia
          component="img"
          alt={props.alt}
          height="160"
          image={props.imagePath}
          title={props.title}
        />
      </CardActionArea>
      <CardContent className={props.classContent}>
        <Button style={nameButton}>
          {props.title}
        </Button>
      </CardContent>
      <CardActions className={`${props.classActions} justifyAlign`}>
        <Button style={styleButton} onClick={props.buttonHandler}>{props.link}</Button>
        <Button style={styleButton} >{props.type}</Button>
      </CardActions>
    </Card>
  )
}

export default CardProduct;