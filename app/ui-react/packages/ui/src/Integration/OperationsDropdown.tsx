import { Dropdown, DropdownToggle } from '@patternfly/react-core';
import * as React from 'react';

export interface IOperationsDropdownProps {
  selectedOperation: React.ReactNode;
}
export const OperationsDropdown: React.FunctionComponent<
  IOperationsDropdownProps
> = ({ selectedOperation, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <Dropdown
      onSelect={closeDropdown}
      toggle={
        <DropdownToggle onToggle={toggleDropdown}>
          {selectedOperation}
        </DropdownToggle>
      }
      isOpen={isOpen}
    >
      {children}
    </Dropdown>
  );
};
