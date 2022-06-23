/**
 * isPersonal이 true일 때는 공개스터디 선택 창이 보이지 않고
 * isPersonal이 false일 때만 공개 비공개 선택 창이 뜨게 하기
 *
 */
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { createroomAtom } from '../../../core/atoms/createroomState';

const CreateStudyContent = () => {
  const [room, setRoom] = useRecoilState(createroomAtom);
  const {
    roomName,
    group,
    membersOnly,
    startStudyDay,
    endStudyDay,
    focusTimeStart,
    focusTimeEnd,
    membersNum,
  } = room;
  const onNameChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        roomName: e.target.value,
      };
    });
  };
  const onGroupChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        group: e.target.value,
      };
    });
  };
  const onMembersOnlyChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        membersOnly: e.target.value,
      };
    });
  };
  const onStartStudyDayChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        startStudyDay: e.target.value,
      };
    });
  };

  const onEndStudyDayChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        endStudyDay: e.target.value,
      };
    });
  };
  const onFocusTimeStartChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        focusTimeStart: e.target.value + ':00',
      };
    });
  };

  const onFocusTimeEndChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        focusTimeEnd: e.target.value + ':00',
      };
    });
  };

  const onMembersNumChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        membersNum: e.target.value,
      };
    });
  };
  // 스터디 이름
  // const [roomName, setRoomName] = useState(room?.roomName || '');
  // // 스터디 해쉬태그
  // // 개인 스터디 true, 그룹 스터디 false
  // const [group, setGroup] = useState(room?.group || '');
  // // 공개 스터디 true 비공개 스터디 false
  // const [membersOnly, setMemberOnly] = useState(room?.membersOnly || '');
  // // 스터디 기간
  // const [startStudyDay, setStartStudyDay] = useState(
  //   new Date().toISOString().substring(0, 10)
  // );
  // const [endStudyDay, setEndStudyDay] = useState(room?.endStudyDay || '');
  // // 스터디 집중시간
  // const [focusTimeStart, setFocusTimeStart] = useState(
  //   room?.focusTimeStart || ''
  // );
  // // rule
  // const [focusTimeEnd, setFocusTimeEnd] = useState(room?.focusTimeEnd || '');

  // const [rule, setRule] = useState('');
  // // 스터디 멤버 수
  // const [membersNum, setMembersNum] = useState(room?.membersNum || 0);
  // useEffect(() => {});

  // function handleClick() {
  //   // group === 'only' ? setGroup(false) : setGroup(true);
  //   // memberOnly === 'public' ? setMemberOnly(false) : setMemberOnly(true);
  //   function changeData() {
  //     console.log(membersOnly);
  //     console.log(group);
  //   }

  //   function passData() {
  //     setRoom({
  //       roomName,
  //       group,
  //       membersOnly,
  //       membersNum,
  //       startStudyDay,
  //       endStudyDay,
  //       focusTimeStart,
  //       focusTimeEnd,
  //     });
  //   }
  //   changeData();
  //   passData();
  // }
  return (
    <div className="container space-y-3  mx-auto bg-white dark:bg-gray-800 rounded">
      <div className=" xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
          <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
            스터디방 생성
          </p>
          <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                className="heroicon-ui"
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
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
          onChange={onNameChange}
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
          스터디를 종류를 선택해주세요.
        </p>
      </div>

      <div className="flex mb-3">
        <div>
          <input
            type="radio"
            id="개인 스터디"
            name="drone"
            value="false"
            checked={group === 'false'}
            onChange={onGroupChange}
          />
          <label for="개인 스터디">개인 스터디</label>
        </div>

        <div className="ml-4">
          <input
            type="radio"
            id="그룹 스터디"
            name="drone"
            value="true"
            checked={group === 'true'}
            onChange={onGroupChange}
          />
          <label htmlFor="그룹 스터디">그룹 스터디</label>
        </div>
      </div>

      <span className="flex">
        <div>
          <input
            type="radio"
            id="공개 스터디"
            name="public or private"
            value="false"
            checked={membersOnly === 'false'}
            onChange={onMembersOnlyChange}
          />
          <label htmlFor="공개 스터디">공개 스터디</label>
        </div>

        <div className="ml-4">
          <input
            type="radio"
            id="비공개 스터디"
            name="public or private"
            value="true"
            checked={membersOnly === 'true'}
            onChange={onMembersOnlyChange}
          />
          <label htmlFor="비공개 스터디">비공개 스터디</label>
        </div>
      </span>

      <div className="relative mb-4">
        <span className="flex">
          <label
            htmlFor="name"
            className="leading-7 text-base mb-1 font-bold title-font text-gray-900 "
          >
            스터디인원
          </label>
        </span>
        <input
          value={membersNum}
          onChange={onMembersNumChange}
          className="border-2 rounded-md w-[40px]"
          min="0"
          type="number"
        ></input>
      </div>

      <div className="relative mb-4">
        <span className="flex">
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
        <input
          className="mx-5"
          type="date"
          value={startStudyDay}
          onChange={onStartStudyDayChange}
        ></input>
        ~
        <input
          className="mx-5"
          type="date"
          value={endStudyDay}
          onChange={onEndStudyDayChange}
        ></input>
      </div>

      <div className="relative mb-4">
        <span className="flex">
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
          onChange={onFocusTimeStartChange}
          type="time"
          id="name"
          className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        ~
        <input
          value={focusTimeEnd}
          onChange={onFocusTimeEndChange}
          type="time"
          id="name"
          className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

export default CreateStudyContent;
