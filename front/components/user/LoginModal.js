import Modal from '../Modal';

const LoginModal = () => {
  const title = '로그인';
  return (
    <Modal title={title}>
      <form className='space-y-6 w-80' action='#'>
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
        </div>
        <button
          type='submit'
          className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          로그인
        </button>
        <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
          Not registered?{' '}
          <a
            href='#'
            className='text-blue-700 hover:underline dark:text-blue-500'
          >
            Create account
          </a>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
