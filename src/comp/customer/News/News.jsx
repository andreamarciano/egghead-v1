import { useState } from "react";
import SelectGroup from "./SelectGroup";
import { topicOptions, countryOptions } from "./options";

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
      <div className="relative bg-gray-600 mt-8 rounded-xl p-2">
        <h1 className="text-3xl p-4">Planet Earth News</h1>

        <div className="flex flex-col items-center justify-center p-4 gap-4 text-black bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto">
          {/* Topic */}
          <SelectGroup
            id="topic"
            label="Choose Topic"
            value={topic}
            onChange={setTopic}
            data={topicOptions}
          />

          {/* Country */}
          <SelectGroup
            id="country"
            label="Choose Country"
            value={country}
            onChange={setCountry}
            data={countryOptions}
          />

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
                      {art.content ? `${art.content.substring(0, 200)}...` : ""}
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
