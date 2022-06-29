import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  editroomAtom,
  edithashtagAtom,
} from '../../../core/atoms/createroomState';
import * as API from '../../../pages/api/api';
const CreateBoard = () => {
  const [room, setRoom] = useRecoilState(editroomAtom);
  const { roomTitle, roomDesc } = room;
  const [hashTag, setHashTag] = useRecoilState(edithashtagAtom);

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

  const onhashTagChange = (e) => {
    setHashTag(e.target.value);
    const hashTags = hashTag.split(' ');
    setRoom((prev) => {
      return {
        ...prev,
        hashTags: hashTags,
      };
    });
  };

  return (
    <div className="container mx-auto bg-white rounded">
      <div className="xl:w-full border-b border-gray-300  py-3 bg-white ">
        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
          <p className="text-lg text-gray-800  font-bold">스터디원 모집</p>
          <div className="ml-2 cursor-pointer text-gray-600 ">
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
      <div className="mx-auto">
        <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
          <div className="mt-8 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full ">
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
              className="border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-600 "
              placeholder="스터디 모집 합니다."
            />
          </div>
          <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
            <label
              htmlFor="about"
              className="pb-2 text-sm font-bold text-gray-800 "
            >
              내용
            </label>
            <textarea
              id="about"
              name="about"
              value={roomDesc}
              onChange={onDescChange}
              required
              className="bg-transparent border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-600 "
              placeholder="스터디 모집에 관한 자세한 이야기를 적어주세요!"
              rows="5"
            ></textarea>
            <p className="w-full text-right text-xs pt-1 text-gray-600 ">
              Character Limit: 200
            </p>
          </div>
          <div className=" flex relative mb-4">
            <label htmlFor="name" className="text-sm font-bold text-gray-800">
              해쉬태그
            </label>
          </div>
          <input
            type="text"
            id="name"
            className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="ex)#프론트 #백앤드"
            value={hashTag}
            onChange={(e) => setHashTag(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
