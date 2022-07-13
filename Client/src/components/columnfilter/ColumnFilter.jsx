import React from "react";

import styles from "./ColumnFilter.module.css";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <div>Search : {` `}</div>
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className={styles["filter-input"]}
      />
    </div>
  );
};
