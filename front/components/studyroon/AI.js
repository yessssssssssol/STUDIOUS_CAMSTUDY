import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import AlertModal from '../common/AlertModal';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { aiAtom } from '../../core/atoms/aiState';

const AIFunc = () => {
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
        setUserIsHear(true);
        console.log('person', userIsHear);
      } else {
        setUserIsHear(false);
        console.log('Not person!', userIsHear);
      }
    });
    if (predictions.length === 0) {
      setUserIsHear(false);
      console.log('No class', userIsHear);
    }
  };

  return (
    <div>
      <video
        className="size"
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width="600"
        height="500"
      >
        <canvas className="size" ref={canvasRef} width="600" height="500" />
      </video>
      <AlertModal />
    </div>
  );
};

export default AIFunc;
