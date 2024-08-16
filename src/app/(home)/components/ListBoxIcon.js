import Bildung from "/public/assets/themen/bildung.svg";
import Kultur from "/public/assets/themen/kultur.svg";
import Soziales from "/public/assets/themen/soziales.svg";
import Recht from "/public/assets/themen/recht.svg";
import Advocacy from "/public/assets/themen/advocacy.svg";
import Community from "/public/assets/themen/community.svg";
import Beratung from "/public/assets/themen/beratung.svg";
import Wissenschaft from "/public/assets/themen/wissenschaft.svg";
import Sprachen from "/public/assets/themen/sprachen.svg";
import Kinder from "/public/assets/themen/kinder.svg";
import Freizeit from "/public/assets/themen/freizeit.svg";
import Religion from "/public/assets/themen/religion.svg";
import Flucht from "/public/assets/themen/flucht.svg";

// size : small , big
const ListBoxIcon = ({ thema, size = "small", color }) => {
  const currentSize = size === "small" ? "100px" : "50px";
  const fillColor = color;
  return (
    <>
      {/* Bildung & Professionalisierung */}
      {thema === "a" && (
        <div>
          <Bildung style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Kultur & Kunst */}
      {thema === "b" && (
        <div>
          <Kultur style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Gesundheit & Soziales */}
      {thema === "c" && (
        <div>
          <Soziales style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Recht */}
      {thema === "d" && (
        <div>
          <Recht style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Politik & Advocacy */}
      {thema === "e" && (
        <div>
          <Advocacy style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Community-Building */}
      {thema === "f" && (
        <div>
          <Community style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Beratung */}
      {thema === "g" && (
        <div>
          <Beratung style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Wissenschaft */}
      {thema === "h" && (
        <div>
          <Wissenschaft style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Sprachen & Übersetzungsarbeit */}
      {thema === "i" && (
        <div>
          <Sprachen style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Kinder & Jugend */}
      {thema === "j" && (
        <div>
          <Kinder style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Sport & Freizeit */}
      {thema === "k" && (
        <div>
          <Freizeit style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Religion */}
      {thema === "l" && (
        <div>
          <Religion style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
      {/* Flucht & Migration */}
      {thema === "m" && (
        <div>
          <Flucht style={{ fill: fillColor, width: currentSize, height: currentSize }} />
        </div>
      )}
    </>
  );
};

export default ListBoxIcon;
