import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, servicesContent, specialties, contactDetails } from './sharedContent';

const SereneOpmaakPage = () => {
  return (
    <div className="serene-page">
      <section className="section-padding serene-hero">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <p className="overline-label text-uppercase">Serene</p>
              <h1 className="display-6 fw-bold">{heroContent.title}</h1>
              <p className="lead text-muted">{heroContent.subtitle}</p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/contact" variant="primary" size="lg">
                  {heroContent.cta}
                </Button>
                <Button as={Link} to="/diensten" variant="outline-primary" size="lg">
                  Diensten bekijken
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="serene-panel shadow-sm">
                <Card.Body>
                  <p className="overline-label">Bereikbaarheid</p>
                  <p className="mb-3 text-muted" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {contactDetails.schedule.map((item) => (
                      <Badge key={item} bg="light" text="dark" pill>
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button as="a" href={`tel:${contactDetails.phone}`} variant="primary" size="sm">
                      Bel {contactDetails.phoneLabel}
                    </Button>
                    <Button as="a" href={`mailto:${contactDetails.email}`} variant="outline-primary" size="sm">
                      Mail
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
          <Row className="g-4">
            {[servicesContent.adults, servicesContent.children].map((group) => (
              <Col md={6} key={group.title}>
                <Card className="serene-panel h-100">
                  <Card.Body>
                    <h2 className="h5 mb-3">{group.title}</h2>
                    <ul className="text-muted mb-0 ps-3">
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

      <section className="section-padding serene-band">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={7}>
              <p className="overline-label">Over</p>
              <h2 className="h4 mb-3">{aboutContent.title}</h2>
              <p className="text-muted mb-3">{aboutContent.intro}</p>
              <p className="mb-4">{aboutContent.detail}</p>
              <div className="d-flex flex-wrap gap-2">
                {aboutContent.focus.map((item) => (
                  <Badge key={item} bg="primary" pill>
                    {item}
                  </Badge>
                ))}
              </div>
            </Col>
            <Col lg={5}>
              <Card className="serene-panel h-100">
                <Card.Body>
                  <p className="overline-label">Afspraak</p>
                  <h3 className="h5">Plan een gratis kennismaking</h3>
                  <p className="text-muted">Kort en duidelijk intakegesprek.</p>
                  <Button as={Link} to="/contact" variant="primary">
                    Plan nu
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <h2 className="h4 mb-3">Specialisaties</h2>
          <Row className="g-3">
            {specialties.map((spec) => (
              <Col md={6} lg={3} key={spec.title}>
                <Card className="serene-panel h-100 text-center">
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

export default SereneOpmaakPage;
