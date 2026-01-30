import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SectionDivider from '../components/SectionDivider';

/**
 * Renders the about page with therapist biography, specializations, and education.
 * Displays professional background, focus areas, and completed training courses.
 */
const OverMijPage = () => {
  return (
    <div>
      <section className="section-padding" style={{ position: 'relative' }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8}>
              <h1 className="display-5 mb-3">Over mij</h1>
              <p className="lead text-muted">Logopediste in Middelkerke</p>
              <p>
                Master in de logopedische en audiologische wetenschappen, afstudeerrichting logopedie, aan de KU Leuven, afgestudeerd in 2014. Sinds 2016 werk ik als logopediste en combineer ik mijn zelfstandige praktijk met het werk binnen een ziekenhuisomgeving.
              </p>
            </Col>
          </Row>
          <Row className="g-5">
            <Col lg={7}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4 p-lg-5">
                  <h2 className="h4">Waarom logopediste?</h2>
                  <p>
                    Tijdens mijn middelbare school groeide mijn interesse voor taal, wetenschappen en een zorgend beroep. Tijdens de master ontdekte ik dat logopedie veel meer is dan het begeleiden van kinderen met taal-, spraak- en leerproblemen.
                  </p>
                  <p>
                    Logopedisten spelen een belangrijke rol bij de revalidatie van taal- en slikproblemen bij volwassenen. In mijn eerste jaren als logopediste groeide mijn fascinatie voor de verbetering van communicatie bij volwassenen en voor het aanpakken van slikproblemen.
                  </p>
                  <p>
                    Ik volgde extra opleidingen, waaronder een postgraduaat slikproblemen, en ik verdiep me jaarlijks via bijscholingen om mijn kennis up-to-date te houden. Het geeft me veel voldoening om zowel kinderen als volwassenen te ondersteunen bij uitdagingen die hun dagelijks leven beïnvloeden.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <div className="contact-card h-100">
                <h3 className="h5">Focusgebieden</h3>
                <p className="text-muted">Een warme aanpak met expertise voor uiteenlopende hulpvragen.</p>
                <h4 className="h6 mt-4 text-uppercase text-muted">Volwassenen</h4>
                <ul className="ps-3">
                  <li>Dysfagie of slikproblemen</li>
                  <li>Ziekte van Parkinson en andere neurologische aandoeningen</li>
                  <li>Hoofd-halsoncologie</li>
                  <li>Mimetherapie</li>
                  <li>Dysartrie</li>
                  <li>Afasie</li>
                </ul>
                <h4 className="h6 text-uppercase text-muted">Kinderen</h4>
                <ul className="ps-3 mb-0">
                  <li>Leerproblemen (lezen, spelling, rekenen)</li>
                  <li>Taalproblemen</li>
                  <li>Articulatieproblemen</li>
                  <li>Oromyofunctionele therapie (OMFT)</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        <SectionDivider position="bottom" color="var(--background)" />
      </section>

      <section className="section-padding bg-white" style={{ position: 'relative' }}>
        <SectionDivider position="top" color="var(--surface)" />
        <Container>
          <Row>
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-lg-5">
                  <h2 className="h4">Bijscholingen & opleidingen (selectie)</h2>
                  <p className="text-muted">Onderstaande lijst is een selectie van gevolgde bijscholingen.</p>
                  <ul className="ps-3 mb-0">
                    <li>Postgraduaat Slikproblemen – KU Leuven</li>
                    <li>Bijscholing Communicatie en Neurorevalidatie</li>
                    <li>Workshop Oromyofunctionele therapie</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default OverMijPage;
