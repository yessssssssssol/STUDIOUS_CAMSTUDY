import { useSetRecoilState } from 'recoil';
import { registerModalState } from '../../core/atoms/modalState';
const PrologueMid2 = () => {
  const setShow = useSetRecoilState(registerModalState);
  function clickHandler() {
    setShow(true);
  }
  return (
    <div className="container px-6 py-16 mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-2xl"
            src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            alt="Catalogue-pana.svg"
          />
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-800 uppercase  lg:text-3xl">
              AI를 통해 측정하는 순수 공부시간
            </h1>
            <p className="mt-2 text-gray-600 ">
              STUDIOUS는 AI가 캠을 통해 유저를 인식하고 타이머를 자동으로
              측정해줍니다. 이를 통해 유저가 실제로 앉아서 공부한 순수한
              공부시간만 타이머에 측정되고 기록됩니다. 기록된 시간은
              마이페이지에서 확인할 수 있습니다. 랭킹 서비스를 통해 다른
              STUDIOUS 사용자들과 순공시간을 겨뤄보세요!
            </p>
            <button
              onClick={clickHandler}
              className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              STUDY WIHT AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrologueMid2;
