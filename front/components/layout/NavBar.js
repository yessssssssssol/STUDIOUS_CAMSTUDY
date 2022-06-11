import Link from 'next/link';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { tokenAtom, userAtom } from '../../core/atoms/userState';
import { useUserActions } from '../../utils/hooks/useUserAction';
import LoginModal from '../user/LoginModal';
import ProfileEditModal from '../user/ProfileEditModal';
import RegisterModal from '../user/RegisterModal';
import NavMenu from './NavMenu';
export default function NavBar() {
  const [showOptions, setShowOptions] = useState(false);
  const token = useRecoilValue(tokenAtom);
  const user = useRecoilValue(userAtom);
  const userActions = useUserActions();

  const { name, email, profileUrl } = user;

  const handleShow = () => {
    setShowOptions(!showOptions);
    console.log('쇼', showOptions);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();

    userActions.logout().catch((err) => {
      console.log(err);
    });
  };

  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
      <div className='container px-6 py-4 mx-auto'>
        <div className='flex-1 md:flex md:items-center md:justify-between'>
          <div className=' -mx-4 md:flex-row md:items-center md:mx-8'>
            <Link href='/'>
              <a className='flex items-center'>
                <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                  의자왕
                </span>
              </a>
            </Link>
          </div>
          <NavMenu />
          <div className='flex items-center md:mt-0"'>
            {token ? (
              <div className='relative inline-block'>
                <button
                  onClick={handleShow}
                  type='button'
                  className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                  id='menu-button'
                >
                  <img
                    className='w-8 h-8 rounded-full'
                    src={profileUrl}
                    alt='user photo'
                  />
                </button>
                {showOptions && (
                  <div
                    className='absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800'
                    id='dropdown'
                  >
                    <div className='py-3 px-4'>
                      <span className='block text-sm text-gray-900 dark:text-white'>
                        {name}
                      </span>
                      <span className='block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                        {email}
                      </span>
                    </div>
                    <ul className='py-1' aria-labelledby='dropdown'>
                      <li>
                        <ProfileEditModal />
                      </li>
                      <li>
                        <Link href='/'>
                          <a
                            href='#'
                            className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                            onClick={logoutHandler}
                          >
                            로그아웃
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <LoginModal />
                <RegisterModal />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
