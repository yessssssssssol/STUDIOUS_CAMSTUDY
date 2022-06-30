import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { editProfileModalAtom } from '../../core/atoms/modalState';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../../pages/api/api';
import { userDefaultImg } from '../common/UseData';
import Button from '../common/Button';

const EditProfileImg = () => {
  const [show, setShowModal] = useRecoilState(editProfileModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [file, setFile] = useState(null);

  const [tempURL, setTempURL] = useState(user.profileUrl);

  const fileInput = useRef(null);

  const handleResetProfileChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        profileUrl: userDefaultImg,
      };
    });
    setTempURL(userDefaultImg);
    setFile(userDefaultImg);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    //Put request to update edited user data
    const formD = new FormData();
    formD.append('img', file);

    try {
      const res = await API.postImg('user/img', formD);
      const updatedUrl = res.data.url;
      setUser((prev) => {
        return { ...prev, profileUrl: updatedUrl };
      });
      console.log('이미지 전송에 성공했습니다.');
      setShowModal(false);
    } catch (err) {
      console.log('이미지 전송에 실패했습니다.', err);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setTempURL(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className="flex flex-col items-center pb-10 mx-20">
      <div className="my-6">
        <img
          className="h-40 w-40 rounded-full"
          src={tempURL}
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
      <div className="my-5">
        <div className="flex justify-center">
          <button
            className=" py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-amber-50 hover:text-amber-500 focus:z-10 focus:ring-4 focus:ring-gray-200"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            프로필 업로드
          </button>
          <button
            className="py-2.5 px-5  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-amber-50 hover:text-amber-500 focus:z-10 focus:ring-4 focus:ring-gray-200"
            onClick={handleResetProfileChange}
          >
            프로필 삭제
          </button>
        </div>
        <Button onClick={saveEdit} text="저장" color={`w-full py-3`} />
      </div>
    </div>
  );
};

export default EditProfileImg;
