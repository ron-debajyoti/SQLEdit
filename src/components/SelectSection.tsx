import React, { useState } from 'react';
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
  setEditorStringQuery: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>
}

const SelectSection = ({ columns, tableName, setFunction, bool, setBoolean, setEditorStringQuery } : SelectSectionProps) => {
  const [ isEditor, setEditor ] = useState(false);
  
  const handleSection = () => {
    setEditor(!isEditor);
  }

  if(isEditor) {
    return(
    <Div className='section-dropdown' flexDirection='column' flexGrow={1} width='100%'>
      <Editor setQuery={setEditorStringQuery} />
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
