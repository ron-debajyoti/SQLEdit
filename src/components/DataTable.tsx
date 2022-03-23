import React, { memo } from 'react';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components/macro';
import { isEqual } from 'lodash';
import { DataType } from './types/types';

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

// function areEqual(prevProps: DataType, nextProps: DataType): boolean {
//   if (prevProps.table !== nextProps.table && prevProps.table !== undefined) return false;

//   // compare columns first
//   if (prevProps.columns.length !== nextProps.columns.length) return false;
//   if (!isEqual(prevProps.columns, nextProps.columns)) return false;

//   if (prevProps.data.length !== nextProps.data.length) return false;
//   if (!isEqual(prevProps.data, nextProps.data)) return false;

//   return true;
// }

const DataTable = ({ columns, data, table }: DataType) => {
  console.log(columns);
  console.log(data);
  console.log(table);

  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <Styles>
      <div className="data-table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Styles>
  );
};

export default memo(DataTable);
