/**프로필 카드 컴포넌트
 *
 * @component
 * @param {object} owner -프로필 주인의 정보
 */
export default function ProfileCard({ owner }) {
  const { name, description, profileUrl } = owner;
  return (
    <div className="w-72 flex m-4 rounded overflow-hidden shadow-lg">
      <img
        className="h-16 w-16 m-2 rounded-full content-center"
        src={profileUrl}
        alt="프로필사진"
      />
      <div className="flex-col">
        <div className="px-6 py-4 ">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
