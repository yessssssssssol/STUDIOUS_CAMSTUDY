import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { registerModalState } from '../../core/atoms/modalState';
const PrologueTop = () => {
  const setShow = useSetRecoilState(registerModalState);
  function clickHandler() {
    setShow(true);
  }
  return (
    <div>
      <div className="w-full bg-center bg-cover h-screen bg-[url('/groupExample2.jpg')]">
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">
              Study with <span className="text-amber-400 underline">AI</span>
            </h1>

            <button
              onClick={clickHandler}
              className="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-amber-400 rounded-md lg:w-auto hover:bg-amber-500 focus:outline-none focus:bg-amber-400"
            >
              Start AI Study!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrologueTop;
