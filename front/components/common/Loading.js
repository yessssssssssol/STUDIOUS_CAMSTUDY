import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

let myStream

const Loading = ({ cb }) => {

  const [currentCamera, setCurrentCamera] = useState(null);
  const [currentMic, setCurrentMic] = useState(null);

  useEffect(() => {
    selectInit();  
  }, []);

  /**
   * 자신의 media를 찾아 myStream에 전달한다.
   * @param {string} deviceId 
   * @returns null
   */
  const getMedia = async (videoId=null, micId=null) => {
    const initialConstraints = {
      audio: true,
      video: true,
    };
    const cameraConstraints = {
      audio: { deviceId: { exact: micId } },
      video: { deviceId: { exact: videoId } },
    };
    try {
      if (navigator.mediaDevices) {
        myStream = await navigator.mediaDevices.getUserMedia(
          videoId && micId ? cameraConstraints : initialConstraints
        );
      } 

    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * 사용할 카메라를 선택한다.
   * @returns media
   */
   async function selectInit() {
    const camearasSelect = document.getElementById("cameras");
    const micsSelect = document.getElementById("mics");
    try {

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        const mics = devices.filter(device => device.kind === "audioinput");

        // 현재 카메라
        //  카메라 선택창 추가
        cameras.forEach((camera) => {
            const option = document.createElement("option")
            option.value = camera.deviceId;
            option.innerText = camera.label;
            camearasSelect.appendChild(option);
        })

        mics.forEach((mic) => {
          const option = document.createElement("option")
          option.value = mic.deviceId;
          option.innerText = mic.label;
          micsSelect.appendChild(option);
      })

    } catch(e) {
        console.log(e);
    }
  }

  /**
   * 사용할 카메라를 선택한다.
   * @returns media
   */
  // async function selectCamera() {
  //   const camearasSelect = document.getElementById("cameras");
  //   try {

  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const cameras = devices.filter(device => device.kind === "videoinput");
  //       let currentCamera;

  //       // 현재 카메라
        
  //       if (myStream) {
  //           currentCamera = myStream.getVideoTracks()[0]; 
  //       }
  //       //  카메라 선택창 추가
  //       cameras.forEach((camera) => {
  //           const option = document.createElement("option")
  //           option.value = camera.deviceId;
  //           option.innerText = camera.label;
  //           if (currentCamera.label === camera.label) {
  //               option.selected = true;
  //           }
  //           camearasSelect.appendChild(option);
  //       })

  //       return currentCamera;

  //   } catch(e) {
  //       console.log(e);
  //   }
  // }

  /**
   * 카메라 선택창의 클릭 이벤트 함수
   */
  async function CameraSelectClick() {
    const camearasSelect = document.getElementById("cameras");
    setCurrentCamera(camearasSelect.value);
    console.log(camearasSelect.value);
  }

  /**
   * 카메라 선택창의 클릭 이벤트 함수
   */
   async function MicSelectClick() {
    const micsSelect = document.getElementById("mics");
    setCurrentMic(micsSelect.value);
    console.log(micsSelect.value);
  }

  async function settingHandle() {
    await getMedia(currentCamera, currentMic);
    cb(myStream);
  }

  return (
    <div className="w-full h-screen flex text-center justify-center items-center">
      <div className='flex-col '>
        <svg
          role="status"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <p className="text-lg text-gray-800  font-bold my-5">
          카메라와 마이크를 선택해주세요.
        </p>
        <select id="cameras" onClick={CameraSelectClick}></select>
        <select id="mics" onClick={MicSelectClick}></select>
        <div>
          <button onClick={settingHandle}>선택완료</button>
        </div>
      </div>
      
    </div>
  );
  }

export default Loading;
