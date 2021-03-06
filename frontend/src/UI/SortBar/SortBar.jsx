import { IconButton, Button } from "@material-ui/core";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg"
import { ReactComponent as GridSVG } from "./../../assets/images/grid.svg"

function SortBar(props) {
  return <div className="boxMargin">
    <div className="boxControl justifyAlign whiteColor">
      <span>
        <IconButton onClick={props.gridListfunction}>
          <GridSVG fill="#d6dee1" className="widthIconGrid" />
        </IconButton>
        <IconButton onClick={props.gridListfunction}>
          <ListSVG fill="#d6dee1" className="widthIcon" />
        </IconButton>
      </span>
      <span>
        <span className="spaceAroundButton">
          <span>Sorteaza: </span>
          <select className="lineChange lineChangeInner" ref={props.sortRef} >
            <option value="default">Default</option>
            <option value="A->Z">De la A la Z</option>
            <option value="Z->A">De la Z la A</option>
            <option value="A->Z-Model">De la A la Z model</option>
            <option value="Z->A-Model">De la Z la A model</option>
            <option value="views">Dupa Vizualizari</option>
          </select>
        </span>
        <span>Arata: </span>
        <select className="lineChange lineChangeInner" ref={props.showNumberRef} >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
        <Button variant="contained" onClick={props.sortFunction}>Aplica</Button>
      </span>
    </div>
  </div>
}

export default SortBar