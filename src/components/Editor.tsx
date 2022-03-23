import React, { FormEvent, useState } from 'react';
import AceEditor from 'react-ace';
import { v4 as uuid } from 'uuid';
import { Parser } from 'node-sql-parser';
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-min-noconflict/theme-github";
import { Div, Button } from './Reusables';
import { SelectedOptionsType } from './types/types';

const parser = new Parser();

type EditorProps = {
  setQuery: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>
  setFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const Editor = ({ setQuery, setFilter } : EditorProps) => {

  const [queryString, setQueryString ] = useState('');
  // console.log(queryString);

  const handleButtonClick = (event: FormEvent) => {
    event.preventDefault();
    const ast = parser.astify(queryString);
    const { columns, from, where } = ast as any;
    const parsedColumns = columns.map((col:any) => col.expr.column);
    const parseTables = from.map((fr:any) => fr.table);
    const parseConditions = JSON.stringify(where);

    console.log(`INSIDE EDITOR: ${[parsedColumns,parseTables]}`);
    setQuery({
      select: parsedColumns,
      from: parseTables,
      where: parseConditions,
      setFrom: 'editor'
    });

    setFilter(true);
  }

  return(
    <Div className='sql-editor-section' flexDirection='column' width='100%'>
      <AceEditor 
        aria-label="query editor input"
        mode="mysql"
        theme="github"
        name={uuid()}
        fontSize={16}
        maxLines={6}
        minLines={6}
        width="100%"
        showPrintMargin={false}
        showGutter
        highlightActiveLine={false}
        placeholder={'Enter Query'}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={queryString}
        onChange={setQueryString}
        className="sql-editor"
      />
      <Button onClick={handleButtonClick}>Submit Query</Button>
    </Div>
  )
}

export default Editor;
