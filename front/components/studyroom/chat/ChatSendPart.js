/**
 * @component
 * @description 그룹 스터디룸에서 채팅창 메시지 작성 및 전송 버튼
 * @param {function} sendChatHandler - 채팅 입력시 실행되는 이벤트 함수
 */
const ChatSendPart = ({ sendChatHandler }) => {
  return (
    // message send part
    <form>
      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <input
          id="inputbox"
          placeholder="message"
          required
          type="text"
          className="block w-full py-2 pl-4 ml-1 mr-2 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        ></input>
        <button onClick={sendChatHandler}>
          <svg
            className="w-5 h-5 mr-1 ml-2 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatSendPart;
