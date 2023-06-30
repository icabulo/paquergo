import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import RecyclingIcon from "@mui/icons-material/Recycling";
import ChatIcon from "@mui/icons-material/Chat";

export default function PaquerxCard({ handleClick }) {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardActionArea onClick={() => handleClick("paquerx")}>
        <CardMedia
          component="img"
          //   height="140"
          image="https://res.cloudinary.com/didek0hyg/image/upload/v1688134369/xo5psko6kxmc9tnenm4r.png"
          alt="paca digestora con hoja"
          sx={{ width: 60, margin: "0 auto", padding: "0.5rem" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Paquerx
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hago pacas y busco desechos.
          </Typography>
          <List dense={true}>
            <ListItem>
              <ListItemIcon>
                <RecyclingIcon />
              </ListItemIcon>
              <ListItemText primary="Seleciona desechos de tus amigos abastecedores" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Organiza Pacas" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Coordina y habla en el chat" />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
