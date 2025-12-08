import React from "react";
import { getTranslation } from "../../utils/enums";

const Footer = () => {
  return (
    <footer 
      className="border-t p-10"
      style={{ 
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="container flex items-center justify-center px-6 py-4 mx-auto">
        <div className="text-center">
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text)' }}
          >
            {getTranslation("FooterText").line1}
          </p>

          <p 
            className="text-sm"
            style={{ color: 'var(--color-secondary)' }}
          >
            {getTranslation("FooterText").line2}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
