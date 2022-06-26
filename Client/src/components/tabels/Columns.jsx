import { format } from "date-fns";

export default (objectType, stations) => {
  if (objectType === "station")
    return [
      {
        Header: "Nama Stase",
        accessor: "name",
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
