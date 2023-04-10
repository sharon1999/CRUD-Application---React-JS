import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/contact";

function EditContact(props) {
  const { id, name, email } = props.contact;
  let navigate = useNavigate();
  const [nameedit, setNameEdit] = useState(name);
  const [emailedit, setEmailEdit] = useState(email);
  const updateContactHandler = async (e) => {
    e.preventDefault();
    const editContact = {
      id: id,
      name: nameedit,
      email: emailedit,
    };
    console.log("Edit Co", editContact);
    const response = await api.put(`/contacts/${id}`, editContact);
    props.setContacts(
      props.contacts.map((contact) => {
        return  contact.id === response.data.id ? response.data : contact;
      })
    );
    navigate("/");
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
              value={nameedit}
              id="name"
              placeholder="Full Name"
              onChange={(e) => setNameEdit(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
              value={emailedit}
              onChange={(e) => setEmailEdit(e.target.value)}
              id="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              onClick={updateContactHandler}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
