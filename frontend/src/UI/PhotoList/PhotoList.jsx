import { useStyles } from "./style/PhotoListStyles"


function PhotoList(props) {
  const classes = useStyles()

  return (
    <div className={classes.borderStyle} style={{
      background: `url("${props.imagePath}")`,
    }} title={props.title} />
  )
}

export default PhotoList