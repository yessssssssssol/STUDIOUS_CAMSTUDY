import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import LoginModal from '../user/LoginModal';
import RegisterModal from '../user/RegisterModal';
import { useRouter } from 'next/router';
import { tokenAtom } from '../../core/atoms/userState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserActions } from '../../utils/hooks/useUserAction';
import { userAtom } from '../../core/atoms/userState';
import { dropboxModalState, menuModalState } from '../../core/atoms/modalState';
import { items, drop_item } from '../common/UseData';
export default function NavBar() {
  const router = useRouter();
  const ref = useRef(null);
  const [showOptions, setShowOptions] = useRecoilState(dropboxModalState);
  const [menuBar, setMenuBar] = useRecoilState(menuModalState);
  const [token, setToken] = useRecoilState(tokenAtom);
  const userActions = useUserActions();
  const userName = useRecoilValue(userAtom);

  const handleShow = () => {
    setShowOptions(true);
  };
  const handleMenuBar = () => {
    setMenuBar(true);
  };
  useEffect(() => {
    // Bind the event listener
    console.log(menuBar);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
      setMenuBar(false);
    }
  }

  const handleLogout = () => {
    userActions.logout().catch((err) => {
      console.log(err);
    });
  };

  function NavItem(item, index) {
    function make_link(invisible) {
      return (
        <>
          {router.pathname === item[1] ? (
            <Link href={item[1]}>
              <a
                class={`${invisible} hidden md:block font-bold rounded-lg  text-orange-300 px-2  `}
              >
                {item[0]}👑
              </a>
            </Link>
          ) : (
            <Link href={item[1]}>
              <a
                class={`${invisible} hidden md:block px-2 rounded-lg hover:bg-sky-100 contrast-100`}
              >
                {item[0]}
              </a>
            </Link>
          )}
        </>
      );
    }
    const invisible = 'invisible';

    return (
      <ul class="list-none">
        <li key={index}>
          {item[0] === '마이페이지'
            ? token
              ? make_link()
              : make_link(invisible)
            : make_link()}
        </li>
      </ul>
    );
  }
  function NavDropItem(item, index) {
    return (
      <>
        {index === undefined ? (
          <li key={index} class="text-center">
            <Link href="/">
              <a class="block py-2 px-4 text-sm text-gray-700">{item}</a>
            </Link>
          </li>
        ) : (
          <li key={index} class="text-center">
            <Link href={item[1]}>
              <a class="block py-2 px-4 text-sm text-gray-700">{item[0]}</a>
            </Link>
          </li>
        )}
      </>
    );
  }
  return (
    <nav class="bg-white border-gray-200 px-2 py-5 rounded">
      <div class=" items-center flex justify-between mx-auto ">
        <Link href="/">
          <a class="ml-[15px]">
            <span class="center text-3xl font-bold whitespace-nowrap">
              의자왕👑
            </span>
          </a>
        </Link>

        {items.map((item, index) => NavItem(item, index))}
        {token ? (
          <div class="relative flex items-center md:order-2" ref={ref}>
            <button
              onClick={handleMenuBar}
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleShow}
              type="button"
              class="inline-flex justify-center w-full mx-10 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                src="favicon.ico"
                alt="user photo"
              />
            </button>

            {showOptions && (
              <div
                class="absolute top-9 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
                id="dropdown"
              >
                <div class="py-3 px-4">
                  <span class="block text-sm text-gray-900">
                    {userName.name}
                  </span>
                  <span class="block text-sm font-medium text-gray-500 truncate">
                    {userName.email}
                  </span>
                </div>
                <ul class="py-1" aria-labelledby="dropdown">
                  {drop_item.map((item) => NavDropItem(item))}
                  <li>
                    <button onClick={handleLogout} class="w-full">
                      <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </a>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {menuBar && (
              <div class="absolute top-9 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow">
                {items.map((item, index) => NavDropItem(item, index))}
              </div>
            )}
          </div>
        ) : (
          <span class="flex mr-[15px]">
            <LoginModal />
            <RegisterModal />
          </span>
        )}
      </div>
    </nav>
  );
}
