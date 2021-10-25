import React from 'react';
import './AboutUs.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image1 from '../../assets/images/about.jpg';

const AboutUs = () => {
  return (
    <>
    <Container fluid className="bg pt-3">
    <h1 className='fs-1 text-uppercase text-center '>Despre Noi</h1>
        <div className="underline mx-auto mb-3"></div>      
      <Row>       
        <Col xs={12} md={12} lg={3} className="pb-3">         
          <Card> 
            <Card.Img variant="top" src={image1}/>
          </Card>        
          </Col>
        <Col className="mt-3" xs={12} md={12} lg={9}>        
          <p>Societatea comercială ”Romedcom” SRL a fost înființată în 2004 și pînă în prezent este un operator economic care realizează și distribuie echipamente medicale de performanță înaltă, consumabile, reactivi pentru laborator, piese de schimb și mobilier medical pentru instituțiile medico-sanitare publice și private din Republica Moldova. Pentru activitatea societății ”Romedcom” SRL au fost realizate contracte de cooperare cu mai mulți producători mondiali.</p>
          <p>În perioada 2014-2018 au fost încheiate contracte cu instituții medico-sanitare publice în urma desfășurărilor licitațiilor publice deschise. Totodată societatea ”Romedcom” SRL a contractat servicii și bunuri în sectorul medical din fonduri europene și internaționale de către: <span className="text-muted"> UCIMP DS </span>(Unitatea de Coordonare, Implementare și Monitorizare a Proiectelor în Domeniul Sănătății), <span className="text-muted"> UNDP Moldova </span> (United Nations Development Programme), <span className="text-muted">PAS </span>(Centrul pentru Politici și Analize în Sănătate), dar și cu instituții medicale private și altele.</p> 
          <p> Pînă în prezent cu succes au fost realizate contractele sus menționate, satisfăcînd toate cerințele iar în final autoritățile contractante au beneficiat de bunuri și servicii calitative la costuri eficiente.</p>
        </Col>          
      </Row>
    </Container>
    </>
  );
}

export default AboutUs;
      

