import { nanoid } from "@reduxjs/toolkit";

export const userPacaList = [
  {
    pacaId: nanoid(),
    location: [4.660565311274803, -74.12050724029542],
    userName: "Mi usuario",
    userId: "testuser123",
    date: "24/jun/2023",
    pacaState: "finalizado", //nuevo, modificado, finalizado
  },
  {
    pacaId: nanoid(),
    location: [4.647187788649728, -74.09003734588624],
    userName: "Mi usuario",
    userId: "testuser123",
    date: "25/june/2023",
    pacaState: "modificado", //nuevo, modificado, finalizado
  },
  {
    pacaId: nanoid(),
    location: [4.6270515187308465, -74.07203435897829],
    userName: "Mi usuario",
    userId: "testuser123",
    date: "01/augost/2023",
    pacaState: "nuevo", //nuevo, modificado, finalizado
  },
];
