const ProfileImg = ({ profileUrl }) => {
  return (
    <div class='mb-4'>
      <img
        className='h-32 w-32 rounded-full'
        src={profileUrl}
        alt='Rounded avatar'
      />
    </div>
  );
};

export default ProfileImg;
