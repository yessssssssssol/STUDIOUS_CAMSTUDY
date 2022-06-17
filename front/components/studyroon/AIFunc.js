import useInterval from 'use-interval';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { aiAtom } from '../../core/atoms/aiState';

const AIFunc = () => {
  let person = false;
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
        person = true;
        console.log(person);
      } else {
        person = false;
      }
    });
    if (predictions.length === 0) {
      person = false;
      console.log(person);
    }
  };

  let studylist = [];
  const delay = 10000; // 30초

  useInterval(() => {
    if (person === true) {
      console.log('공부중', userIsHear);
      studylist = [];
      console.log(studylist);
    } else {
      studylist.push(false);
      console.log('자리비움', userIsHear);
      console.log(studylist);
      if (studylist.length === 5) {
        setUserIsHear(false);
        console.log(userIsHear);
        console.log('안녕');
        studylist = [];
      }
    }
  }, [delay]);

  return (
    <div className="w-full py-10 flex justify-center ">
      <video autoPlay playsInline muted ref={videoRef} width="600" height="500">
        <canvas ref={canvasRef} width="600" height="500" />
      </video>
    </div>
  );
};

export default AIFunc;
