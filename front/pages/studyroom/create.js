import CreateStudyRoom from '../../components/studyroon/create/CreateStudyContent';
import CreateStudyRoomProfile from '../../components/studyroon/create/CreateStudyProfile';

export default function Create() {
  return (
    <div className="flex justify-center">
      <CreateStudyRoomProfile />
      <CreateStudyRoom />
    </div>
  );
}
