import { useRecoilState, useRecoilValue } from 'recoil';
import { editProfileModalState } from '../../core/atoms/modalState';

import * as Api from '../../pages/api/api';
import EditProfileImg from './EditProfileImg';
import EditProfile from './EditProfile';
import Modal from '../common/Modal';
import { profileUrlAtom, userAtom } from '../../core/atoms/userState';

const ProfileEditModal = () => {
  const [showModal, setShowModal] = useRecoilState(editProfileModalState);
  const [user, setUser] = useRecoilState(userAtom);
  const profileUrl = useRecoilValue(profileUrlAtom);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formD = new FormData();
    formD.append('img', profileUrl);

    try {
      await Api.postImg('user/img', formD);
      console.log('이미지 전송에 성공했습니다.');
    } catch (err) {
      console.log('이미지 전송에 실패했습니다.', err);
    }

    const res = await Api.put(`users/:${user.id}`, {
      name,
      email,
      description,
    });
    const updatedUser = res.data;
    setUser(updatedUser);

    setShowModal(false);
  };

  return (
    <>
      <button
        className='bg-transparent text-gray-600 active:bg-gray-300 font-bold uppercase text-sm px-3 py-2 rounded-md hover:shadow-md outline-none focus:outline-none mx-1 mb-1 ease-linear transition-all duration-150 border'
        type='button'
        onClick={() => setShowModal(true)}
      >
        회원정보 수정
      </button>
      {showModal && (
        <Modal title='회원 정보 수정'>
          <div className='flex flex-row justify-center space-x-20'>
            <EditProfileImg />
            <EditProfile />
          </div>
          <div className='flex flex-row justify-center space-x-2'>
            <button
              type='submit'
              className='text-white py-2 px-4 my-1 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition duration-200'
              onClick={submitHandler}
            >
              수정
            </button>
            <button
              className='text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200'
              onClick={() => setShowModal(false)}
            >
              취소
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfileEditModal;
