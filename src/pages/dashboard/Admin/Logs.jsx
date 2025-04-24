import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  const [fetchError, setFetchError] = useState("");
  const axios = useAxios();

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/admin/logs");
      // console.log(response)
      if (response.data.data) {
        setLogs(response.data.data);
      }
    } catch (error) {
      setFetchError(
        error.response?.data?.message ||
        "Failed to fetch admins. Please try again later."
      );
    }
  };


  useEffect(() => {
    fetchLogs();
  }, []);

  console.log(logs)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrator logs </h1>
      </div>

      {fetchError && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded mb-4">
          {fetchError}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{log?.createdBy?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log?.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {log?.createdBy?.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default Logs;