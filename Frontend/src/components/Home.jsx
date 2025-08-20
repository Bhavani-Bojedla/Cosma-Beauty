import { useEffect, useState } from "react";
import API from "../api";
import EnquiryForm from "./EnquiryForm";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await API.get("/packages");
        setPackages(res.data);
        if (res.data.length > 0) {
          setSelectedPackage(res.data[0]._id); 
        }
      } catch (err) {
        console.error("Error fetching packages", err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-pink-700">Welcome to Cosma Beauty</h2>
      <p className="mt-2 text-gray-600">
        Discover our products and reach out for enquiries.
      </p>

     
      {packages.length > 0 ? (
        <div className="w-full max-w-md mt-6">
          <select
            className="w-full p-2 border rounded shadow-sm"
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
          >
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.package_name}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <EnquiryForm packageId={selectedPackage} />
          </div>
        </div>
      ) : (
        <p className="mt-6 text-gray-500">Loading packages...</p>
      )}
    </div>
  );
}
