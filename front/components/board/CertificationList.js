import Certification from './Certification';

const CertificationList = ({ applicants, isOwner }) => {
  return (
    <div className=" rounded-lg p-3 my-5 shadow-lg">
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
