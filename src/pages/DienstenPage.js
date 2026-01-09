import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

/**
 * Renders the services page with specializations, target groups, procedure, and pricing.
 * Uses static data arrays for specializations and pricing tables.
 */
const DienstenPage = () => {
  // Service specializations with unique IDs for anchor navigation
  const specialisaties = [
    {
      id: 'parkinsonzorg',
      title: 'Parkinsonzorg',
      content:
        'Bij de ziekte van Parkinson kunnen niet alleen motorische problemen opduiken, maar wordt spreken en slikken vaak ook moeilijker. Ik help je om duidelijker te spreken en bied oefeningen aan om veiliger en vlotter te slikken.'
    },
    {
      id: 'mimetherapie',
      title: 'Mimetherapie',
      content:
        'Mimetherapie richt zich op restverschijnselen na een aangezichtsverlamming. We werken met massage en gerichte oefeningen zodat je opnieuw controle krijgt over de aangezichtsspieren bij gelaatsuitdrukkingen, praten, eten en drinken.'
    },
    {
      id: 'dysfagie',
      title: 'Dysfagie (slikproblemen)',
      content:
        'Dysfagie is de medische term voor slikproblemen. Misschien merk je dat kauwen moeilijk gaat, dat eten blijft steken of dat je je snel verslikt. Oorzaken kunnen liggen bij een hersenaandoening, een ingreep of radiotherapie in het hoofd-halsgebied, problemen met slokdarm of maag, of het natuurlijke verouderingsproces. Samen brengen we de problemen in kaart, oefenen we veilig slikken en krijg je advies over aangepaste voeding.'
    },
    {
      id: 'omft',
      title: 'Oromyofunctionele therapie (OMFT)',
      content:
        'Mondspieren zoals tong en lippen hebben invloed op de vorm van de mond en de tandstand. Afwijkende mondgewoonten zoals duimzuigen, tongpersen of open mondgedrag worden aangepakt om het evenwicht in de spieren te herstellen, vaak in samenwerking met een orthodontische behandeling.'
    }
  ];

  // RIZIV pricing structure with standard and increased reimbursement rates
  const tarieven = [
    {
      prestatie: 'Sessie van 30 minuten',
      honorarium: '€ 37,35 (kabinet)',
      terugbetaling: '€ 31,85',
      remgeld: '€ 5,50',
      terugbetalingVerhoogd: '€ 35,35',
      remgeldVerhoogd: '€ 2'
    },
    {
      prestatie: 'Sessie van 60 minuten',
      honorarium: '€ 75,01',
      terugbetaling: '€ 64,01',
      remgeld: '€ 11',
      terugbetalingVerhoogd: '€ 70,51',
      remgeldVerhoogd: '€ 4,50'
    },
    {
      prestatie: 'Aanvangsbilan (per 30 min. onderzoek)',
      honorarium: '€ 44,18',
      terugbetaling: '€ 36,68',
      remgeld: '€ 7,50',
      terugbetalingVerhoogd: '€ 41,18',
      remgeldVerhoogd: '€ 3'
    },
    {
      prestatie: 'Evaluatiezitting',
      honorarium: '€ 74,69',
      terugbetaling: '€ 63,69',
      remgeld: '€ 11',
      terugbetalingVerhoogd: '€ 70,19',
      remgeldVerhoogd: '€ 4,50'
    }
  ];

  return (
    <section className="section-padding">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h1 className="display-5 mb-3">Diensten</h1>
            <p className="lead text-muted">
              De praktijk richt zich op zowel volwassenen als kinderen en heeft bijzondere expertise in slikproblemen en neurologische aandoeningen.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {specialisaties.map((item) => (
            <Col md={6} key={item.id} id={item.id}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h2 className="h4">{item.title}</h2>
                  <p className="mb-0">{item.content}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="g-4 align-items-stretch mt-5">
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4 p-lg-5">
                <h2 className="h4">Doelgroepen</h2>
                <Row className="g-4">
                  <Col sm={6}>
                    <h3 className="h5">Volwassenen</h3>
                    <ul className="ps-3 mb-0">
                      <li>Slikproblemen</li>
                      <li>Ziekte van Parkinson en neurodegeneratieve stoornissen</li>
                      <li>Slik- en spraakproblemen na hoofd-halsoncologie</li>
                      <li>Mimetherapie</li>
                      <li>Dysartrie</li>
                      <li>Afasie</li>
                      <li>Manuele facilitatie</li>
                    </ul>
                  </Col>
                  <Col sm={6}>
                    <h3 className="h5">Kinderen</h3>
                    <ul className="ps-3 mb-0">
                      <li>Leerproblemen: lezen, spelling, rekenen</li>
                      <li>Oromyofunctionele stoornissen i.f.v. orthodontie</li>
                      <li>Taalproblemen</li>
                      <li>Articulatieproblemen</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4 p-lg-5">
                <h2 className="h4">Procedure: aanmelding en opstart therapie</h2>
                <div className="d-flex mb-3">
                  <span className="step-number">1</span>
                  <div>
                    <h3 className="h6">Contact opnemen</h3>
                    <p className="mb-0">
                      Neem contact op via <a href="tel:+32123456789">0123/456789</a>, via e-mail naar <a href="mailto:info@example-logopedie.be">info@example-logopedie.be</a> of via het contactformulier. Formuleer kort je hulpvraag en we plannen de eerste afspraak in.
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <span className="step-number">2</span>
                  <div>
                    <h3 className="h6">RIZIV-aanvraagprocedure</h3>
                    <ol className="ps-3 mb-0">
                      <li>Je ontvangt een verwijsbrief en voorschrift voor logopedisch onderzoek voor de arts-specialist.</li>
                      <li>De nodige testen worden afgenomen, resultaten geanalyseerd en het verslag opgesteld.</li>
                      <li>In een tweede gesprek bespreken we de onderzoeksresultaten.</li>
                      <li>Je bezorgt het verslag aan de arts-specialist en vraagt een voorschrift voor de behandeling.</li>
                      <li>Het voorschrift wordt aan de logopediste bezorgd.</li>
                      <li>De documenten worden doorgegeven aan de mutualiteit.</li>
                      <li>Daarna kan de therapie van start gaan.</li>
                    </ol>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-lg-5">
                <h2 className="h4">Tarieven en terugbetaling</h2>
                <p className="text-muted">Als geconventioneerd logopedist volg ik de tarieven die bepaald zijn door het RIZIV.</p>
                <div className="table-responsive">
                  <Table bordered hover className="mb-4">
                    <thead className="table-light">
                      <tr>
                        <th>Prestatie</th>
                        <th>Honorarium</th>
                        <th>Terugbetaling (gewone)</th>
                        <th>Remgeld (gewone)</th>
                        <th>Terugbetaling (verhoogd)</th>
                        <th>Remgeld (verhoogd)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tarieven.map((row) => (
                        <tr key={row.prestatie}>
                          <td>{row.prestatie}</td>
                          <td>{row.honorarium}</td>
                          <td>{row.terugbetaling}</td>
                          <td>{row.remgeld}</td>
                          <td>{row.terugbetalingVerhoogd}</td>
                          <td>{row.remgeldVerhoogd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <p className="mb-0">Voor huisbezoeken wordt een verplaatsingsvergoeding aangerekend.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DienstenPage;
