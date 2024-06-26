/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      /* Ipad Pro is 1024px */
      screens: {
        lg: "1025px"
      },
      borderWidth: {
        DEFAULT: '3px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        aktura: ["Aktura"],
        alfaSlabOne: ["AlfaSlabOne"],
        bespokeStencil: ["BespokeStencil"],
        bespokeStencilItalic: ["BespokeStencilItalic"],
        britney: ["Britney"],
        courier: ["Courier"],
        courierBold: ["CourierBold"],
        panchang: ["Panchang"],
        sharpie: ["Sharpie"],
        telma: ["Telma"],
        theFutureMono: ["TheFutureMono"],
        jetBrainsMono: ["JetBrainsMono"],
        jetBrainsMonoMedium: ["JetBrainsMonoMedium"],
        jetBrainsMonoLight: ["JetBrainsMonoLight"],
        jetBrainsMonoExtraBold: ["JetBrainsMonoExtraBold"],
        kihim: ["Kihim"],
        pramukhRoundedExtraboldItalic: ["PramukhRoundedExtraboldItalic"],
        theFutureMono: ["TheFutureMono"],
        theFutureMonoBold: ["TheFutureMonoBold"],
      }
    },
  },
  plugins: [],
};
