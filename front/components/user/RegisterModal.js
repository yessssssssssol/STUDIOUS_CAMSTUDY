import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import * as API from '../../pages/api/api';
import Modal from '../common/Modal';
import { registerModalState } from '../../core/atoms/modalState';

const RegisterModal = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useRecoilState(registerModalState);
  const modalTitle = 'Register';
  const [isVaild, setIsVaild] = useState(false);
  const [email, setEmail] = useState('');
  const [vaildNumber, setVaildNumber] = useState();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [buttonAct, setButtonAct] = useState(true);
  const [resVaildNumber, setResVaildNumber] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (resVaildNumber === vaildNumber) {
      try {
        await API.post('user/register', {
          email,
          password,
          name,
        });

        router.push('/');
        alert('회원가입에 성공했습니다!');
        setShowModal(false);
        setEmail('');
        setPassword('');
        setName('');
      } catch (err) {
        console.log('회원가입에 실패', err);
      }
    } else {
      alert('인증번호가 틀렸습니다. 다시 확인해주세요');
    }
  };
  const clickHanderVaild = async () => {
    setIsVaild(true);
    console.log(isVaild);

    try {
      const res = await API.get('user/email', email);
      setResVaildNumber(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const validateEmail = (email) => {
    if (email !== '') {
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    return false;
  };
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isNameValid = name.length > 0;
  const isFormValid = isEmailValid && isPasswordValid && isNameValid;

  return (
    <div>
      <button
        className="bg-gray-400 text-white active:bg-gray-600 font-bold uppercase text-sm px-3 py-2 rounded-md hover:shadow-md outline-none focus:outline-none mx-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          setShowModal(true);
          setEmail('');
          setPassword('');
          setName('');
          setIsVaild(false);
        }}
      >
        {modalTitle}
      </button>
      {showModal && (
        <Modal title={modalTitle}>
          <div>
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
                {!isEmailValid && email.length > 1 && (
                  <p className="text-red-500 text-xs italic px-2.5">
                    이메일이 유효하지 않습니다.
                  </p>
                )}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && password.length > 1 && (
                  <p className="text-red-500 text-xs px-2.5 italic">
                    비밀번호가 유효하지 않습니다.
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  이름
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isNameValid && name.length > 1 && (
                  <p className="text-red-500 text-xs px-2.5 italic">
                    이름이 유효하지 않습니다.
                  </p>
                )}
              </div>

              {isVaild && (
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    인증번호
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name"
                    value={vaildNumber}
                    onChange={(e) => setVaildNumber(e.target.value)}
                  />
                </div>
              )}
              {isVaild ? (
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={!buttonAct}
                  onClick={submitHandler}
                >
                  회원가입
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={clickHanderVaild}
                >
                  이메일인증
                </button>
              )}
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegisterModal;
