import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, servicesContent, specialties, contactDetails } from './sharedContent';

const SinglePageOpmaakPage = () => {
  return (
    <div className="alt-hero-gradient">
      <section className="section-padding">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7} className="text-center text-lg-start">
              <p className="overline-label">Alternatieve opmaak</p>
              <h1 className="display-5 fw-bold">{heroContent.title}</h1>
              <p className="lead text-muted">{heroContent.subtitle}</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Button as={Link} to="/contact" size="lg" className="btn-cta-highlight">
                  {heroContent.cta}
                </Button>
                <Button as={Link} to="/diensten" variant="outline-primary" size="lg">
                  Bekijk diensten
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <Card className="contact-card shadow-sm">
                <Card.Body>
                  <h2 className="h5 mb-3">Snel contact</h2>
                  <div className="d-flex flex-column gap-2">
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

      <section className="section-padding bg-white">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <div className="layout-block p-4 p-lg-5 h-100">
                <p className="overline-label">Overzicht</p>
                <h2 className="h3">{aboutContent.title}</h2>
                <p className="text-muted mb-3">{aboutContent.intro}</p>
                <p className="mb-4">{aboutContent.detail}</p>
                <div className="d-flex flex-wrap gap-2">
                  {aboutContent.focus.map((item) => (
                    <Badge key={item} bg="primary" className="rounded-pill">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="layout-block p-4 p-lg-5 h-100" style={{ borderTop: '4px solid var(--primary)' }}>
                <h3 className="h5">Praktisch</h3>
                <p className="mb-1 fw-semibold">Adres</p>
                <p className="text-muted mb-3" style={{ whiteSpace: 'pre-line' }}>
                  {contactDetails.address}
                </p>
                <p className="mb-1 fw-semibold">Bereikbaarheid</p>
                <ul className="mb-0 text-muted ps-3">
                  {contactDetails.schedule.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row className="g-4">
            {[servicesContent.adults, servicesContent.children].map((group) => (
              <Col md={6} key={group.title}>
                <Card className="layout-block h-100">
                  <Card.Body>
                    <p className="overline-label">{group.title}</p>
                    <h3 className="h4">Aanbod</h3>
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

      <section className="section-padding bg-white">
        <Container>
          <h2 className="h3 text-center mb-4">Specialisaties</h2>
          <Row className="g-4">
            {specialties.map((spec) => (
              <Col md={6} lg={3} key={spec.title}>
                <Card className="highlight-card h-100">
                  <Card.Body>
                    <p className="overline-label mb-1">{spec.anchor}</p>
                    <h3 className="h5">{spec.title}</h3>
                    <p className="text-muted mb-3">{spec.description}</p>
                    <Button as={Link} to={`/diensten#${spec.anchor}`} variant="outline-primary" size="sm">
                      Lees meer
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#eef6f1' }}>
        <Container className="text-center">
          <h2 className="h3 mb-3">Klaar om te starten?</h2>
          <p className="lead text-muted mb-4">Vraag een gesprek aan of stel je vraag meteen via telefoon of e-mail.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Button as={Link} to="/contact" size="lg" variant="primary" className="btn-responsive">
              Afspraak maken
            </Button>
            <Button as="a" href={`tel:${contactDetails.phone}`} size="lg" variant="outline-primary" className="btn-responsive">
              Bel direct
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SinglePageOpmaakPage;
