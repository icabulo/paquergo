/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSelector } from "react-redux";

const ContactsContext = createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const { chatContacts } = useSelector((store) => store.user);

  const [contacts, setContacts] = useLocalStorage("contacts", chatContacts);

  function createContact(id, name) {
    setContacts((prev) => {
      return [...prev, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
