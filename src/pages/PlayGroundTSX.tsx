import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";

function PlaygroundTSX() {
  return (
    <>
      <Navbar />
      <div className="p-2 m-10 h-50 bg-gray-600">
        <h1 className="text-2xl font-bold">This is a testing page</h1>
      </div>

      <Footer />
    </>
  );
}

export default PlaygroundTSX;
