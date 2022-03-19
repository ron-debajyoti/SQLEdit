import React, { useEffect, useMemo, memo } from "react";
import { useTable } from 'react-table';
import { DataTableProps } from "./types";
import { parseDataToFormat } from './utils/parseData';

const DataTable = ({ columns, data } : DataTableProps) => {

  console.log(`Inside dataset : ${columns} and ${data}`);

  const { tableColumns, tableRows } = parseDataToFormat({columns, data});

  console.log(tableColumns);
  console.log(tableRows);

  const tableInstance = useTable({ columns:tableColumns, data:tableRows });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="data-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
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
  )
};

export default memo(DataTable);