import Helmet from '../../components/layout/Helmet';
import CommentAddForm from '../../components/comment/CommentAddForm';
import ProfileCard from '../../components/common/ProfileCard';
import Temporary from '../../components/comment/CommentsTemporary';

export default function detail() {
  return (
    <div>
      <Helmet title="상세페이지" />
      <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <main class="mt-10">
          <div class="mb-4 md:mb-0 w-full mx-auto relative">
            <div class="px-4 lg:px-0">
              <h2 class="text-4xl font-semibold text-gray-800 leading-tight">
                스터디 같이 하실 분 찾습니다!!!!
              </h2>
              <a
                href="#"
                class="py-2 text-green-700 inline-flex items-center justify-center mb-2"
              >
                스터디원모집/오늘공부자랑 등등...
              </a>
            </div>
          </div>
          <div class="flex flex-col lg:flex-row lg:space-x-12">
            <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
              <p class="pb-6">
                Advantage old had otherwise sincerity dependent additions. It in
                adapted natural hastily is justice. Six draw you him full not
                mean evil. Prepare garrets it expense windows shewing do an. She
                projection advantages resolution son indulgence. Part sure on no
                long life am at ever. In songs above he as drawn to. Gay was
                outlived peculiar rendered led six.
              </p>

              <div class="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
                Sportsman do offending supported extremity breakfast by
                listening. Decisively advantages nor expression unpleasing she
                led met. Estate was tended ten boy nearer seemed. As so seeing
                latter he should thirty whence. Steepest speaking up attended it
                as. Made neat an on be gave show snug tore.
              </div>
              <div class="flex-col w-full">
                <CommentAddForm />
                <Temporary />
                <Temporary />
              </div>
            </div>

            <div class="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
              <ProfileCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
