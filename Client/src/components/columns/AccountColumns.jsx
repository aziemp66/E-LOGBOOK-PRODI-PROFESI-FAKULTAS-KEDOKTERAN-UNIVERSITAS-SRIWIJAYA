import { format } from "date-fns";

export default [
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
