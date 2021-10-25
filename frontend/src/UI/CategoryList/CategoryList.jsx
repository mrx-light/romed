//CategoryList
import Button from "material-ui/core"
import { useHistory } from "react-router-dom"
import Header from "./../Header/Header"
const CategoryList = (props) => {
  const history = useHistory();
  function goToCategoryhandler(param) {
    history.push(param)
  }
  return (
    <>
      <Header />
      <div>
        <Button >Category 1</Button>
        <Button >Category 2</Button>
        <Button >Category 3</Button>
        <Button >Category 4</Button>
        <Button >Category 5</Button>
        <Button >Category 6</Button>
        <Button >Category 7</Button>
        <Button >Category 8</Button>
        <Button >Category 9</Button>
      </div>
    </>
  )
}
export default CategoryList