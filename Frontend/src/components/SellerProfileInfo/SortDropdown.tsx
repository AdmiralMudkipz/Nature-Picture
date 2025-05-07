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
  value?: string; 
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  onSortChange,
  defaultValue,
  className = "",
  value,
}) => {

  const initialValue = value !== undefined ? value : defaultValue || options[0].value;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    // Make sure selected has a value on initial render
    if (!selected && options.length > 0) {
      setSelected(options[0].value);
    }
  }, []);

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

  // Find the selected option's label - default to the first option if nothing is selected
  const selectedOption = options.find((opt) => opt.value === selected) || options[0];
  const selectedLabel = selectedOption.label;

  return (
    <DropdownWrapper className={className} ref={ref}>
      <DropdownButton onClick={toggleDropdown}>
        <ButtonText>{selectedLabel}</ButtonText>
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

// Styled Components
const DropdownWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`;

const DropdownButton = styled.button`
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 12px;
  width: 100%;
  min-width: 150px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Arrow = styled.span`
  margin-left: 8px;
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
  padding: 0;
  margin: 0;
  list-style: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "#f0f0f0" : "transparent"};
  color: black;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SortDropdown;