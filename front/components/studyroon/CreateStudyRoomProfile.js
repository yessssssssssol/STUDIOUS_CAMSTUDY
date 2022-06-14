const CreateStudyRoomProfile = () => {
  return (
    <div className="mx-20">
      <div className="my-6">
        <img
          className="h-40 w-40 rounded-full"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Rounded avatar"
        />
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        // onChange={handleUpload}
        // ref={fileInput}
      />
      <div className="w-40">
        <button
          className="w-full text-white py-2 px-4 my-1 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition duration-200"
          //   onClick={() => {
          //     fileInput.current.click();
          //     console.log(fileInput);
          //   }}
        >
          프로필 업로드
        </button>
        <button
          className="w-full text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200"
          //   onClick={() => {
          //     setProfileUrl(
          //       'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          //     );
          //   }}
        >
          프로필 삭제
        </button>
        <button
          className="w-full text-indigo-500 hover:text-white py-2 px-4 my-1 uppercase rounded border border-indigo-500 bg-white hover:bg-indigo-500 shadow hover:shadow-lg font-medium transition duration-200"
          //   onClick={saveEdit}
        >
          프로필 저장
        </button>
      </div>
    </div>
  );
};

export default CreateStudyRoomProfile;
