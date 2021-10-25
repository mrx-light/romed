import { Card, CardMedia } from "@material-ui/core";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getCategorys } from "../../services/AdminServices";
import { Button } from "@material-ui/core";

const Products = (props) => {
  const style = {
    backgroundColor: "#077d82",
    color: "#fff"
  }

  const [categorys, setCategorys] = useState([])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
  useEffect(() => {
    const Run = async () => {

      const style = {
        backgroundColor: "#077d82",
        color: "#fff"
      }

      const result = await getCategorys();
      console.log(result)
      const arr = [];
      result.forEach((el, i) => {
        const category =
          <>
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
          </>
        arr.push(category);
      })
      setCategorys(arr)
    }
    Run()
  }, [])
  return (
    <div ref={props.refProducts}>

      <div className="backBlue">
        <br />
        <h1 className="center">PRODUSE</h1>
        <div className="underline mx-auto mb-4"></div>
        <h4 className="center">Categorii de Produse</h4>
        <br />
        <div className="max">
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
          <h4 className="center">Vedeti Produsele</h4>
          <div className="flex"><Button style={style} variant="contained">PRODUSE</Button></div>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Products