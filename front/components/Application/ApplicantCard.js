import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../../pages/api/api';

function ApplicantCard({ roomId, applicantId, applicant, setApplicants }) {
  const [user, setUser] = useRecoilState(userAtom);
  const { name, description, profileUrl } = user;

  const handleDelete = async (e) => {
    //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
    e.preventDefault();
    // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
    e.stopPropagation();

    // apply.id로 조회하여 데이터 삭제(신청자 거절/ 신청 취소)
    await API.delete(`apply/${apply.roomId}/${apply.applicantId}`);

    // "applicants/:roomId" 엔드포인트로 GET 요청함.
    const res = await API.get('applicants', roomId);

    setApplicants(res.data);
  };

  return (
    <div className="my-2 mx-1  w-20 flex-cum  rounded-md bg-white p-2 text-black shadow">
      <div className="mt-2">
        <img
          className="w-16 rounded-full shadow"
          src={apply.userInfo.profileUrl}
          alt="신청자 사진"
        />
      </div>
      <div className="flex">
        <div className="flex flex-row items-center justify-between py-1 pr-2">
          <div>
            <a href="#" className="text-blue-400 ">
              {apply.userName}
            </a>
          </div>
          <button onClick={handleDelete} className=" mr-3 align-items-center">
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantCard;
