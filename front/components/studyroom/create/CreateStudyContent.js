/**
 * isPersonal이 true일 때는 공개스터디 선택 창이 보이지 않고
 * isPersonal이 false일 때만 공개 비공개 선택 창이 뜨게 하기
 *
 */

import { useRecoilState } from 'recoil';
import { createroomAtom } from '../../../core/atoms/createroomState';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const CreateStudyContent = () => {
  const [room, setRoom] = useRecoilState(createroomAtom);
  const {
    roomName,
    membersOnly,
    startStudyDay,
    endStudyDay,
    focusTimeStart,
    focusTimeEnd,
    membersNum,
  } = room;
  dayjs.locale('ko');

  let today = dayjs().format('YYYY-MM-DD');

  const onNameChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        roomName: e.target.value,
      };
    });
  };
  const onMembersOnlyChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        group: true,
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
    if (isNaN(e.target.value) === true) {
      alert('숫자만 입력이 가능합니다');
      e.target.value = 1;
    } else if (e.target.value > 4) {
      alert('입력 최대값은 4입니다 혹은 숫자만 입력 가능합니다');
      e.target.value = 4;
    }
    setRoom((prev) => {
      return {
        ...prev,
        membersNum: e.target.value,
      };
    });
  };

  return (
    <div className="container mx-72 bg-white rounded min-w-[440px]">
      <div className="xl:w-full border-b  py-3 bg-white ">
        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
          <p className="text-2xl text-amber-400 font-bold">스터디 이름</p>
        </div>
      </div>
      <div className="mx-auto">
        <div className="flex flex-col w-full pb-5 ">
          <div className="flex gap-x-6 m-2">
            <label
              htmlFor="name"
              className="pt-2 text-sm font-bold text-gray-800 "
            >
              스터디 이름
            </label>
            <p className="pt-2 text-sm text-gray-800 ">
              스터디 이름을 입력해주세요.
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-x-6 mx-2">
            <input
              value={roomName}
              onChange={onNameChange}
              type="text"
              id="name"
              className="border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-amber-500 bg-transparent placeholder-gray-500 text-gray-600 "
            />
          </div>
        </div>
        <div className="flex gap-x-6 m-2">
          <label
            htmlFor="name"
            className="pt-2 text-sm font-bold text-gray-800 "
          >
            스터디 종류
          </label>
          <p className="pt-2 text-sm text-gray-800 ">
            스터디를 종류를 선택해주세요.
          </p>
        </div>

        <div className="flex flex-row mx-5 text-sm pt-2">
          <input
            type="radio"
            id="공개 스터디"
            name="public or private"
            value="false"
            checked={membersOnly === 'false'}
            onChange={onMembersOnlyChange}
          />
          <label htmlFor="공개 스터디" className="text-sm mx-2 text-gray-800 ">
            공개 스터디
          </label>

          <input
            type="radio"
            id="비공개 스터디"
            name="public or private"
            value="true"
            checked={membersOnly === 'true'}
            onChange={onMembersOnlyChange}
          />
          <label
            htmlFor="비공개 스터디"
            className=" text-sm mx-2 text-gray-800 "
          >
            비공개 스터디
          </label>
        </div>
      </div>
      <div className="flex gap-x-6 m-2">
        <label
          htmlFor="name"
          className="pt-2 text-sm font-bold text-gray-800 pt-2"
        >
          스터디인원
        </label>
        <p className="pt-2 text-sm text-gray-800 pt-2">
          스터디 참여 인원을 입력해주세요. (최대 4명)
        </p>
      </div>
      <input
        value={membersNum}
        onChange={onMembersNumChange}
        className="border-2 rounded-md w-[40px] mx-5"
        min="0"
        max="4"
        size="15"
      ></input>
      <div className="flex gap-x-6 m-2">
        <label htmlFor="name" className="pt-2 text-sm font-bold text-gray-800">
          스터디 기간
        </label>
        <p className="pt-2 text-sm text-gray-800 ">
          스터디 기간을 입력해주세요. (날짜가 지나면 방이 자동으로 사라집니다.)
        </p>
      </div>
      <div>
        <input
          className="mx-5 text-sm"
          type="date"
          min={today}
          value={startStudyDay}
          onChange={onStartStudyDayChange}
        ></input>
        ~
        <input
          className="mx-5 text-sm"
          type="date"
          value={endStudyDay}
          onChange={onEndStudyDayChange}
        ></input>
      </div>
      <div className=" flex flex-col w-full">
        <div className="flex gap-x-6 m-2">
          <label
            htmlFor="name"
            className="pt-2 text-sm font-bold text-gray-800 "
          >
            집중 시간
          </label>
          <p className="pt-2 text-sm text-gray-800 ">
            스터디원들과 집중해서 공부할 시간을 설정해보세요.
          </p>
        </div>
        <div className="flex gap-x-6 m-2">
          <input
            value={focusTimeStart}
            onChange={onFocusTimeStartChange}
            type="time"
            id="name"
            className="bg-white mx-5 rounded border border-gray-300 text-sm focus:border-amber-500  outline-none text-gray-700 mr-5 leading-8 transition-colors duration-200 ease-in-out"
          />
          ~
          <input
            value={focusTimeEnd}
            onChange={onFocusTimeEndChange}
            type="time"
            id="name"
            className="bg-white mx-5 text-sm rounded border border-gray-300  focus:border-amber-500  outline-none text-gray-700 mr-5 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateStudyContent;
