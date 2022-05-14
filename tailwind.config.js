module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: "#002769",
        ablue: "#194E89",
        gold: "#F0AF2C",
        dgold: "#E49903",
        green: "#1FBA73",
        lgreen: "#35DF91",
        lblue: "#3275B4",
        llblue: "#458BC0",
      },
      backgroundImage: {
        banner: "url('./img/banner.jpg')",
      },
      gridTemplateColumns: {
        "connectpage-sm": "0 auto",
        connectpage: "auto 550px",
        pollentry: "70px auto 60px",
        pollpage: "auto 12rem",
      },
      backgroundPosition: {
        homebannerpos: "center bottom -13rem",
        "homebannerpos-md": "center bottom -30rem",
      },
      backdropBlur: {
        "6px": "6px",
      },
      spacing: {
        "13p": "13%",
        "35p": "35%",
        "45p": "45%",
        "46p": "46%",
        "47p": "47%",
        "48p": "48%",
        "49p": "49%",
        "50p": "50%",
        "55p": "55%",
        "65p": "65%",
        "75p": "75%",
        "90p": "90%",
        "95p": "95%",
        "450px": "450px",
        "470px": "470px",
        "2.3r": "2.3rem",
      },
      fontSize: {
        "0.55r": "0.55rem",
      },
    },
    placeholderColor: {
      gold: "#F0AF2C",
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
