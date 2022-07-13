import Helmet from '../../components/layout/Helmet';

export default function team() {
  return (
    <div className="mb-16">
      <Helmet title="About US" />

      <dh-component>
        <div className="container flex justify-center mx-auto ">
          <div>
            {/* <p className="text-gray-500 text-lg text-center font-normal pb-3">
              BUILDING TEAM
            </p> */}
            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto my-10">
              zeroto100 팀원 소개
            </h1>
          </div>
        </div>
        <div className="w-full bg-gray-100 px-10 pt-20">
          <div className="container mx-auto">
            <div
              role="list"
              aria-label="Behind the scenes People "
              className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
            >
              <div
                role="listitem"
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white h-72">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-white">
                      <img
                        src="/lys.png
                        "
                        alt="Display Picture of Andres Berlin"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      이예슬
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      Team Leader, Front-end Developer
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      새로운 기술을 배우는 것을 좋아하는 프론트엔드
                      개발자입니다. 꾸준히 열심히 공부하는 것이 목표입니다!
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="https://github.com/Lee-Yeseul" className="mx-5">
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="listitem"
                className="xl:w-1/3 lg:mx-3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white h-72">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-white">
                      <img
                        src="/pys.png"
                        alt="Display Picture of Silene Tokyo"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      박예솔
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      Front-end Developer
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      팀에서 꼭 필요한 개발자가 되기 위해 열심히 공부하겠습니다!
                      <br></br>
                      <br></br>
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a
                        href="https://github.com/yessssssssssol"
                        className="mx-5"
                      >
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="listitem"
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white h-72">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-white">
                      <img
                        src="/hjw.png"
                        alt="Display Picture of Johnson Stone"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      홍주완
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      Front-end Developer
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      이번 엘리스 에서 많은 것을 배웠습니다. 앞으로도 열심히
                      하는 개발자가 되겠습니다.
                      <br></br>
                      <br></br>
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="https://github.com/vjvl95" className="mx-5">
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="listitem"
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white h-72">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-white">
                      <img
                        src="/ksm.png"
                        alt="Display Picture of Dean Jones"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      김상민
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      AI Developer, Front-end Developer
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      열심히하자. 머리 아픈건 다 똑같다.
                      <br></br>
                      <br></br>
                      <br></br>
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="https://github.com/ksm9317" className="mx-5">
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="listitem"
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white h-72">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-white">
                      <img
                        src="/yyk.png"
                        alt="Display Picture of Rachel Adams"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      윤여건
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      Back-end Developer
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      사용자에게 다채로운 경험을 제공하여 삶의 질을 높이는
                      프론트엔드 개발자로 성장하고 싶은 윤여건입니다.
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="https://github.com/kunnyCode" className="mx-5">
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="listitem"
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white h-72">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-white">
                      <img
                        src="/sys.png"
                        alt="Display Picture of Charles Keith"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      송연석
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      Back-end Developer
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      하루종일도 할 수 있어.<br></br>
                      <br></br>
                      <br></br>
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a
                        href="https://github.com/YeonSeok-Song"
                        className="mx-5"
                      >
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dh-component>
    </div>
  );
}
