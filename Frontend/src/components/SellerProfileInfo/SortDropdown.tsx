import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

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
    <DropdownWrapper className={className} ref={ref}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedLabel}
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              isSelected={option.value === selected}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};

export default SortDropdown;

// Styled Components
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
`;

const Arrow = styled.span`
  float: right;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "#f0f0f0" : "transparent"};
  color: black; /* Set the font color to black */

  &:hover {
    background-color: #f0f0f0;
  }
`;
