async function getMedia(deviceId) {
    const initialConstraints = {
      audio: true,
      video: { facingMode: 'user' },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      if (navigator.mediaDevices) {
        const myStream = await navigator.mediaDevices.getUserMedia(
          deviceId ? cameraConstraints : initialConstraints
        );
        // if (!deviceId) {
        //     await selectCamera();
        // }
        return myStream;
      } 

    } catch (e) {
      console.log(e);
      return null;
    }
};

async function selectCamera(myStream) {
    try {

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        let currentCamera;

        // 현재 카메라
        
        if (myStream) {
            currentCamera = myStream.getVideoTracks()[0]; 
        }
        // 카메라 선택창 추가
        // cameras.forEach((camera) => {
        //     const option = document.createElement("option")
        //     option.value = camera.deviceId;
        //     option.innerText = camera.label;
        //     if (currentCamera.label === camera.label) {
        //         option.selected = true;
        //     }
        //     camearasSelect.appendChild(option);
        // })

        return currentCamera;

    } catch(e) {
        console.log(e);
    }
}

export {
    getMedia,
    selectCamera,
}