import React, { useMemo } from "react";

import styles from "./CompetencesTable.module.css";

import COLUMNS from "../columns/SupervisorCompetenceColumns";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import { GlobalFilter } from "../globalfilter/GlobalFilter";

const CompetencesTable = ({ objectData, setValue }) => {
  const columns = useMemo(() => COLUMNS(setValue), []);
  const data = useMemo(() => objectData, []);

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
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className={styles.container}>
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
      <div className={styles["pagination-container"]}>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={styles["pagination-button"]}
        >{`<<`}</button>
        <button
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}
          className={styles["pagination-button"]}
        >
          Previous
        </button>
        <div className={styles["goto-input"]}>
          | Go to page :
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
        </div>

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
        <div className={styles["pagination-input"]}>
          <label htmlFor="shownTable">Jumlah ditampilkan</label>
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
        </div>
      </div>
    </div>
  );
};

export default CompetencesTable;
