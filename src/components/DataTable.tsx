import React, { memo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import styled from 'styled-components/macro';
import { DataType } from './types/types';
import { H3 } from './Reusables';

const Styles = styled.div`
  display: block;
  max-width: 100%;

  padding: 1rem;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid black;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    font-size: 0.9em;
    font-family: sans-serif;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    thead tr {
      background-color: #009879;
      color: #ffffff;
      text-align: left;
    }

    th,
    td {
      margin: 5px;
      padding: 12px 15px;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    tbody tr {
      border-bottom: 1px solid #dddddd;
    }

    tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    tbody tr:last-of-type {
      border-bottom: 2px solid #009879;
    }

    tbody tr.active-row {
      font-weight: bold;
      color: #009879;
    }
  }
`;

const DataTable = ({ columns, data, table }: DataType) => {
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <Styles>
      <H3> Query Results from {table} </H3>
      <div className="data-table" style={{ margin: '1em' }}>
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
            {page.map((row) => {
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
        <div className="pagination">
          <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNow = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNow);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSizeNow) => (
              <option key={pageSizeNow} value={pageSizeNow}>
                Show {pageSizeNow}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Styles>
  );
};

export default memo(DataTable);
