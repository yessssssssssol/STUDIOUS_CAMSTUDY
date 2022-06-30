export default function OpenroomCard({ openRoom }) {
  return (
    <a href={`/openroom/board/${openRoom.roomId}`} aria-label="Article">
      {/* <!-- card --> */}
      <div class="mx-auto my-[3rem] flex h-[300px] w-[250px] flex-col justify-center bg-amber-50 rounded-2xl shadow-md shadow-amber-300/30 ">
        {/* <!-- img --> */}
        <img
          class="aspect-video w-96 h-full rounded-t-2xl object-cover object-center"
          src={openRoom.roomImg}
          alt="Rounded avatar"
        />
        {/* <!-- text information --> */}
        <div class="px-4">
          <small class="text-blue-400 text-xs">
            {openRoom.members.length + '/' + openRoom.membersNum}
          </small>
          <p class="text-2xl font-bold text-slate-600 pb-2">
            {openRoom.roomName}
          </p>
          <p class="text-sm tracking-tight font-light text-slate-400 leading-6">
            {openRoom.focusTimeStart.slice(0, 5) +
              '~' +
              openRoom.focusTimeEnd.slice(0, 5)}
          </p>
        </div>
      </div>
    </a>
  );
}
