import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ContactPage = () => {
  return (
    <section className="section-padding">
      <Container>
        <Row className="gy-4 mb-5 align-items-stretch">
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4 p-lg-5 text-center text-lg-start">
                <h1 className="display-5 mb-3">Contact</h1>
                <p className="lead text-muted mb-4">
                  Je kan me het snelst bereiken via telefoon of e-mail. Ik luister graag naar je verhaal en zoek mee naar een passende aanpak.
                </p>
                <div className="mb-4">
                  <h2 className="h5">Adres praktijk</h2>
                  <p className="mb-1">Voorbeeldstraat 123</p>
                  <p className="mb-1">1000 Brussel</p>
                  <p className="mb-0">Enkel op afspraak.</p>
                </div>
                <div>
                  <h2 className="h5">Praktijkuren</h2>
                  <ul className="list-unstyled schedule-list text-start text-lg-start mx-auto" style={{ maxWidth: '480px' }}>
                    <li>
                      <strong>Maandag:</strong> 13u – 18u (praktijk + huisbezoeken)
                    </li>
                    <li>
                      <strong>Dinsdag:</strong> 13u – 18u30 (praktijk)
                    </li>
                    <li>
                      <strong>Woensdag:</strong> 13u – 18u (praktijk + huisbezoeken)
                    </li>
                    <li>
                      <strong>Donderdag:</strong> 13u – 18u30 (praktijk)
                    </li>
                    <li>
                      <strong>Vrijdag:</strong> 13u – 18u (praktijk)
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100 bg-white">
              <Card.Body className="p-4 p-lg-5 d-flex flex-column justify-content-center text-center">
                <h2 className="h4 mb-3">Neem rechtstreeks contact op</h2>
                <p className="text-muted mb-4">
                  Laat het contactformulier achterwege en bel of mail me meteen. We plannen samen een geschikt moment voor een kennismaking.
                </p>
                <div className="cta-buttons">
                  <Button as="a" href="tel:+32123456789" variant="primary" size="lg" className="btn-responsive">
                    Bel 0123 45 67 89
                  </Button>
                  <Button as="a" href="mailto:info@example-logopedie.be" variant="outline-primary" size="lg" className="btn-responsive">
                    Stuur een e-mail
                  </Button>
                </div>
                <Card className="contact-card mt-4 border-0">
                  <Card.Body>
                    <p className="mb-1 fw-semibold">Snel antwoord</p>
                    <p className="mb-0 text-muted">Ik reageer doorgaans binnen 1 werkdag op je bericht.</p>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <div className="placeholder-map text-center">
              <p className="mb-0">Kaartweergave van de praktijklocatie komt hier.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;
