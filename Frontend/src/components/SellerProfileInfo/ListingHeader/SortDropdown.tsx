import { useState, useRef, useEffect } from "react";
import "./SortDropdown.css";

interface Option {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: Option[];
  onSortChange: (value: string) => void;
  defaultValue: string;
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  onSortChange,
  defaultValue,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0].value);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSelected(value);
    onSortChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  return (
    <div className={`sort-dropdown ${className}`} ref={ref}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedLabel}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`dropdown-item ${
                option.value === selected ? "selected" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
