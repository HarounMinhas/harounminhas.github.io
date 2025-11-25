import type { Metadata } from "next";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Over mij", href: "#over-mij" },
  { label: "Diensten", href: "#diensten" },
  { label: "Contact", href: "#contact" },
] as const;

const valueHighlights = [
  {
    title: "Gespecialiseerd in volwassenenzorg",
    description:
      "Brede expertise in communicatieve en slikproblemen bij volwassenen, met bijzondere aandacht voor neurologische aandoeningen.",
  },
  {
    title: "Rust en duidelijkheid",
    description:
      "Een warme en overzichtelijke aanpak waarin er ruimte is voor uw verhaal en duidelijke stappen richting herstel.",
  },
  {
    title: "Samenwerking met zorgpartners",
    description:
      "Nauwe afstemming met artsen, ziekenhuizen en orthodontisten voor een multidisciplinaire behandeling.",
  },
] as const;

const specializations = [
  {
    title: "Parkinsonzorg",
    description:
      "Ondersteuning bij stemgebruik, articulatie en slikproblemen die kunnen optreden bij de ziekte van Parkinson. U leert technieken om duidelijker te spreken en veiliger te slikken.",
  },
  {
    title: "Mimetherapie",
    description:
      "Gerichte begeleiding na een aangezichtsverlamming. Door massage en oefeningen herwinnen we controle over de aangezichtsspieren tijdens spreken, eten en gelaatsuitdrukkingen.",
  },
  {
    title: "Dysfagie",
    description:
      "Diagnose en therapie bij slikproblemen na een hersenaandoening, ingreep of tijdens het verouderingsproces. We werken aan veilig slikken en passen indien nodig de consistentie van voeding aan.",
  },
  {
    title: "Oromyofunctionele therapie (OMFT)",
    description:
      "We herstellen de balans tussen tong- en mondspieren om afwijkende mondgewoonten af te leren. Vaak in samenwerking met orthodontie voor een duurzaam resultaat.",
  },
] as const;

const services = [
  {
    title: "Volwassenen",
    description:
      "Op maat van uw dagelijks leven, met aandacht voor stem, slikken en communicatie.",
    bullets: [
      "Slikproblemen (dysfagie) bij neurologische aandoeningen of na heelkunde",
      "Communicatieve revalidatie bij afasie, dysartrie of stemproblemen",
      "Revalidatie na hoofd-halsoncologie",
      "Begeleiding bij de ziekte van Parkinson en andere neurodegeneratieve stoornissen",
      "Mimetherapie en manuele facilitatie",
    ],
  },
  {
    title: "Kinderen",
    description:
      "Steun voor jonge cliënten waar nodig, steeds in overleg met ouders en school.",
    bullets: [
      "Leerstoornissen rond lezen, spelling en rekenen",
      "Taal- en articulatieproblemen",
      "Oromyofunctionele therapie ter ondersteuning van orthodontie",
      "Begeleiding bij stem- en spraakproblemen",
    ],
  },
] as const;

const procedureSteps = [
  {
    title: "1. Eerste contact",
    description:
      "Bel of mail om uw hulpvraag te delen. We plannen een eerste gesprek in Middelkerke of tijdens een huisbezoek.",
  },
  {
    title: "2. Onderzoek en verslag",
    description:
      "U ontvangt een verwijsbrief voor de arts-specialist. Ik voer het logopedisch onderzoek uit, analyseer de resultaten en bespreek ze met u.",
  },
  {
    title: "3. Aanvraag terugbetaling",
    description:
      "Met het verslag en voorschrift rond ik samen met u de administratie richting mutualiteit af, zodat de terugbetaling in orde is.",
  },
  {
    title: "4. Therapie op maat",
    description:
      "We starten de behandeling met heldere doelen, evaluatiemomenten en nauwe afstemming met eventuele zorgpartners.",
  },
] as const;

const tariffRows = [
  {
    service: "Sessie van 30 minuten (praktijk)",
    honorarium: "€ 37,35",
    standardReimbursement: "€ 31,85",
    standardCopay: "€ 5,50",
    increasedReimbursement: "€ 35,35",
    increasedCopay: "€ 2,00",
  },
  {
    service: "Sessie van 60 minuten",
    honorarium: "€ 75,01",
    standardReimbursement: "€ 64,01",
    standardCopay: "€ 11,00",
    increasedReimbursement: "€ 70,51",
    increasedCopay: "€ 4,50",
  },
  {
    service: "Aanvangsbilan (per 30 min. onderzoek)",
    honorarium: "€ 44,18",
    standardReimbursement: "€ 36,68",
    standardCopay: "€ 7,50",
    increasedReimbursement: "€ 41,18",
    increasedCopay: "€ 3,00",
  },
  {
    service: "Evaluatiezitting",
    honorarium: "€ 74,69",
    standardReimbursement: "€ 63,69",
    standardCopay: "€ 11,00",
    increasedReimbursement: "€ 70,19",
    increasedCopay: "€ 4,50",
  },
] as const;

