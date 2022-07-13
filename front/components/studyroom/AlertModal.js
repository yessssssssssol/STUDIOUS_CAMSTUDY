import { useRecoilState } from 'recoil';
import { aiAtom, noUseAiAtom } from '../../core/atoms/aiState';

const AlertModal = () => {
  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);
  // const [noUseAi, setUserAiAtom] = useRecoilState(noUseAiAtom);

  const onClick = () => {
    // setUserAiAtom(true);
    setUserIsHear(true);
  };

  return (
    <div>
      {!userIsHear && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={onClick}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-800 ">
                  정말 자리에 없으신가요?
                </h3>
                <p className="mb-5 text-sm font-normal text-gray-500 ">
                  AI가 유저를 확인하지 못해 타이머가 멈췄습니다.
                  <br />
                  눈, 코, 입이 모두 화면에 나오게 카메라를 조정해주세요!
                </p>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2 text-center mr-2"
                  onClick={onClick}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
