import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps  = {
  onFileChange: any
}

const dropzoneStyle: Record<any, any> = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: 'black',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};


const Dropzone = ({ onFileChange } : DropzoneProps) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    multiple: false,
    accept: "text/csv, application/json"
  })

  useEffect(() => {
    if(acceptedFiles.length>0) {
      const { type } = acceptedFiles[0]
      if(type === 'application/json') {
        onFileChange({
          file: acceptedFiles[0], 
          type: 'json'
        });
      } else {
        onFileChange({
          file: acceptedFiles[0], 
          type: 'csv'
        });
      }

    }
  },[acceptedFiles]);
  
  return (
    <section className="dropzone-container">
      <div {...getRootProps({ 
        className: 'dropzone', 
        style: dropzoneStyle
        })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.csv and *.json are accepted)</em>
      </div>
    </section>
  );
}

export default Dropzone;
