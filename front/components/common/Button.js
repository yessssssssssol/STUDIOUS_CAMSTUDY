/**button 공통 컴포넌트
 *
 * @component
 * @param {string} text - 버튼 이름
 * @param {string} onClick - onclick function
 * @param {boolean} disable
 * @param {string} color - 버튼 색
 */
export default function Button({ text, onClick, disable, color }) {
  return (
    <button
      onClick={onClick}
      className={`bg-amber-400 ${color}  hover:shadow-lg hover:bg-amber-500 text-white font-medium py-1 px-3 rounded-md`}
      disable={disable}
    >
      {text}
    </button>
  );
}
