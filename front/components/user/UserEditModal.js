import { useRecoilState, useRecoilValue } from 'recoil';
import { editProfileModalState } from '../../core/atoms/modalState';

import * as Api from '../../pages/api/api';
import EditProfileImg from './EditProfileImg';
import EditProfile from './EditProfile';
import Modal from '../common/Modal';
import {
  userAtom,
  userDescriptionAtom,
  userNameAtom,
} from '../../core/atoms/userState';

const UserEditModal = () => {
  const [showModal, setShowModal] = useRecoilState(editProfileModalState);
  const [user, setUser] = useRecoilState(userAtom);
  const userName = useRecoilValue(userNameAtom);
  const userDescription = useRecoilValue(userDescriptionAtom);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await Api.put(`users/${user.id}`, {
      name: userName,
      descriptiion: userDescription,
    });
    const updatedUser = res.data;
    setUser(updatedUser);

    setShowModal(false);
  };

  return (
    <>
      <button
        className='w-full block py-2 px-4 text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
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

export default UserEditModal;
