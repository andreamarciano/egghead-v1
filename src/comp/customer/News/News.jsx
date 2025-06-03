import { useState } from "react";
import SelectGroup from "./SelectGroup";
import { topicOptions, countryOptions } from "./options";
import NewsCard from "./NewsCard";
import Ticker from "./Ticker";

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
        {/* Ticker */}
        <h1 className="text-3xl p-4">🪐 News</h1>
        <Ticker />

        <hr className="border-t-2 border-gray-700 my-4" />

        {/* News */}
        <h1 className="text-3xl p-4">🌎 Planet Earth News</h1>
        <div className="flex flex-col items-center justify-center p-4 gap-4 text-white bg-gray-800 rounded-2xl shadow-md w-full max-w-sm mx-auto">
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Render News */}
        <div className="flex flex-col gap-6 bg-gray-800 rounded-2xl mt-6 p-6">
          <h2 className="text-2xl font-semibold text-white">
            📰 {topic.charAt(0).toUpperCase().concat(topic.slice(1))} -{" "}
            {country.toUpperCase()}
          </h2>

          {/* Loading */}
          {loading && <p className="text-gray-700">Loading News...</p>}
          {!loading && articles.length === 0 && (
            <p className="text-white/60">No news found for this selection.</p>
          )}

          {/* News Card */}
          {!loading &&
            articles.map((art, i) => <NewsCard key={i} article={art} />)}
        </div>
      </div>
    </>
  );
}

export default News;
