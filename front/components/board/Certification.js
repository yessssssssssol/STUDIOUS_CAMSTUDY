import { useEffect, useState } from 'react';
import * as API from '../../pages/api/api';

/**해당 스터디 신청자를 나타내는 컴포넌트
 *
 * @component
 * @param {object} applicant -멤버 정보
 * @param {boolean} isOwner - 해당 게시글의 주인인지 여부를 알려주는 데이터 true이면 게시글 주인 아니면 false
 */
const Certification = ({ applicant, isOwner }) => {
  const { userName, roomId, applicantId, userURL } = applicant;
  const [isAccept, setIsAccept] = useState(false);
  const [memberList, setMemberList] = useState('');
  const [membersNum, setMembersNum] = useState(0);
  const [memberInfo, setMemberInfo] = useState({});

  useEffect(() => {
    async function memberCheck() {
      try {
        const res = await API.get(`studyroom/${roomId}`);
        const memberList = res.data.members;
        setMembersNum(res.data.membersNum);
        setMemberList(memberList);
        if (memberList.includes(applicantId)) {
          setIsAccept(true);
        } else {
          setIsAccept(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    memberCheck();
  }, [isAccept]);

  const handleAccept = () => {
    async function accept() {
      try {
        await API.put(`apply/check`, {
          roomId,
          applicantId,
        });
        alert('해당 신청자가 승인되었습니다.');
      } catch (err) {
        console.log(err);
      }
    }
    // 현재 사용자 리스트의 length가 membersNum보다 작을 때만 수락한다.
    if (memberList.length < membersNum) {
      console.log(memberList.length);
      console.log(membersNum);
      accept();
      getMembers();
    } else {
      console.log(memberList.length);
      console.log(membersNum);
      alert('신청이 완료된 스터디입니다.');
    }
  };

  const getMembers = async () => {
    try {
      const members = await API.get(`studyroom/${roomId}`);
      setMemberInfo(members);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = () => {
    // 그냥 거절
    async function rejectMember() {
      try {
        await API.delete(`apply/${roomId}/${applicantId}`);
        alert('해당 신청자가 거절되었습니다.');
      } catch (err) {
        console.log(err);
      }
      getMembers();
    }
    // 승인 후 거절
    async function deleteMember() {
      try {
        await API.delete(`appliant/${roomId}/${applicantId}`);
        alert('해당 신청자가 거절되었습니다.');
      } catch (err) {
        console.log(err);
      }
    }
    if (isAccept) {
      deleteMember();
      setIsAccept(false);
    } else {
      rejectMember();
    }
  };

  useEffect(() => {}, [memberInfo]);

  return (
    <>
      {applicant && (
        <div className="mt-3 flex space-x-5 overflow-hidden">
          <img
            className=" inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src={userURL}
            alt="신청한사람"
          />
          <div className="flex-1 mt-2 font-bold">{userName}</div>
          {isOwner && (
            <div className="inline-flex">
              <button
                className="bg-blue-100 hover:bg-blue-200 text-gray-800  font-bold text-sm px-2 rounded-l"
                onClick={handleAccept}
              >
                수락
              </button>
              <button
                className="bg-red-100 hover:bg-red-200 text-gray-800  font-bold text-sm px-2 rounded-r"
                onClick={handleReject}
              >
                거절
              </button>
            </div>
          )}
          {isAccept && <div className="mt-2 font-bold">승인되었습니다!</div>}
        </div>
      )}
    </>
  );
};

export default Certification;
