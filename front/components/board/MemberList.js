import Member from './Member';

const MemberList = ({ members, isOwner, roomId }) => {
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default MemberList;
