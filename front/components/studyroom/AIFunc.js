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
    
    console.log("ai cameracheck :", props.camera);
    init();

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
    <FaRobot color="#ea580c" size="30" style={{ marginBottom: 10 }} />
  );
};

export default AIFunc;
