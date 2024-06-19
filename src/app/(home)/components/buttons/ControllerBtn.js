const ControllerBtn = ({open, setOpen, text}) => {
  return (
    <div onClick={() => setOpen((prev) => !prev)} className={`cursor-pointer absolute ${open ? "w-fit" : "w-full"} bottom-0 left-0 py-2 px-3 z-[1000] text-xl leading-5 font-semibold`}>
      {open && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
      )}
      {!open && (
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
          </svg>
          <div className="text-xs">{text}</div>
        </span>
      )}
    </div>
  );
};

export default ControllerBtn;
