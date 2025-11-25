import React from "react";
import Button from "../shared/btn";
import { getTranslation } from "../../utils/enums";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div>
          <h1 className="text-5xl">{getTranslation('AppName')}</h1>
        </div>
        <Button title="theme" />
      </div>
    </header>
  );
};

export default Header;
