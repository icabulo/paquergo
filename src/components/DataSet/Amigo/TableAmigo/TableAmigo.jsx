// import { PostAmigo } from "../../components/PostAmigo";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const columns = [
  // { field: "wasteId", headerName: "ID Desecho", flex: 1 },
  {
    field: "date",
    headerName: "Fecha de entrega",
    flex: 1,
    valueFormatter: (params) => dayjs(params?.value).format("DD/MMMM/YYYY"),
  },
  { field: "description", headerName: "Descripción", flex: 1 },
  { field: "deliveryState", headerName: "Estatus de entrega", flex: 1 },
  {
    field: "wasteId",
    headerName: "Modificar",
    flex: 1,
    renderCell: ({ row: { wasteId } }) => {
      return <Button id={wasteId}>Editar</Button>;
    },
  },
  {
    field: "location",
    headerName: "Coordenadas",
    description: "hacer click para ver el mapa",
    flex: 1,
    renderCell: ({ row: { location } }) => {
      return `[${location[0].toFixed(3)} , ${location[1].toFixed(3)}]`;
    },
  },
];

function TableAmigo() {
  const { myWasteList } = useSelector((store) => store.user);

  return (
    <Box>
      <Typography>Mis avisos</Typography>
      <DataGrid
        rows={myWasteList}
        columns={columns}
        getRowId={(row) => row?.wasteId}
        components={{ Toolbar: GridToolbar }}
        disableRowSelectionOnClick
        // checkboxSelection
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 4,
        //     },
        //   },
        // }}
        // pageSizeOptions={[4]}
      />
    </Box>
  );
}

export default TableAmigo;
