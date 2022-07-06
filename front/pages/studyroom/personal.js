import PersonalStopwatch from '../../components/studyroom/PersonalStopwatch';
import AIFunc from '../../components/studyroom/AIFunc';
import AlertModal from '../../components/studyroom/AlertModal';
import { useEffect } from 'react';

export default function Personal() {
  useEffect(() => {
    return () => {
      location.reload();
    };
  }, []);
  return (
    <div className="w-full">
      <div>
        <PersonalStopwatch />
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
