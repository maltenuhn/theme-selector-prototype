export const sampleTheme = {
  backgroundColors: {
    highlights: {
      primary: "#FF00AA",
      secondary: "#DD0088"
    },
    neutral: {
      primary: "hsla(200,80%,80%,.9)",
      secondary: "hsla(200,40%,40%,.9)"
    },
    lowlights: {
      primary: "hsla(200,80%,80%,.9)",
      secondary: "hsla(200,40%,40%,.9)"
    }
  },
  backgrounds: {
    default: "hsla(0,30%,50%,.2)",
    aReallyLongCustomColorname: "hsla(0,30%,60%,.8)",
    hello: "rgba(0,125,255, .0)",
    hello1: "rgba(0,125,255, .1)",
    hello2: "rgba(0,125,255, .2)",
    hello3: "rgba(0,125,255, .3)",
    hello4: "rgba(0,125,255, .4)",
    hello5: "rgba(0,125,255, .5)",
    hello6: "rgba(0,125,255, .6)",
    hello7: "rgba(0,125,255, .7)",
    hello8: "rgba(0,125,255, .8)",
    hello9: "rgba(0,125,255, .9)",
    hello10: "rgba(0,125,255, 1)",
    wash: "#F00002",
    divider: "#FF5700",
    border: "#FFB400",
    asdu: "#34D900",
    next: "#00DCB3",
    inactive: "#00C7FF",
    asdf: "#0090FF",
    jkly: "#6D1EFD"
  },
  brand: {
    space: "000",
    wash: "#F00002",
    divider: "#FF5700",
    border: "#FFB400",
    wash: "#F00002",
    divider: "#FF5700",
    asdu: "#34D900",
    next: "#00DCB3",
    inactive: "#00C7FF",
    asdf: "#0090FF",
    jkly: "#6D1EFD",
    default: "#4400CC",
    alt: "#7B16FF",
    dark: "#2A0080"
  },
  social: {
    default: "#4400aa",
    facebook: {
      default: "rgba(0,125,255,.3)",
      alt: "#5A85DF"
    },
    twitter: {
      default: "hsla(0,30%,50%,.8)",
      alt: "#53D0FF"
    }
  },
  success: {
    default: "#00B88B",
    alt: "#00D5BD",
    dark: "#00663C",
    wash: "#D9FFF2",
    border: "#9FF5D9"
  },
  text: {
    default: "#24292E",
    secondary: "#384047",
    alt: "#67717A",
    placeholder: "#7C8894",
    reverse: "#FFFFFF"
  },
  warn: {
    default: "#E22F2F",
    alt: "#E2197A",
    dark: "#85000C",
    wash: "#FFEDF6",
    border: "#FFCCE5"
  }
};

export const sampleTypographicTheme = {
  primary: {
    h1: {
      fontWeight: "bold",
      fontSize: "27px",
      textTransform: "uppercase",
      color: "#007AFF"
    },
    h2: {
      fontWeight: 600,
      fontSize: "21px",
      textTransform: "uppercase",
      color: "#007AFF"
    },
    default: {
      fontWeight: 400,
      fontSize: "11px",
      color: "hsl(0,0%,15%)",
      fontFamily: "Arial, Helvetica Neue, Comic Sans, -apple-system"
    },
    subdued: {
      fontWeight: 300,
      fontSize: "9px",

      fontFamily: "Arial, Helvetica Neue, Comic Sans, -apple-system"
    },
    primitives: {
      family: { fontFamily: "Arial, Helvetica Neue, Comic Sane" },
      standardFont: {
        fontFamily: "Arial, Helvetica Neue",
        fontSize: "11px",
        lineHeight: "19px"
      },
      baseColor: { color: "hsl(0,0%,10%)" }
    }
  }
};

export const TypographicOptions = [
  {
    label: "base.primary.headline",
    value: {
      fontWeight: "bold",
      fontSize: "64px",
      textTransform: "uppercase",
      color: "#007AFF"
    }
  },
  {
    label: "base.primary.h1",
    value: {
      fontWeight: 300,
      fontSize: "27px",

      color: "#007AFF"
    }
  },
  {
    label: "base.primary.h2",
    value: {
      fontWeight: 400,
      fontSize: "22px",
      letterSpacing: "29px",
      lineHeight: "30px",
      color: "#007AFF"
    }
  },
  {
    label: "base.primary.h3",
    value: {
      fontWeight: "500",
      fontSize: "17px",
      textTransform: "uppercase",
      color: "black"
    }
  },
  {
    label: "base.primary.normal",
    value: {
      fontWeight: "bold",
      fontSize: "11px",
      textTransform: "uppercase",
      color: "black"
    }
  },
  {
    label: "base.primary.subdued",
    value: {
      fontWeight: "bold",
      fontFamily: "Arial, Helvetica Neue",
      fontSize: "10px",
      textTransform: "uppercase",
      color: "lightgrey"
    }
  }
];
