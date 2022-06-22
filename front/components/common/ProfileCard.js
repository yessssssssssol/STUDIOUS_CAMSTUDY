import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';
import BoldText from '../common/BoldText';

export default function ProfileCard() {
  const [user, setUser] = useRecoilState(userAtom);
  const { name, description, profileUrl } = user;
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
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #개발자
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #오전스터디
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #9to6
          </span>
        </div>
      </div>
    </div>
  );
}