const openingHours = [
  {
    day: "Maandag",
    practice: "13.00 – 18.00 | Praktijk Middelkerke",
    homeVisits: "Huisbezoeken: Koksijde, Oostduinkerke, Veurne, De Panne",
  },
  {
    day: "Dinsdag",
    practice: "13.00 – 18.30 | Praktijk Middelkerke",
    homeVisits: "",
  },
  {
    day: "Woensdag",
    practice: "13.00 – 18.00 | Praktijk Middelkerke",
    homeVisits: "Huisbezoeken: Koksijde, Oostduinkerke, Veurne, De Panne",
  },
  {
    day: "Donderdag",
    practice: "13.00 – 18.30 | Praktijk Middelkerke",
    homeVisits: "",
  },
  {
    day: "Vrijdag",
    practice: "13.00 – 18.00 | Praktijk Middelkerke",
    homeVisits: "",
  },
] as const;

const targetGroups = {
  adults: [
    "Slikproblemen",
    "Ziekte van Parkinson en neurodegeneratieve stoornissen",
    "Slik- en spraakproblemen na hoofd-halsoncologie",
    "Mimetherapie",
    "Dysartrie",
    "Afasie",
    "Manuele facilitatie",
    "Stemproblemen",
  ],
  children: [
    "Leerproblemen rond lezen, spelling en rekenen",
    "Taalproblemen",
    "Articulatieproblemen",
    "Oromyofunctionele therapie",
  ],
} as const;

const contactDetails = {
  address: "P. de Smet de Naeyerstraat 17, 8430 Middelkerke",
  phoneDisplay: "0476 47 63 21",
  phoneHref: "tel:+32476476321",
  email: "remmery.marieke@gmail.com",
  altEmail: "logopediemarieke@gmail.com",
};

export const metadata: Metadata = {
  title: "Marieke Praktijk | Logopedie in Middelkerke",
  description:
    "Logopediste Marieke Remmery biedt gespecialiseerde therapie voor volwassenen en gerichte ondersteuning voor kinderen in Middelkerke en omgeving.",
};

const SectionHeading = ({ title, kicker }: { title: string; kicker?: string }) => (
  <header className="space-y-2">
    {kicker ? (
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700/80">{kicker}</p>
    ) : null}
    <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
  </header>
);

