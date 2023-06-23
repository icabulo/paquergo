import { nanoid } from "@reduxjs/toolkit";

export const userWasteList = [
  {
    wasteId: nanoid(),
    location: [4.6858728675987305, -74.04599777688877],
    date: "25/jun/2023",
    description: "2 cajas con papeles y cáscaras",
    deliveryState: "pendiente", //pendiente, asignado, entregado
  },
  {
    wasteId: nanoid(),
    location: [4.68346309179318, -74.06198447697791],
    date: "21/june/2023",
    description: "2 canecas con restos de comida",
    deliveryState: "asignado", //pendiente, asignado, entregado
  },
  {
    wasteId: nanoid(),
    location: [4.725143170515088, -74.06529253657476],
    date: "19/augost/2023",
    description: "1 bolsa grande con desechos vegetales",
    deliveryState: "entregado", //pendiente, asignado, entregado
  },
];
