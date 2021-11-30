//CategoryList

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCategorys } from "../../services/AdminServices";
import Header from "./../Header/Header";
import { useStyles } from "./style/CategoryListStyles";
import { ReactComponent as ListSVG } from "./../../assets/images/list.svg";
import "./style/CategoryListStyles.css";

const CategoryList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  function goToCategoryhandler(param) {
    history.push(param);
  }
  const [categorys, setCategorys] = useState();

  useEffect(() => {
    async function renderCategorys(params) {
      try {
        const result = await getCategorys();
        if (result !== null) {
          const arr = [];
          result.forEach((el, i) => {
            const product = (
              <div
                onClick={() => {
                  goToCategoryhandler(`/categorys/${el._id}`);
                }}
                className={`backgr ${classes.allCategorys} ${classes.listCategory} greenColor cursor`}
                key={i}
              >
                {el.name}
              </div>
            );
            arr.push(product);
          });
          setCategorys(arr);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    renderCategorys();
  }, []);
  return (
    <div className={`categoryList `}>
      <div
        className={`${classes.allCategorys} ${classes.headerList} whiteColor backgreen justifyAlign borderMainText`}
      >
        <ListSVG
          className={`${classes.list} cursor`}
          onClick={() => {
            goToCategoryhandler("/categorys");
          }}
        />
        <div>All Categorys</div>
      </div>
      <div className="borderSecondaryText">{categorys}</div>
    </div>
  );
};
export default CategoryList;
