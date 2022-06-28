import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Helmet from '../../../components/layout/Helmet';
import * as API from '../../api/api';

import ProfileCard from '../../../components/common/ProfileCard';
import Comments from '../../../components/comment/Comments';
import SmallModal from '../../../components/common/SmallModal';

const OpenRoomBoard = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [roomInfo, setRoomInfo] = useState({});
  const [owner, setOwner] = useState({});
  const [isFullMembers, setIsFullMembers] = useState(false);
  const [show, setShow] = useState(false);
  let hashTags = [];
  const modalTitle = 'Oops!';
  const modalChildren =
    '해당 스터디는 현재 정원이 초과되어 입장이 불가능합니다.';

  useEffect(() => {
    const getRoomInfo = async () => {
      try {
        //방정보 가져오기
        const res = await API.get(`studyroom/${roomId}`);
        setRoomInfo(res.data);
        hashTags = res.data.hashTags;

        // 방 만든 사람 정보 가져오기
        const ownerData = await API.get(`user/${res.data.id}`);
        setOwner(ownerData.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (router.isReady) {
      getRoomInfo();
    }
  }, [router.isReady]);

  const checkHeadCount = async () => {
    try {
      const res = await API.get(`studyroom/${roomId}`);
      const headCount = res.data.headCount;
      if (headCount.length >= roomInfo.membersNum) {
        setIsFullMembers(true);
      } else {
        setIsFullMembers(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const enterHandler = async () => {
    checkHeadCount();
    if (!isFullMembers) {
      router.push(`/studyroom/group/${roomId}`);
    } else {
      setShow(true);
      console.log('정원초과입니다.');
    }
  };

  return (
    <>
      {roomInfo && (
        <div>
          <Helmet title="상세페이지" />
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
              <div className="px-4 lg:px-0">
                <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                  {roomInfo.roomTitle}
                </h2>
                <div className="pt-4 pb-2">
                  {hashTags.map((tag, index) => {
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
                <div className="px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`스터디 총 정원: ${roomInfo.membersNum}`}</div>
                <div className="inline-block px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`스터디 기간: ${roomInfo.startStudyDay} ~ ${roomInfo.endStudyDay}`}</div>
                <div className="inline-block px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`공부 집중시간: ${roomInfo.focusTimeStart} ~ ${roomInfo.focusTimeEnd}`}</div>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                  <div className="border-l-4 border-gray-500 pl-4 italic rounded">
                    {roomInfo.roomDesc}
                  </div>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-12 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={enterHandler}
                    disabled={isFullMembers}
                  >
                    스터디 입장하기
                  </button>
                </div>
                <div className="w-full lg:w-1/4  max-w-screen-sm">
                  {owner && <ProfileCard owner={owner} />}
                </div>
              </div>
              <div className="flex-col w-full">
                <Comments roomId={roomInfo.roomId} Id={roomInfo.id} />
              </div>
            </div>
            {show && (
              <SmallModal
                setShow={setShow}
                title={modalTitle}
                children={modalChildren}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OpenRoomBoard;
