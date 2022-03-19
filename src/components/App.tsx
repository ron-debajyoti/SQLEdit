import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import Dropzone from './Dropzone';
import DataTable from './DataTable';
import { DataType } from './types';
import '../styles/App.css';


const App = () => {
  const [file, setFile] = useState<File>({} as File);
  const [dataset, setDataset] = useState<DataType>({} as DataType);

  const parseCSVFile = async (file:File) => {
    return parse<Array<string>,File>(file, {
      complete: (results) => {
        if(results.errors.length > 0){
          throw results.errors;
        }
        setDataset({
          columns: results.data[0],
          data: results.data.slice(1,results.data.length)
        });
      }
     });
  }

  useEffect(() => {
    if(file && file.name){
      parseCSVFile(file);
    }
  },[file]);


  if(dataset && dataset.columns) {
    console.log('called');
    console.log(file);
    console.log(dataset);
    return(
      <div className="App">
        <header className="App-header">
          SQLEdit
        </header>
        
        <DataTable columns={dataset.columns} data={dataset.data}/>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        SQLEdit
      </header>
      <Dropzone onFileChange={(file:File) => setFile(file)}/>
    </div>
  );
}

export default App;
