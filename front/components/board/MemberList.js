import Member from './Member';

/**해당 스터디 멤버 목록을 나타내는 컴포넌트
 *
 * @component
 * @param {object} members -멤버 정보
 * @param {string} roomId
 * @param {object} owner - 해당 게시글 주인의 정보
 * @param {boolean} isOwner - 해당 게시글의 주인인지 여부를 알려주는 데이터 true이면 게시글 주인 아니면 false
 */
const MemberList = ({ members, isOwner, roomId, owner }) => {
  return (
    <div className=" rounded-lg p-3 my-5 m-4 shadow-lg">
      <div className="flex items-center space-x-2 text-base">
        <h4 className="font-bold text-slate-900">스터디 멤버</h4>
      </div>
      <div>
        {members.map((member, index) => {
          return (
            <Member
              key={index}
              member={member}
              isOwner={isOwner}
              roomId={roomId}
              owner={owner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MemberList;
