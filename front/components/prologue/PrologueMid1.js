import { useSetRecoilState } from 'recoil';
import { registerModalState } from '../../core/atoms/modalState';
const PrologueMid1 = () => {
  const setShow = useSetRecoilState(registerModalState);
  function clickHandler() {
    setShow(true);
  }
  return (
    <div className="container px-6 py-16 mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-800 uppercase  lg:text-3xl">
              캠공족들을 위한 최고의 선택 STUDIOUS
            </h1>
            <p className="mt-2 text-gray-600 ">
              온라인 독서실 STUDIOUS는 따로 설치가 필요하지 않은 비설치형
              클라우드 서비스 방식으로 편리한 공부환경을 제공하고 있습니다. 또한
              혼자하는 공부를 선호하는 유저들과 다른 사람들과 함께 모여서
              공부하는 것을 선호하는 유저들 모두를 위해 개인 스터디룸과 단체
              스터디룸을 모두 지원하고 있습니다. STUDIOUS로 꿈을 향해 함께
              도전해보세요!
            </p>

          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-2xl"
            src="boardscreen.png"
            alt="Catalogue-pana.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default PrologueMid1;
