import { HiSearch } from "react-icons/hi";

const Transactions = () => {
    const transactions= [
         {
           trxId: "TXN1234567890",
           reference: "REF987654321",
           from: "User123",
           date: "2025-02-17",
           to: "User456",
           via: "BKash",
           package: "Prottoye",
           status: "Completed"
         },
         {
           trxId: "TXN0987654321",
           reference: "REF123456789",
           from: "User789",
           date: "2025-02-16",
           to: "User321",
           via: "Nogod",
           package: "Durronto",
           status: "Pending"
         },
         {
           trxId: "TXN5678901234",
           reference: "REF456789012",
           from: "User555",
           date: "2025-02-15",
           to: "User999",
           via: "Upay",
           package: "Durronto",
           status: "Failed"
         }
       ]
     return (
         <div className="flex flex-col bg-[#FAFAFC] max-w-7xl min-h-screen p-3">
       <div>
         <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#516FFA]">
         Transaction Management
         </h3>
       </div>
       <div className="flex flex-col justify-center sm:flex-row sm:justify-between sm:items-center sm:gap-x-5 gap-y-4 mt-8">
         <div className=" bg-[#E9E4E4] py-3 px-6 rounded-sm  flex items-center gap-2 w-full">
           <button className="text-[#6A6B70] hover:text-black text-xl duration-300 cursor-pointer ">
             <HiSearch />
           </button>
           <input
             type="text"
             className="grow outline-0 placeholder-[#96989b]"
             placeholder="Search by number,package or status..."
           />
         </div>
         <div className=" bg-[#E9E4E4] py-3 px-3 rounded-sm w-full sm:w-[200px]">
           <select
             name=""
             defaultValue=" "
             id=""
             className="w-full text-[#6A6B70] outline-none"
           >
             <option value="">Export</option>
             <option value="A">A</option>
             <option value="B">B</option>
             <option value="C">C</option>
           </select>
         </div>
       </div>
       {/* Table Section */}
       <div className="mt-6">
         <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 overflow-x-auto">
           <div className=" overflow-x-auto overflow-hidden">
             <table className=" min-w-full text-[14px]">
               <colgroup>
                 <col />
                 <col />
                 <col />
                 <col />
                 <col />
                 <col />
                 <col />
                 <col className="" />
               </colgroup>
               <thead className="dark:bg-gray-300 border-b border-opacity-20 dark:border-gray-300 ">
                 <tr className="text-center font-semibold text-[16px] ">
                   <th className="p-1">TrxId</th>
                   <th className="p-1">Reference</th>
                   <th className="p-1">From</th>
                   <th className="p-1">To</th>
                   <th className="p-1">Via</th>
                   <th className="p-1">Package</th>
                   <th className="p-1">Status</th>
                   <th className="p-1">Date</th>
                 </tr>
               </thead>
               <tbody>
                 {transactions.map((item, i) => (
                   <tr
                     key={i}
                     className=" dark:bg-gray-50 text-center space-y-5  space-x-4"
                   >
                     <td className="p-1">
                       <p>{item?.trxId}</p>
                     </td>
                     <td className="p-1">
                       <p>{item?.reference}</p>
                     </td>
                     <td className="p-1">
                       <p>
                         {item?.from}
                       </p>
                     </td>
                     <td className="p-1">
                       <p>{item?.to}</p>
                     </td>
                     <td className="p-1">
                       <p>{item.via}</p>
                     </td>
                     <td className="p-1">
                       <p>{item.package}</p>
                     </td>
                     <td className="p-3 px-5">
                       <span
                         className={`px-3 py-1 text-center  text-semibold ${
                           item?.status === "Completed" &&
                           "text-[#0dc79c]  bg-[#D8FFF5]"
                         } ${
                           item?.status === "Pending" &&
                           "bg-yellow-50 text-yellow-500"
                         } ${
                           item?.status === "Failed" &&
                           "bg-[#efcdc7] text-[#da0c2e]"
                         }  rounded-xl`}
                       >
                         {item?.status}
                       </span>
                     </td>
                     <td className="p-1">
                       <p className="text-center">{item.date}</p>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
     );
 };
 
 export default Transactions;