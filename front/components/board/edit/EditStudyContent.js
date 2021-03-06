/**
 * isPersonal이 true일 때는 공개스터디 선택 창이 보이지 않고
 * isPersonal이 false일 때만 공개 비공개 선택 창이 뜨게 하기
 *
 */

import { useRecoilState } from 'recoil';
import { editroomAtom } from '../../../core/atoms/createroomState';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const EditStudyContent = () => {
  const [room, setRoom] = useRecoilState(editroomAtom);
  const { roomName, startStudyDay, endStudyDay, focusTimeStart, focusTimeEnd } =
    room;
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
              maxLength="20"
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
            스터디 기간
          </label>
          <p className="pt-2 text-sm text-gray-800 ">
            스터디 기간을 입력해주세요. (날짜가 지나면 방이 자동으로
            사라집니다.)
          </p>
        </div>
        <div className="flex gap-x-6 m-2">
          <input
            className="mr-5 text-sm "
            type="date"
            min={today}
            value={startStudyDay}
            disabled
          ></input>
          ~
          <input
            className="mx-5 text-sm"
            type="date"
            value={endStudyDay}
            min={startStudyDay}
            onChange={onEndStudyDayChange}
          ></input>
        </div>
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
            className="bg-white rounded border border-gray-300 text-sm focus:border-amber-500  outline-none text-gray-700 mr-5 leading-8 transition-colors duration-200 ease-in-out"
          />
          ~
          <input
            value={focusTimeEnd}
            onChange={onFocusTimeEndChange}
            type="time"
            id="name"
            className="bg-white rounded border border-gray-300 text-sm focus:border-amber-500  outline-none text-gray-700 mx-5 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default EditStudyContent;
