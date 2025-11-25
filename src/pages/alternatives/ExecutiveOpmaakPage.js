import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, servicesContent, specialties, contactDetails } from './sharedContent';

const ExecutiveOpmaakPage = () => {
  return (
    <div className="executive-hero">
      <section className="section-padding">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7} className="text-center text-lg-start">
              <p className="overline-label text-uppercase">Zakelijke blueprint</p>
              <h1 className="display-5 fw-bold text-dark">{heroContent.title}</h1>
              <p className="lead text-muted">{heroContent.subtitle}</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Button as={Link} to="/contact" size="lg" className="btn-cta-highlight">
                  {heroContent.cta}
                </Button>
                <Button as={Link} to="/diensten" variant="outline-dark" size="lg">
                  Dienstenoverzicht
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <Card className="shadow-sm border-0 executive-card">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="h5 mb-0">Snel schakelen</h2>
                    <Badge bg="dark">Pro</Badge>
                  </div>
                  <ListGroup variant="flush" className="small text-muted">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Afspraak binnen 24u</span>
                      <Badge bg="success">Bel</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Locatie</span>
                      <span className="fw-semibold text-dark">{contactDetails.address.split('\n')[0]}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Contact</span>
                      <span className="fw-semibold text-dark">{contactDetails.phoneLabel}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
            <div>
              <p className="overline-label">Resultaatgericht</p>
              <h2 className="h3 mb-0">Wat u krijgt</h2>
            </div>
            <Badge bg="primary" className="text-uppercase">Zakelijk</Badge>
          </div>
          <Row className="g-4">
            {[servicesContent.adults, servicesContent.children].map((group) => (
              <Col md={6} key={group.title}>
                <Card className="executive-card h-100">
                  <Card.Body>
                    <h3 className="h5 d-flex align-items-center justify-content-between">
                      {group.title}
                      <Badge bg="secondary" pill>
                        {group.items.length} topics
                      </Badge>
                    </h3>
                    <ul className="text-muted mb-0 ps-3 small">
                      {group.items.map((item) => (
                        <li key={item} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-padding executive-split">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <Card className="executive-card h-100">
                <Card.Body>
                  <p className="overline-label">Over de expert</p>
                  <h2 className="h4">{aboutContent.title}</h2>
                  <p className="text-muted mb-3">{aboutContent.intro}</p>
                  <p className="mb-4">{aboutContent.detail}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {aboutContent.focus.map((item) => (
                      <Badge key={item} bg="dark" pill>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="executive-card h-100">
                <Card.Body>
                  <p className="overline-label">Contact</p>
                  <h3 className="h5 mb-3">Afspraak inplannen</h3>
                  <div className="d-flex flex-column gap-2">
                    <Button as="a" href={`tel:${contactDetails.phone}`} variant="dark">
                      Bel {contactDetails.phoneLabel}
                    </Button>
                    <Button as="a" href={`mailto:${contactDetails.email}`} variant="outline-dark">
                      Mail {contactDetails.email}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <h2 className="h4 mb-4">Specialisaties</h2>
          <Row className="g-3">
            {specialties.map((spec) => (
              <Col md={6} lg={3} key={spec.title}>
                <Card className="executive-card h-100">
                  <Card.Body>
                    <p className="overline-label mb-1">{spec.anchor}</p>
                    <h3 className="h6 mb-2">{spec.title}</h3>
                    <p className="small text-muted mb-0">{spec.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ExecutiveOpmaakPage;
