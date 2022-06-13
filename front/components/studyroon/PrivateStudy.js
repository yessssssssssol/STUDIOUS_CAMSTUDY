import AI from './Ai';
import MyWebcam from './MyWebcam';
import StopWatch from './StopWatch';

const PrivateStudy = () => {
  return (
    <div className="flex justify-center">
      {/* <MyWebcam /> */}
      <AI />
      <StopWatch />
    </div>
  );
};

export default PrivateStudy;
