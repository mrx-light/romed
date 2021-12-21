import { Card, Carousel, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../Components/Home/style/HomeStyles.css";
import "./HomePageStyles.css";
import Img1 from "./../assets/images/carousel_1.jpg";
import Img2 from "./../assets/images/carousel_2.jpg";
import Img3 from "./../assets/images/carousel_3.jpg";
import firstImageServices from "./../assets/images/services_1.png";
import secondImageServices from "./../assets/images/services_2.png";
import thirdImageServices from "./../assets/images/services_3.png";
import fourthImageServices from "./../assets/images/services_4.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import imageManuFacturer1 from "./../assets/images/manufacturer_1.png";
import imageManuFacturer2 from "./../assets/images/manufacturer_2.jpg";
import imageManuFacturer3 from "./../assets/images/manufacturer_3.png";
import imageManuFacturer4 from "./../assets/images/manufacturer_4.png";
import imageManuFacturer5 from "./../assets/images/manufacturer_5.png";
import imageManuFacturer6 from "./../assets/images/manufacturer_6.jpg";
import imageManuFacturer7 from "./../assets/images/manufacturer_7.png";
import imageManuFacturer8 from "./../assets/images/manufacturer_8.png";
import imageManuFacturer9 from "./../assets/images/manufacturer_9.png";
import imageManuFacturer10 from "./../assets/images/manufacturer_10.jpg";
import "./../App.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import CategoryList from "../UI/CategoryList/CategoryList";
import {
  getCategorys,
  getPasswordLogin,
  sendEmail,
  putBoolLogin,
} from "../services/AdminServices";
import { useHistory } from "react-router";
import { loginBool } from "../GlobalVar/LoginBool";
import { loginPassword, passwordStr } from "../GlobalVar/LoginPassword";
import Header from "../UI/Header/Header";
import { Dialog, DialogTitle } from "@material-ui/core";

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

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight fill={"#077d82"} />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft fill={"#077d82"} />
    </div>
  );
};

