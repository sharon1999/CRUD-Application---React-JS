import React, { useState } from "react";
import api from "../api/contact";
import { Route, useNavigate } from "react-router-dom";
import EditContact from "./EditContact";

function ContactList({ contacts, setContacts, editContactHandler }) {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          type="email"
          id="email"
          name="email"
          class="w-4/6 bg-slate-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      {contacts.map((c) => {
        return (
          <div
            key={c.id}
            className="flex justify-center items-center  bg-gray-100"
          >
            <div className=" border-gray-200 p-2 rounded-lg w-2/4">
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                {c.name}
              </h2>
              <p className="text-sm text-gray-900 font-medium title-font mb-2">
                {c.email}
              </p>
            </div>
            {/* Edit Contact */}
            <div className="flex justify-items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  editContactHandler(c);
                  navigate("/edit");
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>

              {/* Delete Contact */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-400 hover:text-red-800 cursor-pointer mx-5"
                onClick={() => removeContactHandler(c.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;
