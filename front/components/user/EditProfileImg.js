import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  profileUrlAtom,
  tokenAtom,
  userAtom,
} from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';

const EditProfileImg = () => {
  const user = useRecoilValue(userAtom);
  const [file, setFile] = useState(null);
  const [profileUrl, setProfileUrl] = useRecoilState(profileUrlAtom);

  const fileInput = useRef(null);

  const saveEdit = async (e) => {
    e.preventDefault();
    //Put request to update edited user data
    const formD = new FormData();
    formD.append('img', file);

    try {
      await Api.postImg('user/img', formD);
      console.log('이미지 전송에 성공했습니다.');
    } catch (err) {
      console.log('이미지 전송에 실패했습니다.', err);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setProfileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className='flex flex-col items-center pb-10'>
      <div className='my-6'>
        <img
          className='h-40 w-40 rounded-full'
          src={profileUrl}
          alt='Rounded avatar'
        />
      </div>
      <input
        type='file'
        style={{ display: 'none' }}
        accept='image/jpg,impge/png,image/jpeg'
        name='profile_img'
        onChange={handleUpload}
        ref={fileInput}
      />
      <div className='w-40'>
        <button
          className='w-full text-white py-2 px-4 my-1 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition duration-200'
          onClick={() => {
            fileInput.current.click();
            console.log(fileInput);
          }}
        >
          프로필 업로드
        </button>
        <button
          className='w-full text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200'
          onClick={() => {
            setProfileUrl(
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            );
          }}
        >
          프로필 삭제
        </button>
        <button
          className='w-full text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200'
          onClick={saveEdit}
        >
          프로필 삭제
        </button>
      </div>
    </div>
  );
};

export default EditProfileImg;
