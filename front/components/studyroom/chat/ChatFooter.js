import { GoUnmute, GoMute } from 'react-icons/go';
import {
  TbDeviceComputerCamera,
  TbDeviceComputerCameraOff,
} from 'react-icons/tb';

/**
 * @component
 * @description 그룹 스터디룸에서 채팅창 하단 옵션들
 * @param {boolean} isCamera - 카메라 on/off
 * @param {boolean} isMute - 마이크 on/off
 * @param {function} CameraOnOffClick - 카메라 on/off 이벤트 버튼 함수
 * @param {function} MuteBtnClick - 마이크 on/off 이벤트 버튼 함수
 * @param {function} rtcInit - 전역변수 초기화
 */
const ChatFooter = ({
  isCamera,
  isMute,
  CameraOnOffClick,
  MuteBtnClick,
  stopWatchRef,
  rtcInit,
}) => {
  return (
    <div className="flex justify-between px-3">
      <div className="flex items-center">
        {/* 카메라 on/off */}
        <button id="cameraBtn" className="mx-2" onClick={CameraOnOffClick}>
          {isCamera == true ? (
            <TbDeviceComputerCamera
              color="#ea580c"
              size="30"
              style={{ marginBottom: 10 }}
            />
          ) : (
            <TbDeviceComputerCameraOff
              color="#ea580c"
              size="30"
              style={{ marginBottom: 10 }}
            />
          )}
        </button>
        {/* 마이크 on/off */}
        <button id="muteBtn" onClick={MuteBtnClick}>
          {isMute == true ? (
            <GoMute color="#ea580c" size="30" style={{ marginBottom: 10 }} />
          ) : (
            <GoUnmute color="#ea580c" size="30" style={{ marginBottom: 10 }} />
          )}
        </button>
      </div>
      {/* 나가기 */}
      <button
        className="py-2.5 px-2.5 mr-2 mb-2 text-sm font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border shadow-lg border-gray-200 hover:text-white hover:bg-amber-400 hover:shadow-amber-300/50 focus:z-10 focus:ring-4 focus:ring-gray-200"
        onClick={() => {
          rtcInit();
          stopWatchRef.current.handleClick();
        }}
      >
        {' '}
        나가기{' '}
      </button>
    </div>
  );
};

export default ChatFooter;
