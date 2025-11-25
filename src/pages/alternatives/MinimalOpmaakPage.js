import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, servicesContent, contactDetails } from './sharedContent';

const MinimalOpmaakPage = () => {
  return (
    <div className="section-padding">
      <Container>
        <header className="mb-5 text-center">
          <p className="overline-label">Minimalistisch</p>
          <h1 className="display-6 fw-bold">{heroContent.title}</h1>
          <p className="text-muted lead">{heroContent.subtitle}</p>
          <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
            <Badge bg="primary" pill>
              Consistente huisstijl
            </Badge>
            <Badge bg="secondary" pill>
              Strakke typografie
            </Badge>
          </div>
        </header>

        <Row className="g-4">
          {[servicesContent.adults, servicesContent.children].map((group) => (
            <Col md={6} key={group.title}>
              <Card className="minimal-card h-100">
                <Card.Body>
                  <h2 className="h5">{group.title}</h2>
                  <p className="text-muted small mb-3">Begeleiding met duidelijke doelen en compacte sessies.</p>
                  <ul className="mb-0 text-muted ps-3">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <section className="mt-5">
          <Card className="minimal-card">
            <Card.Body>
              <Row className="g-4 align-items-center">
                <Col md={7}>
                  <h2 className="h4 mb-2">Contact houden eenvoudig</h2>
                  <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <p className="text-muted mb-3">{contactDetails.schedule.join(' • ')}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <Button as="a" href={`tel:${contactDetails.phone}`} variant="primary">
                      Bel {contactDetails.phoneLabel}
                    </Button>
                    <Button as="a" href={`mailto:${contactDetails.email}`} variant="outline-primary">
                      Mail {contactDetails.email}
                    </Button>
                  </div>
                </Col>
                <Col md={5}>
                  <div className="minimal-cta p-4 text-center h-100">
                    <h3 className="h5 mb-2">Afspraak plannen</h3>
                    <p className="text-muted mb-3">Snel een moment vastleggen? Gebruik de contactpagina.</p>
                    <Button as={Link} to="/contact" variant="primary">
                      Contactpagina
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </div>
  );
};

export default MinimalOpmaakPage;
