const MyWebcam = () => {
  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  return (
    <div className='flex justify-center'>
      <video className='w-screen h-screen' autoPlay />
    </div>
  );
};

export default MyWebcam;
