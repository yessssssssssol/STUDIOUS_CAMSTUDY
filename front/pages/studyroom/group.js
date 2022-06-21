import StopWatch from '../../components/studyroon/StopWatch';
import AIFunc from '../../components/studyroon/AIFunc';
import AlertModal from '../../components/studyroon/AlertModal';

export default function Private() {
  return (
    <div>
      <div className="w-full items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div>
            <StopWatch />
          </div>
          <div>
            <AIFunc />
            <AlertModal />
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <div>
            <AIFunc />
          </div>
        </div>
      </div>
      <div>채팅</div>
    </div>
  );
}
