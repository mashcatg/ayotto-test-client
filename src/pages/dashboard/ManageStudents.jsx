import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";

const ManageStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentsRes, groupsRes, batchesRes] = await Promise.all([
          axios.get('/user/all-users'),
          axios.get('/group'),
          axios.get('/batch')
        ]);
        
        setStudentsData(studentsRes.data.data);
        setGroups(groupsRes.data.data);
        setBatches(batchesRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axios]);

  if(loading) return <Loading />;

  const getGroupName = (groupId) => {
    const group = groups.find(g => g._id === groupId);
    return group?.name || 'N/A';
  };

  const getBatchName = (batchId) => {
    const batch = batches.find(b => b._id === batchId);
    return batch?.name || 'N/A';
  };

  const filteredStudents = studentsData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.toString().includes(searchQuery) ||
    getGroupName(student.groupId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    getBatchName(student.batchId).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-[#FAFAFC] max-w-7xl min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#516FFA]">
          Student Management
        </h3>
        <button className="flex items-center gap-2 bg-[#516FFA] text-white px-4 py-2 rounded-lg hover:bg-[#4058d3] transition-colors">
          <LuPlus /> Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, group or batch..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-[#516FFA]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Group/Batch</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{student.phone}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">Group: {getGroupName(student.groupId)}</span>
                      <span className="text-sm">Batch: {getBatchName(student.batchId)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      student.isBanned 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {student.isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <TbEdit size={20} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;