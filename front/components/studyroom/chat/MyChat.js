export default function MyChat() {
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
      <ul className="space-y-2">
        <li className="flex justify-end">
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
            <span className="block">Hiiii</span>
          </div>
        </li>
        <li className="flex justify-end">
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
            <span className="block">how are you?</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
