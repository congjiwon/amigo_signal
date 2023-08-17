import React, { useRef, useState } from 'react';

import { useBoolean, useClickAway } from '../../hooks';

interface DropdownProps {
  options: string[];
  selected?: number;
  size?: string;
  border?: boolean;
  onChange: (value: string) => void;
  text?: string;
}

type DropdownType = Record<string, string>;

export const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange, size = 'md', border = false, text = '선택하세요' }) => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(selected !== undefined ? options[selected - 1] : null);

  const dropdownBorder = 'border-[1px] border-gray4 rounded-xl overflow-hidden';

  const dropdownSize: DropdownType = {
    sm: 'min-w-[50px]',
    md: 'min-w-[100px]',
    lg: 'min-w-[150px]',
  };

  const flex = 'flex justify-center items-center';
  const flexCol = 'flex-col justify-center items-center';

  const containerRef = useRef(null);

  const selectOption = (option: string) => {
    if (option.length === 0) return;
    setSelectedOption(option);
    setIsOpen.off();
    onChange(option);
  };
  useClickAway({ ref: containerRef, callback: setIsOpen.off });

  return (
    <div className={`relative ${dropdownSize[size]} drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10`} ref={containerRef}>
      <button className={`bg-white ${flex} ${dropdownSize[size]} ${border ? dropdownBorder : ''} p-[4px]`} onClick={setIsOpen.toggle}>
        {selectedOption === null ? text : selectedOption} <span className="text-[12px] ml-1"> ▼</span>
      </button>
      {isOpen && (
        <ul className={`absolute ${flexCol} ${dropdownSize[size]} bg-slate-50 z-10 mt-[5px] border-[1px] ${border ? dropdownBorder : ''}`}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-option ${flex} bg-slate-50 cursor-pointer w-full ${border ? 'border-b-[1px] border-black' : ''}p-[2px]
              hover:bg-gray2`}
              onClick={() => {
                selectOption(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
