/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const Modal = ({ isOpen, onClose, children }) => {
	const modalRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out z-50">
			<div
				ref={modalRef}
				className="bg-white rounded-lg p-6 w-96 transform transition-all duration-300 ease-in-out opacity-100 scale-100"
				style={{ animation: "modalFadeIn 0.3s ease-out" }}
			>
				{children}
			</div>
		</div>
	);
};

const Subjects = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
   const [subjects, setSubjects] = useState([]);
   const [groups, setGroups] = useState([]);
   const [batches, setBatches] = useState([]);
   const [selectedBatch, setSelectedBatch] = useState("");
	const { user, token } = useAuth();
	console.log(user);
	console.log(token);
	const axiosPublic = useAxios();

	const handleSubjectSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const groupId = form.group.value;
		const batchId = form.batch.value;
		const subjectData = {
			name,
			groupId,
			batchId,
			createdBy: user?._id,
		};

      console.log(subjectData)

		try {
			const res = await axiosPublic.post("/subject", subjectData);
         if(res.data.success){
            toast.success(res.data.message || "Subject created successfully!");
            setIsModalOpen(false);
         }
		} catch (error) {
			toast.error(error.message || "Something went wrong!");
		}
	};

	useEffect(() => {
      const fetchedSubjects = async () => {
         try {
            const res = await axiosPublic.get("/subject");
            
            console.log(res);
            setSubjects(res.data.data);
         } catch (error) {
            toast.error(error.message || "Something went wrong!");
         }
      }
      fetchedSubjects();
   }, []);
	useEffect(() => {
      const fetchedGroups = async () => {
         try {
            const res = await axiosPublic.get("/group");
            
            console.log(res);
            setGroups(res.data.data);
         } catch (error) {
            toast.error(error.message || "Something went wrong!");
         }
      }
      fetchedGroups();
   }, []);
   	useEffect(() => {
		const fetchedBatches = async () => {
		try {
			const res = await axiosPublic.get("/batch");
			
			console.log(res);
			setBatches(res.data.data);
		} catch (error) {
			toast.error(error.message || "Something went wrong!");
		}
		}
		fetchedBatches();
 	}, []);

	return (
		<div className="mx-auto py-10">
			<style>
				{`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
			</style>

			<div className="flex items-center gap-6 pb-6">
				<input
					type="search"
					className="grow p-3 border bg-slate-100 border-slate-200 outline-0"
					placeholder="Search Subjects"
				/>
				<div
					className="flex items-center bg-primary py-2.5 px-4 text-white cursor-pointer"
					onClick={() => setIsModalOpen(true)}
				>
					<IoAdd className="text-3xl" />
					<span>Add Subject</span>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full text-xs">
					<colgroup>
						<col />
						<col />
						<col />
						<col />
						<col className="w-24" />
					</colgroup>
					<thead className="border-b border-gray-300">
						<tr className="text-left">
							<th className="p-3">SL</th>
							<th className="p-3">Name</th>
							<th className="p-3">Batch</th>
							<th className="p-3">Group</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{subjects.map((subject, index) => (
							<tr key={subject._id} className="">
								<td className="p-3">
									<p>{index +1}</p>
								</td>
								<td className="p-3">
									<p>{subject.name}</p>
								</td>
								<td className="p-3">
									<p>{subject.batchId?.name || 'N/A'}</p>
								</td>
								<td className="p-3">
									<p>{subject.groupId?.name || 'N/A'}</p>
								</td>
								<td className="p-3 text-right flex items-center space-x-4 *:text-xl">
									<Link>
										<FaRegEdit />
									</Link>
									<Link>
										<RiDeleteBin3Line />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Create Subject</h2>
					<form onSubmit={handleSubjectSubmit} className="space-y-5">
						<input
							type="text"
							name="name"
							placeholder="Subject Name"
							className="w-full border p-2 rounded"
							required
						/>
						<select
							name="batch"
							className="w-full border p-2.5 rounded"
							onChange={(e) => setSelectedBatch(e.target.value)}
							required
						>
							<option value="">Select Batch</option>
						{
							batches.filter(batch => batch.status === "active").map(batch => (
							<option key={batch._id} value={batch._id}>{batch.name} ({batch.session})</option>
							))
						}
							
						</select>
						
						{selectedBatch && (<select
							name="group"
							className="w-full border p-2.5 rounded"
						>
							<option value="">Select Group</option>
						{
							groups.filter((group) => group.batchId._id === selectedBatch).map(group => (
							<option key={group._id} value={group._id}>{group.name}</option>
							))
						}
							
						</select>)}
						<div className="text-right pt-3">
							<button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
								Submit
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default Subjects;