export default function MariekePraktijkPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F3] text-slate-900">
      <header className="relative overflow-hidden" id="home">
        <div className="absolute inset-0 bg-gradient-to-br from-[#328E6E] via-[#67AE6E] to-[#E1EEBC]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-20 pt-6 text-white sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">Marieke Praktijk</span>
            <div className="hidden items-center gap-6 text-sm font-medium md:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 text-white/90 transition hover:bg-white/15 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[3fr,2fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">
                Logopediepraktijk in Middelkerke
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Betrokken logopedische zorg voor volwassenen en kinderen
              </h1>
              <p className="text-lg text-white/90">
                Ik ben Marieke Remmery, master in de logopedische en audiologische wetenschappen (KU Leuven, 2014) en sinds 2016
                actief als logopediste. Vanuit mijn praktijk in Middelkerke en via huisbezoeken ondersteun ik cliënten met
                slik-, spraak- en taalproblemen met een rustige, duidelijke aanpak.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2C6A57] shadow-md transition hover:bg-[#F9F6F3]"
                >
                  Neem contact op
                </a>
                <a
                  href={contactDetails.phoneHref}
                  className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Bel {contactDetails.phoneDisplay}
                </a>
              </div>
              <div className="grid gap-4 rounded-2xl bg-white/15 p-6 backdrop-blur-sm sm:grid-cols-2">
                {valueHighlights.map((highlight) => (
                  <div key={highlight.title} className="space-y-2">
                    <h3 className="text-base font-semibold text-white">{highlight.title}</h3>
                    <p className="text-sm text-white/80">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 text-sm leading-relaxed text-white/90 shadow-xl">
              <div className="absolute -top-8 right-6 hidden h-16 w-16 rounded-full bg-white/25 sm:block" />
              <div className="absolute -bottom-10 left-8 hidden h-24 w-24 rounded-full bg-white/10 sm:block" />
              <div className="relative space-y-4">
                <h3 className="text-lg font-semibold text-white">Over Marieke</h3>
                <p>
                  Naast mijn zelfstandige praktijk werk ik binnen het ziekenhuis, waardoor ik dagelijks nauw samenwerk met
                  artsen en andere zorgverleners. Die samenwerking versterkt elke therapie en zorgt voor een brede kijk op
                  uw situatie.
                </p>
                <p>
                  Tijdens mijn master ontdekte ik hoe veelzijdig logopedie is. Het begeleiden van volwassenen met complexe
                  slik- en communicatieproblemen groeide uit tot mijn passie. Daarom volgde ik aanvullende opleidingen en
                  rondde ik een postgraduaat slikproblemen af.
                </p>
                <blockquote className="rounded-lg border-l-4 border-white/60 bg-white/10 p-4 text-sm italic text-white/95">
                  “Logopedie is bijzonder waardevol: het helpt mensen opnieuw grip te krijgen op hun dagelijkse communicatie
                  en levenskwaliteit.”
                </blockquote>
                <p className="text-white/80">
                  Ik blijf mij jaarlijks bijscholen om nieuwe inzichten en behandelmethodes snel in te zetten in de praktijk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <section className="space-y-8" id="over-mij">
          <SectionHeading title="Een rustige en persoonlijke begeleiding" kicker="Over mij" />
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
            <div className="space-y-5 text-base leading-relaxed text-slate-700">
              <p>
                Als logopediste streef ik naar heldere communicatie en haalbare stappen. Ik luister naar uw verhaal, leg de
                mogelijkheden uit in begrijpelijke taal en motiveer u om samen naar resultaat te werken.
              </p>
              <p>
                Zowel in de praktijk als tijdens huisbezoeken werk ik met eenzelfde rustige structuur. Elke sessie heeft
                duidelijke doelen en we evalueren regelmatig de vooruitgang. Zo behoudt u het overzicht en blijft u gemotiveerd.
              </p>
              <p>
                Cliënten waarderen de combinatie van professionaliteit en warme betrokkenheid. Of het nu gaat om een intensieve
                revalidatie of om ondersteuning op school: u krijgt begeleiding die past bij uw ritme en omgeving.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Opleiding en expertise</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Master in de logopedische en audiologische wetenschappen, KU Leuven (2014)</li>
                  <li>Postgraduaat slikproblemen en regelmatige bijscholing in dysfagie en neurogene communicatiestoornissen</li>
                  <li>Sinds 2016 zelfstandige logopediste, gecombineerd met werk in het ziekenhuis</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-[#F2F9F5] p-6 shadow-sm">
                <h3 className="text-base font-semibold text-[#2C6A57]">Visie</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Logopedie is meer dan techniek: het draait om vertrouwen. Ik werk graag nauw samen met familie, mantelzorg en
                  andere zorgpartners, zodat u zich gedragen voelt tijdens het traject.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10" id="diensten">
          <SectionHeading title="Diensten en specialisaties" kicker="Aanbod" />
          <div className="grid gap-6 md:grid-cols-2">
            {specializations.map((specialization) => (
              <article key={specialization.title} className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#2C6A57]">{specialization.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{specialization.description}</p>
              </article>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-emerald-100 bg-[#F2F9F5] p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#2C6A57]">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{service.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#328E6E]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Doelgroepen</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-base font-semibold text-[#2C6A57]">Volwassenen</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {targetGroups.adults.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#328E6E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#2C6A57]">Kinderen</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {targetGroups.children.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#9DC08B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Geen online agenda: elke afspraak wordt persoonlijk ingepland zodat we voldoende tijd kunnen nemen voor uw
              vragen en verwachtingen.
            </p>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading title="Zo werken we samen" kicker="Werkwijze" />
          <div className="grid gap-6 md:grid-cols-2">
            {procedureSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#2C6A57]">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-700">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-[#F2F9F5] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Praktisch</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Therapie enkel op afspraak in de praktijk of via huisbezoeken (regio Koksijde, Oostduinkerke, Veurne en De Panne).</li>
              <li>Voor huisbezoeken wordt een verplaatsingsvergoeding aangerekend.</li>
              <li>We volgen de tarieven zoals bepaald door het RIZIV (geconventioneerd logopedist).</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading title="Tarieven en terugbetaling" kicker="Financieel" />
          <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-100 text-sm">
                <thead className="bg-[#E1EEBC] text-left text-xs font-semibold uppercase tracking-wide text-emerald-900">
                  <tr>
                    <th className="px-4 py-3">Prestatie</th>
                    <th className="px-4 py-3">Honorarium</th>
                    <th className="px-4 py-3">Terugbetaling</th>
                    <th className="px-4 py-3">Remgeld</th>
                    <th className="px-4 py-3">Verhoogde tegemoetkoming</th>
                    <th className="px-4 py-3">Remgeld</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 text-slate-700">
                  {tariffRows.map((row) => (
                    <tr key={row.service} className="hover:bg-[#F9FDF5]">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.service}</td>
                      <td className="px-4 py-3">{row.honorarium}</td>
                      <td className="px-4 py-3">{row.standardReimbursement}</td>
                      <td className="px-4 py-3">{row.standardCopay}</td>
                      <td className="px-4 py-3">{row.increasedReimbursement}</td>
                      <td className="px-4 py-3">{row.increasedCopay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-3 text-xs text-slate-600">* Voor huisbezoeken geldt een bijkomende verplaatsingsvergoeding.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-[#E1EEBC] via-[#F3F7DD] to-[#F9F6F3] p-10 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-[#2C6A57]">Klaar om samen te werken?</h2>
              <p className="text-base text-slate-700">
                Plan een kennismaking en ontdek hoe logopedie uw communicatie, stem of slikfunctie kan versterken. Ik neem graag
                de tijd om uw vragen te beantwoorden en het traject te verduidelijken.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <a
                href="#contact"
                className="rounded-full bg-[#328E6E] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2C6A57]"
              >
                Stuur een bericht
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-8" id="contact">
          <SectionHeading title="Contact en openingsuren" kicker="Contact" />
          <div className="grid gap-10 lg:grid-cols-[2fr,3fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Praktische informatie</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li>
                    <strong>Adres:</strong> {contactDetails.address}
                  </li>
                  <li>
                    <strong>Telefoon:</strong> <a className="text-[#2C6A57]" href={contactDetails.phoneHref}>{contactDetails.phoneDisplay}</a>
                  </li>
                  <li>
                    <strong>E-mail:</strong> <a className="text-[#2C6A57]" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                  </li>
                  <li>
                    <strong>Alternatief e-mailadres:</strong>{" "}
                    <a className="text-[#2C6A57]" href={`mailto:${contactDetails.altEmail}`}>
                      {contactDetails.altEmail}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-[#F2F9F5] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#2C6A57]">Openingsuren (op afspraak)</h3>
                <ul className="mt-4 space-y-4 text-sm text-slate-700">
                  {openingHours.map((slot) => (
                    <li key={slot.day}>
                      <p className="font-semibold text-slate-900">{slot.day}</p>
                      <p>{slot.practice}</p>
                      {slot.homeVisits ? <p className="text-slate-600">{slot.homeVisits}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Stuur een bericht</h3>
              <p className="mt-2 text-sm text-slate-600">
                Vul het formulier in. Uw bericht wordt geopend in uw e-mailprogramma zodat u het eenvoudig kunt verzenden.
              </p>
              <form
                className="mt-6 grid gap-4"
                action={`mailto:${contactDetails.email}`}
                method="post"
                encType="text/plain"
              >
                <label className="text-sm font-medium text-slate-800">
                  Naam
                  <input
                    type="text"
                    name="Naam"
                    required
                    className="mt-1 w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#328E6E] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                  />
                </label>
                <label className="text-sm font-medium text-slate-800">
                  E-mailadres
                  <input
                    type="email"
                    name="Email"
                    required
                    className="mt-1 w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#328E6E] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                  />
                </label>
                <label className="text-sm font-medium text-slate-800">
                  Telefoonnummer (optioneel)
                  <input
                    type="tel"
                    name="Telefoon"
                    className="mt-1 w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#328E6E] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                  />
                </label>
                <label className="text-sm font-medium text-slate-800">
                  Bericht
                  <textarea
                    name="Bericht"
                    rows={5}
                    required
                    className="mt-1 w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#328E6E] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full justify-center rounded-full bg-[#328E6E] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2C6A57]"
                >
                  Verstuur bericht via e-mail
                </button>
                <p className="text-xs text-slate-500">
                  U ontvangt automatisch een nieuwe e-mail waarin uw gegevens ingevuld staan. Controleer ze even en druk op
                  verzenden om de aanvraag af te ronden.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-100 bg-white/70 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marieke Remmery — Logopediepraktijk Middelkerke</p>
          <p>
            BTW-plichtig? Neem contact op voor facturatie op maat. Laat het gerust weten als u documenten of attestering nodig
            heeft.
          </p>
        </div>
      </footer>
    </div>
  );
}
