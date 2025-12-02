import React from "react";
import { getTranslation } from "../../utils/enums";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="container flex items-center justify-center px-6 py-4 mx-auto">
        <div className="text-center">
          <p className="">
          {getTranslation("FooterText").line1}
          </p>

          <p className="">
          {getTranslation("FooterText").line2}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
