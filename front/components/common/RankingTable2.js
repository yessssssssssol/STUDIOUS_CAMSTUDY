import { useState, useRef } from 'react';

export default function RankingTable({ rankings, userDatas }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(true);
  const box = useRef();

  const height = box.current?.className.split(' ')[7];
  // const css = bsx.current?.style.console.log(height);

  // function handleBox() {
  //   const height = box.current.className.split(' ')[7];
  //   console.log(box.current);
  //   console.log(height);
  //   if (height === 'h-190') {
  //     setTimeout(() => {
  //       setDone(true);
  //     }, 780);
  //   } else {
  //     setDone(false);
  //   }
  // }

  function handleDone() {
    if (open) {
      setTimeout(() => {
        setDone(true);
      }, 780);
    } else {
      setDone(false);
      setTimeout(() => {
        setDone(false);
      }, 780);
    }
  }

  function rankAr() {
    console.log(done);
    let margin = undefined;
    if (done === false) {
      margin = 'mb-2';
    } else if (done === true) {
      margin = 'mb-14';
    }

    const rankChart = rankings.map((ranking, index) => {
      const user = userDatas.find(
        (userData) => userData.id === ranking.user_id
      );
      const css =
        'flex flex-row h-14 items-center mx-10 my-3 rounded-xl shadow shadow-amber-700/20';
      let color = undefined;
      let medal = undefined;
      if (index === 0) {
        color = ' bg-amber-100';
        medal = 'gold.png';
      } else if (index === 1) {
        color = ' bg-amber-50';
        medal = 'silver.png';
      } else if (index === 2) {
        color = ' bg-amber-50';
        medal = 'bronze.png';
      } else {
        color = ' bg-amber-50';
        medal = 'noneMedal.png';
      }

      return (
        <div key={index} className={`${css} ${color} ${margin}`}>
          <div className="font-semibold basis-1/12 text-center">
            {index + 1}
          </div>
          <div className="font-semibold basis-1/12 text-center flex justify-center items-center">
            <img className="w-10 h-10 mr-5" src={medal}></img>
            <img
              className="rounded-full bg-amber-400 w-10 h-10"
              src={user?.profileUrl}
            />
          </div>
          <div className="font-semibold basis-2/12 pl-10 truncate">
            {user?.name}
          </div>
          <div className="basis-5/12 text-center ml-10 truncate">
            {user?.description}
          </div>
          <div className="font-semibold basis-3/12 text-center pl-10 truncate">
            {ranking.totalTime}
          </div>
        </div>
      );
    });
    return rankChart;
  }

  //여기서 부터 렌더링입니다.
  return (
    <div
      className={`w-4/5 justify-center bg-white rounded-2xl shadow-lg overflow-hidden duration-1000 ${
        open ? 'h-190 ' : 'h-40 '
      }`}
      ref={box}
    >
      {/* index */}
      <div className="flex flex-row h-14 items-center px-10 py-2">
        <div className="font-semibold basis-1/12 text-center pl-3">Ranking</div>
        <div className="font-semibold basis-1/12 text-center"></div>
        <div className="font-semibold basis-2/12 pl-10">Name</div>
        <div className="font-semibold basis-5/12 text-center ml-10">
          한 줄 소개
        </div>
        <div className="font-semibold basis-3/12 text-center pl-20">
          TotalTime
        </div>
        <div className="animate-bounce ">
          <button
            className={`mt-2 duration-700 ${open ? 'rotate-180' : ''} `}
            onClick={() => {
              setOpen((bool) => !bool);
              handleDone();
              // handleBox();
            }}
          >
            <img className="w-8 h-8" src="/dropDown.png"></img>
          </button>
        </div>
      </div>
      {rankAr()}
      {/* 내 랭킹 보기 기능도 추후에 추가할 수 있도록 만들었싐미다 -여건-*/}
      {/* <div className="flex flex-row h-14 items-center mx-10 my-10 bg-amber-50 mb-2 rounded-xl shadow shadow-amber-700/20  ">
        <div className="font-semibold basis-1/12 text-center">33</div>
        <div className="font-semibold basis-1/12 text-center flex justify-center items-center">
          <img
            className="rounded-full bg-amber-400 w-10 h-10"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
        </div>
        <div className="font-semibold basis-2/12 pl-10 truncate">
          내 랭킹을 볼 수 있는 곳 내 랭킹을 볼 수 있는 곳 내 랭킹을 볼 수 있는
          곳
        </div>
        <div className="basis-5/12 text-center ml-10 truncate">
          내 랭킹도 볼 수 있게 하면 좋겠군요.내 랭킹을 볼 수 있는 곳 내 랭킹을
          볼 수 있는 곳 내 랭킹을 볼 수 있는 곳
        </div>
        <div className="font-semibold basis-3/12 text-center pl-10 truncate">
          22:22:22
        </div>
      </div> */}
    </div>
  );
}
