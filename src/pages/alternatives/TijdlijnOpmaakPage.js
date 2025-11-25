import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent, specialties, contactDetails } from './sharedContent';

const stappen = [
  {
    title: 'Kennismaking',
    text: 'Kort telefonisch of via mail. We bespreken je hulpvraag en plannen de eerste afspraak.'
  },
  {
    title: 'Onderzoek',
    text: 'Analyse van het slik- of spraakprobleem. We stemmen af met verwijzers indien nodig.'
  },
  {
    title: 'Therapieplan',
    text: 'We kiezen oefeningen en methodes die passen bij jouw doelstellingen en dagelijkse leven.'
  },
  {
    title: 'Evaluatie',
    text: 'Regelmatige feedbackmomenten en bijsturing waar nodig, in overleg met betrokkenen.'
  }
];

const TijdlijnOpmaakPage = () => {
  return (
    <div className="section-padding">
      <Container>
        <header className="text-center mb-5">
          <p className="overline-label">Tijdlijn</p>
          <h1 className="display-6 fw-bold">Hoe verloopt een traject?</h1>
          <p className="lead text-muted">{heroContent.subtitle}</p>
        </header>

        <Row className="g-4">
          {stappen.map((step, index) => (
            <Col md={6} key={step.title}>
              <div className="timeline-item h-100">
                <div className="timeline-number">{index + 1}</div>
                <div>
                  <h2 className="h5 mb-2">{step.title}</h2>
                  <p className="text-muted mb-0">{step.text}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Card className="layout-block p-4 p-lg-5 mt-5">
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <h2 className="h4">Specialisaties binnen elk traject</h2>
              <p className="text-muted mb-4">Deze thema\'s komen terug in de begeleiding en kunnen per traject extra worden uitgelicht.</p>
              <div className="d-flex flex-wrap gap-2">
                {specialties.map((spec) => (
                  <Button key={spec.title} as={Link} to={`/diensten#${spec.anchor}`} variant="outline-primary" size="sm">
                    {spec.title}
                  </Button>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div className="contact-card h-100">
                <h3 className="h5">Contact en afspraken</h3>
                <p className="text-muted mb-3" style={{ whiteSpace: 'pre-line' }}>
                  {contactDetails.address}
                </p>
                <ul className="mb-3 ps-3 text-muted">
                  {contactDetails.schedule.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-2">
                  <Button as="a" href={`tel:${contactDetails.phone}`} variant="primary">
                    Bel {contactDetails.phoneLabel}
                  </Button>
                  <Button as="a" href={`mailto:${contactDetails.email}`} variant="outline-primary">
                    Mail {contactDetails.email}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default TijdlijnOpmaakPage;
