/* eslint-disable import/no-extraneous-dependencies */
import React, { FormEvent, useState } from 'react';
import AceEditor from 'react-ace';
import { v4 as uuid } from 'uuid';
import { Parser } from 'node-sql-parser';
import { iNotification } from 'react-notifications-component';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/mode-mysql';
import 'ace-builds/src-min-noconflict/theme-github';
import { Div, Button } from './Reusables';
import { SelectedOptionsType } from './types/types';

import 'react-notifications-component/dist/theme.css';

const parser = new Parser();

type EditorProps = {
  setQuery: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>;
  setErrorMessage: any;
};

const Editor = ({ setQuery, setErrorMessage }: EditorProps) => {
  const [queryString, setQueryString] = useState('');

  const handleButtonClick = (event: FormEvent) => {
    event.preventDefault();
    let ast;
    try {
      ast = parser.astify(queryString);
    } catch (err) {
      setErrorMessage({
        title: 'Error',
        message: 'Incorrect SQL statement',
        type: 'danger',
        insert: 'top',
        container: 'top-center',
        animationIn: ['animate__animated animate__fadeIn'],
        animationOut: ['animate__animated animate__fadeOut'],
        dismiss: {
          duration: 2000,
        },
      } as iNotification);
    }

    const { columns, from, where } = ast as any;

    // checking if 'columns' and 'from' is undefined

    if (!columns || !from || columns.length === 0 || from.length === 0) {
      setErrorMessage({
        title: 'Error',
        message: `Either 'select' or 'from' is missing`,
        type: 'danger',
        insert: 'top',
        container: 'top-center',
        animationIn: ['animate__animated animate__fadeIn'],
        animationOut: ['animate__animated animate__fadeOut'],
        dismiss: {
          duration: 2000,
        },
      } as iNotification);
      return;
    }

    let parsedColumns;
    if (columns === '*') {
      parsedColumns = ['*'];
    } else {
      parsedColumns = columns.map((col: any) => col.expr.column);
    }
    const parseTables = from.map((fr: any) => fr.table);
    const parseConditions = JSON.stringify(where);

    setQuery({
      select: parsedColumns,
      from: parseTables,
      where: parseConditions,
      setFrom: 'editor',
    });
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    setQuery(undefined);
  };

  return (
    <Div className="sql-editor-section" flexDirection="column" width="100%">
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
        placeholder="Enter Query"
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
      <Div className="button-section" flexDirection="row">
        <Button onClick={handleButtonClick}>Submit Query</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Div>
    </Div>
  );
};

export default Editor;
