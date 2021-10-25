import React from 'react';
import './News.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const News = () => {
  return (
<>
  <Container fluid className="text-center bg pt-3 mt-4">
    <h1 className='fs-1 text-uppercase text-center'>Noutăți</h1>
    <div className="underline mx-auto"></div>
    <Row>       
      <Col xs={12} md={12} lg={6}>         
        <Card className="text-center bg pt-3 mt-4">
          <Card.Body>
            <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>
            <Card.Text>
            MOLDMEDIZIN & MOLDDENT este cel mai important eveniment medical din Republica Moldova, care are drept scop dezvoltarea pieţei autohtone de produse şi servicii medicale. Expoziţia are menirea de a contribui la dotarea instituţiilor medicale din ţară cu tehnologii şi tehnică performantă de diagnosticare şi tratament.Pentru 3 zile „Moldexpo” devine centrul atenţiei comunităţii medicale din republică, o veritabilă şcoală a schimbului de experienţă şi a celor mai recente realizări în domeniul medicinii.
            </Card.Text>
              <Button variant="button">Vezi mai mult</Button>
          </Card.Body>
          <Card.Footer className="text-muted">{new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</Card.Footer>
        </Card>           
      </Col>
      <Col xs={12} md={12} lg={6}>
        <Card className="text-center bg pt-3 mt-4">
          <Card.Body>
            <Card.Title>MOLDMEDIZIN & MOLDDENT</Card.Title>
              <Card.Text>
                MOLDMEDIZIN & MOLDDENT este cel mai important eveniment medical din Republica Moldova, care are drept scop dezvoltarea pieţei autohtone de produse şi servicii medicale. Expoziţia are menirea de a contribui la dotarea instituţiilor medicale din ţară cu tehnologii şi tehnică performantă de diagnosticare şi tratament.Pentru 3 zile „Moldexpo” devine centrul atenţiei comunităţii medicale din republică, o veritabilă şcoală a schimbului de experienţă şi a celor mai recente realizări în domeniul medicinii.
              </Card.Text>
              <Button variant="button">Vezi mai mult</Button>
          </Card.Body>
          <Card.Footer className="text-muted">{new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</Card.Footer>
        </Card>    
      </Col>          
    </Row>
  </Container>
</>
  );
}

export default News;
      

