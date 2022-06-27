import { useRouter } from 'next/router';
import Helmet from '../../../components/layout/Helmet';
import Comments from '../../../components/comment/Comments';

import ProfileCard from '../../../components/common/ProfileCard';
import Applicants from '../../../components/Application/Applicants';

import { useEffect, useState } from 'react';
import * as API from '../../../pages/api/api';

export default function Detail() {
  const [detailData, setDetailData] = useState();
  const router = useRouter();
  useEffect(() => {
    async function getBoardDetail() {
      try {
        const res = await API.get('studyroom', router.query.id);
        console.log(res, '방 데이터');
        setDetailData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (router.isReady) {
      getBoardDetail();
    }
  }, [router.isReady]);
  return (
    <>
      {detailData && (
        <div>
          <Helmet title="상세페이지" />
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <main className="mt-10">
              <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="px-4 lg:px-0">
                  <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                    {detailData.roomTitle}
                  </h2>
                  <a
                    href="#"
                    className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                  >
                    {detailData.roomDesc}
                  </a>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                  <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
                    Sportsman do offending supported extremity breakfast by
                    listening. Decisively advantages nor expression unpleasing
                    she led met. Estate was tended ten boy nearer seemed. As so
                    seeing latter he should thirty whence. Steepest speaking up
                    attended it as. Made neat an on be gave show snug tore.
                  </div>
                  <div className="flex-col w-full">
                    <Comments roomId={detailData.roomId} Id={detailData.id} />
                  </div>
                </div>

                <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                  <ProfileCard
                    roomId={detailData.roomId}
                    Id={detailData.id}
                    hashTag={detailData.hashTags}
                  />
                  <Applicants roomId={detailData.roomId} Id={detailData.id} />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
