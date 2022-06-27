import * as API from '../../pages/api/api';

export default function ProfileCard({ owner, detailData }) {
  const hashTags = detailData.hashTags;
  const { name, description, profileUrl } = owner;
  return (
    <div className="max-w-md flex m-4 rounded overflow-hidden shadow-lg">
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
        <div className="px-6  pt-4 pb-2">
          {hashTags.map((tag, index) => {
            return (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
