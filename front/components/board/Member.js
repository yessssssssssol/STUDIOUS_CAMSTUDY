import { useEffect, useState } from 'react';
import * as API from '../../pages/api/api';

/**해당 스터디 멤버를 나타내는 컴포넌트
 *
 * @component
 * @param {object} member -멤버 정보
 * @param {string} roomId
 * @param {object} owner - 해당 게시글 주인의 정보
 * @param {boolean} isOwner - 해당 게시글의 주인인지 여부를 알려주는 데이터 true이면 게시글 주인 아니면 false
 */
const Member = ({ member, isOwner, roomId, owner }) => {
  // const { userName, roomId, applicantId, userURL } = applicant;
  const [isAccept, setIsAccept] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState();
  const [ownerId, setOwnerId] = useState(owner.id);

  useEffect(() => {
    // 멤버 정보 가져오기
    async function memberCheck() {
      try {
        const res = await API.get(`user/${member}`);
        const memberInfo = res.data;
        setUserName(memberInfo.name);
        setUserProfile(memberInfo.profileUrl);
      } catch (err) {
        console.log(err);
      }
    }
    memberCheck();
  }, [isAccept]);

  const handleReject = async () => {
    if (member !== ownerId) {
      // 승인 후 거절
      try {
        await API.delete(`appliant/${roomId}/${member}`);
        setIsAccept(false);
        alert('해당 신청자가 거절되었습니다.');
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('방장은 탈퇴할 수 없습니다!');
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
          <div className="mt-2 font-bold flex-1">{userName}</div>
          {isOwner && (
            <div className="inline-flex">
              <button
                className="bg-red-100 hover:bg-red-200 text-gray-800 font-bold text-sm px-2 rounded"
                onClick={handleReject}
              >
                퇴장
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Member;
