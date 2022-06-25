import { format } from "date-fns";

export const DISEASE_COLUMNS = (stationData) => {
  return [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Nama",
      accessor: "name",
    },
    {
      Header: "Stase",
      accessor: "station",
      Cell: ({ value }) =>
        stationData.find((station) => station.id === value).name,
    },
    {
      Header: "Waktu Dibuat",
      accessor: "createdAt",
      Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      Header: "Terakhir Diubah",
      accessor: "updatedAt",
      Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
  ];
};
