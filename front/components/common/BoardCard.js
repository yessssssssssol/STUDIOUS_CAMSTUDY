import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function BoardCard({ boardData, profileURL }) {
  return (
    <div className="w-96 h-full px-2 py-16 mx-auto sm:max-w-xl md:px-2 lg:px-8 lg:py-8">
      <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
        <div className="over-flow-hidden bg-white rounded-md hover:scale-105 hover:shadow-amber-300/50 shadow-lg duration-300">
          <a href={`/board/detail/${boardData.roomId}`}>
            <img
              src={boardData.roomImg}
              className="object-fill w-full h-48 rounded-t-md"
              alt="스터디 모집 이미지"
            />
          </a>
          <div className="py-5 mx-4">
            <p className="mb-2 text-xs font-semibold text-amber-400 uppercase">
              {/* <span className="pr-3 font-bold"></span> */}
              {boardData.createdAt.slice(0, 10)} ~{' '}
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
            <p className="mb-2 text-gray-700">
              {boardData.roomDesc.slice(0, 20)}
            </p>
            <div className="flex space-x-4 text-gray-400">
              {boardData.hashTags.map((hashTag, index) => {
                return (
                  <span
                    key={index}
                    className="font-medium inline-block bg-amber-50 rounded-full px-1 py-1 text-sm text-amber-500"
                  >
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
