import React from 'react';
import { useState } from 'react';
import Slider from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './Partners.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import imageManuFacturer1 from './../../assets/images/manufacturer_1.png';
import imageManuFacturer2 from '../../assets/images/manufacturer_2.jpg';
import imageManuFacturer3 from '../../assets/images/manufacturer_3.png';
import imageManuFacturer4 from '../../assets/images/manufacturer_4.png';
import imageManuFacturer5 from '../../assets/images/manufacturer_5.png';
import imageManuFacturer6 from '../../assets/images/manufacturer_6.jpg';
import imageManuFacturer7 from '../../assets/images/manufacturer_7.png';
import imageManuFacturer8 from '../../assets/images/manufacturer_8.png';
import imageManuFacturer9 from '../../assets/images/manufacturer_9.png';
import imageManuFacturer10 from '../../assets/images/manufacturer_10.jpg';
import { Button } from 'react-bootstrap';


const images = [imageManuFacturer1, imageManuFacturer2, imageManuFacturer3, imageManuFacturer4, imageManuFacturer5, imageManuFacturer6, imageManuFacturer7, imageManuFacturer8, imageManuFacturer9, imageManuFacturer10];

const Partners = () => {

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
  }

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
  }

  const [imageIndex, setImageIndex] = useState(0)

  const settings = {
    infinite: true,
    lasyLoad: true,
    speed: 300,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };

  return (
    <>
      <Container fluid className="text-center pt-3 pb-3 mt-4">
        <h1 className='fs-1 text-uppercase text-center'>Partenerii Noștri</h1>
        <div className="underline mx-auto mb-4"></div>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <div className="Partners">
              <Slider {...settings}>
                {images.map((img, index) => (
                  <div className={index === imageIndex ? 'slider activeSlider' : 'slider'}>
                    <img src={img} alt={img} />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Partners;


