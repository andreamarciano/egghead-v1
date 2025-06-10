import { useState } from "react";

function CityInfo() {
  const [city, setCity] = useState("Roma");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCityData = async () => {
    setLoading(true);
    try {
      const imgRes = await fetch(
        `https://factoryproject-unsplash.onrender.com/images?query=${encodeURIComponent(
          city
        )}`
      );
      const imgData = await imgRes.json();
      setImages(imgData.results);

      // 🔒 Wikipedia disabilitata per ora
      // const descRes = await fetch(
      //   `https://factoryproject-unsplash.onrender.com/citydesc?city=${encodeURIComponent(city)}`
      // );
      // const descData = await descRes.json();
      // setCityDesc(descData);
    } catch (error) {
      console.error("API error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-red-500 p-2 mt-2 mb-20">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        className="border-2 p-2 mr-2"
      />
      <button onClick={fetchCityData} disabled={loading} className="bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 cursor-pointer">
        {loading ? "Loading..." : "Search"}
      </button>

      {/* 🔒 Wikipedia disabilitata per ora
      {cityDesc && (
        <div style={{ marginTop: 20 }}>
          <h2>{cityDesc.title}</h2>
          {cityDesc.thumbnail && (
            <img
              src={cityDesc.thumbnail}
              alt={cityDesc.title}
              style={{ maxWidth: 300 }}
            />
          )}
          <p>{cityDesc.description}</p>
          <a
            href={cityDesc.content_urls?.desktop.page}
            target="_blank"
            rel="noreferrer"
          >
            Leggi su Wikipedia
          </a>
        </div>
      )}
      */}

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}
      >
        {images.map((img) => (
          <div key={img.id} style={{ maxWidth: 200 }}>
            <a href={img.links.html} target="_blank" rel="noreferrer">
              <img
                src={img.urls.small}
                alt={img.alt_description || "immagine città"}
                style={{ width: "100%", borderRadius: 6 }}
              />
            </a>
            <p style={{ fontSize: 12, margin: "4px 0" }}>
              Foto di{" "}
              <a href={img.user.profile_url} target="_blank" rel="noreferrer">
                {img.user.name}
              </a>{" "}
              su Unsplash
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityInfo;

// import { useState, useEffect } from "react";

// function CityInfo() {
//   const [city, setCity] = useState("Roma");
//   const [images, setImages] = useState([]);
//   const [cityDesc, setCityDesc] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchCityData = async () => {
//     setLoading(true);
//     try {
//       const [imgRes, descRes] = await Promise.all([
//         fetch(
//           `https://factoryproject-unsplash.onrender.com/images?query=${encodeURIComponent(
//             city
//           )}`
//         ),
//         fetch(
//           `http://localhost:3000/citydesc?city=${encodeURIComponent(city)}`
//         ),
//       ]);

//       const imgData = await imgRes.json();
//       const descData = await descRes.json();

//       setImages(imgData.results);
//       setCityDesc(descData);
//     } catch (error) {
//       console.error("API error:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCityData();
//   }, []);

//   return (
//     <div>
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         placeholder="Inserisci il nome di una città"
//       />
//       <button onClick={fetchCityData} disabled={loading}>
//         {loading ? "Caricamento..." : "Cerca"}
//       </button>

//       {cityDesc && (
//         <div style={{ marginTop: 20 }}>
//           <h2>{cityDesc.title}</h2>
//           {cityDesc.thumbnail && (
//             <img
//               src={cityDesc.thumbnail}
//               alt={cityDesc.title}
//               style={{ maxWidth: 300 }}
//             />
//           )}
//           <p>{cityDesc.description}</p>
//           <a
//             href={cityDesc.content_urls?.desktop.page}
//             target="_blank"
//             rel="noreferrer"
//           >
//             Leggi su Wikipedia
//           </a>
//         </div>
//       )}

//       <div
//         style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}
//       >
//         {images.map((img) => (
//           <div key={img.id} style={{ maxWidth: 200 }}>
//             <a href={img.links.html} target="_blank" rel="noreferrer">
//               <img
//                 src={img.urls.small}
//                 alt={img.alt_description || "immagine città"}
//                 style={{ width: "100%", borderRadius: 6 }}
//               />
//             </a>
//             <p style={{ fontSize: 12, margin: "4px 0" }}>
//               Foto di{" "}
//               <a href={img.user.profile_url} target="_blank" rel="noreferrer">
//                 {img.user.name}
//               </a>{" "}
//               su Unsplash
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CityInfo;
