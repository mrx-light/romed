import React, { useEffect } from "react";
import "./style/HomeStyles.css";
import Footer from "./../../UI/Footer/Footer";
import Header from "./../../UI/Header/Header";
import Carousel from "../Carousel/Carousel.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import imageCarousel222 from "./../../assets/images/carousel_2.jpg";
import imageCarousel333 from "./../../assets/images/carousel_3.jpg";
import image1 from "../../assets/images/about.jpg";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import imageServices111 from "../../assets/images/services_1.png";
import imageServices222 from "../../assets/images/services_2.png";
import imageServices333 from "../../assets/images/services_3.png";
import imageServices444 from "../../assets/images/services_4.png";
import { useState } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import imageManuFacturer1 from "../../assets/images/manufacturer_1.png";
import imageManuFacturer2 from "../../assets/images/manufacturer_2.jpg";
import imageManuFacturer3 from "../../assets/images/manufacturer_3.png";
import imageManuFacturer4 from "../../assets/images/manufacturer_4.png";
import imageManuFacturer5 from "../../assets/images/manufacturer_5.png";
import imageManuFacturer6 from "../../assets/images/manufacturer_6.jpg";
import imageManuFacturer7 from "../../assets/images/manufacturer_7.png";
import imageManuFacturer8 from "../../assets/images/manufacturer_8.png";
import imageManuFacturer9 from "../../assets/images/manufacturer_9.png";
import imageManuFacturer10 from "../../assets/images/manufacturer_10.jpg";
import Button from "react-bootstrap/Button";
import AboutUs from "../AboutUs/AboutUs";
import { useRef } from "react";
import { getCategorys } from "../../services/AdminServices";
import { CardMedia } from "@material-ui/core";
import Products from "../../UI/Products/Products";

const images = [
  imageManuFacturer1,
  imageManuFacturer2,
  imageManuFacturer3,
  imageManuFacturer4,
  imageManuFacturer5,
  imageManuFacturer6,
  imageManuFacturer7,
  imageManuFacturer8,
  imageManuFacturer9,
  imageManuFacturer10,
];

const Home = () => {
  const refAboutUs = useRef();
  const refNews = useRef();
  const refServices = useRef();
  const refProducts = useRef();
  const refPartners = useRef();
  const refContacts = useRef();

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

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
        },
      },
    ],
  };
  // console.log(refAboutUs.current.offsetHeight);
  // console.log(refAboutUs.current.scrollHeight);

  return (
    <>
      <Header
        aboutScroll={refAboutUs}
        newsScroll={refNews}
        servicesScroll={refServices}
        productsScroll={refProducts}
        partnersScroll={refPartners}
        contactsScroll={refContacts}
      />
      <Carousel />
      <AboutUs refAboutUs={refAboutUs} />
      <Container fluid className="text-center  pt-3 mt-4" ref={refNews}>
        <h1 className="fs-1 text-uppercase text-center">Noutăți</h1>
        <div className="underline mx-auto"></div>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <Card className="text-center bg pt-3 mt-4">
              <Card.Body>
                <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>
                <Card.Text>
                  MOLDMEDIZIN & MOLDDENT este cel mai important eveniment
                  medical din Republica Moldova, care are drept scop dezvoltarea
                  pieţei autohtone de produse şi servicii medicale. Expoziţia
                  are menirea de a contribui la dotarea instituţiilor medicale
                  din ţară cu tehnologii şi tehnică performantă de diagnosticare
                  şi tratament.Pentru 3 zile „Moldexpo” devine centrul atenţiei
                  comunităţii medicale din republică, o veritabilă şcoală a
                  schimbului de experienţă şi a celor mai recente realizări în
                  domeniul medicinii.
                </Card.Text>
                <Button variant="button">Vezi mai mult</Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                {new Date().getDate()}/{new Date().getMonth()}/
                {new Date().getFullYear()}
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <Card className="text-center bg pt-3 mt-4">
              <Card.Body>
                <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>
                <Card.Text>
                  MOLDMEDIZIN & MOLDDENT este cel mai important eveniment
                  medical din Republica Moldova, care are drept scop dezvoltarea
                  pieţei autohtone de produse şi servicii medicale. Expoziţia
                  are menirea de a contribui la dotarea instituţiilor medicale
                  din ţară cu tehnologii şi tehnică performantă de diagnosticare
                  şi tratament.Pentru 3 zile „Moldexpo” devine centrul atenţiei
                  comunităţii medicale din republică, o veritabilă şcoală a
                  schimbului de experienţă şi a celor mai recente realizări în
                  domeniul medicinii.
                </Card.Text>
                <Button variant="button">Vezi mai mult</Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                {new Date().getDate()}/{new Date().getMonth()}/
                {new Date().getFullYear()}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid className="text-center bg pb-3 mt-4 " ref={refServices}>
        <div className="container">
          <h1 className="fs-1 text-uppercase text-center">Servicii</h1>
          <div className="underline mx-auto mb-4"></div>
          <Row xs={1} md={4} className="g-4 ">
            <Col xs={12} md={6} lg={3}>
              <Card>
                <Card.Img variant="top" src={imageServices111} />
                <Card.Body>
                  <Card.Title>
                    Comercializarea Dispozitivelor Medicale
                  </Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card>
                <Card.Img variant="top" src={imageServices222} />
                <Card.Body>
                  <Card.Title>Mentenanța Dispozitivelor Medicale</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card>
                <Card.Img variant="top" src={imageServices333} />
                <Card.Body>
                  <Card.Title>Livrarea echipamentelor medicale</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card>
                <Card.Img variant="top" src={imageServices444} />
                <Card.Body>
                  <Card.Title>Garanția Dispozitivelor Medicale</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <br />
      <br />
      <Products refProducts={refProducts} />
      <Container fluid className="text-center pt-3 pb-3 mt-4" ref={refPartners}>
        <h1 className="fs-1 text-uppercase text-center">Partenerii Noștri</h1>
        <div className="underline mx-auto mb-4"></div>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <div className="Partners">
              <Slider {...settings}>
                {images.map((img, index) => (
                  <div
                    className={
                      index === imageIndex ? "slider activeSlider" : "slider"
                    }
                    key={index}
                  >
                    <img src={img} alt={img} />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="bg pt-3" ref={refContacts}>
        <h1 className="fs-1 text-uppercase text-center mt-3">Contactează-ne</h1>
        <div className="underline mx-auto"></div>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
