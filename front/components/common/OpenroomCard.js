export default function OpenroomCard({ openRoom }) {
  return (
    <div className="w-80 h-full px-2 py-16 mx-auto sm:max-w-xl md:px-2 lg:px-8 lg:py-8">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        <a href={`/openroom/board/${openRoom.roomId}`} aria-label="Article">
          <div className="over-flow-hidden bg-white rounded-md hover:scale-105 hover:shadow-amber-300/50 shadow-lg duration-300">
            <img
              className="w-full h-48 object-fill rounded-t-md"
              src={openRoom.roomImg}
              alt="Rounded avatar"
            />
            <div className="py-5 px-4">
              <small className="text-amber-400 font-bold">
                {openRoom.members.length + ' / ' + openRoom.membersNum}
              </small>
              <p className="text-2xl font-bold  text-black pb-2">
                {openRoom.roomName}
              </p>
              <p className="text-sm font-normal  text-slate-400">
                {openRoom.focusTimeStart.slice(0, 5) +
                  ' ~ ' +
                  openRoom.focusTimeEnd.slice(0, 5)}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
