import React, { useEffect, useMemo, memo } from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table';
import styled from "styled-components/macro";
import { DataType } from "./types";

const Styles = styled.div`
  display: block;
  max-width: 100%;

  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;


const DataTable = ({ columns, data, type } : DataType) => {

  console.log(`Inside dataset : ${columns} and ${data}`);

  console.log(columns);
  console.log(data);

  const tableInstance = useTable({ columns, data }, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
  <Styles>
    <div className="data-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )}
          )}
        </tbody>
      </table>
    </div>
  </Styles>
  )
};

export default memo(DataTable);