import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/contact";

function AddContact({ contacts, setContacts }) {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const addContactHandler = async (e) => {
    e.preventDefault();
    const contact = {
      id: Math.floor(Math.random() * 100),
      name: name,
      email: email,
    };
    console.log(contact);
    if (contact.name != "" && contact.email !="" ) {
      const response = await api.post("/contacts", contact);
      setContacts([...contacts, response.data]);
      navigate("/");
    }
    else  
      alert("Please enter data")
  };
  return (
    <div>
      <div className="mx-auto w-full max-w-[550px]">
        <form>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              onClick={addContactHandler}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
