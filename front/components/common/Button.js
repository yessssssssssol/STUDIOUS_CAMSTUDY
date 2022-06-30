export default function Button({ text, onClick, disable }) {
  return (
    <button
      onClick={onClick}
      className="bg-amber-400 hover:shadow-lg hover:bg-amber-500 text-white font-semibold py-1 px-3 rounded-md"
      disable={disable}
    >
      {text}
    </button>
  );
}
