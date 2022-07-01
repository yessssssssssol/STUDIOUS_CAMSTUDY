const PrologueBottom = () => {
  return (
    <div>
      <section className="bg-gray-100  lg:py-12 lg:flex lg:justify-center">
        <div className="bg-white  lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
          <div className="lg:w-1/2">
            <img
              className="w-full h-full lg:max-w-2xl"
              src="/groupExample.png"
              alt="Catalogue-pana.svg"
            />
          </div>

          <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">
              <div className="text-amber-400 ">STUDIOUS</div> 웹캠이 꼭 필요한
              서비스입니다.
            </h2>
            <p className="mt-4 text-gray-600 ">
              AI로 측정하는 타이머가 핵심 기능인 STUDIOUS는 아쉽지만 캠이 꼭
              필요한 서비스입니다. 현재는 웹으로만 참여가능하지만 추후
              모바일에서도 지원할 계획이 있으니 웹캠이 없어서 아쉽게 참여가
              어려운 분들은 STUDIOUS의 소식에 추후 있을 업데이트에 관심을
              가져주세요!
            </p>

            <div className="mt-8">
              <a
                href="https://kdt-gitlab.elice.io/ai_track/class_04/ai_project/team4/ai_project_team4"
                className="px-5 py-2 font-medium bg-amber-400 rounded-md hover:bg-amber-500 text-white shadow-md"
              >
                서비스 GitHub 구경가기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrologueBottom;
