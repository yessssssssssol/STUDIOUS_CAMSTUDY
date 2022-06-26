import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';

export default function Certification() {
  const [user, setUser] = useRecoilState(userAtom);
  const { profileUrl } = user;

  return (
    <div>
      <div class="flex items-center space-x-2 text-base">
        <h4 class="font-semibold text-slate-900">Applicant</h4>
      </div>
      <div class="mt-3 flex -space-x-2 overflow-hidden">
        <img
          class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={profileUrl}
          alt="신청한사람"
        />
      </div>
    </div>
  );
}
