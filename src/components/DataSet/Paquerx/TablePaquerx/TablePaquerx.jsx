// import { PostAmigo } from "../../components/PostAmigo";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const columns = [
  {
    field: "date",
    headerName: "Fecha de evento",
    flex: 1,
    valueFormatter: (params) => dayjs(params?.value).format("DD/MMMM/YYYY"),
  },
  { field: "pacaState", headerName: "Estatus de paca", flex: 1 },
  {
    field: "pacaId",
    headerName: "Modificar",
    flex: 1,
    renderCell: ({ row: { pacaId } }) => {
      return <Button id={pacaId}>Editar</Button>;
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

function TablePaquerx() {
  const { myPacaList } = useSelector((store) => store.user);

  return (
    <Box>
      <Typography>Mis Pacas</Typography>
      <DataGrid
        rows={myPacaList}
        columns={columns}
        getRowId={(row) => row?.pacaId}
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

export default TablePaquerx;
