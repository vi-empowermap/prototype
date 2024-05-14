const Logo = ({text}) => {
  return (
    <h1 className="w-fit bg-white text-2xl md:text-4xl lg:text-6xl font-bold flex items-center px-4 py-4 lg:py-0">
      <span>{String(text).toUpperCase()}</span>
    </h1>
  );
};
export default Logo;
