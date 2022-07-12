import { format } from "date-fns";

import styles from "./Columns.module.css";

export default (objectData, setValue) => {
  return [
    {
      Header: "No.",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "roles",
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
              setValue(
                "username",
                objectData.find((data) => data.id === +value).username
              );
              setValue(
                "role",
                objectData.find((data) => data.id === +value).roles
              );
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
    {
      Header: "Dibuat Pada",
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
