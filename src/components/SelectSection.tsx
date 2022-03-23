import React, { useState, memo } from 'react';
import styled from 'styled-components/macro';
import { SelectedOptionsType, TableColumn } from './types/types';
import Editor from './Editor';
import { Div, Button } from './Reusables';
import DropDownSelection from './Dropdown';

type SelectSectionProps = {
  columns: Array<TableColumn>,
  tableName: string,
  setFunction: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>,
  bool: boolean,
  setBoolean: React.Dispatch<React.SetStateAction<boolean>>,
  isEditor: boolean,
  setEditor: React.Dispatch<React.SetStateAction<boolean>>,
}

const SelectSection = ({ 
  columns, 
  tableName, 
  setFunction, 
  bool, 
  setBoolean, 
  isEditor, 
  setEditor 
} : SelectSectionProps) => {
  
  const handleSection = () => {
    setEditor(!isEditor);
  }

  if(isEditor) {
    return(
    <Div className='section-dropdown' flexDirection='column' flexGrow={1} width='100%'>
      <Editor setQuery={setFunction} setFilter={setBoolean} />
      <Button onClick={handleSection}> Switch to Dropdown Selection </Button>
    </Div>
    );
  }
  
  return(
    <Div className='section-editor' flexDirection='column'>
      <DropDownSelection {...{ columns, tableName, setFunction, bool, setBoolean }} />
      <Button onClick={handleSection}> Switch to Editor </Button>
    </Div>
  )
  
};

export default SelectSection;
