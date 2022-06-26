import { format } from "date-fns";

export default (objectType, stations) => {
  if (objectType === "disease")
    return [
      {
        Header: "Id",
        accessor: "id",
        id: "id",
      },
      {
        Header: "Nama",
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
        Cell: ({ value }) => (
          <button onClick={() => console.log(value)}>Edit</button>
        ),
      },
      {
        Header: "Hapus",
        accessor: "id",
        id: "delete",
        Cell: ({ value }) => (
          <button onClick={() => console.log(value)}>Hapus</button>
        ),
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
