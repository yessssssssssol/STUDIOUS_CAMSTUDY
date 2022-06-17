import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileUrlAtom, userAtom } from '../../core/atoms/userState';
import * as API from '../../pages/api/api';

const EditProfileImg = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [file, setFile] = useState(null);
  const [profileUrl, setProfileUrl] = useRecoilState(profileUrlAtom);

  const fileInput = useRef(null);
  useEffect(() => {
    try {
      const getUserProfileUrl = async () => {
        const res = await API.get('user', user.id);
        const curUser = await res.data;
        setProfileUrl(curUser.profileUrl);
        setUser(curUser);
      };
      getUserProfileUrl();
    } catch (err) {
      console.log('프로필이 없습니다.', err);
    }
    console.log(user);
    console.log(profileUrl);
  }, [profileUrl]);

  const saveEdit = async (e) => {
    e.preventDefault();
    //Put request to update edited user data
    const formD = new FormData();
    formD.append('img', file);

    try {
      const res = await API.postImg('user/img', formD);
      const updatedUrl = res.data.url;
      setProfileUrl(updatedUrl);
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
    <div className="flex flex-col items-center pb-10 mx-20">
      <div className="my-6">
        <img
          className="h-40 w-40 rounded-full"
          src={profileUrl}
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
      <div className="my-5">
        <div className="flex justify-center">
          <button
            className=" py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => {
              fileInput.current.click();
              console.log(fileInput);
            }}
          >
            프로필 업로드
          </button>
          <button
            className="py-2.5 px-5  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => {
              setProfileUrl(
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              );
            }}
          >
            프로필 삭제
          </button>
        </div>
        <button
          className="w-full text-white py-2.5 px-5 mr-2 mb-2 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition duration-200"
          onClick={saveEdit}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditProfileImg;
