const PrologueSample = () => {
  return (
    <div>
      <div className='container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center'>
        <div className='flex flex-col items-center w-full lg:flex-row lg:w-1/2'>
          <div className='flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col'>
            <button className='w-3 h-3 mx-2 bg-blue-500 rounded-full lg:mx-0 focus:outline-none'></button>
            <button className='w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500'></button>
            <button className='w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500'></button>
            <button className='w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500'></button>
          </div>
          <div className='max-w-lg lg:mx-12 lg:order-2'>
            <h1 className='text-3xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl'>
              The best Apple Watch apps
            </h1>
            <p className='mt-4 text-gray-600 dark:text-gray-300'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia
              asperiores alias vero magnam recusandae adipisci ad vitae
              laudantium quod rem voluptatem eos accusantium cumque.
            </p>
            <div className='mt-6'>
              <a
                href='#'
                className='block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md lg:inline hover:bg-blue-400'
              >
                Download from App Store
              </a>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center w-full h-96 lg:w-1/2'>
          <img
            className='object-cover w-full h-full max-w-2xl rounded-md'
            src='https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            alt='apple watch photo'
          />
        </div>
      </div>{' '}
      <div className='lg:flex'>
        <div className='flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2'>
          <div className='max-w-xl'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl'>
              Build Your New{' '}
              <span className='text-blue-600 dark:text-blue-400'>Idea</span>
            </h2>

            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-base'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Blanditiis commodi cum cupiditate ducimus, fugit harum id
              necessitatibus odio quam quasi, quibusdam rem tempora voluptates.
            </p>

            <div className='flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row'>
              <a
                href='#'
                className='block px-3 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700'
              >
                Get Started
              </a>
              <a
                href='#'
                className='block px-3 py-2 text-sm font-semibold text-center text-gray-700 transition-colors duration-200 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300'
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className='w-full h-64 lg:w-1/2 lg:h-auto'>
          <div className='w-full h-full bg-cover bg-[url("https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80")]'>
            <div className='w-full h-full bg-black opacity-25'></div>
          </div>
        </div>
      </div>
      <section classNameName='bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center'>
        <div classNameName='bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg'>
          <div classNameName='lg:w-1/2'>
            <div classNameName='h-64 bg-cover lg:rounded-lg lg:h-full bg-[url("/sampleImg.jpg")]'></div>
          </div>

          <div classNameName='max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2'>
            <h2 classNameName='text-2xl font-bold text-gray-800 dark:text-white md:text-3xl'>
              Build Your New{' '}
              <span classNameName='text-blue-600 dark:text-blue-400'>Idea</span>
            </h2>
            <p classNameName='mt-4 text-gray-600 dark:text-gray-400'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              modi reprehenderit vitae exercitationem aliquid dolores ullam
              temporibus enim expedita aperiam mollitia iure consectetur dicta
              tenetur, porro consequuntur saepe accusantium consequatur.
            </p>

            <div classNameName='mt-8'>
              <a
                href='#'
                classNameName='px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700'
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>{' '}
    </div>
  );
};

export default PrologueSample;
