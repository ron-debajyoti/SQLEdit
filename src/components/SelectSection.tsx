import React, { useEffect, useState } from 'react';
import { SelectedOptionsType, TableColumn } from './types/types';
import Editor from './Editor';
import { Button } from './Reusables';
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
    <div>
      <Editor setQuery={setEditorStringQuery} />
      <Button onClick={handleSection}> Switch to Toggle Selection </Button>
    </div>
    );
  }
  
  return(
    <div>
      <DropDownSelection {...{ columns, tableName, setFunction, bool, setBoolean }} />
      <Button onClick={handleSection}> Switch to Editor </Button>
    </div>
  )
  
};

export default SelectSection;
