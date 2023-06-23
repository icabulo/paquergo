import { nanoid } from "@reduxjs/toolkit";

export const allAmigos = [
  {
    wasteId: nanoid(),
    location: {
      lat: "4.718988391574173",
      lng: "-74.11174240181649",
    },
    userName: "Esmeralda",
    userId: nanoid(),
    date: "17 junio 2023",
    description: "Dos canecas de 5 litros",
    deliveryState: "pendiente", //pendiente, asignado, entregado
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.7276349170066165",
      lng: "-74.10388297600186",
    },
    userName: "Ricardo",
    userId: nanoid(),
    date: "19 junio 2023",
    description: "2kg de cascaras picadas",
    deliveryState: "pendiente",
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.720361670460826",
      lng: "-74.12230669495692",
    },
    userName: "Diego",
    userId: nanoid(),
    date: "20 junio 2023",
    description: "3 bolsas medianas con desechos orgánicos",
    deliveryState: "pendiente",
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.725143170515088",
      lng: "-74.06529253657476",
    },
    userName: "Diana",
    userId: nanoid(),
    date: "19 junio 2023",
    description: "1 bolsa grande con desechos vegetales",
    deliveryState: "pendiente",
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.68346309179318",
      lng: "-74.06198447697791",
    },
    userName: "Manuel",
    userId: nanoid(),
    date: "21 junio 2023",
    description: "2 canecas con restos de comida",
    deliveryState: "pendiente",
  },
  {
    wasteId: nanoid(),
    location: {
      lat: "4.6858728675987305",
      lng: "-74.04599777688877",
    },
    userName: "Rosa",
    userId: nanoid(),
    date: "25 junio 2023",
    description: "2 cajas con papeles y cáscaras",
    deliveryState: "pendiente",
  },
];
