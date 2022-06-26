import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';

export default function Certification() {
  const [user, setUser] = useRecoilState(userAtom);
  const { profileUrl } = user;

  return (
    <div>
      <div className="flex items-center space-x-2 text-base">
        <h4 className="font-semibold text-slate-900">Applicant</h4>
      </div>
      <div className="mt-3 flex -space-x-2 overflow-hidden">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={profileUrl}
          alt="신청한사람"
        />
      </div>
    </div>
  );
}
