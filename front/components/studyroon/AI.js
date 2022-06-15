import useInterval from 'use-interval';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import AlertModal from '../common/AlertModal';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { aiAtom } from '../../core/atoms/aiState';

const AIFunc = () => {
  const userRef = useRef(false);
  const [userIsHear, setUserIsHear] = useRecoilState(aiAtom);
  const videoRef = useRef();
  const canvasRef = useRef();

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
          window.stream = stream;
          videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then((values) => {
          detectFrame(videoRef.current, values[0]);
        })
        .catch((error) => {
          console.error(error);
        });
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

  const renderPredictions = (predictions) => {
    predictions.forEach((prediction) => {
      if (prediction.class === 'person') {
        userRef = true;
        console.log(userRef);
      } else {
        userRef = false;
      }
    });
    if (predictions.length === 0) {
      userRef = false;
      console.log(userRef);
    }
  };

  const delay = 30000; // 30초

  useInterval(() => {
    if (userRef === true) {
      setUserIsHear(true);
      console.log('공부중', userIsHear);
    } else {
      setUserIsHear(false);
      console.log('자리비움', userIsHear);
    }
  }, [delay]);

  return (
    <div className="w-full py-10 flex justify-center ">
      <video
        // className="w-screen h-full"
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width="600"
        height="500"
      >
        <canvas
          // className="w-screen h-full"
          ref={canvasRef}
          width="600"
          height="500"
        />
      </video>
      <AlertModal userRef={userRef} />
    </div>
  );
};

export default AIFunc;
