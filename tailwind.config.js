/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#D79A01",        // Buddha Gold
        secondary: "#726357",      // Pine Cone
        links: "#1976D2",          // Links
        text: "#455A64",           // Text
        accent: "#F5F5F5",         // Accent 1
        dark: "#000000",           // Dark
        white: "#FFFFFF",          // White
        border: "#E0E0E0",         // Border color
        input: "#E0E0E0",          // Input color
        ring: "#000000",           // Ring color
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        helvetica: ["Helvetica", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        'helvetica-oblique': ["Helvetica Oblique", "sans-serif"],
        'helvetica-compressed': ["Helvetica Compressed", "sans-serif"],
        'helvetica-rounded-bold': ["Helvetica Rounded Bold", "sans-serif"],
        'helvetica-bold-oblique': ["Helvetica Bold Oblique", "sans-serif"],
        'helvetica-light': ["HelveticaNeue thin", "sans-serif"],
      },
      fontSize: {
        'heading-1': ['128px', { lineHeight: '120%', letterSpacing: '-3px' }],
        'heading-2': ['42px', { lineHeight: '120%', letterSpacing: '0.5px' }],
        'heading-3': ['32px', { lineHeight: '120%', letterSpacing: '0px' }],
        'heading-4': ['24px', { lineHeight: '120%', letterSpacing: '0px' }],
        'heading-5': ['20px', { lineHeight: '120%', letterSpacing: '0px' }],
        'heading-6': ['18px', { lineHeight: '120%', letterSpacing: '0px' }],
        'subtitle-l': ['20px', { lineHeight: '120%', letterSpacing: '0px' }],
        'subtitle-m': ['16px', { lineHeight: '120%', letterSpacing: '0px' }],
        'subtitle-s': ['14px', { lineHeight: '120%', letterSpacing: '0px' }],
        'body-l': ['20px', { lineHeight: '120%', letterSpacing: '2px' }],
        'body-m': ['18px', { lineHeight: '120%', letterSpacing: '2px' }],
        'body-s': ['16px', { lineHeight: '120%', letterSpacing: '2px' }],
        'body-xs': ['14px', { lineHeight: '120%', letterSpacing: '2px' }],
        'body-xxs': ['12px', { lineHeight: '120%', letterSpacing: '0px' }],
        'body-xxxs': ['10px', { lineHeight: '120%', letterSpacing: '0px' }],
        'button-l': ['20px', { fontWeight: '500', letterSpacing: '0.5px' }],
        'button-m': ['16px', { fontWeight: '500', letterSpacing: '0.5px' }],
        'button-s': ['14px', { fontWeight: '500', letterSpacing: '0.5px' }],
        'menu-tabs': ['16px', { fontWeight: '500', letterSpacing: '2px' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
