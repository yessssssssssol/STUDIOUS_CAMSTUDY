import StopWatch from '../../components/studyroon/StopWatch';
import AIFunc from '../../components/studyroon/AIFunc';
import AlertModal from '../../components/studyroon/AlertModal';

export default function Private() {
  return (
    <div className="w-full">
      <div>
        <StopWatch />
      </div>
      <div>
        {/* <AIFunc /> */}
        <AlertModal />
      </div>
    </div>
  );
}
