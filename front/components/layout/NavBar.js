import Link from 'next/link';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import LoginModal from '../user/LoginModal';
import RegisterModal from '../user/RegisterModal';
import { useRouter } from 'next/router';
export default function NavBar() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const [showOptions, setShowOptions] = useState(false);
  const [Islogin, setIslogin] = useState(false);
  const handleShow = () => {
    setShowOptions(!showOptions);
  };
  useEffect(() => {
    console.log(currentRoute);
  }, [currentRoute]);
  const items = [
    ['스터디 모집', '/board'],
    ['마이페이지', '/mypage'],
    ['AboutUs', '/aboutus'],
    ['프롤로그', '/prologue'],
  ];
  const drop_item = ['Dashboard', 'Settings', 'Earnings', 'Sign out'];
  function NavItem(item, index) {
    return (
      <li key={index}>
        <Link href={item[1]}>
          <a
            style={{ color: router.pathname === item[1] ? 'blue' : 'black' }}
            class={`block py-2 px-5 pr-4 pl-3 mx-20 border-b  hover:bg-gray-50  border-0  p-0`}
          >
            {item[0]}
          </a>
        </Link>
      </li>
    );
  }
  function NavDropItem(item, index) {
    return (
      <li key={index}>
        <Link href="/">
          <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
            {item}
          </a>
=======
import { useEffect, useState, useRef } from 'react';
import LoginModal from '../user/LoginModal';
import RegisterModal from '../user/RegisterModal';
import { useRouter } from 'next/router';
import { tokenAtom } from '../../core/atoms/userState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserActions } from '../../utils/hooks/useUserAction';
import { userAtom } from '../../core/atoms/userState';
import { dropboxModalState } from '../../core/atoms/modalState';
import { items, drop_item } from '../common/UseData';
export default function NavBar() {
  const router = useRouter();
  const ref = useRef(null);
  const [showOptions, setShowOptions] = useRecoilState(dropboxModalState);
  const [token, setToken] = useRecoilState(tokenAtom);
  const userActions = useUserActions();
  const userName = useRecoilValue(userAtom);

  const handleShow = () => {
    setShowOptions(true);
  };
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
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
                class={`${invisible} font-bold text-orange-300 contrast-50 block sm:text-sm md:text-xl  `}
              >
                {item[0]}👑
              </a>
            </Link>
          ) : (
            <Link href={item[1]}>
              <a class={`${invisible} block sm:text-sm md:text-xl `}>
                {item[0]}
              </a>
            </Link>
          )}
        </>
      );
    }

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
    const invisible = 'invisible';
  }
  function NavDropItem(item, index) {
    return (
      <li key={index} class="text-center">
        <Link href="/">
          <a class="block py-2 px-4 text-sm text-gray-700">{item}</a>
>>>>>>> bd5fa85da6a5171cca1a0474777897fbef91e38a
        </Link>
      </li>
    );
  }
  return (
<<<<<<< HEAD
    <nav class="bg-white border-gray-200 px-2 py-5 rounded min-w-[1000px]">
      <div class="container flex flex-wrap justify-between items-center mx-auto min-w-[1550px]">
        <Link href="/">
          <a class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap">
=======
    <nav class="bg-white border-gray-200 px-2 py-5 rounded">
      <div class="items-center flex justify-between mx-auto">
        <Link href="/">
          <a class="ml-[15px]">
            <span class="center text-3xl font-bold whitespace-nowrap">
>>>>>>> bd5fa85da6a5171cca1a0474777897fbef91e38a
              의자왕👑
            </span>
          </a>
        </Link>

<<<<<<< HEAD
        <div class="items-center flex w-auto order-1">
          <ul class="flex  mt-4 flex-row space-x-8 mt-0 text-sm font-medium">
            {items.map((item, index) => NavItem(item, index))}
          </ul>
          {Islogin === true ? (
            <div class="relative flex items-center md:order-2">
              <button
                onClick={handleShow}
                type="button"
                class="inline-flex justify-center w-full mx-20 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
                      Bonnie Green
                    </span>
                    <span class="block text-sm font-medium text-gray-500 truncate">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul class="py-1" aria-labelledby="dropdown">
                    {drop_item.map((item, index) => NavDropItem(item, index))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <LoginModal />
              <RegisterModal />
            </>
          )}
        </div>
=======
        {items.map((item, index) => NavItem(item, index))}
        {token ? (
          <div class="relative flex items-center md:order-2" ref={ref}>
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
                  {drop_item.map((item, index) => NavDropItem(item, index))}
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
          </div>
        ) : (
          <span class="flex mr-[15px]">
            <LoginModal />
            <RegisterModal />
          </span>
        )}
>>>>>>> bd5fa85da6a5171cca1a0474777897fbef91e38a
      </div>
    </nav>
  );
}
