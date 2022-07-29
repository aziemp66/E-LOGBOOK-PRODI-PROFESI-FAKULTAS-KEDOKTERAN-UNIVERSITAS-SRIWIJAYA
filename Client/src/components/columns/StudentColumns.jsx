import { format } from "date-fns";

import styles from "./Columns.module.css";

import React from "react";

export default (setValue) => {
  return [
    {
      Header: "No.",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Nama Siswa",
      accessor: "studentName",
    },
    {
      Header: "NIM",
      accessor: "studentNumber",
    },
    {
      Header: "Stase",
      accessor: "stationName",
    },
    {
      Header: "Hadir",
      accessor: "present",
    },
    {
      Header: "Alfa",
      accessor: "absent",
    },
    {
      Header: "Sakit",
      accessor: "sick",
    },
    {
      Header: "Izin",
      accessor: "excused",
    },
    {
      Header: "Edit",
      accessor: "id",
      id: "edit",
      Cell: ({ value }) => {
        return (
          <button
            onClick={() => {
              setValue("id", value);
              setValue("requestType", "patch");
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Edit
            </a>
          </button>
        );
      },
    },
  ];
};
