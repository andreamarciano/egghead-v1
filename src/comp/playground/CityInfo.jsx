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
    <div className="bg-red-500 p-2 mt-2 mb-20">
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

      {/* Wikipedia */}
      {cityDesc && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">{cityDesc.title}</h2>
          <p className="mt-2">{cityDesc.description}</p>
          <a
            href={cityDesc.content_urls?.desktop.page}
            target="_blank"
            rel="noreferrer"
            className="text-blue-900 underline mt-2 inline-block"
          >
            Read on Wikipedia
          </a>
        </div>
      )}

      {/* Unsplash */}
      <div className="flex flex-wrap gap-3 mt-5">
        {images.map((img) => (
          <div key={img.id} className="max-w-[200px]">
            <a href={img.links.html} target="_blank" rel="noreferrer">
              <img
                src={img.urls.small}
                alt={img.alt_description || "city image"}
                className="w-full rounded-md"
              />
            </a>
            <p className="text-xs mt-1">
              Photo by{" "}
              <a
                href={img.user.profile_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-900 underline"
              >
                {img.user.name}
              </a>{" "}
              on Unsplash
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityInfo;
