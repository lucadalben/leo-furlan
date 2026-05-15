import Navbar from "@/components/Navbar";
import { getAboutPage, getSiteSettings } from "@/lib/sanity/queries";

export const revalidate = 60;

const STATIC_BIO = [
  "Leonardo Furlan is an Italian artist born in 1998; he studied painting and graduated at Venice Academy of Fine Arts in 2024.",
  "In his paintings, that he makes like iconic apparitions, he brings together multiple interests he's into, in multiple ways.\nThe paradox of inconsistency and power of originality and banality is for sure a central theme: who and when someone can tell if a work is more original than other ones? Why and how is it important? Leonardo reflects about individual and common life experiences, on the way they, inextricably from each other, create a shared but at the same time personal imaginary.",
];

const STATIC_EDUCATION = [
  { period: "2021–2024", description: "Second level degree [Painting], Accademia di Belle Arti di Venezia" },
  { period: "2017–2021", description: "First level degree [Painting], Accademia di Belle Arti di Venezia" },
  { period: "2012–2017", description: 'High school diploma [Figurative Arts], Liceo artistico "Bruno Munari", Vittorio Veneto' },
];

const STATIC_EXHIBITIONS = [
  { period: "03.2024–04.2024", description: "Group exhibit: Happy Ending, curated by Valerio Dehò and TRA Treviso Ricerca Arte, at Galleria L'Elefante, Treviso" },
  { period: "11.2023–11.2024", description: "Group exhibit: Hotel-Dieu, presso Galleria A plus A, Venezia" },
  { period: "10.2021", description: "Group exhibit: Wunderbar, at Bardadino, Venezia" },
  { period: "2020–2023", description: "Group exhibit: Dentro l'occhio della mosca, at Cà Pier, Venezia" },
  { period: "11.2018", description: "Extraordinario Workshop: painting workshop and group exhibit curated by Daniele Capra, Nico Covre, Nebojša Despotovic and Atelier F, at padiglione Antares, Marghera" },
  { period: "2018–2019", description: "Open painting workshop and group exhibit curated by Carlo di Raco and Martino Scavezzon, capannone 35, at Forte Marghera, Venezia" },
];

export default async function InfoPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  const bioParagraphs = about?.bio
    ? about.bio.split("\n\n").filter(Boolean)
    : STATIC_BIO;

  const education = about?.education?.length ? about.education : STATIC_EDUCATION;
  const exhibitions = about?.exhibitions?.length ? about.exhibitions : STATIC_EXHIBITIONS;

  const email = settings?.email ?? "leonardofurlan241@gmail.com";
  const phone = settings?.phone ?? "+39 340 195 1100";
  const instagram = settings?.instagram ?? "@_eonard_";
  const instagramUrl = settings?.instagramUrl ?? "https://www.instagram.com/_eonard_/";

  return (
    <>
      <Navbar />
      <section className="info-section">

        {/* Bio — full width */}
        <div className="bio-full">
          {bioParagraphs.map((p, i) => (
            <p key={i} style={i > 0 ? { marginTop: "1em" } : undefined}>
              {p.split("\n").map((line, j) => (
                <span key={j}>{line}{j < p.split("\n").length - 1 && <br />}</span>
              ))}
            </p>
          ))}
        </div>

        {/* CV — two columns */}
        <div className="row">

          {/* Education */}
          <div className="column">
            <span id="category">EDUCATION</span>
            <br /><br /><br />
            {education.map((entry, i) => (
              <div key={i}>
                <div className="column-wrap">
                  <div className="column-wrap-date">{entry.period}</div>
                  <div className="column-wrap-activity">{entry.description}</div>
                </div>
                {i < education.length - 1 && <br />}
              </div>
            ))}
          </div>

          {/* Exhibitions */}
          <div className="column">
            <span id="category">EXHIBITIONS</span>
            <br /><br />
            {exhibitions.map((entry, i) => (
              <div key={i}>
                <div className="column-wrap">
                  <div className="column-wrap-date">{entry.period}</div>
                  <div className="column-wrap-activity">{entry.description}</div>
                </div>
                {i < exhibitions.length - 1 && <br />}
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="footer info-footer">
          <div id="contacts" className="column">
            <span id="category">CONTACTS</span>
            <br /><br />
            <a id="email" href={`mailto:${email}`}>{email}</a>
            <a id="phone" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            <a
              id="instagram"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {instagram}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
