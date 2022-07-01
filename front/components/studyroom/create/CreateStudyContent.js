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
    setRoom((prev) => {
      return {
        ...prev,
        membersNum: e.target.value,
      };
    });
  };

  return (
    <div className="container w-full mx-auto my-5 bg-white  rounded">
      <div className="mx-auto">
        <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
          <div className="mt-3 flex flex-col w-full pb-5 border-b border-gray-300 border-dashed">
            <div className="flex gap-x-6 mb-2">
              <label
                htmlFor="name"
                className="pb-2 text-sm font-bold text-gray-800 "
              >
                스터디 이름
              </label>
              <p className="pb-2 text-sm text-gray-800 ">
                스터디를 이름을 입력해주세요.
              </p>
            </div>
            <input
              value={roomName}
              onChange={onNameChange}
              type="text"
              id="name"
              className="border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-amber-400 bg-transparent placeholder-gray-500 text-gray-600 "
            />
          </div>
          <div className="mt-8 flex flex-col w-full pb-5 border-b border-gray-300 border-dashed">
            <div className="flex gap-x-6 mb-2">
              <label
                htmlFor="name"
                className="pb-2 text-sm font-bold text-gray-800 "
              >
                스터디 종류
              </label>
              <p className="pb-2 text-sm text-gray-800 ">
                스터디를 종류를 선택해주세요.
              </p>
            </div>
            <div className="flex gap-x-3">
              <div>
                <input
                  type="radio"
                  id="공개 스터디"
                  name="public or private"
                  value="false"
                  checked={membersOnly === 'false'}
                  onChange={onMembersOnlyChange}
                />
                <label
                  htmlFor="공개 스터디"
                  className="font-bold text-sm text-gray-800  mx-1"
                >
                  공개 스터디
                </label>
              </div>
              <div>
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
                  className="font-bold text-sm text-gray-800  mx-1"
                >
                  비공개 스터디
                </label>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col w-full pb-5 border-b border-gray-300 border-dashed">
            <div className="flex gap-x-6 mb-2">
              <label
                htmlFor="name"
                className="pb-2 text-sm font-bold text-gray-800 "
              >
                스터디인원
              </label>
              <p className="pb-2 text-sm text-gray-800 ">
                스터디 참원 인원을 입력해주세요. (최대 4명)
              </p>
            </div>
            <input
              value={membersNum}
              onChange={onMembersNumChange}
              className="border-2 rounded-md w-[40px]"
              min="0"
              max="4"
              type="number"
            ></input>
          </div>
          <div className="mt-8 flex flex-col w-full pb-5 border-b border-gray-300 border-dashed">
            <div className="flex gap-x-6 mb-2">
              <label
                htmlFor="name"
                className="pb-2 text-sm font-bold text-gray-800 "
              >
                스터디 기간
              </label>
              <p className="pb-2 text-sm text-gray-800 ">
                스터디 기간을 입력해주세요. 스터디 기간이 지나면 자동으로 방이
                사라집니다.
              </p>
            </div>
            <div>
              <input
                className="mr-5"
                type="date"
                min={today}
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
          </div>
          <div className="mt-8 flex flex-col w-full">
            <div className="flex gap-x-6 mb-2">
              <label
                htmlFor="name"
                className="pb-2 text-sm font-bold text-gray-800 "
              >
                집중시간
              </label>
              <p className="pb-2 text-sm text-gray-800 ">
                스터디 집중시간을 입력해주세요.(스터디 모집시 사용됩니다.)
              </p>
            </div>
            <div>
              <input
                value={focusTimeStart}
                onChange={onFocusTimeStartChange}
                type="time"
                id="name"
                className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 mr-5 leading-8 transition-colors duration-200 ease-in-out"
              />
              ~
              <input
                value={focusTimeEnd}
                onChange={onFocusTimeEndChange}
                type="time"
                id="name"
                className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 mx-5 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudyContent;
