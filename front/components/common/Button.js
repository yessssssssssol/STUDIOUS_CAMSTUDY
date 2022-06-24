export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
    >
      {text}
    </button>
  );
}
