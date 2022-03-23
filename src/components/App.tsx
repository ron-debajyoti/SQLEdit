/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import Dropzone from './Dropzone';
import DataTable from './DataTable';
import { DataType, AppFileType, SelectedOptionsType, TableColumn } from './types/types';
import parseDataToFormat from './utils/parseData';
import SelectSection from './SelectSection';
import { Div } from './Reusables';

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
        filteredColumnsContent = dataset.columns.filter((col) =>
          selectedOptions.select?.includes(col.accessor)
        );
      } else {
        filteredColumnsContent = dataset.columns.filter((col) =>
          selectedOptions.select?.includes(col.accessor.split('_')[0])
        );
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
          />
          <DataTable {...data} />
        </Div>
      );
    }
    return <Dropzone onFileChange={(changeFile: AppFileType) => setFile(changeFile)} />;
  };

  /* Main return of App */
  if (filteredDataset && filteredDataset.columns) {
    return (
      <div className="App">
        <header className="App-header">SQLEdit</header>
        <Renderer data={filteredDataset} setOptions={setSelectedOptions} />
      </div>
    );
  }
  if (dataset && dataset.columns) {
    return (
      <div className="App">
        <header className="App-header">SQLEdit</header>
        <Renderer data={dataset} setOptions={setSelectedOptions} />
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">SQLEdit</header>
      <Renderer data={dataset} setOptions={setSelectedOptions} />
    </div>
  );
};

export default App;
