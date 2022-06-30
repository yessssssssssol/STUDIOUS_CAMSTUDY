import StopWatchPrivate from '../../components/studyroom/StopWatchPrivate';
import AIFunc from '../../components/studyroom/AIFunc';
import AlertModal from '../../components/studyroom/AlertModal';

export default function Private() {
  return (
    <div className="w-full">
      <div>
        <StopWatchPrivate />
      </div>
      <div className="grid justify-center items-center bg-green-200 w-full ">
        <div className="w-[350px] h-[262px] items-center bg-yellow-200 lg:w-[600px] lg:h-[450px] rounded-xl ">
          <AIFunc
            cb={() => {
              {
                null;
              }
            }}
          />
          <AlertModal />
        </div>
      </div>
    </div>
  );
}
