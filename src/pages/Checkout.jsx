import Navbar from "../comp/Navbar";

function Checkout() {
  return (
    <>
      <Navbar></Navbar>
      <h1>Checkout Page</h1>
      <p>Enter your details to complete the purchase.</p>
      <h2>Insert info here</h2>
      <form>
        <input className="bg-amber-600" type="text" placeholder="XXXX-XXXX"></input>
      </form>
    </>
  );
}

export default Checkout;
