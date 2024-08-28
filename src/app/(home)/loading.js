const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <div className="min-w-fit max-w-fit w-auto flex justify-start items-center text-black bg-white bg-opacity-80 rounded-lg mb-0 lg:mb-8">
        <span className="text-5xl font-bespokeStencil">PAD</span>
        <span className="text-5xl font-britney pr-4 lg:pr-8">LAS</span>
      </div>
      <div>Mapping the world for you... Please wait.</div>
    </div>
  );
};

export default Loading;
