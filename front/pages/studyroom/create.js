import CreateStudyRoom from '../../components/studyroon/CreateStudyRoom';
import CreateStudyRoomProfile from '../../components/studyroon/CreateStudyRoomProfile';

export default function Create() {
  return (
    <div className="flex justify-center">
      <CreateStudyRoomProfile />
      <CreateStudyRoom />
    </div>
  );
}
