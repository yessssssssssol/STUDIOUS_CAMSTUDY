import { useRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';
import { useState } from 'react';

const ApplicationAddForm = ({ roomId, setApplicants, writerId }) => {
  const [wirterId, setWriterId] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  const { name, profileUrl } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await Api.post('apply', {
      roomId,
    });
    const res = await Api.get('applicants', roomId);
    setApplicants(res.data);
  };
  return (
    <div className="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
      <div className="mt-2">
        <img src={profileUrl} alt="" className="h-16 w-16 m-2 rounded-full" />
      </div>
      <div className="flex">
        <div className="flex flex-row items-center justify-between py-1 pr-2">
          <div>
            <a href="#" className="text-blue-400 hover:underline">
              {name}
            </a>
          </div>
          <div className="flex justify-between mx-3">
            <div>
              <button
                className="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700"
                type="submit"
                onClick={handleSubmit}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAddForm;
