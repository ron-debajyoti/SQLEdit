import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import Dropzone from './Dropzone';
import DataTable from './DataTable';
import { DataType, AppFileType, OptionsType, SelectedOptionsType } from './types/types';
import { parseDataToFormat } from './utils/parseData';
import SelectSection from './SelectSection';

import '../styles/App.css';


type RendererProps = {
  dataset: DataType,
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>> ,
  isFiltered: boolean,
  setFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const App = () => {
  const [file, setFile] = useState<AppFileType>({} as AppFileType);
  const [dataset, setDataset] = useState<DataType>({} as DataType);
  
  // for filtering
  const [isFiltered, setFilter] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>();
  const [filteredDataset, setFilteredDataset] = useState<DataType>({} as DataType)

  const parseCSVFile = async (file: AppFileType) => {
    return parse<Array<string>,File>(file.file, {
      complete: (results) => {
        const { tableColumns, tableRows} = parseDataToFormat(results.data)
        setDataset({
          columns: tableColumns,
          table: file.file.name.split('.')[0],
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


  useEffect(() => {
    if(selectedOptions) {
      console.log(selectedOptions);
      const filteredColumnsContent = dataset.columns.filter(
        (col) => selectedOptions.select?.includes(col.accessor) );
      
      const filteredRows = dataset.data.map((dataEntry) => {
        var res:Record<any, string> = {}
        filteredColumnsContent.forEach((column) => {
          res[column.accessor] = dataEntry[column.accessor]
        });
        return res;
      });

      setFilteredDataset({
        columns: filteredColumnsContent,
        data:filteredRows,
        table:dataset.table,
        type: dataset.type
      });
    }
  },[selectedOptions]);


  const Renderer = ({ dataset, setSelectedOptions, isFiltered, setFilter }: RendererProps) => {
    if(dataset && dataset.columns) {
      return(
        <div className="Renderer">
          <SelectSection 
            columns={dataset.columns} 
            tableName={dataset.table} 
            setFunction={setSelectedOptions}
            bool={isFiltered}
            setEditorStringQuery={setSelectedOptions}
            setBoolean={setFilter}
          />
          <DataTable {...dataset}/>
        </div>
      );
    }
    return(
      <Dropzone onFileChange={(file:AppFileType) => setFile(file)}/>
    )
  }



  /* Main return of App */
  if (isFiltered && filteredDataset && filteredDataset.columns) {
    return (
      <div className="App">
        <header className="App-header">
          SQLEdit
        </header>
        <Renderer 
          dataset={filteredDataset} 
          { ...{ setSelectedOptions, isFiltered, setFilter } }
        />
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        SQLEdit
      </header>
      <Renderer 
        dataset={dataset} 
        { ...{ setSelectedOptions, isFiltered, setFilter } }
      />
    </div>
  );
}

export default App;
