import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "../assets/assets";

interface SelectProps {
  defaultValue: string;
  icon?: string;
  iconAlt?: string;
  options: string[];
  optionsCss?: string;
  value: string | number;
  buttonCss?: string;
  iconCss?: string;
  optionContainerCss?: string;
  optionHighlightColor?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onOpen?: (value: boolean) => void;
  isBottomLine?: boolean;
  bottomLineCss?: string;
  autoPosition?: boolean;
  autoPositionHeight?: number;
}

export const Select: React.FC<SelectProps> = ({
  icon,
  iconAlt,
  options,
  value,
  defaultValue,
  buttonCss,
  iconCss,
  optionsCss,
  optionContainerCss,
  optionHighlightColor,
  disabled,
  onChange,
  onOpen,
  isBottomLine,
  bottomLineCss,
  autoPosition = false,
  autoPositionHeight = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<string>("");

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpen((prev) => {
        if (onOpen) {
          onOpen(!prev);
        }
        return !prev;
      });
    },
    [onOpen]
  );

  const handleOptionClick = useCallback(
    (option: string) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (isOpen && optionsRef.current && autoPosition) {
      if (optionsRef.current) {
        const rect = optionsRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setMenuPosition(
          spaceBelow >= autoPositionHeight ? "top-[30px]" : "bottom-[30px]"
        );
      }
    }
  }, [isOpen, autoPosition, autoPositionHeight]);

  return (
    <div className="relative" ref={selectRef}>
      <button
        className={
          buttonCss || "flex items-center justify-between text-gray-700"
        }
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span>{value || defaultValue || "Select"}</span>
        <img
          src={icon || ChevronDownIcon}
          alt={iconAlt || "default-select-icon"}
          className={iconCss}
        />
      </button>
      {isOpen && options?.length > 0 && (
        <div
          className={`absolute z-10 w-full cursor-pointer overflow-auto bg-white ${optionContainerCss} ${
            autoPosition ? menuPosition : "left-0"
          }`}
          ref={optionsRef}
          role="listbox"
        >
          {options.map((option, i) => (
            <React.Fragment key={`${option}-${i}`}>
              <p
                className={`${optionsCss || "px-2 py-1 hover:bg-gray-100"} ${
                  value === option ? optionHighlightColor || "bg-blue-200" : ""
                }`}
                role="option"
                aria-selected={value === option}
                onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
              >
                {option}
              </p>
              {isBottomLine && i < options.length - 1 ? (
                <div className={bottomLineCss}></div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
