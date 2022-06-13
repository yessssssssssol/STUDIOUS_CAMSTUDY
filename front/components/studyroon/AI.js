import React from 'react';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import AlertModal from '../common/AlertModal';

class AI extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();

  state = {
    userIsHear: false,
  };
  handleUserIsHear = () => {
    this.setState(() => ({
      userIsHear: true,
    }));
  };

  handleUserIsNotHear = () => {
    this.setState(() => ({
      userIsHear: false,
    }));
  };

  componentDidMount() {
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
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then((values) => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = (predictions) => {
    predictions.forEach((prediction) => {
      if (prediction.class === 'person') {
        console.log('person');
        this.handleUserIsHear();
        console.log(this.state);
      } else {
        console.log('Not person!');
        this.handleUserIsNotHear();
        console.log(this.state);
      }
    });
    if (predictions.length === 0) {
      console.log('No class');
      this.handleUserIsNotHear();
      console.log(this.state);
    }
  };

  render() {
    return (
      <div>
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="600"
          height="500"
        >
          <canvas
            className="size"
            ref={this.canvasRef}
            width="600"
            height="500"
          />
        </video>
        <AlertModal userState={this.state.userIsHear} />
      </div>
    );
  }
}

export default AI;
