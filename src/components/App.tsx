import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import Dropzone from './Dropzone';
import DataTable from './DataTable';
import { DataType, AppFileType } from './types';
import { parseDataToFormat } from './utils/parseData';

import '../styles/App.css';
import SQLSelection from './SQLSelection';

const App = () => {
  const [file, setFile] = useState<AppFileType>({} as AppFileType);
  const [dataset, setDataset] = useState<DataType>({} as DataType);

  const parseCSVFile = async (file: AppFileType) => {
    return parse<Array<string>,File>(file.file, {
      complete: (results) => {
        const { tableColumns, tableRows} = parseDataToFormat(results.data)
        setDataset({
          columns: tableColumns,
          data: tableRows,
          type:'csv',
        });
      }
    });
  }

  useEffect(() => {
    if(file && file.file && file.file.name){
      if (file.type === 'csv') {
        parseCSVFile(file);
      }
    }
  },[file]);


  if(dataset && dataset.columns) {
    return(
      <div className="App">
        <header className="App-header">
          SQLEdit
        </header>
        <SQLSelection />
        <DataTable columns={dataset.columns} data={dataset.data} type={dataset.type}/>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        SQLEdit
      </header>
      <Dropzone onFileChange={(file:AppFileType) => setFile(file)}/>
    </div>
  );
}

export default App;
