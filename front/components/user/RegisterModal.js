import { useState } from 'react';

import Modal from '../Modal';

const RegisterModal = () => {
  const modalTitle = '회원가입';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [buttonAct, setButtonAct] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { email, password, name };
    props.onAddUser(userData);
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
  if (isFormValid) {
    setButtonAct(false);
  }

  return (
    <Modal title={modalTitle}>
      <form className='space-y-6 w-80' onSubmit={submitHandler}>
        <div className='w-full'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            이메일
          </label>
          <input
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='name@email.com'
            required
          />
          {!isEmailValid && (
            <p className='text-red-500 text-xs italic px-2.5'>
              이메일이 유효하지 않습니다.
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            비밀번호
          </label>
          <input
            type='password'
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            required
          />
          {!isPasswordValid && (
            <p className='text-red-500 text-xs px-2.5 italic'>
              비밀번호가 유효하지 않습니다.
            </p>
          )}
        </div>
        <div className='w-full'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            이름
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='name'
            required
          />
          {!isNameValid && (
            <p className='text-red-500 text-xs px-2.5 italic'>
              이름이 유효하지 않습니다.
            </p>
          )}
        </div>
        <button
          type='submit'
          className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          disabled={!buttonAct}
        >
          회원가입
        </button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
