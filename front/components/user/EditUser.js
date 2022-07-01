import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editUserModalAtom } from '../../core/atoms/modalState';
import { isloginAtom, userAtom } from '../../core/atoms/userState';
import * as API from '../../pages/api/api';
import Button from '../common/Button';

const EditUser = () => {
  const setShowModal = useSetRecoilState(editUserModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const setIsLogin = useSetRecoilState(isloginAtom);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await API.put(`user/${user.id}`, {
      name: user.name,
      description: user.description,
    });
    const updatedUser = await res.data;

    setUser(updatedUser);
    setShowModal(false);
    alert('회원 정보가 수정되었습니다.');
  };

  const handleNameChange = (e) => {
    setUser((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleDescriptionChange = (e) => {
    setUser((prev) => {
      return { ...prev, description: e.target.value };
    });
  };

  const handleUserDelete = async () => {
    await API.delete(`user/${user.id}`);
    alert('회원탈퇴가 완료되었습니다.');
    setShowModal(false);
    setIsLogin(false);
    localStorage.clear();
    router.push('/');
  };
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <div className="my-2">
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          이름
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="이름을 입력해주세요"
          value={user.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900">
          한 줄 소개
        </label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
          value={user.description}
          onChange={handleDescriptionChange}
        >
          {user.description}
        </textarea>
      </div>
      <div className="flex gap-3 my-3">
        <Button
          text="회원탈퇴"
          onClick={handleUserDelete}
          color="bg-amber-500 py-2.5 shadow hover:shadow-lg"
        />
        <div
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 decoration-solid italic"
        >
          탈퇴 시 계정과 관련된 모든 정보가 삭제되며 복구되지 않습니다.
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-2 my-2">
        <button
          onClick={submitHandler}
          className="text-white py-2.5 px-5 mr-2 mb-2 bg-amber-400 hover:text-white my-1 uppercase rounded border border-gray-200 shadow hover:shadow-lg text-sm transition duration-200 font-semibold"
        >
          수정
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="text-amber-500 py-2.5 px-5 mr-2 mb-2 bg-white my-1 uppercase rounded border border-gray-200 shadow hover:shadow-lg text-sm transition duration-200 font-semibold"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default EditUser;
