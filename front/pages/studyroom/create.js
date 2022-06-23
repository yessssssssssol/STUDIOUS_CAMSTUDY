import CreateStudyRoom from '../../components/studyroon/create/CreateStudyContent';
import CreateStudyRoomProfile from '../../components/studyroon/create/CreateStudyProfile';
import CreateBoard from '../../components/studyroon/create/CreateBoard';
import { useEffect, useState, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { createroomAtom } from '../../core/atoms/createroomState';
import { useRouter } from 'next/router';
import * as API from '../../pages/api/api';

export default function Create() {
  const router = useRouter();
  const [room, setRoom] = useRecoilState(createroomAtom);
  const resetRoom = useResetRecoilState(createroomAtom);

  const [file, setFile] = useState(null);
  const [tempUrl, setTempURL] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  const fileInput = useRef(null);

  const handleResetProfileChange = (e) => {
    setRoom((prev) => {
      return {
        ...prev,
        roomImg:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      };
    });
    setTempURL(
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    );
    setFile(
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    );
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setTempURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formD = new FormData();
    formD.append('roomImg', file);

    try {
      const res = await API.post('studyroom', room);
      console.log(res.data);
      console.log('방이 생성되었습니다.');
      await API.putImg(`roomimg/${res.data.roomId}`, formD);
      console.log('이미지가 추가되었습니다.');
      router.push('/');
      resetRoom();
    } catch (err) {
      console.log(err);
    }
  };

  const resetHandler = () => {
    resetRoom();
    console.log(room);
    router.push('/');
  };
  return (
    <div>
      <div className="">
        <div className="mx-20">
          <div className="my-6">
            <img
              className="h-40 w-40 rounded-full"
              src={tempUrl}
              alt="Rounded avatar"
            />
          </div>
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={handleUpload}
            ref={fileInput}
          />
          <div className="w-40">
            <button
              className="w-full text-white py-2 px-4 my-1 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition duration-200"
              onClick={() => {
                fileInput.current.click();
              }}
            >
              프로필 업로드
            </button>
            <button
              className="w-full text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200"
              onClick={handleResetProfileChange}
            >
              프로필 삭제
            </button>
          </div>
        </div>
        <CreateStudyRoom />
      </div>
      <div className="flex justify-center">
        {room.membersOnly && <CreateBoard />}
      </div>
      <div className="container mx-auto w-11/12 xl:w-full">
        <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-center">
          <button
            role="button"
            aria-label="cancel form"
            className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
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
