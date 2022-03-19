import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";

type DropzoneProps  = {
  onFileChange: any
}

const Dropzone = ({ onFileChange } : DropzoneProps) => {

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    multiple: false,
    accept: "text/csv, .json"
  })

  useEffect(() => {
    onFileChange(acceptedFiles[0]);
  },[acceptedFiles]);
  
  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.csv and *.json are accepted)</em>
      </div>
    </section>
  );
}

export default Dropzone;
