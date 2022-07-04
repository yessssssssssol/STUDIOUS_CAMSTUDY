const ChatHeader = ({ roomName, roomImg }) => {
  return (
    <div className="border rounded-xl">
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={roomImg}
          alt="roomImg"
        />
        <span className="block ml-2 font-bold text-gray-600">{roomName}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
