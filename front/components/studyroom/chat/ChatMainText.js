/**
 * @component
 * @description 그룹 스터디룸에서 채팅창 대화 내용 부분
 * @param {string} chattingBoxRef - 스터디룸 이름
 * @param {string[]} chatAll - 대화 내용
 * @param {string[]} userDatas - 그룹스터디룸에 입장한 유저 정보
 * @param {object} user - 내 정보
 */
const ChatMainText = ({ chattingBoxRef, chatAll, userDatas, user }) => {
  return (
    <div
      ref={chattingBoxRef}
      className="relative w-full p-6 overflow-y-auto h-[72%]"
    >
      <ul className="space-y-2">
        {chatAll?.map((chat) => {
          let name = chat.split(' : ');
          let userI = userDatas.find((userData) => {
            if (userData.name === name[0]) {
              return true;
            }
          });

          return (
            <>
              {name[0] === `${user?.name}` ? (
                // 내가 보낸 메시지
                <li className="flex justify-end">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-amber-50 rounded shadow">
                    <span className="block">{name[1]}</span>
                  </div>
                  <img
                    className="rounded-full bg-cover w-10 h-10 ml-2"
                    src={user?.profileUrl}
                  />
                </li>
              ) : (
                // 상대방 메시지
                <li className="flex justify-start">
                  {/* <div className="grid mr-2"> */}
                  <img
                    className="rounded-full bg-cover w-10 h-10 mr-2"
                    src={userI?.profileUrl}
                    alt=""
                  />
                  {/* <small className="block text-center">
                                  {name[0]}
                                </small> */}
                  {/* </div> */}
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-amber-50 rounded shadow">
                    <span className="block">{chat}</span>
                  </div>
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatMainText;
