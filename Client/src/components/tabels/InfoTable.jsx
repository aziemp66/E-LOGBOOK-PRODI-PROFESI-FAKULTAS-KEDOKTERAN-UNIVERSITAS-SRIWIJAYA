import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

import styles from "./InfoTable.module.css";
import { GlobalFilter } from "../globalfilter/GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

import COLUMNS from "../columns/Columns";

const InfoTable = ({ objectType, stations, objectData, setValue }) => {
  const columns = useMemo(
    () => COLUMNS(objectType, objectData, stations, setValue),
    []
  );
  const data = useMemo(() => objectData, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <div>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </div>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >{`<<`}</button>
        <button
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <span>
          | Go to page:
          <input
            type="number"
            name="pageIndex"
            id="pageIndex"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              console.log(e.target.value);
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          name="pageSize"
          id="pageSize"
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
          disabled={!canNextPage}
        >
          {`>>`}
        </button>
      </div>
    </>
  );
};

export default InfoTable;
