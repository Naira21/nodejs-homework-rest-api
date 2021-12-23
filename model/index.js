import fs from "fs/promises";
import path from "path";
import { uuid } from "uuidv4";
import contacts from "../db/contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const [reqContact] = contacts.filter((contact) => contact.id === contactId);
  return reqContact;
};

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const [oddContact] = contacts.splice(index, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return oddContact;
  }
  return null;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: uuid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};
const updateContact = async (contactId, body) => {
  const requestedID = contacts.findIndex((contact) => contact.id === contactId);
  if (requestedID !== -1) {
    const modifiedContact = {
      id: contactId,
      ...contacts[requestedID],
      ...body,
    };
    contacts[requestedID] = modifiedContact;
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return modifiedContact;
  }
  return null;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
