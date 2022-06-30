export default function OpenroomCard({ openRoom }) {
  return (
    <div className="mx-auto flex h-[300px] w-64 justify-center bg-gradient-to-r hover:scale-105 duration-300 rounded-md hover:shadow-amber-300/50 shadow-lg">
      <div className="grid sm:max-w-sm sm:mx-auto">
        <div className="bg-white rounded-md m-0">
          <a href={`/openroom/board/${openRoom.roomId}`} aria-label="Article">
            <img
              className="w-64 h-48 object-fill rounded-t-md"
              src={openRoom.roomImg}
              alt="Rounded avatar"
            />
          </a>
          <div className="px-4">
            <small className="text-amber-400 font-bold">
              {openRoom.members.length + ' / ' + openRoom.membersNum}
            </small>
            <p className="text-2xl font-bold text-center text-slate-600 pb-2">
              {openRoom.roomName}
            </p>
            <p className="text-sm font-normal text-center text-slate-400">
              {openRoom.focusTimeStart.slice(0, 5) +
                ' ~ ' +
                openRoom.focusTimeEnd.slice(0, 5)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
