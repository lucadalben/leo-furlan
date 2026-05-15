import Navbar from "@/components/Navbar";

export default function InfoPage() {
  return (
    <>
      <Navbar />
      <section className="info-section">

        {/* Bio — full width */}
        <div className="bio-full">
          <p>
            Leonardo Furlan is an Italian artist born in 1998; he studied
            painting and graduated at Venice Academy of Fine Arts in 2024.
          </p>
          <br />
          <p>
            In his paintings, that he makes like iconic apparitions, he brings
            together multiple interests he&apos;s into, in multiple ways.
            <br />
            The paradox of inconsistency and power of originality and banality
            is for sure a central theme: who and when someone can tell if a
            work is more original than other ones? Why and how is it
            important? Leonardo reflects about individual and common life
            experiences, on the way they, inextricably from each other, create
            a shared but at the same time personal imaginary.
          </p>
        </div>

        {/* CV — two columns */}
        <div className="row">

          {/* Education */}
          <div className="column">
            <span id="category">EDUCATION</span>
            <br /><br /><br />

            <div className="column-wrap">
              <div className="column-wrap-date">2021–2024</div>
              <div className="column-wrap-activity">
                Second level degree [Painting], Accademia di Belle Arti di Venezia
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">2017–2021</div>
              <div className="column-wrap-activity">
                First level degree [Painting], Accademia di Belle Arti di Venezia
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">2012–2017</div>
              <div className="column-wrap-activity">
                High school diploma [Figurative Arts], Liceo artistico &ldquo;Bruno
                Munari&rdquo;, Vittorio Veneto
              </div>
            </div>
          </div>

          {/* Exhibitions */}
          <div className="column">
            <span id="category">EXHIBITIONS</span>
            <br /><br />

            <div className="column-wrap">
              <div className="column-wrap-date">03.2024–04.2024</div>
              <div className="column-wrap-activity">
                Group exhibit: <em>Happy Ending</em>, curated by Valerio Dehò
                and TRA Treviso Ricerca Arte, at Galleria L&apos;Elefante, Treviso
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">11.2023–11.2024</div>
              <div className="column-wrap-activity">
                Group exhibit: <em>Hotel-Dieu</em>, presso Galleria A plus A, Venezia
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">10.2021</div>
              <div className="column-wrap-activity">
                Group exhibit: <em>Wunderbar</em>, at Bardadino, Venezia
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">2020–2023</div>
              <div className="column-wrap-activity">
                Group exhibit: <em>Dentro l&apos;occhio della mosca</em>, at
                Cà Pier, Venezia
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">11.2018</div>
              <div className="column-wrap-activity">
                Extraordinario Workshop: painting workshop and group exhibit
                curated by Daniele Capra, Nico Covre, Neboj&#353;a Despotvic
                and Atelier F, at padiglione Antares, Marghera
              </div>
            </div>
            <br />
            <div className="column-wrap">
              <div className="column-wrap-date">2018–2019</div>
              <div className="column-wrap-activity">
                Open painting workshop and group exhibit curated by Carlo di
                Raco and Martino Scavezzon, capannone 35, at Forte Marghera, Venezia
              </div>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="footer info-footer">
          <div id="contacts" className="column">
            <span id="category">CONTACTS</span>
            <br /><br />
            <a id="email" href="mailto:leonardofurlan241@gmail.com">
              leonardofurlan241@gmail.com
            </a>
            <a id="phone" href="tel:+393401951100">
              +39 340 195 1100
            </a>
            <a
              id="instagram"
              href="https://www.instagram.com/_eonard_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @_eonard_
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
