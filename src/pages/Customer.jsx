import Navbar from "../comp/Navbar";
import Weather from "../comp/customer/Weather";
import Assistenza from "../comp/customer/Assistenza";

function Customer() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8">Servizio Clienti</h1>

      {/* Customer Service */}
      <Assistenza />

      {/* Weather */}
      <Weather />
    </>
  );
}

export default Customer;
