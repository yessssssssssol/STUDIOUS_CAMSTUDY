import * as API from '../../../pages/api/api';
import EditBoard from '../../../components/board/edit/EditBoard';
import EditStudyContent from '../../../components/board/edit/EditStudyContent';
import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  editroomAtom,
  edithashtagAtom,
} from '../../../core/atoms/createroomState';
import { useRouter } from 'next/router';
import { roomDefaultImg } from '../../../components/common/UseData';
import Alert from '../../../components/common/Alert';

export default function Create() {
  const router = useRouter();
  const [room, setRoom] = useRecoilState(editroomAtom);
  const resetRoom = useResetRecoilState(editroomAtom);

  const [file, setFile] = useState(null);
  const [tempUrl, setTempURL] = useState(null);
  const [error, setError] = useState(false);
  const [hashtag, setHashTag] = useRecoilState(edithashtagAtom);

  const fileInput = useRef(null);

  const handleResetProfileChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        roomImg: roomDefaultImg,
      };
    });
    setTempURL(roomDefaultImg);
    setFile(roomDefaultImg);
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setTempURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const res = await API.get('studyroom', router.query.id);
      console.log(res);
      setRoom(res.data);
      setTempURL(res.data.roomImg);
      var tag = res.data.hashTags;
      console.log();
      setHashTag(tag.join(' '));
    };

    if (router.isReady) {
      getInfo();
    }
  }, [router.isReady]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formD = new FormData();
    formD.append('roomImg', file);
    const tag = hashtag.split(' ');
    console.log(tag);
    if (file) {
      try {
        const res = await API.put('studyroom', {
          roomId: room.roomId,
          roomName: room.roomName,
          endStudyDay: room.endStudyDay,
          focusTimeStart: room.focusTimeStart,
          focusTimeEnd: room.focusTimeEnd,
          roomTitle: room.roomTitle,
          roomDesc: room.roomDesc,
          hashTags: tag,
        });
        console.log(res.data);
        console.log('방의 정보가 변경되었습니다.');
        await API.putImg(`roomimg/${res.data.roomId}`, formD);
        console.log('이미지가 추가되었습니다.');
        router.back();
        resetRoom();
      } catch (err) {
        console.log(err);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const resetHandler = () => {
    resetRoom();
    console.log(room);
    router.back();
  };
  return (
    <div>
      <div className="container w-full mx-auto my-5 bg-white rounded">
        <div className="w-full xl:w-full border-b border-gray-300  py-3 bg-white ">
          <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
            <p className="text-lg text-gray-800  font-bold">스터디방 생성</p>
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
        <div className="flex gap-x-6 mt-8">
          <label
            htmlFor="name"
            className="pb-2 text-sm font-bold text-gray-800 "
          >
            대표 이미지 설정
          </label>
          {!error ? (
            <p className="pb-2 text-sm text-gray-800 ">
              대표 이미지를 설정해주세요.
            </p>
          ) : (
            <p className="pb-2 text-sm text-red-500 ">
              대표 이미지를 설정해주세요.
            </p>
          )}
        </div>
        <div className="container w-full mx-auto my-3 bg-white  rounded">
          {tempUrl && (
            <div className="my-3">
              <img
                className="object-fill h-48 w-96 rounded-md"
                src={tempUrl}
                alt="Rounded avatar"
              />
            </div>
          )}
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,image/png,image/jpeg"
            name="profile_img"
            onChange={handleUpload}
            ref={fileInput}
          />
          <div className="flex w-64 gap-x-3">
            <button
              className="w-full text-white py-2 px-2 my-1 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg text-sm transition duration-200"
              onClick={() => {
                fileInput.current.click();
              }}
            >
              프로필 업로드
            </button>
            <button
              className="w-full text-indigo-500 hover:text-white py-2 px-2 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg text-sm transition duration-200"
              onClick={handleResetProfileChange}
            >
              프로필 삭제
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <EditStudyContent />
        </div>
      </div>
      <div className="flex justify-center">
        <EditBoard />
      </div>
      {error && (
        <div className="m-10">
          <Alert title="error" content="대표 이미지를 설정해주세요!" />
        </div>
      )}
      <div className="container mx-auto w-11/12 xl:w-full">
        <div className="w-full py-4 sm:px-0 bg-white  flex justify-center">
          <button
            role="button"
            aria-label="cancel form"
            className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300  rounded text-indigo-600  px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            onClick={resetHandler}
          >
            Cancel
          </button>
          <button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
            onClick={submitHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
