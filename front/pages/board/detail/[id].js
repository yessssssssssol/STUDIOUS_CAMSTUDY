import { useRouter } from 'next/router';
import Helmet from '../../../components/layout/Helmet';
import Comments from '../../../components/comment/Comments';

import ProfileCard from '../../../components/common/ProfileCard';
import CertificationList from '../../../components/board/CertificationList';

import { useEffect, useState } from 'react';
import * as API from '../../../pages/api/api';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../core/atoms/userState';

export default function Detail() {
  let tempData = {};
  const currUser = useRecoilValue(userAtom);
  const [applicants, setApplicants] = useState([]);
  const [detailData, setDetailData] = useState();
  const [owner, setOwner] = useState({});
  const [isOwner, setIsOwner] = useState();
  const [isMember, setIsMember] = useState(false);
  const [isApplicants, setIsApplicants] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getBoardDetail() {
      try {
        // 방 데이터 가져오기
        const res = await API.get('studyroom', router.query.id);
        console.log(res, '방 데이터');
        setDetailData(res.data);
        tempData = res.data;

        // 방 만든 사람 정보 가져오기
        const ownerData = await API.get(`user/${res.data.id}`);
        setOwner(ownerData.data);
        const applicantsData = await API.get(`applicants/${tempData.roomId}`);
        setApplicants(applicantsData.data);

        // 스터디방 멤버 정보 가져오기
        // 멤버이면 스터디방 입장하기 버튼 아니면 신청하기 버튼
        const membersRes = await API.get(`studyroom/${tempData.roomId}`);
        const memberList = membersRes.data.members;
        if (memberList.includes(currUser.id)) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (router.isReady) {
      getBoardDetail();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (owner.id === currUser.id) {
      setIsOwner(true);
      console.log('hi');
    } else if (owner.id !== currUser.id) {
      setIsOwner(false);
    }
  }, [owner]);

  const submitHandler = async () => {
    try {
      await API.post(`apply`, {
        roomId: detailData.roomId,
      });
      console.log('신청되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  // 스터디룸 입장
  const enterHandler = () => {
    router.push(`/studyroom/group/${detailData.roomId}`);
  };

  //applicants 명단 확인
  const applicantsCheck = () => {
    if (applicants) {
      console.log(applicants);
      const checkList = applicants.map((applicant) => {
        return applicant.applicantId;
      });
      console.log(checkList);

      if (checkList.length === 0) {
        setIsApplicants(false);
        console.log('hi');
      } else {
        setIsApplicants(true);
        console.log('hello');
      }
    }
  };

  useEffect(() => {
    applicantsCheck();
  }, [applicants]);

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
                    {detailData.roomDesc}
                  </div>

                  <div>
                    {!isMember && (
                      <div className="flex">
                        <button
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={submitHandler}
                          disabled={isApplicants}
                        >
                          스터디 신청하기
                        </button>
                        {isApplicants && (
                          <p className="px-5 py-2.5 mr-2 mb-2 italic font-semibold text-red-500">
                            이미 신청한 스터디입니다.
                          </p>
                        )}
                      </div>
                    )}
                    {isMember && (
                      <button
                        type="button"
                        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={enterHandler}
                      >
                        스터디방 입장하기
                      </button>
                    )}
                  </div>

                  <div className="flex-col w-full">
                    <Comments roomId={detailData.roomId} Id={detailData.id} />
                  </div>
                </div>

                <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                  {owner && (
                    <ProfileCard detailData={detailData} owner={owner} />
                  )}
                  {applicants && (
                    <CertificationList
                      applicants={applicants}
                      isOwner={isOwner}
                    />
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
