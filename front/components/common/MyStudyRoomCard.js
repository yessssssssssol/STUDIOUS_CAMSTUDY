export default function MyStudyRoomCard({ myStudyRoom }) {
  return (
    <div className="px-2 py-10 mx-auto sm:max-w-xl  md:px-12 lg:px-8 ">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        {/* 바로 스터디룸으로 연결하기  */}
        {myStudyRoom.group === false ? (
          // "개인 스터디룸"
          <a href={`/studyroom/personal`} aria-label="Article">
            <div className="relative h-[300px] w-[250px] rounded-xl overflow-hidden transition-shadow duration-300 hover:scale-105 hover:shadow-amber-300/50 shadow-lg">
              <div className="">
                <img
                  className="w-96 h-full rounded-2xl transition-shadow "
                  src="study.png"
                  alt="Rounded avatar"
                />
              </div>
              <div className="absolute bottom-2 left-6 px-6 py-4">
                <p className="text-2xl text-amber-400 font-semibold">
                  {'STUDY START'}
                </p>
                <div className="flex space-x-4"></div>
              </div>
            </div>
          </a>
        ) : (
          // '단체 스터디룸'
          <a
            href={`/studyroom/group/${myStudyRoom.roomId}`}
            aria-label="Article"
          >
            {/* <!-- card --> */}
            <div className="mx-auto flex h-[300px] w-[250px] flex-col justify-center bg-gradient-to-r rounded-2xl shadow-lg shadow-slate-300/60 hover:shadow-amber-300/50 hover:scale-105">
              {/* <!-- img --> */}
              <img
                className="aspect-video w-96 h-full rounded-t-2xl object-cover object-center"
                src={myStudyRoom.roomImg}
                alt="Rounded avatar"
              />
              {/* <!-- text information --> */}
              <div className="px-4">
                {myStudyRoom.membersOnly ? (
                  /** Private Study */
                  <p className="text-xl font-bold  text-slate-600 mt-2 pb-2">
                    <small className="text-amber-400 text-sx font-semibold">
                      Private
                    </small>
                    <p>{myStudyRoom.roomName}</p>
                  </p>
                ) : (
                  /** Public Study */
                  <p className="text-xl font-bold text-slate-600 mt-2 pb-2 ">
                    <small className="text-amber-400 text-sx font-semibold">
                      Public
                    </small>
                    <p>{myStudyRoom.roomName}</p>
                  </p>
                )}
                <p className="text-sm font-medium text-slate-400 pb-2 ">
                  {myStudyRoom.focusTimeStart.slice(0, 5) +
                    ' ~ ' +
                    myStudyRoom.focusTimeEnd.slice(0, 5)}
                </p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
