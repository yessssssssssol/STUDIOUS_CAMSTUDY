import Certification from './Certification';

/**신청자 목록을 나타내는 컴포넌트
 *
 * @component
 * @param {object} applicants -신청자 정보
 * @param {boolean} isOwner - 해당 게시글의 주인인지 여부를 알려주는 데이터 true이면 게시글 주인 아니면 false
 */
const CertificationList = ({ applicants, isOwner }) => {
  return (
    <div className=" rounded-lg p-3 my-5 m-4 shadow-lg">
      <div className="flex items-center space-x-2 text-base">
        <h4 className="font-bold text-slate-900">스터디 신청자</h4>
      </div>
      <div>
        {applicants.map((applicant, index) => {
          return (
            <Certification
              key={index}
              applicant={applicant}
              isOwner={isOwner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CertificationList;
