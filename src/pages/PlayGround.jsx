import { useState } from "react";
import Navbar from "../comp/Navbar";

function Playground() {
  const [topic, setTopic] = useState("general");
  const [country, setCountry] = useState("us");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const newsapi = "7eeb8f0bda3c497aa804a7806ec32f6a";
  const gnews = "956fe4da3a2c640faa1108da58c6af27";

  const fetchNews = () => {
    setLoading(true);
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${topic}&apiKey=${newsapi}`
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
      <Navbar />

      <div className="relative">
        <h1 className="text-3xl p-4">News</h1>

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
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
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
              <option value="it">Italy</option>
              <option value="us">United States</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={fetchNews}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Cerca Notizie
          </button>
        </div>

        {/* News */}
        <div className="flex flex-col gap-2 bg-stone-500 rounded-2xl mt-4 p-4">
          <h2 className="text-xl font-semibold">
            📰 {topic.charAt(0).toUpperCase().concat(topic.slice(1))} news for{" "}
            {country.toUpperCase()}
          </h2>

          {/* Loading */}
          {loading && <p className="text-white">Loading News...</p>}
          {!loading && articles.length === 0 && (
            <p className="text-white">No news.</p>
          )}

          {/* Render News */}
          {!loading &&
            articles.map((art, i) => (
              <div key={i} className="p-4 rounded shadow-2xl border-2">
                <h3 className="font-bold text-lg">{art.title}</h3>
                <p>{art.description}</p>
                {art.urlToImage && (
                  <img
                    src={art.urlToImage}
                    alt={art.title}
                    className="my-2 w-full max-w-xs"
                  />
                )}
                <a
                  href={art.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Read More
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Playground;
