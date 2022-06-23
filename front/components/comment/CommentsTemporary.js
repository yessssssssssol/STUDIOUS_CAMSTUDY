export default function Temporary() {
  return (
    <div className="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
      <div className="mt-2">
        <img
          className="w-16 rounded-full shadow"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <div className="flex flex-row items-center justify-between py-1 pr-2">
          <div>
            <a href="#" className="text-blue-400 hover:underline">
              Jack
            </a>
            <span className="text-sm font-thin text-gray-500"> 3days </span>
          </div>
          <div className="p-1">
            <p className="text-gray-900 border-l-2 px-1 border-blue-500 bg-gray-100 rounded">
              스터디 신청하고 싶습니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
