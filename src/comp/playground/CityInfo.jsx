import { useState } from "react";

function CityInfo() {
  const [city, setCity] = useState("Roma");
  const [images, setImages] = useState([]);
  const [cityDesc, setCityDesc] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCityData = async () => {
    setLoading(true);
    try {
      // Unsplash
      const imgRes = await fetch(
        `https://factoryproject-unsplash.onrender.com/images?query=${encodeURIComponent(
          city
        )}`
      );
      const imgData = await imgRes.json();
      setImages(imgData.results);

      // Wikipedia
      const descRes = await fetch(
        `https://factoryproject-unsplash.onrender.com/citydesc?city=${encodeURIComponent(
          city
        )}`
      );
      const descData = await descRes.json();
      setCityDesc(descData);
    } catch (error) {
      console.error("API error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 mt-4 mb-20 flex flex-col items-center">
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border-2 p-2 mr-2"
        />
        <button
          onClick={fetchCityData}
          disabled={loading}
          className="bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {cityDesc && (
        <div className="relative w-200 h-200 flex items-center justify-center bg-red-500">
          {/* Wikipedia */}
          <div className="text-center z-10 h-80 bg-gray-800/50 p-2 rounded-xl shadow-md max-w-[250px] overflow-y-auto">
            <h2 className="text-xl font-semibold">{cityDesc.title}</h2>
            <p className="mt-2 text-sm">{cityDesc.description}</p>
            <a
              href={cityDesc.content_urls?.desktop.page}
              target="_blank"
              rel="noreferrer"
              className="text-blue-950 mt-2 inline-block text-sm"
            >
              Source: <span className="underline">Wikipedia</span>
            </a>
          </div>

          {/* Unsplash */}
          {images.slice(0, 8).map((img, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const radius = 280;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={img.id}
                className="absolute group"
                style={{
                  top: `calc(50% + ${y}px - 40px)`,
                  left: `calc(50% + ${x}px - 40px)`,
                }}
              >
                <a
                  href={img.links.html}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <img
                    src={img.urls.small}
                    alt={img.alt_description || "city"}
                    className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
                  />
                </a>

                {/* Author */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[90px] z-20 w-max bg-white bg-opacity-90 text-sm text-black px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span>
                    Photo by{" "}
                    <a
                      href={img.user.profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-800 underline"
                    >
                      {img.user.name}
                    </a>{" "}
                    on Unsplash
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CityInfo;
