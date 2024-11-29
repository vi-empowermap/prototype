const OrgaHeader = ({ bgColor, font, organame }) => {
  return (
    <h1 style={{ color: `${bgColor}` }} className={`text-3xl lg:text-6xl font-bold mb-8 ${font} flex items-center gap-4`}>
      <div className="break-all">{organame}</div>
    </h1>
  );
};

export default OrgaHeader;
