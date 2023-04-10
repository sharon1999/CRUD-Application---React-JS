import "./App.css";
import api from "./api/contact";
import { useEffect, useState } from "react";
import ContactList from "./components/ContactList";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {
  const location = useLocation();
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  //Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const editContactHandler =  (contact) => {
    setContact(contact)
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <>
      <div className="flex justify-around	m-5">
        <h1 className="text-3xl">
          {location.pathname === "/" ? "Contact List" : "Add"}
          {}
        </h1>
        <button
          className="flex  text-white p-2 bg-green-400 border-0 px-1focus:outline-none hover:bg-green-600 rounded text-lg"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add Contact{" "}
        </button>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <ContactList editContactHandler={editContactHandler} contacts={contacts} setContacts={setContacts} />
          }
        />
        <Route
          path="/add"
          element={<AddContact contacts={contacts} setContacts={setContacts} />}
        />
        <Route
          path="/edit"
          element={<EditContact contact= {contact}  contacts={contacts} setContacts={setContacts} />}
        />
      </Routes>
    </>
  );
}

export default App;

// {
//   "contacts": [
//     {
//       "id": "1",
//       "name": "Sharon",
//       "email": "sharon@gmail.com"
//     },
//     {
//       "id": "2",
//       "name": "Roshan",
//       "email": "roshan@gmail.com"
//     },
//     {
//       "id": "3",
//       "name": "Roshan1",
//       "email": "roshadn@gmail.com"
//     }
//   ]
// }
