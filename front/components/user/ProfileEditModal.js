import { useRecoilState } from 'recoil';
import EditProfileImg from './EditProfileImg';
import Modal from '../common/Modal';
import { editProfileModalAtom } from '../../core/atoms/modalState';

const ProfileEditModal = () => {
  const [showModal, setShowModal] = useRecoilState(editProfileModalAtom);
  return (
    <>
      <button
        className="w-full block py-2 px-4 text-sm text-center text-gray-700 hover:bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        프로필 변경
      </button>
      {showModal && (
        <Modal title="프로필 변경">
          <EditProfileImg />
        </Modal>
      )}
    </>
  );
};

export default ProfileEditModal;
