import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SectionDivider from '../components/SectionDivider';

/**
 * Renders the main landing page for the speech therapy practice.
 * Displays hero section, service overview, specializations, and call-to-action blocks.
 */
const HomePage = () => {
  return (
    <div>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7} className="text-center text-lg-start">
              <h1 className="display-5 fw-bold text-uppercase text-wrap">Logopedie voor volwassenen en kinderen in Brussel</h1>
              <p className="lead mt-3 text-muted">
                Professionele logopedische begeleiding met bijzondere expertise in slikproblemen en neurologische aandoeningen, met zorg voor zowel volwassenen als kinderen.
              </p>
              <Button as={Link} to="/contact" size="lg" className="mt-4 btn-responsive btn-cta-highlight" variant="primary">
                Neem contact op
              </Button>
            </Col>
            <Col lg={5}>
              <div className="contact-card text-center">
                <h2 className="h4">Persoonlijke aanpak</h2>
                <p className="mb-0">In een rustige setting werken we samen aan jouw communicatiedoelen.</p>
              </div>
            </Col>
          </Row>
        </Container>
        <SectionDivider color="var(--surface)" />
      </section>

      <section className="section-padding contact-cta-section">
        <Container>
          <div className="contact-cta-highlight">
            <Row className="align-items-center gy-4">
              <Col lg={7} className="text-center text-lg-start">
                <p className="overline-label">Direct contact</p>
                <p className="h3 mb-2">Bel of mail gerust voor je afspraak of oriënterend gesprek.</p>
                <p className="mb-0 text-muted">Ik antwoord meestal binnen 1 werkdag.</p>
              </Col>
              <Col lg={5}>
                <div className="contact-cta-actions">
                  <Button as="a" href="tel:+32123456789" variant="primary" size="lg" className="btn-responsive btn-cta-highlight">
                    Bel 0123 45 67 89
                  </Button>
                  <Button as="a" href="mailto:info@example-logopedie.be" variant="outline-primary" size="lg" className="btn-responsive">
                    Mail naar Marieke
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <SectionDivider color="var(--background)" />
      </section>

      <section className="section-padding">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6} className="text-center text-lg-start">
              <h2 className="h3">Over de praktijk</h2>
              <p>
                Ik ben Remmery Marieke, master in de logopedische en audiologische wetenschappen (KU Leuven, 2014). Met ervaring in zowel zelfstandige praktijk als ziekenhuissetting begeleid ik cliënten met aandacht voor hun unieke noden.
              </p>
              <Button as={Link} to="/over-mij" variant="outline-primary">
                Lees meer over mij
              </Button>
            </Col>
            <Col lg={6}>
              <div className="contact-card h-100">
                <h3 className="h5">Voor wie?</h3>
                <p className="mb-3">Ondersteuning voor volwassenen met slik- en spraakproblemen én voor kinderen met taal- en leerstoornissen.</p>
                <p className="mb-0">Samen bekijken we welke aanpak het beste past bij jouw situatie.</p>
              </div>
            </Col>
          </Row>
        </Container>
        <SectionDivider color="var(--surface)" />
      </section>

      <section className="section-padding bg-white">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <div className="h-100 p-4 p-lg-5 contact-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <h3 className="h4">Volwassenen</h3>
                <p className="text-muted">Gerichte therapie en coaching bij complexe slik- en spraakproblemen.</p>
                <ul className="mb-0 ps-3">
                  <li>Slikproblemen</li>
                  <li>Ziekte van Parkinson en neurodegeneratieve stoornissen</li>
                  <li>Slik- en spraakproblemen na hoofd-halsoncologie</li>
                  <li>Mimetherapie</li>
                  <li>Dysartrie</li>
                  <li>Afasie</li>
                  <li>Manuele facilitatie</li>
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="h-100 p-4 p-lg-5 contact-card" style={{ borderTop: '4px solid var(--accent)' }}>
                <h3 className="h4">Kinderen</h3>
                <p className="text-muted">Vertrouwde begeleiding voor kinderen die nood hebben aan extra taal- of leerondersteuning.</p>
                <ul className="mb-0 ps-3">
                  <li>Leerproblemen: lezen, spelling, rekenen</li>
                  <li>Oromyofunctionele stoornissen i.f.v. orthodontie</li>
                  <li>Taalproblemen</li>
                  <li>Articulatieproblemen</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        <SectionDivider color="var(--background)" />
      </section>

      <section className="section-padding">
        <Container>
          <h2 className="h3 text-center mb-5">Specialisaties</h2>
          <Row className="g-4">
            {[
              {
                title: 'Parkinsonzorg',
                text: 'Therapie voor helder spreken en comfortabel slikken bij de ziekte van Parkinson.',
                anchor: '#parkinsonzorg'
              },
              {
                title: 'Mimetherapie',
                text: 'Gerichte oefeningen om gezichtscontrole te herstellen na aangezichtsverlamming.',
                anchor: '#mimetherapie'
              },
              {
                title: 'Dysfagie',
                text: 'Ondersteuning bij slikproblemen na ziekte, ingreep of behandeling.',
                anchor: '#dysfagie'
              },
              {
                title: 'OMFT',
                text: 'Oromyofunctionele therapie om mondmotoriek en gewoonten in balans te brengen.',
                anchor: '#omft'
              }
            ].map((card) => (
              <Col md={6} lg={3} key={card.title}>
                <Card className="highlight-card h-100">
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                    <Button as={Link} to={`/diensten${card.anchor}`} variant="outline-primary">
                      Meer over deze dienst
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <SectionDivider color="var(--soft-background)" />
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--soft-background)' }}>
        <Container className="text-center">
          <h2 className="h3">Heb je vragen of wil je een afspraak maken?</h2>
          <p className="lead text-muted mb-4">Neem gerust contact op voor een eerste gesprek en ontdek hoe ik kan helpen.</p>
          <Button as={Link} to="/contact" size="lg" variant="primary" className="btn-responsive">
            Plan een eerste gesprek
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
