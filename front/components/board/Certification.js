import { useEffect, useState } from 'react';
import * as API from '../../pages/api/api';

const Certification = ({ applicant, isOwner }) => {
  const { userName, roomId, applicantId, userURL } = applicant;
  const [isAccept, setIsAccept] = useState(false);

  useEffect(() => {
    async function memberCheck() {
      try {
        const res = await API.get(`studyroom/${roomId}`);
        const memberList = res.data.members;
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
        console.log('해당 신청자가 승인되었습니다.');
      } catch (err) {
        console.log(err);
      }
    }
    accept();
    getMembers();
  };

  const getMembers = async () => {
    try {
      await API.get(`studyroom/${roomId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = () => {
    // 그냥 거절
    async function rejectMember() {
      try {
        await API.delete(`apply/${roomId}/${applicantId}`);
        console.log('해당 신청자가 거절되었습니다.');
      } catch (err) {
        console.log(err);
      }
      getMembers();
    }
    // 승인 후 거절
    async function deleteMember() {
      try {
        await API.delete(`appliant/${roomId}/${applicantId}`);
        console.log('해당 신청자가 거절되었습니다.');
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
            <div class="inline-flex">
              <button
                class="bg-blue-100 hover:bg-blue-200 text-gray-800  font-bold text-sm px-2 rounded-l"
                onClick={handleAccept}
              >
                수락
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-gray-800  font-bold text-sm px-2 rounded-r"
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
