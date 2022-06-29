import StopWatch from '../../components/studyroom/StopWatch';
import AIFunc from '../../components/studyroom/AIFunc';
import AlertModal from '../../components/studyroom/AlertModal';

export default function Private() {
  const width = 600;
  const height = 500;
  return (
    <div className="w-full">
      <div>
        <StopWatch />
      </div>
      <div>
        <AIFunc width={width} height={height} />
        <AlertModal />
      </div>
    </div>
  );
}
