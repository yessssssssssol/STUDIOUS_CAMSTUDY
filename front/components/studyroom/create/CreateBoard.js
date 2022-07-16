import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createroomAtom,
  createhashtagAtom,
} from '../../../core/atoms/createroomState';
import * as API from '../../../pages/api/api';
const CreateBoard = () => {
  const [room, setRoom] = useRecoilState(createroomAtom);
  const { roomTitle, roomDesc } = room;
  const setHashTag = useSetRecoilState(createhashtagAtom);
  const [tag, setTag] = useState();
  const onTitleChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        roomTitle: e.target.value,
      };
    });
  };

  const onDescChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        roomDesc: e.target.value,
      };
    });
  };

  return (
    <div className="container mx-72 bg-white rounded min-w-[440px]">
      <div className="xl:w-full border-b  py-3 bg-white ">
        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
          <p className="text-2xl text-amber-400  font-bold">
            스터디원 모집 게시글
          </p>
        </div>
      </div>
      <div className="mx-auto">
        <div className="flex flex-col w-full pb-5 ">
          <div className="flex flex-col gap-x-6 m-2">
            <label
              htmlFor="title"
              className="pb-2 text-sm font-bold text-gray-800 "
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              value={roomTitle}
              onChange={onTitleChange}
              className="border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-amber-400 bg-transparent placeholder-gray-500 text-gray-600 "
              placeholder="스터디 모집 합니다."
            />
          </div>
          <div className="mt-2 flex flex-col gap-x-6 mx-2">
            <label
              htmlFor="about"
              className="pb-2 text-sm font-bold text-gray-800"
            >
              내용
            </label>
            <textarea
              id="about"
              name="about"
              value={roomDesc}
              onChange={onDescChange}
              required
              className="border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-amber-500 bg-transparent placeholder-gray-500 text-gray-600 "
              placeholder="스터디 모집에 관한 자세한 이야기를 적어주세요!"
              maxLength="200"
              rows="5"
            ></textarea>
            <p className="w-full text-right text-xs pt-1 text-gray-600 ">
              Character Limit: 200
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-x-6 mx-2">
            <label
              htmlFor="name"
              className="pb-2 text-sm font-bold text-gray-800"
            >
              해쉬태그
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 w-full pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-amber-400 bg-transparent placeholder-gray-500 text-gray-600 "
              placeholder="ex)#프론트 #백앤드"
              maxLength="20"
              value={tag}
              onChange={(e) => setHashTag(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
