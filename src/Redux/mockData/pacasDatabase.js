import { nanoid } from "@reduxjs/toolkit";

export const allPacas = [
  {
    pacaId: nanoid(),
    location: {
      lat: "4.722426952302509",
      lng: "-74.11403967667448",
    },
    userName: "Juan",
    userId: nanoid(),
    date: "20 junio 2023",
  },
  {
    pacaId: nanoid(),
    location: {
      lat: "4.730681303635183",
      lng: "-74.06695036305749",
    },
    userName: "Carolina",
    userId: nanoid(),
    date: "25 junio 2023",
  },
  {
    pacaId: nanoid(),
    location: {
      lat: "4.687091055385606",
      lng: "-74.05164932301005",
    },
    userName: "Miguel",
    userId: nanoid(),
    date: "03 julio 2023",
  },
];
