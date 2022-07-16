import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { aiAtom } from '../../core/atoms/aiState';
import { FaRobot } from 'react-icons/fa';

const AIFunc = (props) => {
  let person = false;
  let falseList = [];
  let trueList = [];
  const videoRef = useRef();
  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);

  // trueList에 true가 50번 찍히면 타이머 자동 재시작, trueList reset
  const trueCheck = () => {
    if (trueList.length > 100) {
      setUserIsHear(true);
      props.cb(true);
      trueList = [];
    }
  };

  //falseList에 false가 연속으로 50번 찍히면 타이머 자동 멈춤, trueList reset
  const falseCheck = () => {
    if (falseList.length > 100) {
      if (userIsHear !== false) {
        setUserIsHear(false);
        props.cb(false);
      }
      falseList = [];
    }
  };

  async function init() {
    const model = await cocoSsd.load();
    console.log(model);
    detectFrame(props.camera.current, model);
  }

  useEffect(() => {
    console.log(props.isGroup);
    if (props.isGroup === true) {
      console.log('ai cameracheck :', props.camera);
      init();
    } else {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const webCamPromise = navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: 'user',
            },
          })
          .then((stream) => {
            //window.stream = stream;
            console.log(videoRef);
            videoRef.current.srcObject = stream;
            return new Promise((resolve, reject) => {
              videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            });
          });
        const modelPromise = cocoSsd.load();
        console.log(webCamPromise);
        Promise.all([modelPromise, webCamPromise])
          .then((values) => {
            detectFrame(videoRef.current, values[0]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);

  const detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      renderPredictions(predictions);
      requestAnimationFrame(() => {
        detectFrame(video, model);
      });
    });
  };

  /**
   * 사람이 있을 때는 trueList에 true를 push, falseList reset
   * 사람이 없을 때는 falseList에 false를 push
   */
  const renderPredictions = (predictions) => {
    predictions.forEach((prediction) => {
      if (prediction.class === 'person') {
        person = true;
        trueList.push(true);
        trueCheck();
        //falseList = [];
      } else {
        person = false;
        falseList.push(false);
        falseCheck();
        //trueList = [];
      }
    });
    if (predictions.length === 0) {
      person = false;
      falseList.push(false);
      //trueList = [];
      falseCheck();
    }
  };

  return (
    <>
      {props.isGroup === false ? (
        <div className="w-full flex justify-center item-center rounded-xl border-2 border-amber-400 shadow-2xl shadow-amber-400/50">
          <video
            className="rounded-xl object-cover"
            autoPlay
            playsInline
            muted
            ref={videoRef}
            width="100%"
            height="100%"
          ></video>
        </div>
      ) : (
        <>
          <div className="absolute bottom-[-6px] w-[100%] h-[45px] bg-black opacity-50 rounded-b-xl"></div>
          <div className="absolute bottom-[-6px] left-[16px]">
            <FaRobot color="#FFFFFF" size="30" style={{ marginBottom: 10 }} />
          </div>
        </>
      )}
    </>
  );
};

export default AIFunc;
