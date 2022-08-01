import { format } from "date-fns";

import styles from "./Columns.module.css";

export default (objectType, objectData, stations, setValue) => {
  if (objectType === "station")
    return [
      {
        Header: "No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Nama Stase",
        accessor: "name",
      },
      {
        Header: "Waktu Dibuat",
        accessor: "createdAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Terakhir Diperbarui",
        accessor: "updatedAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
    ];
  if (objectType === "disease")
    return [
      {
        Header: "No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Nama Penyakit",
        accessor: "name",
      },
      {
        Header: "Stase",
        accessor: "station",
        Cell: ({ value }) =>
          stations.find((station) => station.id === +value).name,
      },

      {
        Header: "Waktu Dibuat",
        accessor: "createdAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Terakhir Diperbarui",
        accessor: "updatedAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
    ];
  if (objectType === "skill")
    return [
      {
        Header: "No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Nama Keterampilan",
        accessor: "name",
      },
      {
        Header: "Stase",
        accessor: "station",
        Cell: ({ value }) =>
          stations.find((station) => station.id === +value).name,
      },

      {
        Header: "Waktu Dibuat",
        accessor: "createdAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Terakhir Diperbarui",
        accessor: "updatedAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
    ];
  if (objectType === "guidance")
    return [
      {
        Header: "No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Nama Metode Pembelajaran",
        accessor: "name",
      },

      {
        Header: "Waktu Dibuat",
        accessor: "createdAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Terakhir Diperbarui",
        accessor: "updatedAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
    ];
  if (objectType === "hospital")
    return [
      {
        Header: "No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Nama Rumah Sakit",
        accessor: "name",
      },

      {
        Header: "Waktu Dibuat",
        accessor: "createdAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Terakhir Diperbarui",
        accessor: "updatedAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
    ];
};
