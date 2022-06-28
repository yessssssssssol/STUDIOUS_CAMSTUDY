import { useRecoilState } from 'recoil';
import { editUserModalAtom } from '../../core/atoms/modalState';

import EditUser from './EditUser';
import Modal from '../common/Modal';

const UserEditModal = () => {
  const [showModal, setShowModal] = useRecoilState(editUserModalAtom);
  return (
    <>
      <button
        className="w-full block py-2 px-4 text-sm text-center text-gray-700 hover:bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        회원정보 수정
      </button>
      {showModal && (
        <Modal title="회원 정보 수정">
          <EditUser />
        </Modal>
      )}
    </>
  );
};

export default UserEditModal;
