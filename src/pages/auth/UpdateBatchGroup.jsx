import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const UpdateBatchGroup = ({ isOpen, setIsOpen }) => {
   const axios = useAxios();
   const [batches, setBatches] = useState([]);
   const { user ,setAuth , auth} = useAuth();
   const [groups, setGroups] = useState([]);
   const [loading, setLoading] = useState(false);

   // console.log(batches + 'batches.');


   useEffect(() => {
      const fetchBatches = async () => {
         try {
            const res = await axios.get("/batch");
            setBatches(res?.data.data);
         } catch (error) {
            toast.error(error.message || "Something went wrong!");
         }
      };
      fetchBatches();
   }, [axios]);

   useEffect(() => {
      const fetchGroups = async () => {
         try {
            const res = await axios.get("/group");
            setGroups(res?.data.data);
         } catch (error) {
            toast.error(error.message || "Something went wrong!");
            console.log(error);
         }
      };
      fetchGroups();
   }, [axios]);

   const handleUpdateGroupBatch = async (e) => {
      e.preventDefault();
      setLoading(true);
   
      const form = e.target;
      const batchId = form.batch.value;
      const groupId = form.group.value;
   
      const updatedGroupBatch = { batchId, groupId };
   
      try {
         const res = await axios.put(`/user/update/${user?._id}`, updatedGroupBatch);
         if (res?.status === 200) {
            toast.success("Batch and group updated successfully!");
            
            // Update local storage
            const updatedUser = { ...user, batchId, groupId };
            localStorage.setItem("auth", JSON.stringify({ ...auth, user: updatedUser }));
   
            // Update global state
            setAuth((prev) => ({
               ...prev,
               user: updatedUser,
            }));
   
            setIsOpen(false);
         }
      } catch (error) {
         toast.error(error.message || "Something went wrong!");
      } finally {
         setLoading(false);
      }
   };
   


   return (
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-50" onClose={() => { }}>
            {/* Modal Backdrop */}
            <Transition.Child
               as={Fragment}
               enter="transition-opacity ease-in-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="transition-opacity ease-in-out duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black/60" aria-hidden="true"></div>
            </Transition.Child>

            {/* Modal Panel */}
            <Transition.Child
               as={Fragment}
               enter="transition-transform ease-in-out duration-300"
               enterFrom="scale-90 opacity-0"
               enterTo="scale-100 opacity-100"
               leave="transition-transform ease-in-out duration-200"
               leaveFrom="scale-100 opacity-100"
               leaveTo="scale-90 opacity-0"
            >
               <div className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white min-w-xl h-[300px] rounded-lg p-8 shadow-lg">
                  <Dialog.Title className="text-3xl font-semibold text-center ">
                     Update Your Batch and Group
                  </Dialog.Title>

                  <form onSubmit={handleUpdateGroupBatch} className="space-y-5 mt-4">
                     <select name="batch" required className="h-[50px] border-0 bg-[#edf1ff] px-5 py-2.5 rounded-md outline-none w-full">
                        <option hidden>Select your Batch</option>
                        {batches.map(b => (
                           <option key={b._id} value={b._id}>{b?.name}</option>
                        ))}
                     </select>

                     <select name="group" required className="h-[50px] border-0 bg-[#edf1ff] px-5 py-2.5 rounded-md outline-none w-full">
                        <option hidden>Select your Group</option>
                        {groups.map(g => (
                           <option key={g._id} value={g._id}>{g?.name}</option>
                        ))}
                     </select>

                     <button
                        type="submit"
                        className={`h-[50px] bg-[#5271FF] text-white rounded-md p-2.5 w-full active:bg-[#2049ff] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                     >
                        {loading ? "Updating..." : "Update Group and Batch"}
                     </button>
                  </form>
               </div>
            </Transition.Child>
         </Dialog>
      </Transition>
   );
};

export default UpdateBatchGroup;