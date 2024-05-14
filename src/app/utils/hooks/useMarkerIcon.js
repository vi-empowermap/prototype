export const useMarkerIcon = ({ id, archivoraktiv, activeColor, artderorganisation, selection }) => {
  // Verin : Circle
  const aI = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .a${id}1 {
        fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <rect class="a${id}1" x="0" y="0" width="800" height="800" rx="400" ry="400"/>
</svg>`;
  // Initiative : Rect
  const bI = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
    <defs>
      <style>
        .a${id}2 {
          fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
          stroke-width: 0px;
        }
      </style>
    </defs>
    <rect class="a${id}2" x="0" y="0" width="800" height="800"/>
  </svg>`;
  // Ngo : Triangle
  const cI = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
    <defs>
      <style>
        .a${id}3 {
          fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
          stroke-width: 0px;
        }
      </style>
    </defs>
    <polygon class="a${id}3" points="400 42.6 .7 734.2 799.3 734.2 400 42.6"/>
  </svg>`;
  // Projectgrouppe
  const dI = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .a${id}4 {
        fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <polygon class="a${id}4" points="400 19.6 494.4 310.2 800 310.2 552.8 489.8 647.2 780.4 400 600.8 152.8 780.4 247.2 489.8 0 310.2 305.6 310.2 400 19.6"/>
</svg>`;
  // Bildungseinrichtung
  const eI = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .a${id}5 {
        fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <polygon class="a${id}5" points="599.3 54 199.8 54 0 400 199.8 746 599.3 746 799.1 400 599.3 54"/>
</svg>
`;
  // Kultureinrichtung
  const fI = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .a${id}6 {
        fill: ${archivoraktiv === "aktiv" ? "black" : "gray"};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <path class="a${id}6" d="M800,530.5c0,116-94.1,210.1-210.1,210.1s-156.2-49.1-189.9-120.2c-33.7,71-106.1,120.2-189.9,120.2S0,646.5,0,530.5s92.8-208.8,207.8-210.1c-4.1-16.3-6.2-33.4-6.2-50.9,0-116,94.1-210.1,210.1-210.1s210.1,94.1,210.1,210.1-2.3,35.7-6.6,52.4c104.1,12.5,184.8,101.1,184.8,208.6Z"/>
</svg>`;

  /* Select Mode */
  // Verion
  const saI = `
  <svg  xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .b${id}1 {
        fill: ${activeColor};
        stroke-width: 0px;
      }
    </style>
  </defs>
  
  <rect class="b${id}1" x="0" y="0" width="800" height="800" rx="400" ry="400"/>
</svg>`;
  // Initiative
  const sbI = `
  <svg  xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
    <defs>
      <style>
        .b${id}2 {
          fill: ${activeColor};
          stroke-width: 0px;
        }
      </style>
    </defs>
    <rect class="b${id}2" x="0" y="0" width="800" height="800"/>
  </svg>`;
  // Ngo
  const scI = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1200 1200">
  <defs>
    <style>
      .b${id}3 {
        fill: ${activeColor};
        stroke-width: 0px;
      }

      .b${id}32 {
        fill: none;
        stroke: ${activeColor};
        stroke-miterlimit: 10;
        stroke-width: 21px;
      }
    </style>
  </defs>
  <polygon class="b${id}3" points="600 158.6 200.7 850.2 999.3 850.2 600 158.6"/>
  <circle class="b${id}32" cx="600" cy="600" r="520.1"/>
</svg>
 `;
  // Projectgrouppe
  const sdI = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .b${id}4 {
        fill: ${activeColor};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <polygon class="b${id}4" points="400 19.6 494.4 310.2 800 310.2 552.8 489.8 647.2 780.4 400 600.8 152.8 780.4 247.2 489.8 0 310.2 305.6 310.2 400 19.6"/>
</svg>`;
  // Bildungseinrichtung
  const seI = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .b${id}5 {
        fill: ${activeColor};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <polygon class="b${id}5" points="599.3 54 199.8 54 0 400 199.8 746 599.3 746 799.1 400 599.3 54"/>
</svg>
`;
  // Kultureinrichtung
  const sfI = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
  <defs>
    <style>
      .b${id}6 {
        fill: ${activeColor};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <path class="b${id}6" d="M800,530.5c0,116-94.1,210.1-210.1,210.1s-156.2-49.1-189.9-120.2c-33.7,71-106.1,120.2-189.9,120.2S0,646.5,0,530.5s92.8-208.8,207.8-210.1c-4.1-16.3-6.2-33.4-6.2-50.9,0-116,94.1-210.1,210.1-210.1s210.1,94.1,210.1,210.1-2.3,35.7-6.6,52.4c104.1,12.5,184.8,101.1,184.8,208.6Z"/>
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
      default:
        return sfI;
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
      default:
        return fI;
    }
  }
};
