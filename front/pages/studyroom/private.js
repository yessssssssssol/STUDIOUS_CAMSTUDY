import StopWatch from '../../components/studyroom/StopWatch';
import AIFunc from '../../components/studyroom/AIFunc';
import AlertModal from '../../components/studyroom/AlertModal';

export default function Private() {
  return (
    <div className="w-full">
      <div>
        <StopWatch />
      </div>
      <div>
        <AIFunc />
        <AlertModal />
      </div>
    </div>
  );
}
