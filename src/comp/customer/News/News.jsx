import { useState } from "react";

function News() {
  const [topic, setTopic] = useState("world");
  const [country, setCountry] = useState("it");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const gnewsAPI = "956fe4da3a2c640faa1108da58c6af27";

  const fetchNews = () => {
    setLoading(true);
    fetch(
      `https://gnews.io/api/v4/top-headlines?country=${country}&category=${topic}&apikey=${gnewsAPI}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="relative">
        <h1 className="text-3xl p-4">Planet Earth News</h1>

        <div className="flex flex-col items-center justify-center p-4 gap-4 text-black bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto">
          {/* Topic */}
          <div className="w-full">
            <label
              htmlFor="topic"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Choose Topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <optgroup label="🌍 Global">
                <option value="general">📰 General</option>
                <option value="world">🌐 World</option>
                <option value="nation">🏛️ Nation</option>
              </optgroup>

              <optgroup label="📚 Knowledge">
                <option value="science">🔬 Science</option>
                <option value="technology">💻 Technology</option>
                <option value="health">🩺 Health</option>
              </optgroup>

              <optgroup label="🎭 Lifestyle">
                <option value="entertainment">🎬 Entertainment</option>
                <option value="sports">🏅 Sports</option>
                <option value="business">💼 Business</option>
              </optgroup>
            </select>
          </div>

          {/* Country */}
          <div className="w-full">
            <label
              htmlFor="country"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Choose Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <optgroup label="🌍 Europe">
                <option value="fr">🇫🇷 France</option>
                <option value="de">🇩🇪 Germany</option>
                <option value="gr">🇬🇷 Greece</option>
                <option value="ie">🇮🇪 Ireland</option>
                <option value="it">🇮🇹 Italy</option>
                <option value="nl">🇳🇱 Netherlands</option>
                <option value="no">🇳🇴 Norway</option>
                <option value="pt">🇵🇹 Portugal</option>
                <option value="ro">🇷🇴 Romania</option>
                <option value="es">🇪🇸 Spain</option>
                <option value="se">🇸🇪 Sweden</option>
                <option value="ch">🇨🇭 Switzerland</option>
                <option value="ua">🇺🇦 Ukraine</option>
                <option value="gb">🇬🇧 United Kingdom</option>
              </optgroup>

              <optgroup label="🌎 Americas">
                <option value="br">🇧🇷 Brazil</option>
                <option value="ca">🇨🇦 Canada</option>
                <option value="pe">🇵🇪 Peru</option>
                <option value="us">🇺🇸 United States</option>
              </optgroup>

              <optgroup label="🌏 Asia">
                <option value="cn">🇨🇳 China</option>
                <option value="hk">🇭🇰 Hong Kong</option>
                <option value="in">🇮🇳 India</option>
                <option value="il">🇮🇱 Israel</option>
                <option value="jp">🇯🇵 Japan</option>
                <option value="pk">🇵🇰 Pakistan</option>
                <option value="ph">🇵🇭 Philippines</option>
                <option value="ru">🇷🇺 Russian Federation</option>
                <option value="sg">🇸🇬 Singapore</option>
                <option value="tw">🇹🇼 Taiwan</option>
              </optgroup>

              <optgroup label="🌍 Africa">
                <option value="eg">🇪🇬 Egypt</option>
              </optgroup>

              <optgroup label="🌏 Oceania">
                <option value="au">🇦🇺 Australia</option>
              </optgroup>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={fetchNews}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Search
          </button>
        </div>

        {/* News */}
        <div className="flex flex-col gap-6 bg-stone-100 rounded-2xl mt-6 p-6">
          <h2 className="text-2xl font-semibold text-stone-800">
            📰 {topic.charAt(0).toUpperCase().concat(topic.slice(1))} news{" "}
            {country.toUpperCase()}
          </h2>

          {/* Loading */}
          {loading && <p className="text-gray-700">Loading News...</p>}
          {!loading && articles.length === 0 && (
            <p className="text-gray-700">No news found for this selection.</p>
          )}

          {/* Render News */}
          {!loading &&
            articles.map((art, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row gap-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                {art.image && (
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full sm:w-48 object-cover h-48 sm:h-auto"
                  />
                )}

                {/* Content */}
                <div className="flex flex-col justify-between p-4 w-full">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {art.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {art.description || "No description available."}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {art.content ? `${art.content.substring(0, 100)}...` : ""}
                    </p>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-gray-500">
                      <p>📅 {new Date(art.publishedAt).toLocaleDateString()}</p>
                      <p>📰 {art.source?.name || "Unknown source"}</p>
                    </div>
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default News;
