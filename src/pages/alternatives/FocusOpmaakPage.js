import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, contactDetails } from './sharedContent';

const FocusOpmaakPage = () => {
  return (
    <div className="alt-hero-gradient">
      <section className="section-padding">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <div className="focus-block">
                <p className="overline-label">Focus lay-out</p>
                <h1 className="display-6 fw-bold">{heroContent.title}</h1>
                <p className="lead text-muted">{heroContent.subtitle}</p>
                <div className="d-flex flex-wrap gap-3">
                  <Button as={Link} to="/contact" variant="primary" size="lg">
                    Afspraak plannen
                  </Button>
                  <Button as={Link} to="/over-mij" variant="outline-primary" size="lg">
                    Meer over Marieke
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="focus-block highlight">
                <h2 className="h4 mb-3">Waarom deze opmaak?</h2>
                <p className="mb-0 text-muted">
                  Brede blokken met veel witruimte leggen de nadruk op de kerninformatie. De kleuren en knoppen zijn onveranderd
                  zodat het thema behouden blijft.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col md={6}>
              <Card className="focus-block h-100">
                <Card.Body>
                  <p className="overline-label">Over mij</p>
                  <h2 className="h4">{aboutContent.title}</h2>
                  <p className="text-muted">{aboutContent.intro}</p>
                  <p className="mb-0">{aboutContent.detail}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="focus-block h-100">
                <Card.Body>
                  <p className="overline-label">Bereikbaarheid</p>
                  <h2 className="h4">Maak snel contact</h2>
                  <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <ul className="text-muted ps-3">
                    {contactDetails.schedule.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="d-flex flex-wrap gap-2">
                    <Button as="a" href={`tel:${contactDetails.phone}`} variant="primary">
                      Bel {contactDetails.phoneLabel}
                    </Button>
                    <Button as="a" href={`mailto:${contactDetails.email}`} variant="outline-primary">
                      Mail {contactDetails.email}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default FocusOpmaakPage;
