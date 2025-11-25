import React from "react";

import BasicInfoForm from "./components/basic-info";
import Prayer from "./components/prayer";
import Events from "./components/events";
import Compass from "./components/compass";
import Quran from "./components/quran";
import ArCompass from "./components/compass/ar-compass";

import AppWrapper from "./components/core/app-wrapper";

const App = () => {
  return (
      <AppWrapper>
        <BasicInfoForm />
        <Prayer />
        <Events />
        <Compass />
        <ArCompass />
        <Quran />
      </AppWrapper>
  );
};

export default App;
