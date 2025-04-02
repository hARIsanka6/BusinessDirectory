import React from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    WebBrowser.warmUpAsync(); // Preload the browser for faster OAuth login

    return () => {
      WebBrowser.coolDownAsync(); // Cleanup when component unmounts
    };
  }, []);
};
