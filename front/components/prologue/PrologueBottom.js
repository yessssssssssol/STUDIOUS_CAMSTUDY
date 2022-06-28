const PrologueBottom = () => {
  return (
    <div>
      <section className="bg-gray-100  lg:py-12 lg:flex lg:justify-center">
        <div className="bg-white  lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
          <div className="lg:w-1/2">
            <div className='h-64 bg-cover lg:rounded-lg lg:h-full bg-[url("/sampleImg.jpg")]'></div>
          </div>

          <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">
              Build Your New
              <span className="text-blue-600 ">Idea</span>
            </h2>
            <p className="mt-4 text-gray-600 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              modi reprehenderit vitae exercitationem aliquid dolores ullam
              temporibus enim expedita aperiam mollitia iure consectetur dicta
              tenetur, porro consequuntur saepe accusantium consequatur.
            </p>

            <div className="mt-8">
              <a
                href="#"
                className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrologueBottom;
