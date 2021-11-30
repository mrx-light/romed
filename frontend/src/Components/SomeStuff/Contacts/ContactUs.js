import React from 'react';
import './ContactUs.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ContactUs = () => {
  return (
    <>
    <Container fluid className="bg pt-3">  
      <h1 className='fs-1 text-uppercase text-center mt-3'>Contactează-ne</h1>
      <div className="underline mx-auto"></div>        
      <Row className="mt-4 mx-auto pb-4">       
        <Col className="" xs={12} md={12} lg={6}>   
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1qqru8xFMaT7R98cjESL38SY4QgUAfmT7"></iframe>     
        </Col>
        <Col xs={12} md={12} lg={6}>  
          <form>
            <div className="form-group mb-5">
              <input type="text" className="form-control" placeholder="Nume"/>
            </div>
            <div className="form-group mb-5">
              <input type="email" className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group mb-5">
              <input type="tel" className="form-control" placeholder="Telefon"/>
            </div>
              <textarea className="form-control mb-3" cols="30" rows="3" placeholder="Mesaj"/>
              <Button variant="button">Trimite</Button>
          </form>
        </Col>          
      </Row>
    </Container>
    </>
  );
}

export default ContactUs;
      

