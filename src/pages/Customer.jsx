import Navbar from "../comp/Navbar";
import Weather from "../comp/api/Weather";

function Customer() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold">Customer page</h1>
      <Weather />
    </>
  );
}

export default Customer;
