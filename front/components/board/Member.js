import { useEffect, useState } from 'react';
import * as API from '../../pages/api/api';

const Member = ({ member, isOwner, roomId }) => {
  // const { userName, roomId, applicantId, userURL } = applicant;
  const [isAccept, setIsAccept] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState();
  console.log(member);

  useEffect(() => {
    // 멤버 정보 가져오기
    async function memberCheck() {
      try {
        const res = await API.get(`user/${member}`);
        const memberInfo = res.data;
        setUserName(memberInfo.name);
        setUserProfile(memberInfo.profileUrl);
        console.log(userName, userProfile);
      } catch (err) {
        console.log(err);
      }
    }
    memberCheck();
  }, [isAccept]);

  const handleReject = () => {
    // 승인 후 거절
    async function deleteMember() {
      try {
        await API.delete(`appliant/${roomId}/${member}`);
        console.log('해당 신청자가 거절되었습니다.');
      } catch (err) {
        console.log(err);
      }
    }
    if (isAccept) {
      deleteMember();
      setIsAccept(false);
    } else {
      reject();
    }
  };

  return (
    <>
      {member && (
        <div className="mt-3 flex space-x-5 overflow-hidden">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src={userProfile}
            alt="신청한사람"
          />
          <div className="mt-2 font-bold">{userName}</div>
          {isOwner && (
            <div class="inline-flex">
              <button
                class="bg-red-200 hover:bg-red-300 text-black font-bold text-sm px-2 rounded"
                onClick={handleReject}
              >
                퇴장
              </button>
            </div>
          )}
          {isAccept && <div className="mt-2 font-bold">승인되었습니다!</div>}
        </div>
      )}
    </>
  );
};

export default Member;
