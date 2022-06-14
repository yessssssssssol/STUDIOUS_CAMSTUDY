import { useState } from 'react';

const CreateStudyRoom = () => {
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
    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        Feedback
      </h2>
      <p className="leading-relaxed mb-5 text-gray-600">
        Post-ironic portland shabby chic echo park, banjo fashion axe
      </p>
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">
          스터디 이름
        </label>
        <input
          type="text"
          id="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Email</label>
        <input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Message</label>
        <textarea className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Button
      </button>
      <p className="text-xs text-gray-500 mt-3">
        Chicharrones blog helvetica normcore iceland tousled brook viral
        artisan.
      </p>
    </div>
  );
};

export default CreateStudyRoom;
