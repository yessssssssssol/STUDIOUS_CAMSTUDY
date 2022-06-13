export default function Button({ Text }) {
  return (
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full'>
      {Text}
    </button>
  );
}
