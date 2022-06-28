import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

import { tokenAtom } from '../../core/atoms/userState';
import {
  loginModalState,
  dropboxModalState,
} from '../../core/atoms/modalState';

import Modal from '../common/Modal';
import { useUserActions } from '../../utils/hooks/useUserAction';

const LoginModal = () => {
  const title = 'Login';
  const router = useRouter();
  const { returnUrl } = router.query;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useRecoilState(loginModalState);
  const [dropModal, setDropModal] = useRecoilState(dropboxModalState);
  const token = useRecoilValue(tokenAtom);
  const userActions = useUserActions();

  useEffect(() => {
    if (token) {
      if (router.query.returnUrl) {
        router.push(returnUrl);
      }
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    userActions.login(email, password).catch((err) => {
      console.log(err);
    });
    setShowModal(false);
    setDropModal(false);
  };

  return (
    <>
      <button
        className="bg-transparent text-gray-600 active:bg-gray-300 font-bold uppercase text-sm px-3 py-2 rounded-md hover:shadow-md outline-none focus:outline-none mx-1 mb-1 ease-linear transition-all duration-150 border"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {title}
      </button>
      {showModal && (
        <Modal title={title}>
          <form className="space-y-6 w-80" onSubmit={submitHandler}>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                이메일
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                비밀번호
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              로그인
            </button>
            <div className="text-sm font-medium text-gray-500">
              Not registered?
              <a href="#" className="text-blue-700 hover:underline">
                Create account
              </a>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
