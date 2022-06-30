import { useRouter } from 'next/router';
import Helmet from '../../../components/layout/Helmet';
import Comments from '../../../components/comment/Comments';

import ProfileCard from '../../../components/common/ProfileCard';
import CertificationList from '../../../components/board/CertificationList';

import { useEffect, useState } from 'react';
import * as API from '../../../pages/api/api';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../core/atoms/userState';
import MemberList from '../../../components/board/MemberList';
import Button from '../../../components/common/Button';

export default function Detail() {
  let tempData = {};
  const currUser = useRecoilValue(userAtom);
  const [applicants, setApplicants] = useState([]);
  const [detailData, setDetailData] = useState();
  const [owner, setOwner] = useState({});
  const [isOwner, setIsOwner] = useState();
  const [isMember, setIsMember] = useState(false);
  const [isApplicants, setIsApplicants] = useState(false);
  const [members, setMembers] = useState([]);
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
        setMembers(memberList);
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
  }, [router.isReady, members]);

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
    getApplicants();
    console.log(applicants);
  };

  const getApplicants = async () => {
    try {
      const res = await API.get(`applicants/${detailData.roomId}`);
      console.log(res.data);
      setApplicants(res.data);
      console.log(applicants);
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

      if (!checkList.includes(currUser.id)) {
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
                  <div className="pt-4 pb-2">
                    {detailData.hashTags.map((tag, index) => {
                      return (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div className="px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`스터디 총 정원: ${detailData.membersNum}`}</div>
                  <div className="inline-block px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`스터디 기간: ${detailData.startStudyDay} ~ ${detailData.endStudyDay}`}</div>
                  <div className="inline-block px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`공부 집중시간: ${detailData.focusTimeStart} ~ ${detailData.focusTimeEnd}`}</div>
                </div>
                <div>
                  <div className="border-l-4 border-gray-500 pl-4 mb-10 italic rounded">
                    {detailData.roomDesc}
                  </div>
                  <div className="mb-6">
                    {!isMember && (
                      <div className="flex">
                        <Button
                          text={'스터디 신청하기'}
                          onClick={submitHandler}
                          disable={isApplicants}
                        />
                        {isApplicants && (
                          <p className="px-5 py-2.5 mr-2 mb-2 italic font-semibold text-red-500">
                            이미 신청한 스터디입니다.
                          </p>
                        )}
                      </div>
                    )}
                    {isMember && (
                      <Button
                        text={'스터디방 입장하기'}
                        onClick={enterHandler}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                  {/* <div>
                    <div className="border-l-4 border-gray-500 pl-4 mb-10 italic rounded">
                      {detailData.roomDesc}
                    </div>
                    <div className="mb-6">
                      {!isMember && (
                        <div className="flex">
                          <Button
                            text={'스터디 신청하기'}
                            onClick={submitHandler}
                            disable={isApplicants}
                          />
                          {isApplicants && (
                            <p className="px-5 py-2.5 mr-2 mb-2 italic font-semibold text-red-500">
                              이미 신청한 스터디입니다.
                            </p>
                          )}
                        </div>
                      )}
                      {isMember && (
                        <Button
                          text={'스터디방 입장하기'}
                          onClick={enterHandler}
                        />
                      )}
                    </div>
                  </div> */}

                  <div className="flex-col w-full">
                    <Comments roomId={detailData.roomId} Id={detailData.id} />
                  </div>
                </div>

                <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                  {owner && <ProfileCard owner={owner} />}
                  {applicants && (
                    <CertificationList
                      applicants={applicants}
                      isOwner={isOwner}
                    />
                  )}
                  {members && (
                    <MemberList
                      members={members}
                      isOwner={isOwner}
                      roomId={detailData.roomId}
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
