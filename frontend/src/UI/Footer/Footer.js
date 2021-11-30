import React, { useRef } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css';
import 'mdbreact/dist/css/mdb.css';


const Footer = () => {
  function facebookRedirect() {
    window.open("https://www.facebook.com/romedcom")
  }
  function linkedinRedirect() {
    window.open("https://www.linkedin.com/in/moldan-holding-647a65197")
  }
  function instagramRedirect() {
    window.open("https://instagram.com/romedcom_srl?utm_medium=copy_link")
  }
  return (
    <MDBFooter style={{ backgroundColor: "#077d82" }} className="font-small pt-4 ">
      <MDBContainer className="text-left text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="3" lg="3" xl="3" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Romedcom SRL
            </h6>
            <p>
              Societate comercială Romedcom S.R.L. este specializată în comercializarea de echipamente medicale şi serviciile conexe – instalarea, întreţinerea şi depanarea – precum şi consultanţă în constituirea de platforme tehnologice pentru servicii medicale.
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="2" lg="2" xl="2" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Informații</h6>
            <p>
              <a href="">Despre Noi</a>
            </p>
            <p>
              <a href="">Noutăți</a>
            </p>
            <p>
              <a href="">Servicii</a>
            </p>
            <p>
              <a href="">Parteneri</a>
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="3" lg="2" xl="2" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Urmărește-ne
            </h6>
            <p>
              <a className="fb-ic ml-0" onClick={facebookRedirect}>
                <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
              </a>
            </p>
            <p>
              <a className="li-ic" onClick={linkedinRedirect}>
                <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
              </a>
            </p>
            <p>
              <a className="gplus-ic" href="mailto:romedcom@gmail.com">
                <i className="fab fa-google-plus-g white-text mr-lg-4"> </i>
              </a>
            </p>
            <p>
              <a className="ins-ic" onClick={instagramRedirect}>
                <i className="fab fa-instagram white-text mr-lg-4"> </i>
              </a>
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="4" lg="4" xl="4" className="mx-auto mt-3 justify-content-start">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contacte</h6>
            <p>
              <i className="fa fa-home mr-3" /> str.Șciusev 16b, of.2, Chișinău, Republica Moldova MD-2024
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> office@romedcom.md
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> romedcom@gmail.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> + 373 22 530195
            </p>
            <p>
              <i className="fa fa-print mr-3" /> + 373 22 530195
            </p>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow className="d-flex align-items-center">
          <MDBCol md="4" lg="12">
            <p className="text-center grey-text">
              &copy; 2021 Copyright:{" "}
              <a href=""> Romedcom SRL </a>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>


  );
}

export default Footer;
