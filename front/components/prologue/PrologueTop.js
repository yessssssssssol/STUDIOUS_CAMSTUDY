const PrologueTop = () => {
  return (
    <div>
      <div className='flex w-full flex-col items-center justify-center rounded-lg border border-gray-200 p-8'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 fill-current text-gray-500'
            viewBox='0 0 24 24'
          >
            <path
              fill-rule='evenodd'
              d='M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.496 4.496 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.75.75 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a3 3 0 00-2.121-.879H.75a.75.75 0 01-.75-.75v-15zm11.247 3.747a3 3 0 00-3-2.997H1.5V18h6.947a4.5 4.5 0 012.803.98l-.003-11.483zm1.503 11.485V7.5a3 3 0 013-3h6.75v13.558l-6.927-.047a4.5 4.5 0 00-2.823.971z'
            ></path>
          </svg>
        </div>

        <div className='mt-8 text-center'>
          <h1 className='text-4xl'>Welcome to Tailwindtemplates</h1>
          <p className='mx-auto mt-4 lg:w-1/2 text-gray-500'>
            A repository of free components built with tailwindcss. Every
            component is responsive, customizable and carefully crafted for your
            use.
          </p>
        </div>

        <button className='mt-8 block rounded-lg border border-green-700 bg-green-600 py-1.5 px-4 font-medium text-white transition-colors hover:bg-green-700 active:bg-green-800 disabled:opacity-50'>
          Get started
        </button>

        <button className='mt-2 block rounded-lg bg-transparent py-1.5 px-4 font-medium text-blue-600 transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50'>
          Learn more
        </button>
      </div>

      {/*  */}
      <div class="w-full bg-center bg-cover h-[32rem] bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')]">
        <div class='flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50'>
          <div class='text-center'>
            <h1 class='text-2xl font-semibold text-white uppercase lg:text-3xl'>
              Build Your new <span class='text-blue-400 underline'>Saas</span>
            </h1>
            <button class='w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
              Start project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrologueTop;
