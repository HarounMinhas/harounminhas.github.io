import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { heroContent } from './sharedContent';

const layouts = [
  {
    slug: 'singlepage',
    title: 'Singlepage overzicht',
    description: 'Alle inhoud op één lange pagina met duidelijke secties en vaste CTA\'s.',
    accent: 'Alles-in-één'
  },
  {
    slug: 'tegels',
    title: 'Tegel lay-out',
    description: 'Visuele kaarten voor elke dienst en doelgroep, ideaal voor snelle scans.',
    accent: 'Kaarten'
  },
  {
    slug: 'tijdlijn',
    title: 'Tijdlijn en stappen',
    description: 'Een chronologische voorstelling van traject, specialisaties en contactmomenten.',
    accent: 'Stappenplan'
  },
  {
    slug: 'focus',
    title: 'Focus blokken',
    description: 'Brede blokken met veel witruimte en duidelijke koppen voor rust en overzicht.',
    accent: 'Rustige flow'
  },
  {
    slug: 'minimaal',
    title: 'Minimalistisch',
    description: 'Strakke typografie met compacte kaarten en subtiele iconen in de huisstijl.',
    accent: 'Minimal'
  }
];

const reimaginedLayouts = [
  {
    slug: 'executive',
    title: 'Zakelijke blueprint',
    description: 'Strakke corporate lay-out met duidelijke prioriteiten en snelle navigatie.',
    accent: 'Pro'
  },
  {
    slug: 'editorial',
    title: 'Editorial storytelling',
    description: 'Magazine-achtige flow met herkenbare blokken voor traject en diensten.',
    accent: 'Flow'
  },
  {
    slug: 'contrast',
    title: 'Contrast en focus',
    description: 'Donkere accenten, heldere typografie en direct zicht op afspraken.',
    accent: 'Focus'
  },
  {
    slug: 'grid',
    title: 'Grid & cards',
    description: 'Volledige site in een kaart-gebaseerde lay-out met snelle ingangen.',
    accent: 'Snel'
  },
  {
    slug: 'serene',
    title: 'Serene studio',
    description: 'Ruimtelijke compositie met zachte vlakken en beknopte tekstblokken.',
    accent: 'Rust'
  }
];

const AlternatieveOpmaakPage = () => {
  return (
    <div className="section-padding">
      <Container>
        <header className="mb-5 text-center">
          <p className="overline-label">Alternatieve opmaak</p>
          <h1 className="display-6 fw-bold">Alternatieven op dezelfde inhoud</h1>
          <p className="text-muted lead">
            Kies een lay-out om de website in een andere stijl te bekijken. De kleuren volgen het bestaande thema, zodat
            aanpassingen centraal in de CSS blijven.
          </p>
          <Card className="layout-info-card mt-4">
            <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div className="text-md-start text-center">
                <h2 className="h5 mb-1">{heroContent.title}</h2>
                <p className="mb-0 text-muted">{heroContent.subtitle}</p>
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <Badge bg="primary" className="text-uppercase">Consistente kleuren</Badge>
                <Badge bg="secondary" className="text-uppercase">Nieuwe componenten</Badge>
                <Badge bg="dark" className="text-uppercase">5 varianten</Badge>
              </div>
            </Card.Body>
          </Card>
        </header>

        <section className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h2 className="h4 mb-0">Bestaande variaties</h2>
            <Badge bg="secondary" pill>
              5 stijlen
            </Badge>
          </div>
          <Row className="g-4">
            {layouts.map((layout) => (
              <Col md={6} lg={4} key={layout.slug}>
                <Card as={Link} to={`/alternatieve-opmaak/${layout.slug}`} className="layout-card h-100 text-decoration-none">
                  <Card.Body className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <h2 className="h5 mb-0">{layout.title}</h2>
                      <Badge bg="primary" className="text-uppercase">{layout.accent}</Badge>
                    </div>
                    <Card.Text className="text-muted mb-0">{layout.description}</Card.Text>
                    <span className="stretched-link fw-semibold text-primary">Open lay-out</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section>
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h2 className="h4 mb-0">Volledige herwerkingen</h2>
            <Badge bg="dark" pill>
              5 nieuwe stijlen
            </Badge>
          </div>
          <p className="text-muted mb-4">
            Deze varianten zetten de volledige website in een andere look & feel, met focus op professionaliteit, snelheid en
            leesbaarheid.
          </p>
          <Row className="g-4">
            {reimaginedLayouts.map((layout) => (
              <Col md={6} lg={4} key={layout.slug}>
                <Card as={Link} to={`/alternatieve-opmaak/${layout.slug}`} className="layout-card h-100 text-decoration-none reimagined-card">
                  <Card.Body className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="overline-label mb-1">Nieuwe layout</p>
                        <h2 className="h5 mb-0">{layout.title}</h2>
                      </div>
                      <Badge bg="dark" className="text-uppercase">
                        {layout.accent}
                      </Badge>
                    </div>
                    <Card.Text className="text-muted mb-0">{layout.description}</Card.Text>
                    <span className="stretched-link fw-semibold text-dark">Bekijk herwerking</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default AlternatieveOpmaakPage;
