import {useEffect, useRef, useState, forwardRef, useImperativeHandle} from 'react';
import { GoUnmute, GoMute } from 'react-icons/go';
import StopWatch from '../../components/studyroom/StopWatch';

const Other = forwardRef(({userId, stream, time}, ref) => {

    const idRef = useRef(userId);
    const [isState, setIsState] = useState(true);
    const [isCamera, setIsCamera] = useState(true);
    const [isMute, setIsMute] = useState(false);
        
    const timerRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        console.log("get stream : ", stream);
        videoRef.current.srcObject = stream;
    }, [])

    useEffect(() => {
        if (isState === true) {
            timerRef.current.setPassTime(true);
        }
        else {
            timerRef.current.setPassTime(false);
        }
    }, [isState])

    useImperativeHandle(ref, () => ({
        // 뒤로 가기, 페이지를 나갈때도 timelogFunc 실행
        setState(id, state) {
            console.log("set state : ", state);
            console.log("set Id : ", id);
            console.log("owner Id : ", idRef.current);
            if (idRef.current === id) {
                setIsState(state);
            }
        },
        setCamera(id, camera) {
            console.log("set camera : ", camera);
            console.log("set Id : ", id);
            console.log("owner Id : ", idRef.current);
            if (idRef.current === id) {
                setIsCamera(camera);
            }
        },
        setMute(id, mute) {
            console.log("set mute : ", mute);
            console.log("set Id : ", id);
            console.log("owner Id : ", idRef.current);
            if (idRef.current === id) {
                setIsMute(mute);
            }
        }
    }));

    return (
        <div className="bg-yellow-50/30 w-[500px] h-[370px] relative rounded-xl border-amber-100 border-2 shadow-2xl shadow-amber-400/10 ">
            <StopWatch myTimer={false} 
                ref={timerRef}
                userT={time}
            />
            <div className="w-full flex justify-center ">
                <video className="rounded-xl" width="100%" height="100%" muted autoPlay playsInline ref={videoRef}></video>
                {
                    isCamera ? <></>
                    : isState ? <img className="absolute w-[100%] h-[100%]" src={`/work.png`} ></img> 
                    : <img className="absolute w-[100%] h-[100%]" src={`/sleep.png`} ></img>
                }
            </div>
            <div className="absolute bottom-[5px] left-[8px]">
                {
                    isMute ? <GoMute color="#ea580c" size="30" /> : <GoUnmute color="#ea580c" size="30" />
                }
            </div>
            
        </div>
    )
})


export default Other;