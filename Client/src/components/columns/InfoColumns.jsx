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
        Header: "Edit",
        accessor: "id",
        id: "edit",
        Cell: ({ value }) => {
          const name = objectData.find((data) => data.id === +value).name;

          return (
            <button
              onClick={() => {
                setValue("id", value);
                setValue("requestType", "patch");
                setValue("name", name);
              }}
              className={styles.button}
            >
              <a href="#form" className={styles.link}>
                Edit
              </a>
            </button>
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Hapus",
        accessor: "id",
        id: "delete",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              const name = objectData.find((data) => data.id === +value).name;
              setValue("id", value);
              setValue("requestType", "delete");
              setValue("name", name);
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Hapus
            </a>
          </button>
        ),
        disableFilters: true,
        disableSortBy: true,
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
        Header: "Edit",
        accessor: "id",
        id: "edit",
        Cell: ({ value }) => {
          const name = objectData.find((data) => data.id === +value).name;

          return (
            <button
              onClick={() => {
                setValue("id", value);
                setValue("requestType", "patch");
                setValue("name", name);
              }}
              className={styles.button}
            >
              <a href="#form" className={styles.link}>
                Edit
              </a>
            </button>
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Hapus",
        accessor: "id",
        id: "delete",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              const name = objectData.find((data) => data.id === +value).name;
              setValue("id", value);
              setValue("requestType", "delete");
              setValue("name", name);
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Hapus
            </a>
          </button>
        ),
        disableFilters: true,
        disableSortBy: true,
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
        Header: "Edit",
        accessor: "id",
        id: "edit",
        Cell: ({ value }) => {
          const name = objectData.find((data) => data.id === +value).name;

          return (
            <button
              onClick={() => {
                setValue("id", value);
                setValue("requestType", "patch");
                setValue("name", name);
              }}
              className={styles.button}
            >
              <a href="#form" className={styles.link}>
                Edit
              </a>
            </button>
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Hapus",
        accessor: "id",
        id: "delete",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              const name = objectData.find((data) => data.id === +value).name;
              setValue("id", value);
              setValue("requestType", "delete");
              setValue("name", name);
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Hapus
            </a>
          </button>
        ),
        disableFilters: true,
        disableSortBy: true,
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
        Header: "Edit",
        accessor: "id",
        id: "edit",
        Cell: ({ value }) => {
          const name = objectData.find((data) => data.id === +value).name;

          return (
            <button
              onClick={() => {
                setValue("id", value);
                setValue("requestType", "patch");
                setValue("name", name);
              }}
              className={styles.button}
            >
              <a href="#form" className={styles.link}>
                Edit
              </a>
            </button>
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Hapus",
        accessor: "id",
        id: "delete",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              const name = objectData.find((data) => data.id === +value).name;
              setValue("id", value);
              setValue("requestType", "delete");
              setValue("name", name);
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Hapus
            </a>
          </button>
        ),
        disableFilters: true,
        disableSortBy: true,
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
        Header: "Edit",
        accessor: "id",
        id: "edit",
        Cell: ({ value }) => {
          const name = objectData.find((data) => data.id === +value).name;

          return (
            <button
              onClick={() => {
                setValue("id", value);
                setValue("requestType", "patch");
                setValue("name", name);
              }}
              className={styles.button}
            >
              <a href="#form" className={styles.link}>
                Edit
              </a>
            </button>
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "Hapus",
        accessor: "id",
        id: "delete",
        Cell: ({ value }) => (
          <button
            onClick={() => {
              const name = objectData.find((data) => data.id === +value).name;
              setValue("id", value);
              setValue("requestType", "delete");
              setValue("name", name);
            }}
            className={styles.button}
          >
            <a href="#form" className={styles.link}>
              Hapus
            </a>
          </button>
        ),
        disableFilters: true,
        disableSortBy: true,
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
