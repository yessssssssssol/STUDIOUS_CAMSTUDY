export default function MyStudyRoomCard({ myStudyRoom }) {
  return (
    <div className="px-2 py-10 mx-auto sm:max-w-xl  md:px-12 lg:px-8">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        {/* 바로 스터디룸으로 연결하기  */}
        {myStudyRoom.group === false ? (
          // "개인 스터디룸"
          <a href={`/studyroom/private`} aria-label="Article">
            <div className="bg-blue-900 h-[300px] w-[250px] rounded-xl overflow-hidden transition-shadow duration-300">
              <div className="mt-[130px] ml-2">
                <img
                  className="h-[60px] w-[60px] rounded-full"
                  src="img.jpeg"
                  alt="Rounded avatar"
                />
              </div>
              <div className="mt-3 mx-4">
                <p className="text-2xl text-white font-bold leading-5">
                  {'개인 스터디룸'}
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
            <div className="mx-auto flex h-[300px] w-[250px] flex-col justify-center bg-gradient-to-r from-purple-100 to-teal-50 rounded-2xl shadow-xl shadow-slate-300/60">
              {/* <div className="mx-auto flex h-[300px] w-[250px] flex-col justify-center bg-gray-200 rounded-2xl shadow-xl shadow-slate-300/60"> */}
              {/* <!-- img --> */}
              <img
                className="aspect-video w-96 h-full rounded-t-2xl object-cover object-center"
                src={myStudyRoom.roomImg}
                alt="Rounded avatar"
              />
              {/* <!-- text information --> */}
              <div className="px-4">
                <small className="text-blue-400 text-xs">
                  {myStudyRoom.members.length + '/' + myStudyRoom.membersNum}
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
                    <p className="text-2xl font-bold text-slate-600 pb-2">
                      {myStudyRoom.roomName}
                    </p>
                  </a>
                )}
                <p className="text-sm tracking-tight font-light text-slate-400 leading-6">
                  {myStudyRoom.focusTimeStart.slice(0, 5) +
                    '~' +
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
