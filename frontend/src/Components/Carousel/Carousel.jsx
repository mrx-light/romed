import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/CarouselStyles.css"
import image1 from './../../assets/images/carousel_1.jpg';
import image2 from './../../assets/images/carousel_2.jpg';
import image3 from './../../assets/images/carousel_3.jpg';

const CarouselContainer = () => {
  return (
    <Carousel className='marginBottom marginTop'>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1 className="text-uppercase fw-bold h1Carousel">Romedcom - Partenerul dvs de încredere pentru  procurarea echipamentului medical</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1 className="text-uppercase fw-bold h1Carousel">Echipament de calitate superioară la cel mai bun preț</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1 className="text-uppercase fw-bold h1Carousel">Descoperiți o  gamă largă de produse medicale</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselContainer;