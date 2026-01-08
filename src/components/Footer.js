import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto">
      <Container>
        <Row className="gy-4">
          <Col md={6}>
            <h5 className="fw-semibold">Logopedie Marieke</h5>
            <p className="mb-1">Voorbeeldstraat 123</p>
            <p className="mb-1">1000 Brussel</p>
            {/* Telefoonnummer makkelijk aanpasbaar */}
            <p className="mb-1">Tel: <a href="tel:+32123456789">0123/456789</a></p>
            {/* E-mailadres makkelijk aanpasbaar */}
            <p className="mb-0">E-mail: <a href="mailto:info@example-logopedie.be">info@example-logopedie.be</a></p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-1">Enkel op afspraak</p>
            <a href="/privacy" className="d-block mb-3">
              Privacyverklaring
            </a>
            <p className="mb-0">© {currentYear} Logopedie Marieke. Alle rechten voorbehouden.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
