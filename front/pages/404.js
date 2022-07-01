import Helmet from "../components/layout/Helmet";

export default function NotFound() {
  return (
    <div>
     <Helmet title="404" />

      <div class="h-screen w-screen bg-amber-50 flex items-center">
        <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div class="max-w-md flex-col">
            <div class="text-7xl text-amber-400 font-bold text-center">404</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.{' '}
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <a href="/">
              <button class="flex px-4 py-2 text-sm font-medium  justify-center leading-5 items-center shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-amber-400 active:bg-amber-400 hover:bg-amber-500">
                의자왕 메인으로
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
