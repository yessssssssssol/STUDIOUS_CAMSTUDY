import * as API from '../../pages/api/api';
import ApplicantCard from './ApplicantCard';
import ApplicantAddForm from './ApplicantAddForm';
import { useState, useEffect } from 'react';

function Applicants({ roomId, applicantId }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // "applicants/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
    API.get('applicants', roomId).then((res) => setApplicants(res.data));
  }, [roomId]);

  return (
    <div>
      <div>
        <div>Applicants</div>
        <ApplicantAddForm
          roomId={roomId}
          setApplicants={setApplicants}
          applicantId={applicantId}
        />
        {applicants.map((applicant) => (
          <ApplicantCard
            roomId={roomId}
            applicantId={applicants.applicantId}
            key={applicant.id}
            applicant={applicant}
            setApplicants={setApplicants}
          />
        ))}
      </div>
    </div>
  );
}

export default Applicants;
