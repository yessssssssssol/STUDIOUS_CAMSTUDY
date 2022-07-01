import StopWatchPrivate from '../../components/studyroom/StopWatchPrivate';
import AIFunc from '../../components/studyroom/AIFunc';
import AlertModal from '../../components/studyroom/AlertModal';

export default function Private() {
  return (
    <div className="w-full">
      <div>
        <StopWatchPrivate />
      </div>
      <div className="flex justify-center items-center w-full h-full ">
        <div className="w-[850px] h-full items-center justify-center rounded-xl m-4 ">
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
