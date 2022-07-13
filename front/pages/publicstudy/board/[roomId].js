import { RiEdit2Fill } from 'react-icons/ri';
import { BsTrashFill } from 'react-icons/bs';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../core/atoms/userState';
import Helmet from '../../../components/layout/Helmet';
import * as API from '../../api/api';

import ProfileCard from '../../../components/common/ProfileCard';
import Comments from '../../../components/comment/Comments';
import SmallModal from '../../../components/common/SmallModal';
import Button from '../../../components/common/Button';
import DeleteModal from '../../../components/common/DeleteModal';

const OpenRoomBoard = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const currUser = useRecoilValue(userAtom);
  const [roomInfo, setRoomInfo] = useState({});
  const [owner, setOwner] = useState({});
  const [isOwner, setIsOwner] = useState();
  const [isFullMembers, setIsFullMembers] = useState(false);
  const [show, setShow] = useState(false);
  const [hashTags, setHashTags] = useState([]);
  const modalTitle = 'Oops!';
  const modalChildren =
    '해당 스터디는 현재 정원이 초과되어 입장이 불가능합니다.';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getRoomInfo = async () => {
      try {
        //방정보 가져오기
        const res = await API.get(`studyroom/${roomId}`);
        setRoomInfo(res.data);
        setHashTags(res.data.hashTags);

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
      await API.put(`headcount`, {
        roomId,
        attend: true,
      });
      router.push(`/studyroom/group/${roomId}`);
    } else {
      setShow(true);
    }
  };

  const modalShowHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (owner.id === currUser.id) {
      setIsOwner(true);
    } else if (owner.id !== currUser.id) {
      setIsOwner(false);
    }
  }, [owner]);

  return (
    <>
      {roomInfo && (
        <div>
          <Helmet title="상세페이지" />
          <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <main className="mt-5 mb-4 md:mb-0 w-full mx-auto relative">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {roomInfo.roomTitle}
              </h2>

              <div className="mb-4 md:mb-0 w-full mx-auto relative flex gap-x-20 gap-y-4">
                <div className="flex flex-col gap-y-12 flex-1">
                  <div className="flex flex-col gap-y-2">
                    <div className="pt-4 pb-2 flex">
                      <div className="flex-1">
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
                      {isOwner && (
                        <section className="flex items-center gap-x-2 mr-[30px] font-bold">
                          <Link href={`/studyroom/edit/${roomInfo.roomId}`}>
                            <a className="cursor-pointer">
                              <RiEdit2Fill size="24" color="#fbbf24" />
                            </a>
                          </Link>
                          <button onClick={modalShowHandler}>
                            <BsTrashFill size="24" color="#fbbf24" />
                          </button>
                          {open && (
                            <DeleteModal
                              myroomInfo={roomInfo}
                              setShow={setOpen}
                              isBoard={true}
                              title={'해당 스터디를 지우시겠습니까?'}
                            />
                          )}
                        </section>
                      )}
                    </div>
                    <div>
                      <div className="px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`스터디 총 정원: ${roomInfo.membersNum}`}</div>
                      <div className="inline-block px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`스터디 기간: ${roomInfo.startStudyDay} ~ ${roomInfo.endStudyDay}`}</div>
                      <div className="inline-block px-3 py-1 font-bold text-gray-700 mr-2 mb-2">{`공부 집중시간: ${roomInfo.focusTimeStart} ~ ${roomInfo.focusTimeEnd}`}</div>
                    </div>
                    <div className="border-l-4 text-xl shadow-md border-gray-500 pl-4 p-4  rounded w-full border-r-4 ">
                      {roomInfo.roomDesc}
                    </div>
                  </div>
                  <div>
                    <Button text={'스터디 입장하기'} onClick={enterHandler} />
                  </div>
                </div>
                <div>{owner && <ProfileCard owner={owner} />}</div>
              </div>
              <div className="flex-col w-full py-12">
                <Comments roomId={roomInfo.roomId} Id={roomInfo.id} />
              </div>
            </main>
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
