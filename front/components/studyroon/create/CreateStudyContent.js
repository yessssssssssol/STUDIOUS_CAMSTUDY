/**
 * isPersonal이 true일 때는 공개스터디 선택 창이 보이지 않고
 * isPersonal이 false일 때만 공개 비공개 선택 창이 뜨게 하기
 *
 */
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { createroomAtom } from '../../../core/atoms/createroomState';
import { useRouter } from 'next/router';

const CreateStudyContent = () => {
  const router = useRouter();
  const [room, setRoom] = useRecoilState(createroomAtom);

  // 스터디 이름
  const [roomName, setRoomName] = useState(room?.roomName || '');
  // 스터디 해쉬태그
  // 개인 스터디 true, 그룹 스터디 false
  const [group, setGroup] = useState(room?.group || '');
  // 공개 스터디 true 비공개 스터디 false
  const [membersOnly, setMemberOnly] = useState(room?.membersOnly || '');
  // 스터디 기간
  const [startStudyDay, setStartStudyDay] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endStudyDay, setEndStudyDay] = useState(room?.endStudyDay || '');
  // 스터디 집중시간
  const [focusTimeStart, setFocusTimeStart] = useState(
    room?.focusTimeStart || ''
  );
  // rule
  const [focusTimeEnd, setFocusTimeEnd] = useState(room?.focusTimeEnd || '');

  const [rule, setRule] = useState('');
  // 스터디 멤버 수
  const [membersNum, setMembersNum] = useState(room?.membersNum || 0);
  useEffect(() => {});

  function handleClick() {
    // group === 'only' ? setGroup(false) : setGroup(true);
    // memberOnly === 'public' ? setMemberOnly(false) : setMemberOnly(true);
    function changeData() {
      console.log(membersOnly);
      console.log(group);
    }

    function passData() {
      setRoom({
        roomName,
        group,
        membersOnly,
        membersNum,
        startStudyDay,
        endStudyDay,
        focusTimeStart,
        focusTimeEnd,
      });
      router.push('/board/create');
    }

    changeData();
    passData();
  }
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
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          type="text"
          id="name"
          className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="flex relative mt-2 mb-2">
        <label
          htmlFor="name"
          className="text-base mb-1 font-bold title-font text-gray-900 "
        >
          스터디 종류
        </label>
        <p className="ml-3 mt-1 text-sm mb-1 text-gray-600">
          스터디를 대표하는 해시태그를 입력해주세요.
        </p>
      </div>

      <div class="flex mb-3">
        <div>
          <input
            type="radio"
            id="개인 스터디"
            name="drone"
            value="false"
            checked={group === 'false'}
            onChange={(e) => setGroup(e.target.value)}
          />
          <label for="개인 스터디">개인 스터디</label>
        </div>

        <div class="ml-4">
          <input
            type="radio"
            id="그룹 스터디"
            name="drone"
            value="true"
            checked={group === 'true'}
            onChange={(e) => setGroup(e.target.value)}
          />
          <label for="그룹 스터디">그룹 스터디</label>
        </div>
      </div>

      <span class="flex">
        <div>
          <input
            type="radio"
            id="공개 스터디"
            name="public or private"
            value="false"
            checked={membersOnly === 'false'}
            onChange={(e) => setMemberOnly(e.target.value)}
          />
          <label for="공개 스터디">공개 스터디</label>
        </div>

        <div class="ml-4">
          <input
            type="radio"
            id="비공개 스터디"
            name="public or private"
            value="true"
            checked={membersOnly === 'true'}
            onChange={(e) => setMemberOnly(e.target.value)}
          />
          <label for="비공개 스터디">비공개 스터디</label>
        </div>
      </span>

      <div class="relative mb-4">
        <span class="flex">
          <label
            htmlFor="name"
            className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
          >
            스터디인원
          </label>
        </span>
        <input
          value={membersNum}
          onChange={(e) => setMembersNum(e.target.value)}
          class="border-2 rounded-md w-[40px]"
          min="0"
          type="number"
        ></input>
      </div>

      <div className="relative mb-4">
        <span class="flex">
          <label
            htmlFor="name"
            className="text-base mb-1 font-bold title-font text-gray-900 "
          >
            스터디 기간
          </label>
          <p className="ml-5 mt-1  text-sm mb-1 text-gray-600">
            스터디 기간을 입력해주세요. 스터디 기간이 지나면 자동으로 방이
            사라집니다.
          </p>
        </span>
        <input class="mx-5" type="date" value={startStudyDay}></input>~
        <input
          class="mx-5"
          type="date"
          value={endStudyDay}
          onChange={(e) => setEndStudyDay(e.target.value)}
        ></input>
      </div>

      <div className="relative mb-4">
        <span class="flex">
          <label
            htmlFor="name"
            className=" text-base mb-1 font-bold title-font text-gray-900 "
          >
            집중시간
          </label>
          <p className="mt-1 ml-3 text-sm mb-1 text-gray-600">
            스터디 집중시간을 입력해주세요.(스터디 모집시 사용됩니다.)
          </p>
        </span>
        <input
          value={focusTimeStart}
          onChange={(e) => setFocusTimeStart(e.target.value + ':00')}
          type="time"
          id="name"
          className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        ~
        <input
          value={focusTimeEnd}
          onChange={(e) => setFocusTimeEnd(e.target.value + ':00')}
          type="time"
          id="name"
          className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <button
        onClick={handleClick}
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        생성
      </button>
    </div>
  );
};

export default CreateStudyContent;
