import Certification from './Certification';

export default function CertificationList({ applicants }) {
  return (
    <div className="bg-blue-100 rounded-lg p-3">
      <div className="flex items-center space-x-2 text-base">
        <h4 className="font-semibold text-slate-900">스터디 신청자</h4>
      </div>
      {applicants.map((applicant, index) => {
        return <Certification key={index} name={applicant.userName} />;
      })}
    </div>
  );
}
