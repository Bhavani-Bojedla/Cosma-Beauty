import { useEffect, useState } from "react";
import API from "../api";

export default function Admin() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await API.get("/admin/enquiries");
        setEnquiries(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-screen px-8 pt-20 bg-gray-50">
      <h2 className="mb-6 text-3xl font-bold text-pink-600">
        Admin Dashboard
      </h2>

      {enquiries.length === 0 ? (
        <p className="text-gray-500">No enquiries yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="p-6 transition-shadow bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg"
            >
              <p className="mb-2 text-lg font-semibold text-gray-800">
                {enq.user_name}
              </p>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium">Email:</span> {enq.user_email}
              </p>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium">Package:</span>{" "}
                {enq.package_id?.package_name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Message:</span> {enq.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
