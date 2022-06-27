const Certification = ({ name, profile }) => {
  console.log(name);
  return (
    <>
      <div className="mt-3 flex space-x-5 overflow-hidden">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={profile}
          alt="신청한사람"
        />
        <div className="mt-2">{name}</div>
      </div>
    </>
  );
};

export default Certification;
