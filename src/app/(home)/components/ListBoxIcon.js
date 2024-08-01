import Image from "next/image";
// size : small , big
const ListBoxIcon = ({ thema, size="small" }) => {
 
  return (
    <>
    {/* Bildung & Professionalisierung */}
      {thema === "a" && (
        <div>
          <Image src={`assets/themen/bildung.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Bildung & Professionalisierung"} />
        </div>
      )}
      {/* Kultur & Kunst */}
      {thema === "b" && (
        <div>
          <Image src={`assets/themen/kultur.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Kultur & Kunst"} />
        </div>
      )}
      {/* Gesundheit & Soziales */}
      {thema === "c" && (
        <div>
          <Image src={`assets/themen/soziales.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Gesundheit & Soziales"} />
        </div>
      )}
      {/* Recht */}
      {thema === "d" && (
        <div>
          <Image src={`assets/themen/recht.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Recht"} />
        </div>
      )}
      {/* Politik & Advocacy */}
      {thema === "e" && (
        <div>
          <Image src={`assets/themen/advocacy.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Politik & Advocacy"} />
        </div>
      )}
      {/* Community-Building */}
      {thema === "f" && (
        <div>
          <Image src={`assets/themen/community.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Community-Building"} />
        </div>
      )}
      {/* Beratung */}
      {thema === "g" && (
        <div>
          <Image src={`assets/themen/beratung.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Beratung"} />
        </div>
      )}
      {/* Wissenschaft */}
      {thema === "h" && (
        <div>
          <Image src={`assets/themen/wissenschaft.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Wissenschaft"} />
        </div>
      )}
      {/* Sprachen & Übersetzungsarbeit */}
      {thema === "i" && (
        <div>
          <Image src={`assets/themen/sprachen.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Sprachen & Übersetzungsarbeit"} />
        </div>
      )}
      {/* Kinder & Jugend */}
      {thema === "j" && (
        <div>
          <Image src={`assets/themen/kinder.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Kinder & Jugend"} />
        </div>
      )}
      {/* Sport & Freizeit */}
      {thema === "k" && (
        <div>
          <Image src={`assets/themen/freizeit.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Sport & Freizeit"} />
        </div>
      )}
      {/* Religion */}
      {thema === "l" && (
        <div>
          <Image src={`assets/themen/religion.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Religion"} />
        </div>
      )}
      {/* Flucht & Migration */}
      {thema === "m" && (
        <div>
          <Image src={`assets/themen/flucht.svg`} 
            width={size === "small" ? 24: 40}
            height={size === "small" ? 24: 40}
            alt={"Flucht & Migration"} />
        </div>
      )}
    </>
  );
};

export default ListBoxIcon;
