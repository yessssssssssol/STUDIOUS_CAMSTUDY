import { useRef } from 'react';

const MyWebcam = () => {
  const CONSTRAINTS = { video: true };

  const videoRef = useRef(null);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  return (
    <div className="flex justify-center">
      <video className="" autoPlay ref={videoRef} />
      <button onClick={startVideo}>start</button>
    </div>
  );
};

export default MyWebcam;
