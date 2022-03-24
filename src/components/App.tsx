/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/no-shadow */

import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import { iNotification, ReactNotifications, Store } from 'react-notifications-component';
import Dropzone from './Dropzone';
import DataTable from './DataTable';
import { DataType, AppFileType, SelectedOptionsType, TableColumn } from './types/types';
import parseDataToFormat from './utils/parseData';
import SelectSection from './SelectSection';
import { Div, Section } from './Reusables';

import '../styles/App.css';

type RendererProps = {
  data: DataType;
  setOptions: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>;
};

const App = () => {
  const [file, setFile] = useState<AppFileType>({} as AppFileType);
  const [dataset, setDataset] = useState<DataType>({} as DataType);
  const [isEditor, setEditor] = useState(false);

  // for filtering
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>();
  const [filteredDataset, setFilteredDataset] = useState<DataType>();

  /**
   * Parse a CSV file
   */
  const parseCSVFile = async (file: AppFileType) =>
    parse<Array<string>, File>(file.file, {
      complete: (results) => {
        const { tableColumns, tableRows } = parseDataToFormat(results.data);
        setDataset({
          columns: tableColumns,
          table: file.file.name.split('.')[0],
          data: tableRows,
          type: 'csv',
        });
      },
    });

  useEffect(() => {
    if (file && file.file && file.file.name) {
      if (file.type === 'csv') {
        parseCSVFile(file);
      }
    }
  }, [file]);

  useEffect(() => {
    if (selectedOptions) {
      let filteredColumnsContent: TableColumn[];

      if (selectedOptions.setFrom === 'dropbutton') {
        // checking if * in columns is selected
        if (selectedOptions.select?.includes('*')) {
          filteredColumnsContent = dataset.columns;
        } else {
          filteredColumnsContent = dataset.columns.filter((col) =>
            selectedOptions.select?.includes(col.accessor)
          );
        }
      } else {
        // checking if * in columns is selected
        if (selectedOptions.select?.includes('*')) {
          filteredColumnsContent = dataset.columns;
        } else {
          filteredColumnsContent = dataset.columns.filter((col) =>
            selectedOptions.select?.includes(col.accessor.split('_')[0])
          );
        }
      }

      const filteredRows = dataset.data.map((dataEntry) => {
        const res: Record<any, string> = {};
        filteredColumnsContent.forEach((column) => {
          res[column.accessor] = dataEntry[column.accessor];
        });
        return res;
      });

      setFilteredDataset({
        columns: filteredColumnsContent,
        data: filteredRows,
        table: dataset.table,
        type: dataset.type,
      });
    } else {
      setFilteredDataset(undefined);
    }
  }, [selectedOptions]);

  const Renderer = ({ data, setOptions }: RendererProps) => {
    if (data && data.columns) {
      return (
        <Div className="query-entry-render" flexDirection="column">
          <SelectSection
            columns={data.columns}
            tableName={data.table}
            setFunction={setOptions}
            isEditor={isEditor}
            setEditor={setEditor}
            setErrorMessage={(message: iNotification) => {
              Store.addNotification({ ...message, container: 'top-center' });
            }}
          />
          <Section />
          <DataTable {...data} />
        </Div>
      );
    }
    return (
      <Dropzone
        onFileChange={(changeFile: AppFileType) => setFile(changeFile)}
        handleError={(message: iNotification) => {
          Store.addNotification({ ...message, container: 'top-center' });
        }}
      />
    );
  };

  /* Main return of App */

  // if filtered dataset exists
  if (filteredDataset && filteredDataset.columns) {
    return (
      <div className="App">
        <ReactNotifications />
        <header className="App-header">SQLEdit</header>
        <Renderer data={filteredDataset} setOptions={setSelectedOptions} />
      </div>
    );
  }
  // if dataset exists
  if (dataset && dataset.columns) {
    return (
      <div className="App">
        <ReactNotifications />
        <header className="App-header">SQLEdit</header>
        <Renderer data={dataset} setOptions={setSelectedOptions} />
      </div>
    );
  }

  // default JSX Element returned
  return (
    <div className="App">
      <ReactNotifications />
      <header className="App-header">SQLEdit</header>
      <Renderer data={dataset} setOptions={setSelectedOptions} />
    </div>
  );
};

export default App;
