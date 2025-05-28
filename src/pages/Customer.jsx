import { useEffect } from "react";
import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";
import Weather from "../comp/customer/Weather";
import Support from "../comp/customer/Support";

function Customer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8">Customer Service</h1>

      {/* Customer Service */}
      <Support />

      {/* Weather */}
      <Weather />

      <Footer />
    </>
  );
}

export default Customer;
