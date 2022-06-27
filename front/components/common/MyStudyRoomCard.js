import { useEffect } from 'react';

export default function MyStudyRoomCard({ myStudyRoom }) {
  useEffect(() => {
    console.log(myStudyRoom, '나의 카드');
  });
  return (
    <div className="  px-2 py-10 mx-auto sm:max-w-xl  md:px-12 lg:px-8">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        {/* 바로 스터디룸으로 연결하기  */}
        <a href={`/board/${myStudyRoom.roomId}`} aria-label="Article">
          <div className="bg-gray-300 h-[300px] w-[250px] rounded-xl overflow-hidden transition-shadow duration-300">
            <p className="mt-3 ml-2 font-bold text-orange-300">
              {/* {myStudyRoom.members.length + '/' + myStudyRoom.membersNum} */}
            </p>
            <div className="mt-[130px] ml-2">
              <img
                className="h-[60px] w-[60px] rounded-full"
                src="img.jpeg"
                alt="Rounded avatar"
              />
            </div>
            <div className="mt-3 ml-2">
              {/* 제목 클릭하면 스터디룸 게시판(?) 연결  */}
              <a
                href={`/board/detail/${myStudyRoom.roomId}`}
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl font-bold leading-5">
                  {myStudyRoom.roomName}
                </p>
              </a>
              <p className="mb-4 font-semibold text-gray-700">
                {myStudyRoom.focusTimeStart.slice(0, 5) +
                  '~' +
                  myStudyRoom.focusTimeEnd.slice(0, 5)}
              </p>
              <div className="flex space-x-4"></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
