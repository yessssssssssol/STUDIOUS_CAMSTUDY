import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { aiAtom } from '../../core/atoms/aiState';

const AIFunc = (props) => {
  let person = false;
  let falseList = [];
  let trueList = [];
  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);
  const videoRef = useRef();

  // trueList에 true가 50번 찍히면 타이머 자동 재시작, trueList reset
  const trueCheck = () => {
    if (trueList.length > 100) {
      console.log('사람있음', userIsHear);
      setUserIsHear(true);
      props.cb(true);
      trueList = [];
    }
  };

  //falseList에 false가 연속으로 50번 찍히면 타이머 자동 멈춤, trueList reset
  const falseCheck = () => {
    if (falseList.length > 100) {
      if (userIsHear !== false) {
        console.log('사람없음', userIsHear);
        setUserIsHear(false);
        props.cb(false);
      }
      falseList = [];
    }
  };

  useEffect(() => {
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
    // return
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
        console.log('ai true', person);
        trueList.push(true);
        trueCheck();
        //falseList = [];
      } else {
        person = false;
        console.log('ai false', person);
        falseList.push(false);
        falseCheck();
        //trueList = [];
      }
    });
    if (predictions.length === 0) {
      person = false;
      console.log('ai false', person);
      falseList.push(false);
      //trueList = [];
      falseCheck(); 
      
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <video
        className="rounded-xl"
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width="100%"
        height="100%"
      ></video>
    </div>
  );
};

export default AIFunc;
