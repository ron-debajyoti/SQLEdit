import React, { FormEvent, FormEventHandler, useState } from "react";
import styled from "styled-components/macro";
import { useAsyncDebounce } from "react-table";
import ReactSelect, { ActionMeta, components, MultiValue, OnChangeValue } from "react-select";
import { OptionsType, SelectedOptionsType, TableColumn } from "./types";
import { Button } from "./Reusables";

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 1em;
  padding: 1em;
`;

type SelectionProps = {
  columns: Array<TableColumn>,
  tableName: string,
  setFunction: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>,
  setBoolean: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * We have three statements supporting:
 *  - SELECT <columns>
 *  - FROM <table>
 *  - WHERE <condition>
 * 
 * @returns 
 */
const SQLSelection = ({ columns, tableName, setFunction, setBoolean }: SelectionProps) => {

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
    console.log('fired');
    setFunction({
      select: selectedColumns?.map((col) => col.value),
      from: tableName,
    });
    setBoolean(true);
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
        <Button type='button' value='submit' onClick={handleSubmit}> Submit </Button>
      </Form>
    </div>
  )

}

export default SQLSelection;
