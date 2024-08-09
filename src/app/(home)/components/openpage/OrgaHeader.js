const OrgaHeader = ({ bgColor, font, organame, imgUrl }) => {
  return (
    <h1 style={{ color: `${bgColor}` }} className={`text-4xl lg:text-8xl font-bold mb-8 ${font} flex items-center gap-4`}>
      {imgUrl && <div style={{ backgroundImage: `url(${process.env.KB_FOR_FILE}/@/file/${String(imgUrl).slice(7)})` }} className="w-28 aspect-square bg-cover bg-center"></div>}
      <div>{organame}</div>
    </h1>
  );
};

export default OrgaHeader;
