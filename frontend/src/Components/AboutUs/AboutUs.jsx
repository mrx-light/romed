import { CardMedia, Card, Typography, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import imageCarousel111 from './../../assets/images/carousel_1.jpg';
import "./../../App.css"
const AboutUs = (props) => {
  const useStyles = makeStyles({
    width: {
      width: "40rem"
    },
    height: {
      height: "8rem",
      overflow: "scroll",
      overflowX: "hidden",
      // overflowY: "hidden"

    },
    text: {
      textAlign: "",
      paddingLeft: "20px"
    }
  })
  const objStyles = { backgroundColor: "#077d82", color: "#e1f5fe", }
  const classes = useStyles()
  return (
    <>
      <div ref={props.refAboutUs} className="bg pt-3">
        <div className="container">
          <h1 className='fs-1 text-uppercase text-center '>Despre Noi</h1>
          <div className="underline mx-auto mb-3"></div>
          <div className="space-between">
            <div>
              <Card className={classes.width} style={objStyles}>
                <CardMedia
                  component="img"
                  height="300"
                  src={imageCarousel111}
                />
              </Card>
              <br />
            </div>
            <br />
            <br />
            <div>
              <div className={classes.text}>
                Pînă în prezent cu succes au fost realizate contractele sus menționate, satisfăcînd toate cerințele iar în final autoritățile contractante au beneficiat de bunuri și servicii calitative la costuri eficiente.
              </div>

              <br />
              <div className={classes.text}>
                Societatea comercială ”Romedcom” SRL a fost înființată în 2004 și pînă în prezent este un operator economic care realizează și distribuie echipamente medicale de performanță înaltă, consumabile, reactivi pentru laborator, piese de schimb și mobilier medical pentru instituțiile medico-sanitare publice și private din Republica Moldova. Pentru activitatea societății ”Romedcom” SRL au fost realizate contracte de cooperare cu mai mulți producători mondiali.
              </div>
              <br />
              <div className={classes.text}>
                Pînă în prezent cu succes au fost realizate contractele sus menționate, satisfăcînd toate cerințele iar în final autoritățile contractante au beneficiat de bunuri și servicii calitative la costuri eficiente.
              </div>
            </div>
          </div>

        </div>

        <br />
      </div>
    </>
  );
}

export default AboutUs;
