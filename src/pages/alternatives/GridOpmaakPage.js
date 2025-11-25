import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, aboutContent, servicesContent, specialties, contactDetails } from './sharedContent';

const GridOpmaakPage = () => {
  return (
    <div className="grid-page">
      <section className="section-padding bg-white">
        <Container>
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
            <div>
              <p className="overline-label text-uppercase">Grid & cards</p>
              <h1 className="display-6 fw-bold mb-1">{heroContent.title}</h1>
              <p className="text-muted mb-0">{heroContent.subtitle}</p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/contact" variant="primary" size="lg">
                {heroContent.cta}
              </Button>
              <Button as={Link} to="/diensten" variant="outline-primary" size="lg">
                Diensten
              </Button>
            </div>
          </div>

          <Row className="g-3">
            <Col md={4}>
              <Card className="grid-tile h-100">
                <Card.Body>
                  <p className="overline-label">Locatie</p>
                  <p className="fw-semibold mb-2" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <Button as="a" href={`tel:${contactDetails.phone}`} variant="link" className="p-0">
                    Bel {contactDetails.phoneLabel}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="grid-tile h-100">
                <Card.Body>
                  <p className="overline-label">Afspraak</p>
                  <p className="text-muted mb-3">Plan binnen 24 uur een intake.</p>
                  <Button as={Link} to="/contact" variant="primary" size="sm">
                    Plan gesprek
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="grid-tile h-100">
                <Card.Body>
                  <p className="overline-label">Bereikbaarheid</p>
                  <ul className="mb-0 text-muted ps-3 small">
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

      <section className="section-padding">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h2 className="h4 mb-0">Aanbod</h2>
            <Badge bg="secondary" pill>
              {servicesContent.adults.items.length + servicesContent.children.items.length} items
            </Badge>
          </div>
          <Row className="g-3">
            {[servicesContent.adults, servicesContent.children].map((group) => (
              <Col md={6} key={group.title}>
                <Card className="grid-tile h-100">
                  <Card.Body>
                    <h3 className="h5 mb-3">{group.title}</h3>
                    <div className="d-flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge key={item} bg="light" text="dark" className="grid-badge">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <Row className="g-3 align-items-center">
            <Col md={7}>
              <Card className="grid-tile h-100">
                <Card.Body>
                  <p className="overline-label">Over</p>
                  <h2 className="h4">{aboutContent.title}</h2>
                  <p className="text-muted mb-3">{aboutContent.intro}</p>
                  <p className="mb-3">{aboutContent.detail}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {aboutContent.focus.map((item) => (
                      <Badge key={item} bg="primary" pill>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="grid-tile h-100">
                <Card.Body>
                  <p className="overline-label">CTA</p>
                  <h3 className="h5">Plan een gratis kennismaking</h3>
                  <p className="text-muted">We reageren dezelfde werkdag met voorstel.</p>
                  <div className="d-flex flex-column gap-2">
                    <Button as={Link} to="/contact" variant="primary">
                      Start nu
                    </Button>
                    <Button as={Link} to="/diensten" variant="outline-primary">
                      Bekijk dossier
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <h2 className="h4 mb-3">Specialisaties</h2>
          <Row className="g-3">
            {specialties.map((spec) => (
              <Col md={6} lg={3} key={spec.title}>
                <Card className="grid-tile h-100">
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

export default GridOpmaakPage;
