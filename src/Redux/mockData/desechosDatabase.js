import { nanoid } from "@reduxjs/toolkit";

export const allAmigos = [
  {
    wasteId: nanoid(),
    location: {
      lat: "4.718988391574173",
      lng: "-74.11174240181649",
    },
    info: {
      userName: "Esmeralda",
      userId: nanoid(),
      date: "17 junio 2023",
      description: "Dos canecas de 5 litros",
    },
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.7276349170066165",
      lng: "-74.10388297600186",
    },
    info: {
      userName: "Ricardo",
      userId: nanoid(),
      date: "19 junio 2023",
      description: "2kg de cascaras picadas",
    },
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.720361670460826",
      lng: "-74.12230669495692",
    },
    info: {
      userName: "Diego",
      userId: nanoid(),
      date: "20 junio 2023",
      description: "3 bolsas medianas con desechos orgánicos",
    },
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.725143170515088",
      lng: "-74.06529253657476",
    },
    info: {
      userName: "Diana",
      userId: nanoid(),
      date: "19 junio 2023",
      description: "1 bolsa grande con desechos vegetales",
    },
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.68346309179318",
      lng: "-74.06198447697791",
    },
    info: {
      userName: "Manuel",
      userId: nanoid(),
      date: "21 junio 2023",
      description: "2 canecas con restos de comida",
    },
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.6858728675987305",
      lng: "-74.04599777688877",
    },
    info: {
      userName: "Rosa",
      userId: nanoid(),
      date: "25 junio 2023",
      description: "2 cajas con papeles y cáscaras",
    },
  },
];
