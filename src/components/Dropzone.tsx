import React from "react";
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
    accept: "text/csv, .json"
  })

  const acceptedFileItems = acceptedFiles.map(file => onFileChange(file));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={uuid()}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.csv and *.json are accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default Dropzone;
