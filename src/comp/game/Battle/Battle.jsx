function Battle({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-500">Sfida! ⚔️</h2>
        <p className="text-green-500">
          Hai dato un voto basso... Ora devi affrontare la nostra squadra! 😤
        </p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}

export default Battle;
