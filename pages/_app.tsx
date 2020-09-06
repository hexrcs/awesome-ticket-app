import React from "react";
import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