function CarouselApp() {
  const card = {
    borderRadius: "10px",
  };
  const refEmail = useRef();
  const refNumber = useRef();
  const refText = useRef();
  const refName = useRef();
  const refAboutUs = useRef();
  const refNews = useRef();
  const refServices = useRef();
  const refProducts = useRef();
  const refPartners = useRef();
  const refContacts = useRef();

  const [imageIndex, setImageIndex] = useState(0);
  const [categorys, setCategorys] = useState([]);
  const [redirectToAdmin, setRedirectToLogin] = useState(false);
  const [openFirstNew, setOpenFirstNew] = useState(false);
  const [openSecondNew, setOpenSecondNew] = useState(false);

  const history = useHistory();
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

  useEffect(() => {
    try {
      async function render() {
        const result = await getCategorys();
        if (result != null) {
          const array = [];
          result.forEach((el, i) => {
            const card = (
              <Carousel.Item interval={1000} key={i}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:2000/image/categorys/${el.photoId}`}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3 className="textAbout">{el.name}</h3>
                  <p className="textAbout">{el.content}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
            array.push(card);
          });
          setCategorys(array);
        }
      }
      render();
    } catch (error) {
      console.log(error, error);
    }
  }, []);

  function redirect(param) {
    history.push(param);
  }

  async function handleButton() {
    const valueEmail = refEmail.current.value;
    const valueNumber = refNumber.current.value;
    const valueText = refText.current.value;
    const valueName = refName.current.value;
    const result = await getPasswordLogin();
    const as = await putBoolLogin(true);
    if (redirectToAdmin && result[0]._id === valueEmail) {
      const confirm = window.confirm(
        "Are You Sure?\n If You Aren't The Admin Plese Select Cancel And Refresh The Page"
      );
      if (confirm) {
        loginBool(confirm);
        loginPassword(valueEmail);
        redirect("/login");
      }
      return;
    }
    // await sendEmail({
    //   name: valueName,
    //   text: valueText,
    //   number: valueNumber,
    //   email: valueEmail,
    // });

    return;
  }
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
      <div className="containerPhotos">
        <Carousel
          fade={true}
          nextIcon={<span className="fontIcons">{"❯"}</span>}
          prevIcon={<span className="fontIcons">{"❮"}</span>}
        >
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={Img1} alt="First slide" />
            <Carousel.Caption>
              <h3 className="textAbout caruselBigText">First slide label</h3>
              <p className="textAbout">
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={Img2} alt="Second slide" />
            <Carousel.Caption>
              <span>
                <h3 className="textAbout caruselBigText">Second slide label</h3>
              </span>
              <p className="textAbout">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={Img3} alt="Third slide" />
            <Carousel.Caption>
              <h3 className="textAbout caruselBigText">Third slide label</h3>
              <p className="textAbout">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="backBlue">
        <div className="max">
          <br />
          <div className="margin_center">
            <div>
              <br />
              <h1 className="greenColor ">PRODUSELE NOASTRE</h1>
              <div className="underline bgGreen "></div>
            </div>
          </div>
          <h4 className="textAlign greenColor textH4About">
            Societate comercială Romedcom S.R.L. este specializată în
            comercializarea de echipamente medicale şi serviciile conexe –
            instalarea, întreţinerea şi depanarea – precum şi consultanţă în
            constituirea de platforme tehnologice pentru servicii medicale.
          </h4>
          <div className="spaceAround">
            <CategoryList />
            <div className="containerPhotosCategorys">
              <Carousel
                fade={true}
                nextIcon={<span className="fontIcons">{"❯"}</span>}
                prevIcon={<span className="fontIcons">{"❮"}</span>}
                className="carouselCategorys"
              >
                {categorys}
              </Carousel>
            </div>
          </div>

          <div className="center">
            <Button variant="button" onClick={() => redirect("/categorys")}>
              Toate Categoriile
            </Button>
          </div>
          <br />
          <div className="underline bgGreen "></div>
          <br />
        </div>
      </div>
      <br />
      <div className="max" ref={refAboutUs}>
        <div className="margin_center">
          <div>
            <br />
            <h1 className="greenColor">DESPRE NOI</h1>
            <div className="underline  greenColor"></div>
          </div>
        </div>
        <h4 className="textAlign  textH4About">
          Societate comercială Romedcom S.R.L. este specializată în
          comercializarea de echipamente medicale şi serviciile conexe –
          instalarea, întreţinerea şi depanarea – precum şi consultanţă în
          constituirea de platforme tehnologice pentru servicii medicale.
        </h4>
        <br />
        <div className="space-between">
          <div
            className="photoAbout"
            onClick={() =>
              setRedirectToLogin((prev) => {
                return !prev;
              })
            }
          ></div>
          <div className="contentAbout">
            Pînă în prezent cu succes au fost realizate contractele sus
            menționate, satisfăcînd toate cerințele iar în final autoritățile
            contractante au beneficiat de bunuri și servicii calitative la
            costuri eficiente. Societatea comercială ”Romedcom” SRL a fost
            înființată în 2004 și pînă în prezent este un operator economic care
            realizează și distribuie echipamente medicale de performanță înaltă,
            consumabile, reactivi pentru laborator, piese de schimb și mobilier
            medical pentru instituțiile medico-sanitare publice și private din
            Republica Moldova. Pentru activitatea societății ”Romedcom” SRL au
            fost realizate contracte de cooperare cu mai mulți producători
            mondiali. Pînă în prezent cu succes au fost realizate contractele
            sus menționate, satisfăcînd toate cerințele iar în final
            autoritățile contractante au beneficiat de bunuri și servicii
            calitative la costuri eficiente.
          </div>
        </div>
      </div>
      <br />
      <div className="underline greenBg "></div>

      <br />

      <div className="bgGreen" ref={refNews}>
        <div className="container">
          <br />
          <br />
          <h1 className="fs-1 text-uppercase text-center whiteColor">
            Noutăți
          </h1>
          <div className="underline mx-auto white"></div>
          <Row>
            <Col xs={12} md={12} lg={6}>
              <Card className="text-center bg pt-3 mt-4 ">
                <Card.Body>
                  <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>
                  <Card.Text>
                    MOLDMEDIZIN & MOLDDENT este cel mai important eveniment
                    medical din Republica Moldova, care are drept scop
                    dezvoltarea pieţei autohtone de produse şi servicii
                    medicale. Expoziţia are menirea de a contribui la dotarea
                    instituţiilor medicale din ţară cu tehnologii şi tehnică
                    performantă de diagnosticare şi tratament.Pentru 3 zile
                    „Moldexpo” devine centrul atenţiei comunităţii medicale din
                    republică, o veritabilă şcoală a schimbului de experienţă şi
                    a celor mai recente realizări în domeniul medicinii.
                  </Card.Text>
                  <Button
                    variant="button"
                    onClick={() => setOpenFirstNew(true)}
                  >
                    Vezi mai mult
                  </Button>
                  <Dialog
                    open={openFirstNew}
                    onClose={() => setOpenFirstNew(false)}
                  >
                    <Card className="text-center bg ">
                      <Card.Body>
                        <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>

                        <h2>Un Text Important</h2>
                        <br />
                        <h5>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </h5>
                        <br />
                        <Button
                          variant="button"
                          onClick={() =>
                            window.open(
                              "https://mail.google.com/mail/u/0/#inbox",
                              "_blank"
                            )
                          }
                        >
                          Link Catre Site
                        </Button>
                        <br />
                        <br />
                        <Card.Text>
                          MOLDMEDIZIN & MOLDDENT este cel mai important
                          eveniment medical din Republica Moldova, care are
                          drept scop dezvoltarea pieţei autohtone de produse şi
                          servicii medicale. Expoziţia are menirea de a
                          contribui la dotarea instituţiilor medicale din ţară
                          cu tehnologii şi tehnică performantă de diagnosticare
                          şi tratament.Pentru 3 zile „Moldexpo” devine centrul
                          atenţiei comunităţii medicale din republică, o
                          veritabilă şcoală a schimbului de experienţă şi a
                          celor mai recente realizări în domeniul medicinii.
                        </Card.Text>
                        <Button
                          variant="button"
                          onClick={() => setOpenFirstNew(false)}
                        >
                          Inchideti
                        </Button>
                        <br />
                        <br />
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        {new Date().getDate()}/{new Date().getMonth()}/
                        {new Date().getFullYear()}
                      </Card.Footer>
                    </Card>
                  </Dialog>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {new Date().getDate()}/{new Date().getMonth()}/
                  {new Date().getFullYear()}
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <Card className="text-center bg pt-3 mt-4 ">
                <Card.Body>
                  <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>
                  <Card.Text>
                    MOLDMEDIZIN & MOLDDENT este cel mai important eveniment
                    medical din Republica Moldova, care are drept scop
                    dezvoltarea pieţei autohtone de produse şi servicii
                    medicale. Expoziţia are menirea de a contribui la dotarea
                    instituţiilor medicale din ţară cu tehnologii şi tehnică
                    performantă de diagnosticare şi tratament.Pentru 3 zile
                    „Moldexpo” devine centrul atenţiei comunităţii medicale din
                    republică, o veritabilă şcoală a schimbului de experienţă şi
                    a celor mai recente realizări în domeniul medicinii.
                  </Card.Text>
                  <Button
                    variant="button"
                    onClick={() => setOpenSecondNew(true)}
                  >
                    Vezi mai mult
                  </Button>
                  <Dialog
                    open={openSecondNew}
                    onClose={() => setOpenSecondNew(false)}
                  >
                    <Card className="text-center bg ">
                      <Card.Body>
                        <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>

                        <h2>Un Text Important</h2>
                        <br />
                        <h5>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </h5>
                        <br />
                        <Button
                          variant="button"
                          onClick={() =>
                            window.open(
                              "https://mail.google.com/mail/u/0/#inbox",
                              "_blank"
                            )
                          }
                        >
                          Link Catre Site
                        </Button>
                        <br />
                        <br />
                        <Card.Text>
                          MOLDMEDIZIN & MOLDDENT este cel mai important
                          eveniment medical din Republica Moldova, care are
                          drept scop dezvoltarea pieţei autohtone de produse şi
                          servicii medicale. Expoziţia are menirea de a
                          contribui la dotarea instituţiilor medicale din ţară
                          cu tehnologii şi tehnică performantă de diagnosticare
                          şi tratament.Pentru 3 zile „Moldexpo” devine centrul
                          atenţiei comunităţii medicale din republică, o
                          veritabilă şcoală a schimbului de experienţă şi a
                          celor mai recente realizări în domeniul medicinii.
                        </Card.Text>
                        <Button
                          variant="button"
                          onClick={() => setOpenSecondNew(false)}
                        >
                          Inchideti
                        </Button>
                        <br />
                        <br />
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        {new Date().getDate()}/{new Date().getMonth()}/
                        {new Date().getFullYear()}
                      </Card.Footer>
                    </Card>
                  </Dialog>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {new Date().getDate()}/{new Date().getMonth()}/
                  {new Date().getFullYear()}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <br />
          <div className="underline mx-auto white"></div>

          <br />
        </div>
      </div>
      <div ref={refPartners}>
        <br />
        <br />
        <div className="container">
          <h1 className="fs-1 text-uppercase text-center greenColor">
            PARTENERI
          </h1>
          <div className="underline mx-auto "></div>
          <h4 className="textAlign  textH4About">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </h4>
          <br />
          <Row>
            <Col xs={12} md={12} lg={12}>
              <div className="">
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
        </div>

        <div className="underline mx-auto"></div>
        <br />
      </div>
      <div className="backBlue" ref={refServices}>
        <br />
        <br />
        <div className="container">
          <h1 className="greenColor center">SERVICII</h1>
          <div className="underline mx-auto bgGreen"></div>

          <h4 className="textAlign greenColor textH4About">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </h4>
          <br />
          <Row xs={1} md={4} className="g-4 ">
            <Col xs={12} md={6} lg={3}>
              <Card style={card}>
                <Card.Img variant="top" src={firstImageServices} />
                <Card.Body className="center">
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
              <Card style={card}>
                <Card.Img variant="top" src={secondImageServices} />
                <Card.Body className="center">
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
              <Card style={card}>
                <Card.Img variant="top" src={thirdImageServices} />
                <Card.Body className="center">
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
              <Card style={card}>
                <Card.Img variant="top" src={fourthImageServices} />
                <Card.Body className="center">
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
          <br />
          <div className="underline mx-auto bgGreen"></div>
          <br />
        </div>
      </div>
      <div ref={refContacts}>
        <br />
        <br />
        <h1 className="center greenColor">CONTACTEAZĂ-NE</h1>
        <div className="underline mx-auto"></div>
        <h4 className="textAlign  textH4About">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </h4>
        <br />
        <Row className="mt-4 mx-auto pb-4">
          <Col className="" xs={12} md={12} lg={6}>
            <iframe
              className="borderIframe iframeHeight"
              src="https://www.google.com/maps/d/u/0/embed?mid=1qqru8xFMaT7R98cjESL38SY4QgUAfmT7"
            ></iframe>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <form>
              <div className="form-group mb-5">
                <input
                  maxLength="30"
                  ref={refName}
                  type="text"
                  className="form-control borderInputs"
                  placeholder="Nume"
                />
              </div>
              <div className="form-group mb-5">
                <input
                  ref={refEmail}
                  type="email"
                  className="form-control borderInputs"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mb-5">
                <input
                  maxLength="15"
                  ref={refNumber}
                  type="number"
                  className="form-control borderInputs"
                  placeholder="Telefon"
                />
              </div>
              <textarea
                maxLength="200"
                ref={refText}
                className="form-control mb-3 borderInputs"
                cols="30"
                rows="3"
                placeholder="Mesaj"
              />
              <div className="margin_center">
                <Button
                  variant="button"
                  className="buttonContacts "
                  onClick={handleButton}
                >
                  Trimite
                </Button>
              </div>
            </form>
          </Col>
        </Row>
        <div className="underline mx-auto"></div>
        <br />
      </div>
    </>
  );
}

export default CarouselApp;
