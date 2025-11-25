import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, servicesContent, specialties, contactDetails } from './sharedContent';

const EditorialOpmaakPage = () => {
  return (
    <div className="editorial-wrapper">
      <section className="section-padding editorial-hero">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <p className="overline-label text-uppercase">Editorial</p>
              <h1 className="display-6 fw-bold">{heroContent.title}</h1>
              <p className="lead text-muted">{heroContent.subtitle}</p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/contact" variant="dark" size="lg">
                  {heroContent.cta}
                </Button>
                <Button as={Link} to="/over-mij" variant="outline-dark" size="lg">
                  Leer de praktijk kennen
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="editorial-card shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h2 className="h5 mb-0">Snelle navigatie</h2>
                    <Badge bg="dark">Nieuw</Badge>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {['Aanbod', 'Specialisaties', 'Praktisch', 'Contact'].map((item) => (
                      <Badge key={item} bg="secondary" pill>
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="small text-muted mt-3 mb-0">Alle secties zijn opgebouwd als leesbare editorials met duidelijke koppen en toelichtingen.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <Card className="editorial-card h-100">
                <Card.Body>
                  <p className="overline-label">Inleiding</p>
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
            <Col lg={4}>
              <Card className="editorial-card h-100">
                <Card.Body>
                  <p className="overline-label">Praktisch</p>
                  <h3 className="h5">Bereikbaarheid</h3>
                  <p className="text-muted mb-1" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <ul className="mb-3 small text-muted ps-3">
                    {contactDetails.schedule.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Button as="a" href={`tel:${contactDetails.phone}`} variant="outline-dark" size="sm" className="me-2">
                    Bel direct
                  </Button>
                  <Button as="a" href={`mailto:${contactDetails.email}`} variant="dark" size="sm">
                    Mail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
            <h2 className="h4 mb-0">Diensten als rubrieken</h2>
            <Badge bg="secondary">Compact</Badge>
          </div>
          <Row className="g-4">
            {[servicesContent.adults, servicesContent.children].map((group) => (
              <Col md={6} key={group.title}>
                <Card className="editorial-card h-100">
                  <Card.Body>
                    <h3 className="h5 mb-3">{group.title}</h3>
                    <div className="d-flex flex-column gap-2">
                      {group.items.map((item) => (
                        <div key={item} className="d-flex align-items-start">
                          <span className="editorial-marker me-2" />
                          <span className="text-muted">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h2 className="h4 mb-0">Specialisaties in focus</h2>
            <Badge bg="dark">Editorial</Badge>
          </div>
          <Row className="g-3">
            {specialties.map((spec) => (
              <Col md={6} lg={3} key={spec.title}>
                <Card className="editorial-card h-100 text-center">
                  <Card.Body>
                    <p className="overline-label mb-1">{spec.anchor}</p>
                    <h3 className="h6">{spec.title}</h3>
                    <p className="small text-muted">{spec.description}</p>
                    <Button as={Link} to={`/diensten#${spec.anchor}`} variant="link" className="p-0 editorial-link">
                      Lees artikel
                    </Button>
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

export default EditorialOpmaakPage;
