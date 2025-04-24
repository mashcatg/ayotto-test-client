/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
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
				style={{
					animation: "modalFadeIn 0.3s ease-out",
				}}
			>
				{children}
			</div>
		</div>
	);
};

const Batches = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
   const [batches, setBatches] = useState([])
	const [isToggle, setIsToggle] = useState(false);
	const { user, token } = useAuth();
	const axiosPublic = useAxios();
   useEffect(() => {
      const fetchedChapter = async () => {
         try {
            const res = await axiosPublic.get("/batch");
            
            console.log(res);
            setBatches(res.data.data);
         } catch (error) {
            toast.error(error.message || "Something went wrong!");
         }
      }
      fetchedChapter();
   }, []);

	useEffect(() => {
		console.log("Auth state changed:", { user, token });
	}, [user, token]);

	const handleBatchSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const session = form.session.value;
		const status = isToggle ? "active" : "inactive";

		const batchData = {
			name,
			session,
			status,
		};

		try {
			const res = await axiosPublic.post("/batch", batchData);
			// console.log(res.data)
			if (res.data.success) {
				toast.success("Batch created successfully");
				setIsModalOpen(false);
				console.log(res.data);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};



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
					placeholder="Search Batch"
				/>
				<div
					className="flex items-center bg-primary py-2.5 px-4 text-white cursor-pointer"
					onClick={() => setIsModalOpen(true)}
				>
					<IoAdd className="text-3xl" />
					<span>Add Batch</span>
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
							<th className="p-3">Session</th>
							<th className="p-3">Status</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{batches?.map((batch, index) => (
							<tr key={batch._id} className="">
								<td className="p-3">
									<p>{index + 1}</p>
								</td>
								<td className="p-3">
									<p>{batch.name}</p>
								</td>
								<td className="p-3">
									<p>{batch.session}</p>
								</td>
								<td className="p-3">
									<p className="bg-green-600 inline-flex py-1 px-3 rounded-sm text-white">
										{batch.status}
									</p>
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
					<h2 className="text-xl font-semibold">Create Batch</h2>
					<form onSubmit={handleBatchSubmit} className="space-y-5">
						<input
							type="text"
							name="name"
							placeholder="Batch Name"
							className="w-full border p-2 rounded"
							required
						/>
						<select
							name="session"
							className="w-full border p-2.5 rounded"
							required
						>
							<option value="">Select the session</option>
							<option value="2024-2025">2024-2025</option>
							<option value="2025-2026">2023-2024</option>
							<option value="2026-2027">2026-2027</option>
						</select>
						<div className="flex items-center justify-between">
							<p className="text-lg text-gray-800">Status</p>
							<div className="flex items-center space-x-2">
								<span>Inactive</span>
								<div
									className={`${
										isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
									} w-[65px] h-[34px] py-[0.138rem] px-[0.200rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-lg relative`}
									onClick={() => setIsToggle(!isToggle)}
								>
									<div
										className={`${
											isToggle
												? "translate-x-[30px] rotate-[90deg] !bg-white"
												: "translate-x-[0px] rotate-[0deg]"
										} w-[26px] h-[27px] transition-all duration-500 rounded-md bg-[#fff]`}
										style={{ boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)" }}
									></div>
								</div>
								<span>Active</span>
							</div>
						</div>
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

export default Batches;
