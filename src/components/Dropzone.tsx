import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDropzone } from 'react-dropzone';
import { iNotification } from 'react-notifications-component';

type DropzoneProps = {
  onFileChange: any;
  handleError: any;
};

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
  transition: 'border .24s ease-in-out',
};

const Section = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: stretch;
`;

const Dropzone = ({ onFileChange, handleError }: DropzoneProps) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'text/csv',
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const { type } = acceptedFiles[0];
      if (type === 'text/csv') {
        onFileChange({
          file: acceptedFiles[0],
          type: 'csv',
        });
      }
    }
    if (fileRejections.length > 0) {
      handleError({
        title: 'Error',
        message: `Unsupported file uploaded`,
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
  }, [acceptedFiles, fileRejections]);

  return (
    <Section className="dropzone-container">
      <div
        {...getRootProps({
          className: 'dropzone',
          style: dropzoneStyle,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop a csv file here, or click to select file</p>
        <em>(Only *.csv files are accepted)</em>
      </div>
    </Section>
  );
};

export default Dropzone;
