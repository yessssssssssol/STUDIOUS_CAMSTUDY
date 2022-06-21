import { useRef, useState } from 'react';

import { useRecoilState } from 'recoil';
import {
  createroomAtom,
  studyroomImgAtom,
} from '../../../core/atoms/createroomState';

const CreateStudyProfile = () => {
  const [file, setFile] = useRecoilState(studyroomImgAtom);
  const [tempUrl, setTempURL] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  const fileInput = useRef(null);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setTempURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleResetProfileChange = (e) => {
    setTempURL(
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    );
    setFile(
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    );
  };

  // const saveEdit = async (e) => {
  //   e.preventDefault();
  //   //Put request to update edited user data
  //   const formD = new FormData();
  //   formD.append('img', file);

  //   try {
  //     const res = await API.postImg('user/img', formD);
  //     const updatedUrl = res.data.url;
  //     setUser((prev) => {
  //       return { ...prev, profileUrl: updatedUrl };
  //     });
  //     console.log('이미지 전송에 성공했습니다.');
  //     setShowModal(false);
  //   } catch (err) {
  //     console.log('이미지 전송에 실패했습니다.', err);
  //   }
  // };

  return (
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
        {/* <button
          className="w-full text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200"
          //   onClick={saveEdit}
        >
          프로필 저장
        </button> */}
      </div>
    </div>
  );
};

export default CreateStudyProfile;
