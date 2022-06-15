/**
 * isPersonal이 true일 때는 공개스터디 선택 창이 보이지 않고
 * isPersonal이 false일 때만 공개 비공개 선택 창이 뜨게 하기
 *
 */
import { useState } from 'react';

const CreateStudyContent = () => {
  // 스터디 이름
  const [studyName, setStudyName] = useState('');
  // 스터디 해쉬태그
  const [hashTag, setHashTag] = useState([]);
  // 개인 스터디 true, 그룹 스터디 false
  const [isPersonal, setIsPersonal] = useState(false);
  // 공개 스터디 true 비공개 스터디 false
  const [isPrivate, setIsPrivate] = useState(false);
  // 스터디 기간
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  // 스터디 집중시간
  const [focusTime, setFocusTime] = useState('');
  // rule
  const [rule, setRule] = useState('');
  // 스터디 멤버 수
  const [number, setNumber] = useState(0);

  return (
    <div className="mx-20 my-6">
      {/* <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        Feedback
      </h2>
      <p className="leading-relaxed mb-5 text-gray-600">
        Post-ironic portland shabby chic echo park, banjo fashion axe
      </p> */}
      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          스터디 이름
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디 이름을 입력하세요.
        </p>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          해시태그
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디를 대표하는 해시태그를 입력해주세요.
        </p>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          스터디 규칙
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디 규칙을 입력해주세요.
        </p>
        <textarea className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          스터디 종류
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디 종류를 선택해주세요.
        </p>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          스터디 인원
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디 참여 인원을 입력해주세요(최대 4명까지 참여가능합니다.)
        </p>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          스터디 기간
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디 기간을 입력해주세요. 스터디 기간이 지나면 자동으로 방이
          사라집니다.
        </p>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="name"
          className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
        >
          집중시간
        </label>
        <p className="leading-relaxed text-sm mb-1 text-gray-600">
          스터디 집중시간을 입력해주세요.(스터디 모집시 사용됩니다.)
        </p>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        생성
      </button>
    </div>
  );
};

export default CreateStudyContent;
