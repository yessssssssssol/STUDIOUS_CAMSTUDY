export default function MyStudyRoomCard({ myStudyRoom }) {
  return (
    <div className="px-2 py-10 mx-auto sm:max-w-xl  md:px-12 lg:px-8 ">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        {/* 바로 스터디룸으로 연결하기  */}
        {myStudyRoom.group === false ? (
          // "개인 스터디룸"
          <a href={`/studyroom/private`} aria-label="Article">
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
              {/* <div className="mx-auto flex h-[300px] w-[250px] flex-col justify-center bg-gray-200 rounded-2xl shadow-xl shadow-slate-300/60"> */}
              {/* <!-- img --> */}
              <img
                className="aspect-video w-96 h-full rounded-t-2xl object-cover object-center"
                src={myStudyRoom.roomImg}
                alt="Rounded avatar"
              />
              {/* <!-- text information --> */}
              <div className="px-4">
                <small className="text-amber-400 text-sx font-semibold">
                  {myStudyRoom.members.length + ' / ' + myStudyRoom.membersNum}
                </small>
                {/* 제목 클릭하면 스터디룸 게시판(?) 연결  */}
                {myStudyRoom.membersOnly ? (
                  // 비공개룸
                  <a
                    href={`/board/detail/${myStudyRoom.roomId}`}
                    aria-label="Article"
                  >
                    <p className="text-2xl font-bold  text-slate-600 pb-2">
                      {myStudyRoom.roomName}
                    </p>
                  </a>
                ) : (
                  // 오픈룸
                  <a
                    href={`/openroom/board/${myStudyRoom.roomId}`}
                    aria-label="Article"
                  >
                    <p className="text-2xl font-bold text-slate-600 pb-2 ">
                      {myStudyRoom.roomName}
                    </p>
                  </a>
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
