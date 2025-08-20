import { useState } from "react";
import API from "../api";

export default function EnquiryForm({ packageId }) {
  const [form, setForm] = useState({ user_name: "", user_email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/enquiries", {
        package_id: packageId, 
        user_name: form.user_name,
        user_email: form.user_email,
        message: form.message,
      });
      setStatus("Enquiry submitted!");
      setForm({ user_name: "", user_email: "", message: "" });
    } catch (err) {
      setStatus("Error submitting enquiry");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-6 bg-white rounded shadow">
      <h2 className="mb-4 text-xl font-semibold">Send an Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="user_name"
          placeholder="Your Name"
          value={form.user_name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="user_email"
          placeholder="Your Email"
          value={form.user_email}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button className="w-full px-4 py-2 text-white bg-pink-600 rounded">
          Submit
        </button>
      </form>
      {status && <p className="mt-3 text-center">{status}</p>}
    </div>
  );
}
