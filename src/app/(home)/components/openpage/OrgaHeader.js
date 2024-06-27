const OrgaHeader = ({bgColor, font, organame}) => {
    return <h1 style={{ color: `${bgColor}` }} className={`text-4xl lg:text-8xl font-bold mb-8 ${font}`}>
    {organame}
  </h1>
}

export default OrgaHeader;