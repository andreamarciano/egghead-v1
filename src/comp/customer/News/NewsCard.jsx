// NewsCard.jsx
export default function NewsCard({ article }) {
  const { image, title, description, content, publishedAt, source, url } =
    article;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row gap-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full sm:w-48 object-cover h-48 sm:h-auto"
        />
      )}

      {/* Content */}
      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {description || "No description available."}
          </p>
          <p className="text-gray-500 text-sm">
            {content ? `${content.substring(0, 200)}...` : ""}
          </p>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500">
            <p>📅 {new Date(publishedAt).toLocaleDateString()}</p>
            <p>📰 {source?.name || "Unknown source"}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
