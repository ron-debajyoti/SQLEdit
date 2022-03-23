import React, { FormEvent, FormEventHandler, useState } from "react";
import styled from "styled-components/macro";
import ReactSelect, { MultiValue } from "react-select";
import { OptionsType, SelectedOptionsType, SelectionProps } from "./types/types";
import { Button } from "./Reusables";

const Form = styled.form`
  flex-direction: row;
  justify-content: center;
  margin: 1em;
  padding: 1em;
`;

/**
 * We have three statements supporting:
 *  - SELECT <columns>
 *  - FROM <table>
 *  - WHERE <condition>
 * 
 * @returns 
 */
const DropDownSelection = ({ columns, tableName, setFunction, bool, setBoolean }: SelectionProps) => {

  const [selectedColumns, setSelectedColumns] = useState<MultiValue<OptionsType>>();
  const columnOptions: Array<OptionsType> = columns.map((column) => {
    return {
      value: column.accessor,
      label: column.Header
    }
  });

  const tableOptions = [{
    value:tableName,
    label:tableName,
  }];


  const handleChange = (newValue: MultiValue<OptionsType>) => { setSelectedColumns(newValue) };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setFunction({
      select: selectedColumns?.map((col) => col.value),
      from: [tableName],
      setFrom: 'dropbutton'
    });
    setBoolean(true);
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    setBoolean(!bool);
    setFunction({} as SelectedOptionsType);
  }

  return (
    <div>
      <Form>
        <label>
          SELECT
          <ReactSelect
          options={columnOptions}
          isMulti={true}
          name="select"
          className="select-multi-dropdown"
          onChange={handleChange}
        />
        </label>
        <label>
          FROM
          <ReactSelect
          options={tableOptions}
          isMulti={true}
          name="From"
          className="from-multi-dropdown"
        />
        </label>
        <Button type='button' className="button-submit" onClick={handleSubmit}> Submit </Button>
        <Button type='button' className="button-reset" onClick={handleReset}> Reset </Button>
      </Form>
    </div>
  )

}

export default DropDownSelection;
