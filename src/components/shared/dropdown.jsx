import React, { useState, useRef, useEffect, useMemo } from "react";
import { getTranslation } from "../../utils/enums";
import DropdownIcon from "../../assets/icons/dropdown-arrow.svg";

const Dropdown = ({
  options = [],
  preSelectOption = null,
  onSelect = () => {},
  placeholder = "Select an option",
  label = "",
  searchable = true,
  disabled = false,
  className = "",
}) => {
  
  // Find the initial selected option based on preSelectOption value
  const initialSelected = useMemo(() => {
    if (!preSelectOption && preSelectOption !== 0) return null;
    
    // Convert preSelectOption to string for comparison
    const preSelectStr = String(preSelectOption);
    
    return options.find(option => {
      const optionValue = typeof option === "string" ? option : option.value;
      return String(optionValue) === preSelectStr;
    });
  }, [preSelectOption, options]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelected);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Update selectedOption when preSelectOption or options change
  useEffect(() => {
    setSelectedOption(initialSelected);
  }, [initialSelected]);

  // Compute filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (searchQuery.trim() === "") {
      return options;
    }
    return options.filter((option) => {
      const label = typeof option === "string" ? option : option.label;
      return label.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, options]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchQuery("");
    onSelect(option);
  };

  const getDisplayLabel = (option) => {
    if (!option) return placeholder;
    return typeof option === "string" ? option : option.label;
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {label && <label className="block mb-1 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</label>}
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="cursor-pointer w-full px-4 py-3 rounded-2xl transition flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-card)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.target.style.backgroundColor = 'var(--color-card-secondary)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.target.style.backgroundColor = 'var(--color-card)';
          }
        }}
      >
        <span className="truncate">{getDisplayLabel(selectedOption)}</span>
        <img
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          src={DropdownIcon}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-lg z-50 overflow-hidden"
          style={{
            backgroundColor: 'var(--color-dropdown-bg)',
            border: '1px solid var(--color-dropdown-border)'
          }}
        >
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b" style={{ borderColor: 'var(--color-dropdown-border)' }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={getTranslation('SearchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1 text-md rounded-lg border focus:outline-none transition"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-text)',
                  borderColor: 'var(--color-border)'
                }}
              />
            </div>
          )}

          {/* Options List */}
          <ul className={`max-h-64 overflow-y-auto`}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected =
                  selectedOption &&
                  (typeof option === "string"
                    ? String(option) === String(selectedOption)
                    : String(option.value) === String(selectedOption.value || selectedOption));

                return (
                  <li key={index}>
                    <button
                      onClick={() => handleSelect(option)}
                      className={`cursor-pointer w-full text-right px-4 py-1 transition`}
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                        color: isSelected ? 'var(--color-button-text)' : 'var(--color-text)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.backgroundColor = 'var(--color-card)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {getDisplayLabel(option)}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-3 text-center" style={{ color: 'var(--color-secondary)' }}>
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
