import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function BoardCard({ boardData, profileURL }) {
  return (
    <div className="w-96 px-2 py-16 mx-auto sm:max-w-xl  md:px-12 lg:px-8 lg:py-20">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
          <a href={`/board/detail/${boardData.roomId}`}>
            <img
              src={boardData.roomImg}
              className="object-cover w-full h-64 rounded"
              alt="스터디 모집 이미지"
            />
          </a>
          <div className="py-5">
            <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
              <span className="pr-3 font-bold">스터디 기간</span>
              {boardData.createdAt.slice(0, 10)}~
              {boardData.endStudyDay.slice(0, 10)}
            </p>
            <a
              href="/board/detail"
              aria-label="Article"
              className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              <p className="text-2xl font-bold leading-5">
                {boardData.roomName}
              </p>
            </a>
            <p className="mb-2 text-gray-700">{boardData.roomDesc}</p>
            <div className="flex space-x-4">
              {boardData.hashTags.map((hashTag, index) => {
                return (
                  <span key={index} className="pr-1 font-medium">
                    {hashTag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
