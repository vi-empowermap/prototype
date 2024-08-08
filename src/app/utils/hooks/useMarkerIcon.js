export const useMarkerIcon = ({ id, archivoraktiv, activeColor, artderorganisation, selection }) => {
  // Verin : Circle
  const aI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <title>Art der Organisation: Verein, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
    <desc>A custom marker for the map</desc>
    <defs>
      <style>
        .cls-1{fill:#fff;}.cls-1,
        .cls-2{stroke-width:0px;}
        .a${id}1{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
      </style>
    </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <circle class="a${id}1" cx="16" cy="16" r="12"/>
  </svg>`;
  // Initiative : Circle
  const bI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <title>Art der Organisation: Initiative, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
    <desc>A custom marker for the map</desc>
    <defs>
      <style>
        .cls-1{fill:#fff;}
        .cls-1,.cls-2{stroke-width:0px;}
        .a${id}2{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
      </style>
    </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <circle class="a${id}2" cx="16" cy="16" r="12"/>
  </svg>`;
  // Ngo : Polygon
  const cI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Ngo, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}3{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <polygon class="a${id}3" points="5.61 10 5.61 22 16 28 26.39 22 26.39 10 16 4 5.61 10"/>
  </svg>`;
  // Projectgrouppe : Polygon
  const dI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Projectgrouppe, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}4{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <polygon class="a${id}4" points="5.61 10 5.61 22 16 28 26.39 22 26.39 10 16 4 5.61 10"/>
  </svg>`;
  // Bildungseinrichtung : Rect
  const eI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Bildungseinrichtung, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}5{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
      <circle class="cls-1" cx="16" cy="16" r="16"/>
      <rect class="a${id}5" x="6" y="6" width="20" height="20"/>
    </svg>
`;
  // Kultureinrichtung : Rect
  const fI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Kultureinrichtung, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}6{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
      <circle class="cls-1" cx="16" cy="16" r="16"/>
      <rect class="a${id}6" x="6" y="6" width="20" height="20"/>
    </svg>
    `;
  // Verbund/Verband : Triangle
  const gI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Verbund/Verband, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}7{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
        <circle class="cls-1" cx="16" cy="16" r="16"/>
        <polygon class="a${id}7" points="16 5.47 5 24.53 27 24.53 16 5.47"/>
    </svg>
    `;
  // Kollektiv : Triangle
  const hI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Kollektiv, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}8{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
        <circle class="cls-1" cx="16" cy="16" r="16"/>
        <polygon class="a${id}8" points="16 5.47 5 24.53 27 24.53 16 5.47"/>
    </svg>
    `;
  // Weitere : rotated Triangle 
  const iI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Weitere, status: ${archivoraktiv === "aktive" ? "aktiv" : "inaktiv"}</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .a${id}9{fill: ${archivoraktiv === "aktive" ? "#000" : "#BFBFBF"};}
        </style>
      </defs>
      <circle class="cls-1" cx="16" cy="16" r="16"/>
      <polygon class="a${id}9" points="16 27.88 27 8.82 5 8.82 16 27.88"/>
    </svg>
    `;

  /* Select Mode */
  // Verin : Circle
  const saI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <title>Art der Organisation: Verein, status: Selected</title>
    <desc>A custom marker for the map</desc>
    <defs>
      <style>
        .cls-1{fill:#fff;}.cls-1,
        .cls-2{stroke-width:0px;}
        .b${id}1{fill: ${activeColor};}
      </style>
    </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <circle class="b${id}1" cx="16" cy="16" r="12"/>
  </svg>
  `;
  // Initiative : Circle
  const sbI = `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <title>Art der Organisation: Initiative, status: Selected</title>
    <desc>A custom marker for the map</desc>
    <defs>
      <style>
        .cls-1{fill:#fff;}.cls-1,
        .cls-2{stroke-width:0px;}
        .b${id}2{fill: ${activeColor};}
      </style>
    </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <circle class="b${id}2" cx="16" cy="16" r="12"/>
  </svg>`;
  // Ngo : Polygon
  const scI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Ngo, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}3{fill: ${activeColor};}
        </style>
      </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <polygon class="b${id}3" points="5.61 10 5.61 22 16 28 26.39 22 26.39 10 16 4 5.61 10"/>
  </svg>
 `;
  // Projectgrouppe : Polygon
  const sdI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Projectgrouppe, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}4{fill: ${activeColor};}
        </style>
      </defs>
    <circle class="cls-1" cx="16" cy="16" r="16"/>
    <polygon class="b${id}4" points="5.61 10 5.61 22 16 28 26.39 22 26.39 10 16 4 5.61 10"/>
  </svg>`;
  // Bildungseinrichtung : Rect
  const seI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Bildungseinrichtung, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}5{fill: ${activeColor};}
        </style>
      </defs>
      <circle class="cls-1" cx="16" cy="16" r="16"/>
      <rect class="b${id}5" x="6" y="6" width="20" height="20"/>
    </svg>  
`;
  // Kultureinrichtung : Rect
  const sfI = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Kultureinrichtung, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}6{fill: ${activeColor};}
        </style>
      </defs>
      <circle class="cls-1" cx="16" cy="16" r="16"/>
      <rect class="b${id}6" x="6" y="6" width="20" height="20"/>
    </svg> `;
  // Verbund/Verband : Triangle
  const sgI = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Verbund/Verband, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}7{fill: ${activeColor};}
        </style>
      </defs>
        <circle class="cls-1" cx="16" cy="16" r="16"/>
        <polygon class="b${id}7" points="16 5.47 5 24.53 27 24.53 16 5.47"/>
    </svg>`;
  // Kollektiv : Triangle
  const shI = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Kollektiv, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}8{fill: ${activeColor};}
        </style>
      </defs>
        <circle class="cls-1" cx="16" cy="16" r="16"/>
        <polygon class="b${id}8" points="16 5.47 5 24.53 27 24.53 16 5.47"/>
    </svg>`;
  // Weitere : rotated Triangle
  const siI = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Art der Organisation: Weitere, status: Selected</title>
      <desc>A custom marker for the map</desc>
      <defs>
        <style>
          .cls-1{fill:#fff;}
          .cls-1,.cls-2{stroke-width:0px;}
          .b${id}9{fill: ${activeColor};}
        </style>
      </defs>
      <circle class="cls-1" cx="16" cy="16" r="16"/>
      <polygon class="b${id}9" points="16 27.88 27 8.82 5 8.82 16 27.88"/>
    </svg>`;

  if (selection) {
    switch (artderorganisation) {
      case "a":
        return saI;
      case "b":
        return sbI;
      case "c":
        return scI;
      case "d":
        return sdI;
      case "e":
        return seI;
      case "f": 
        return sfI;
      case "g": 
        return sgI;
      case "h":
        return shI;
      default:
        return siI;
    }
  } else {
    switch (artderorganisation) {
      case "a":
        return aI;
      case "b":
        return bI;
      case "c":
        return cI;
      case "d":
        return dI;
      case "e":
        return eI;
      case "f": 
        return fI;
      case "g": 
        return gI;
      case "h":
        return hI;
      default:
        return iI;
    }
  }
};
