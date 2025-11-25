import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, servicesContent, specialties, contactDetails } from './sharedContent';

const ContrastOpmaakPage = () => {
  return (
    <div className="contrast-page">
      <section className="section-padding contrast-hero text-white">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <p className="overline-label text-uppercase text-white-50">Contrast</p>
              <h1 className="display-6 fw-bold">{heroContent.title}</h1>
              <p className="lead text-white-50">{heroContent.subtitle}</p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/contact" variant="light" size="lg">
                  {heroContent.cta}
                </Button>
                <Button as={Link} to="/diensten" variant="outline-light" size="lg">
                  Bekijk traject
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <Card className="contrast-card h-100">
                <Card.Body>
                  <h2 className="h5 text-white">Direct contact</h2>
                  <p className="text-white-50 mb-3">Kies een kanaal en plan een gesprek.</p>
                  <div className="d-flex flex-column gap-2">
                    <Button as="a" href={`tel:${contactDetails.phone}`} variant="light">
                      Bel {contactDetails.phoneLabel}
                    </Button>
                    <Button as="a" href={`mailto:${contactDetails.email}`} variant="outline-light">
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
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h2 className="h4 mb-0">Aanbod in één oogopslag</h2>
            <Badge bg="dark">Focus</Badge>
          </div>
          <Row className="g-3">
            {[servicesContent.adults, servicesContent.children].map((group) => (
              <Col md={6} key={group.title}>
                <Card className="contrast-outline h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h3 className="h5 mb-0">{group.title}</h3>
                      <Badge bg="secondary" pill>
                        {group.items.length} items
                      </Badge>
                    </div>
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
        </Container>
      </section>

      <section className="section-padding contrast-strip text-white">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={8}>
              <p className="overline-label text-white-50">Ervaring</p>
              <h2 className="h3">{aboutContent.title}</h2>
              <p className="text-white-50 mb-3">{aboutContent.intro}</p>
              <p className="mb-4">{aboutContent.detail}</p>
              <div className="d-flex flex-wrap gap-2">
                {aboutContent.focus.map((item) => (
                  <Badge key={item} bg="light" text="dark" pill>
                    {item}
                  </Badge>
                ))}
              </div>
            </Col>
            <Col lg={4}>
              <Card className="contrast-card h-100">
                <Card.Body>
                  <p className="overline-label text-white-50">Praktisch</p>
                  <h3 className="h5 text-white">Adres</h3>
                  <p className="text-white-50 mb-3" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <ul className="text-white-50 mb-0 ps-3 small">
                    {contactDetails.schedule.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
                <Card className="contrast-outline h-100">
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

export default ContrastOpmaakPage;
