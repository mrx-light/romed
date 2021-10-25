import React from 'react';
import './Services.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image1 from '../../assets/images/services_1.png';
import image2 from '../../assets/images/services_2.png';
import image3 from '../../assets/images/services_3.png';
import image4 from '../../assets/images/services_4.png';

const Services = () => {
  return (
<>
  <Container fluid className="text-center bg pt-3 pb-3 mt-4">
    <h1 className='fs-1 text-uppercase text-center'>Servicii</h1>
    <div className="underline mx-auto mb-4"></div>
    <Row xs={1} md={4} className="g-4 "> 
    <Col xs={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" src={image1} />
        <Card.Body>
          <Card.Title>Comercializarea Dispozitivelor Medicale</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" src={image2} />
        <Card.Body>
          <Card.Title>Mentenanța Dispozitivelor Medicale</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" src={image3} />
        <Card.Body>
          <Card.Title>Livrarea echipamentelor medicale</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" src={image4} />
        <Card.Body>
          <Card.Title>Garanția Dispozitivelor Medicale</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>   
</Row>    
</Container>
</>
  );
}

export default Services;
      

