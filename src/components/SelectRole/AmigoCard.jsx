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
import { PropTypes } from "prop-types";

export default function AmigoCard({ handleRole }) {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardActionArea onClick={() => handleRole("amigo")}>
        <CardMedia
          component="img"
          //   height="140"
          image="https://res.cloudinary.com/didek0hyg/image/upload/v1686761858/noupix9ekpbs6scseuvy.png"
          alt="paca digestora con hoja"
          sx={{ width: 60, margin: "0 auto", padding: "0.5rem" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Amigo Abastecedor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Entrego desechos para Pacas.
          </Typography>
          <List dense={true}>
            <ListItem>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Busca Pacas cerca" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <RecyclingIcon />
              </ListItemIcon>
              <ListItemText primary="Avisa para entregar desechos" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Coordina entregas por chat" />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AmigoCard.propTypes = {
  handleRole: PropTypes.func,
};
