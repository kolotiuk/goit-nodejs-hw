const argv = require("yargs").argv;
const contactsOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("contactById:", contactById)
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log("newContact:", newContact)
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log("removeContact:", removeContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
