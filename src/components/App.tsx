import React, { useState } from 'react';
import Dropzone from './Dropzone';
import DataTable from './DataTable';
import '../styles/App.css';

function App() {

  const [file, setFile] = useState<File>({} as File);

  console.log(file);


  if(file.name !== undefined) {
    return(
      <div className="App">
        <header className="App-header">
          SQLEdit
        </header>
        <DataTable />
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
