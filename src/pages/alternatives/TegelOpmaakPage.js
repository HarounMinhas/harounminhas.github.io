import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, servicesContent, specialties, contactDetails } from './sharedContent';

const TegelOpmaakPage = () => {
  return (
    <div className="section-padding">
      <Container>
        <header className="text-center mb-5">
          <p className="overline-label">Tegel lay-out</p>
          <h1 className="display-6 fw-bold">{heroContent.title}</h1>
          <p className="lead text-muted">{heroContent.subtitle}</p>
        </header>

        <Row className="g-4 align-items-stretch">
          {[servicesContent.adults, servicesContent.children].map((group) => (
            <Col md={6} key={group.title}>
              <Card className="layout-card h-100">
                <Card.Body>
                  <h2 className="h5">{group.title}</h2>
                  <ListGroup variant="flush" className="mt-3">
                    {group.items.map((item) => (
                      <ListGroup.Item key={item} className="bg-transparent px-0 border-0 pb-2">
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <section className="mt-5">
          <div className="layout-block p-4 p-lg-5">
            <Row className="g-4 align-items-center">
              <Col lg={6}>
                <h2 className="h4 mb-3">Specialisaties in één oogopslag</h2>
                <p className="text-muted mb-4">
                  Elke tegel hieronder leidt naar de detailsectie van de overeenkomstige dienst. Het kleurverloop blijft in lijn
                  met het originele thema.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Button as={Link} to="/diensten" variant="primary">
                    Naar de dienstenpagina
                  </Button>
                  <Button as={Link} to="/contact" variant="outline-primary">
                    Contact opnemen
                  </Button>
                </div>
              </Col>
              <Col lg={6}>
                <Row className="g-3">
                  {specialties.map((spec) => (
                    <Col xs={12} sm={6} key={spec.title}>
                      <Card className="mini-tile-card h-100">
                        <Card.Body>
                          <p className="overline-label mb-1">{spec.anchor}</p>
                          <h3 className="h6 mb-2">{spec.title}</h3>
                          <p className="text-muted small mb-3">{spec.description}</p>
                          <Button
                            as={Link}
                            to={`/diensten#${spec.anchor}`}
                            variant="link"
                            size="sm"
                            className="p-0 text-primary"
                          >
                            Details bekijken
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <section className="mt-5">
          <Row className="g-4">
            <Col lg={4}>
              <Card className="contact-card h-100">
                <Card.Body>
                  <h3 className="h5">Bel of mail</h3>
                  <p className="text-muted">Kies je voorkeurskanaal, ik reageer doorgaans binnen 1 werkdag.</p>
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
            <Col lg={8}>
              <Card className="layout-card h-100">
                <Card.Body>
                  <h3 className="h5">Praktische informatie</h3>
                  <p className="text-muted mb-3" style={{ whiteSpace: 'pre-line' }}>
                    {contactDetails.address}
                  </p>
                  <ListGroup variant="flush" className="ps-0">
                    {contactDetails.schedule.map((item) => (
                      <ListGroup.Item key={item} className="bg-transparent px-0 border-0 pb-2">
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default TegelOpmaakPage;
