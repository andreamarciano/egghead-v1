import { useState, useEffect } from "react";
import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import Carousel from "../comp/review/Carousel";
import Reviews from "../comp/review/Reviews";
import Scrollbar from "../comp/Scrollbar";
import Maze from "../comp/game/Maze/Maze";

function About() {
  const [isMazeOpen, setIsMazeOpen] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      {/* Vertical Scroll Bar */}
      <Scrollbar />

      <div className="py-10 bg-gradient-to-r from-blue-300 via-green-300 to-orange-300">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            About Us
          </h1>

          {/* Sec 1: Our Story */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Our Story
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Back in <strong>1972</strong>, a group of visionary farmers
              decided that Earth simply wasn't enough to raise the best eggs.
              With a second-hand rocket and a couple of very brave chickens, we
              launched our first farm on the <strong>Moon</strong>. Today, we
              continue to innovate, bringing the most extraordinary eggs in the
              universe to your table!
            </p>
          </section>

          {/* Sec 2: Our Mission */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Our goal is to <strong>revolutionize the concept of eggs</strong>.
              We don’t just sell eggs — we sell experiences! Our mission is to
              combine{" "}
              <strong>science, innovation, and a pinch of madness</strong> to
              create the best product possible.
            </p>
          </section>

          {/* Sec 3: Where We Are */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Where We Are
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Though we dream among the stars, our main headquarters is nestled
              in a quiet farm
              <strong> among the hills of Ouagadougou</strong>, surrounded by
              happy hens, eccentric scientists, and a few sheep who wandered in
              by accident.
            </p>

            {/* Maze */}
            <div
              className="bg-white shadow-md p-5 rounded-lg mt-4 max-w-2xl mx-auto text-center hover:scale-105 transition-all ease-linear cursor-pointer"
              onClick={() => setIsMazeOpen(true)}
            >
              <p className="text-gray-700">
                📍 <strong>Address:</strong> Rebel Hens Lane, 42, 00042, Lunar
                Farm, Burkina Faso
              </p>
              <p className="text-gray-700">
                📞 <strong>Phone:</strong> +39 555-OVO-123
              </p>
              <p className="text-gray-700">
                📧 <strong>Email:</strong> info@moonlayeggs.com
              </p>
            </div>
          </section>

          {/* Sec 4: Our Team */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Our team is a wild mix of{" "}
              <strong>farmers, mad scientists, and retired astronauts</strong>.
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-600 max-w-2xl mx-auto text-center">
              <li>
                🥚 <strong>Dr. Eggo Nauta</strong> - Former astronaut, now Head
                of Egg Quality.
              </li>
              <li>
                🥚 <strong>Ms. Yolanda Yolk</strong> - Specialist in space hens
                and flavor development.
              </li>
              <li>
                🥚 <strong>Professor Albumino</strong> - Chief scientist, in
                charge of zero-gravity eggs.
              </li>
            </ul>
          </section>

          {/* Sec 5: Special Eggs */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Our Special Eggs
            </h2>
            <ul className="list-disc pl-5 text-gray-600 max-w-2xl mx-auto text-center">
              <li>
                🚀 <strong>ZeroG Eggs</strong> - Perfect for space missions.
                They don’t roll away!
              </li>
              <li>
                🌈 <strong>Rainbow Eggs</strong> - The yolk changes color
                depending on the cook’s mood.
              </li>
              <li>
                🎵 <strong>Singing Eggs</strong> - Crack one open and it sings a
                random tune.
              </li>
              <li>
                🔥 <strong>Volcanic Eggs</strong> - They cook themselves!
                (Handle with care.)
              </li>
            </ul>
          </section>

          {/* Sec 6: Sustainability */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Sustainability & Innovation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Our lunar farm is fully solar-powered and recycles 100% of its
              resources. We're also experimenting with{" "}
              <strong>bionic chickens</strong> — though they tend to rebel… for
              now.
            </p>
          </section>

          {/* Sec 7: Why Choose Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Why Choose Us?
            </h2>
            <ul className="list-disc pl-5 text-gray-600 max-w-2xl mx-auto text-center">
              <li>
                ✔️ <strong>Truly one-of-a-kind eggs on Earth</strong> (literally
                — some come from outer space!)
              </li>
              <li>
                ✔️ <strong>Innovation and creativity</strong> in every product.
              </li>
              <li>
                ✔️ <strong>100% happy hens</strong> (with space helmets).
              </li>
              <li>
                ✔️ <strong>Always-available customer service</strong> (except
                during launch countdowns).
              </li>
            </ul>
          </section>

          {/* Carousel */}
          <Carousel />
          {/* Reviews */}
          <Reviews />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Maze */}
      {isMazeOpen && <Maze onClose={() => setIsMazeOpen(false)} />}
    </>
  );
}

export default About;
