import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import Carousel from "../comp/review/Carousel";
import Reviews from "../comp/review/Reviews";

function About() {
  return (
    <>
      <Navbar />

      <div className="bg-blue-100 py-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Titolo */}
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Chi Siamo
          </h1>

          {/* Sezione 1: La Nostra Storia */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              La Nostra Storia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Nel lontano <strong>1972</strong>, un gruppo di visionari
              agricoltori decise che la Terra non era abbastanza per coltivare
              le migliori uova. Con un razzo di seconda mano e un paio di
              galline molto coraggiose, lanciammo il nostro primo allevamento
              sulla <strong> Luna</strong>. Oggi, continuiamo a innovare,
              portando sul mercato le uova più straordinarie dell'universo!
            </p>
          </section>

          {/* Sezione 2: Missione */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              La Nostra Missione
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Il nostro obiettivo è{" "}
              <strong>rivoluzionare il concetto di uova</strong>. Non vendiamo
              semplici uova, ma esperienze! La nostra missione è combinare{" "}
              <strong>scienza, innovazione e un pizzico di follia</strong> per
              creare il miglior prodotto possibile.
            </p>
          </section>

          {/* Sezione 3: Dove Siamo */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Dove Siamo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Anche se sogniamo le stelle, la nostra sede principale si trova in
              una tranquilla fattoria
              <strong> nelle colline dell'Ouagadougou</strong>, circondata da galline
              felici, scienziati eccentrici e qualche pecora che si è intrufolata
              per caso.
            </p>

            <div className="bg-white shadow-md p-5 rounded-lg mt-4 max-w-2xl mx-auto text-center hover:scale-105 transition-all ease-linear cursor-pointer">
              <p className="text-gray-700">
                📍 <strong>Indirizzo:</strong> Via delle Galline Ribelli, 42,
                00042, Fattoria Lunare, Burchina Faso
              </p>
              <p className="text-gray-700">
                📞 <strong>Telefono:</strong> +39 555-OVO-123
              </p>
              <p className="text-gray-700">
                📧 <strong>Email:</strong> info@uovidaluna.com
              </p>
            </div>
          </section>

          {/* Sezione 4: Team */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Il Nostro Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Il nostro team è composto da un mix esplosivo di{" "}
              <strong>
                agricoltori, scienziati pazzi e astronauti in pensione
              </strong>
              .
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-600 max-w-2xl mx-auto text-center">
              <li>
                🥚 <strong>Dr. Eggo Nauta</strong> – Ex astronauta, ora
                responsabile della qualità delle uova.
              </li>
              <li>
                🥚 <strong>Signora Yolanda Tuorli</strong> – Esperta di galline
                spaziali e sviluppo del gusto.
              </li>
              <li>
                🥚 <strong>Professor Albumino</strong> – Scienziato capo,
                responsabile delle uova a gravità zero.
              </li>
            </ul>
          </section>

          {/* Sezione 5: Prodotti Speciali */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Le Nostre Uova Speciali
            </h2>
            <ul className="list-disc pl-5 text-gray-600 max-w-2xl mx-auto text-center">
              <li>
                🚀 <strong>Uova ZeroG</strong> – Perfette per le missioni
                spaziali, non rotolano!
              </li>
              <li>
                🌈 <strong>Uova Arcobaleno</strong> – Il colore del tuorlo
                cambia in base all’umore di chi lo cucina.
              </li>
              <li>
                🎵 <strong>Uova Canterine</strong> – Quando le rompi, intonano
                una canzone a caso.
              </li>
              <li>
                🔥 <strong>Uova Vulcaniche</strong> – Si cuociono da sole!
                (Maneggiare con cautela)
              </li>
            </ul>
          </section>

          {/* Sezione 6: Sostenibilità */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Sostenibilità e Innovazione
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Il nostro allevamento lunare utilizza energia solare e ricicla il
              100% delle risorse. Stiamo anche sperimentando un progetto per
              creare <strong>galline bioniche</strong>, ma per ora tendono a
              ribellarsi.
            </p>
          </section>

          {/* Sezione 7: Perché Sceglierci */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Perché Sceglierci?
            </h2>
            <ul className="list-disc pl-5 text-gray-600 max-w-2xl mx-auto text-center">
              <li>
                ✔️ <strong>Uova uniche al mondo</strong> (letteralmente, alcune
                arrivano dallo spazio!)
              </li>
              <li>
                ✔️ <strong>Innovazione e creatività</strong> in ogni prodotto.
              </li>
              <li>
                ✔️ <strong>100% galline felici</strong> (e con il casco
                spaziale).
              </li>
              <li>
                ✔️ <strong>Servizio clienti sempre disponibile</strong> (tranne
                durante i lanci spaziali).
              </li>
            </ul>
          </section>

          <Carousel />

          <Reviews />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
