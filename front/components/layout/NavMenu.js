import Link from 'next/link';

const NavMenu = () => {
  return (
    <div
      className='flex flex-col -mx-4 md:flex-row md:items-center md:mx-8'
      id='mobile-menu-2'
    >
      <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
        <li>
          <Link href='/'>
            <a className='block py-2 pr-4 pl-3  mx-10 font-semibold text-gray-700 border-b border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href='/board'>
            <a className='block py-2 pr-4 pl-3  mx-10 font-semibold text-gray-700 border-b border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>
              스터디 모집
            </a>
          </Link>
        </li>
        <li>
          <Link href='/mypage'>
            <a className='block py-2 pr-4 pl-3  mx-10 font-semibold text-gray-700 border-b border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>
              마이페이지
            </a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a className='block py-2 pr-4 pl-3  mx-10 font-semibold text-gray-700 border-b border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>
              팀원 소개
            </a>
          </Link>
        </li>
        <li>
          <Link href='/prologue'>
            <a className='block py-2 pr-4 pl-3  mx-10 font-semibold text-gray-700 border-b border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'>
              서비스 소개
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
