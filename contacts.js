const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join("db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.log("Contacts successfully found");
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    console.log("Contact successfully found");
    return result;
  } catch (e) {
    console.log(e.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    if (!name || !email || !phone) {
      console.error("Please fill all required fields ");
      return null;
    }
    const data = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added successfully");
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [deleteContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact successfully removed");
    return deleteContact;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
