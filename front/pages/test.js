import AlertModal from '../components/common/AlertModal';
import AI from '../components/studyroon/AI';
import StopWatch from '../components/studyroon/StopWatch';

/**
 * 웹캠으로 사람이 있는지 없는지 체크한다.
 * 사람이 없으면? 모달창을 띄운다
 * 모달 확인을 누르지 않으면 타이머를 멈춘다
 * 타이머가 멈출때마다 구간 기록을 한다.
 * 모달 확인을 누르고 카메라에 다시 사람이 인식되면 타이머가 시작된다.
 * 모달 확인은 눌렀지만 카메라에 사람이 인식이 안되면 타이머는 어떻게...???
 * 사용자가 화면을 떠나면 타이머를 종료하고 최종 시간을 저장한다.
 */
export default function Test() {
  return (
    <div className="w-full">
      <div>
        <StopWatch />
      </div>
      <div>
        {/* <AI /> */}
        <AlertModal />
      </div>
    </div>
  );
}
