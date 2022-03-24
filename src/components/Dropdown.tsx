import React, { FormEvent, useState } from 'react';
import styled from 'styled-components/macro';
import ReactSelect, { MultiValue } from 'react-select';
import { OptionsType, SelectionProps } from './types/types';
import { Div, Button } from './Reusables';

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1em;
  padding: 1em;
  align-items: end;
`;

const Label = styled.label`
  margin: 0.5vh;
  padding: 0.5vh;
`;

/**
 * We have three statements supporting:
 *  - SELECT <columns>
 *  - FROM <table>
 *  - WHERE <condition>
 *
 * @returns
 */
const DropDownSelection = ({ columns, tableName, setFunction }: SelectionProps) => {
  const [selectedColumns, setSelectedColumns] = useState<MultiValue<OptionsType>>();
  const columnOptions: Array<OptionsType> = columns.map((column) => ({
    value: column.accessor,
    label: column.Header,
  }));

  // Adding * option for tables
  columnOptions.push({
    value: '*',
    label: '*',
  });

  const tableOptions = [
    {
      value: tableName,
      label: tableName,
    },
  ];

  const handleChange = (newValue: MultiValue<OptionsType>) => {
    setSelectedColumns(newValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFunction({
      select: selectedColumns?.map((col) => col.value),
      from: [tableName],
      setFrom: 'dropbutton',
    });
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    setFunction(undefined);
  };

  return (
    <Div className="form-dropdown-div">
      <Form>
        <Label>
          SELECT
          <ReactSelect
            options={columnOptions}
            isMulti
            name="select"
            className="select-multi-dropdown"
            onChange={handleChange}
          />
        </Label>
        <Label>
          FROM
          <ReactSelect options={tableOptions} isMulti name="From" className="from-multi-dropdown" />
        </Label>
        <Button type="button" className="button-submit" onClick={handleSubmit}>
          {' '}
          Submit Query{' '}
        </Button>
        <Button type="button" className="button-reset" onClick={handleReset}>
          {' '}
          Reset{' '}
        </Button>
      </Form>
    </Div>
  );
};

export default DropDownSelection;
