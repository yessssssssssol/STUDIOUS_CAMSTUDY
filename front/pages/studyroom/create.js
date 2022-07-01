import * as API from '../../pages/api/api';
import CreateStudyRoom from '../../components/studyroom/create/CreateStudyContent';
import CreateBoard from '../../components/studyroom/create/CreateBoard';
import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  createroomAtom,
  createhashtagAtom,
} from '../../core/atoms/createroomState';
import { useRouter } from 'next/router';
import { roomDefaultImg } from '../../components/common/UseData';
import Alert from '../../components/common/Alert';
import Button from '../../components/common/Button';

export default function Edit() {
  const router = useRouter();
  const [room, setRoom] = useRecoilState(createroomAtom);
  const resetRoom = useResetRecoilState(createroomAtom);
  const resetHashtag = useResetRecoilState(createhashtagAtom);
  const [file, setFile] = useState(null);
  const [tempUrl, setTempURL] = useState(roomDefaultImg);
  const [error, setError] = useState(false);
  const [hashtag, setHashTag] = useRecoilState(createhashtagAtom);
  const [imgCheck, setImgCheck] = useState(false);
  const [dataCheck, setDataCheck] = useState(false);
  let submitCheck = false;

  const {
    roomName,
    membersOnly,
    startStudyDay,
    endStudyDay,
    focusTimeStart,
    focusTimeEnd,
    membersNum,
    roomTitle,
    roomDesc,
  } = room;

  useEffect(() => {
    if (
      roomName &&
      membersOnly &&
      startStudyDay &&
      endStudyDay &&
      focusTimeStart &&
      focusTimeEnd &&
      focusTimeEnd &&
      membersNum &&
      roomTitle &&
      roomDesc
    ) {
      setDataCheck(true);
    } else {
      setDataCheck(false);
    }
  }, [room]);

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
    setImgCheck(false);
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setTempURL(URL.createObjectURL(e.target.files[0]));
      setImgCheck(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const tag = hashtag.split(' ');
    const formD = new FormData();
    formD.append('roomImg', file);
    if (!submitCheck) {
      if (imgCheck) {
        try {
          const res = await API.post('studyroom', {
            roomName: room.roomName,
            group: room.group,
            membersOnly: room.membersOnly,
            membersNum: room.membersNum,
            startStudyDay: room.startStudyDay,
            endStudyDay: room.endStudyDay,
            focusTimeStart: room.focusTimeStart,
            focusTimeEnd: room.focusTimeEnd,
            roomTitle: room.roomTitle,
            roomDesc: room.roomDesc,
            hashTags: tag,
          });
          submitCheck = true;
          console.log('방이 생성되었습니다.');
          await API.putImg(`roomimg/${res.data.roomId}`, formD);
          console.log('이미지가 추가되었습니다.');
          if (room.membersOnly === 'false') {
            router.push(`/openroom/board/${res.data.roomId}`);
          } else {
            router.push(`/board/detail/${res.data.roomId}`);
          }
          resetRoom();
          resetHashtag();
          setImgCheck(false);
        } catch (err) {
          console.log(err);
          alert('필수 입력 정보를 입력해주세요.');
        }
      } else {
        setError(true);
        alert('필수 입력 정보를 입력해주세요.');
      }
    } else {
      alert('방이 이미 생성되었습니다. ');
    }
  };

  const resetHandler = () => {
    resetRoom();
    router.back();
  };
  return (
    <div className="container">
      <div className="flex-col justify-center mx-72 my-5 bg-white rounded">
        <div className=" border-b border-amber-400 py-3 bg-white ">
          <div className="flex w-11/12 mx-24 xl:mx-0 items-center">
            <p className="text-2xl text-amber-400  font-bold">
              스터디방 만들기
            </p>
          </div>
        </div>
        <div className="flex gap-x-6 mt-8 w-full">
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
          <div className="my-3">
            <img
              className="object-fill h-48 w-96 rounded-md"
              src={tempUrl}
              alt="Rounded avatar"
            />
          </div>
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
              className="w-full text-white py-2 px-2 my-1 uppercase rounded bg-amber-400 hover:bg-amber-500 shadow hover:shadow-lg text-sm transition duration-200"
              onClick={() => {
                fileInput.current.click();
              }}
            >
              프로필 업로드
            </button>
            <button
              className="w-full text-amber-400 hover:text-white py-2 px-2 my-1 uppercase rounded border border-amber-400 bg-white hover:bg-amber-500 shadow hover:shadow-lg text-sm transition duration-200"
              onClick={handleResetProfileChange}
            >
              프로필 삭제
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <CreateStudyRoom />
        </div>
      </div>
      <div className="flex justify-center">
        <CreateBoard />
      </div>
      {error && (
        <div className="m-10">
          <Alert title="error" content="대표 이미지를 설정해주세요!" />
        </div>
      )}
      <div className="container mx-auto w-11/12 xl:w-full mt-10">
        <div className="w-full py-4 sm:px-0 bg-white  flex justify-center">
          <button
            role="button"
            aria-label="cancel form"
            className="bg-white focus:outline-none transition duration-150 ease-in-out hover:bg-amber-500 border-amber-400 hover:text-white border rounded text-amber-400  px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            onClick={resetHandler}
          >
            취소
          </button>
          <button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 bg-amber-400 focus:outline-none transition duration-150 ease-in-out hover:bg-amber-500 rounded text-white px-8 py-2 text-sm"
            onClick={submitHandler}
            disabled={!dataCheck}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
