const Footer = () => {
  return (
    <footer className="p-2 bg-white sm:p-6 ">
      <hr className="mt-5 mb-2 border-gray-200 sm:mx-auto  lg:my-5" />
      <div className="sm:flex sm:items-center sm:justify-between mx-8">
        <span className="text-sm text-gray-500 sm:text-center ">
          © 2022{' '}
          <a href="#" className="hover:underline">
            Zeroto100™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <span className="center text-3xl font-bold whitespace-nowrap">
            <img
              src="/studious_logo-01.png"
              alt="studious 로고"
              className="object-fill w-32 mb-3"
            />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
