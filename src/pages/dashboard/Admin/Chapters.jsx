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

const Chapters = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
   const [chapters, setChapters] = useState([]);
   const [subjects, setSubjects] = useState([]);
	const { user, token } = useAuth();
	console.log(user);
	console.log(token);
	const axiosPublic = useAxios();

	const handleChapterSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const subjectId = form.subject.value;
		const chapterData = {
			name,
			subjectId,
			createdBy: user?._id,
		};

      console.log(chapterData)

		try {
			const res = await axiosPublic.post("/chapter", chapterData);
         if(res.data.success){
            toast.success(res.data.message || "Chapter created successfully!");
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
      const fetchedChapter = async () => {
         try {
            const res = await axiosPublic.get("/chapter");
            
            console.log(res);
            setChapters(res.data.data);
         } catch (error) {
            toast.error(error.message || "Something went wrong!");
         }
      }
      fetchedChapter();
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
					placeholder="Search Chapters"
				/>
				<div
					className="flex items-center bg-primary py-2.5 px-4 text-white cursor-pointer"
					onClick={() => setIsModalOpen(true)}
				>
					<IoAdd className="text-3xl" />
					<span>Add Chapter</span>
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
							<th className="p-3">Subject</th>
							<th className="p-3">Group</th>
							<th className="p-3">Batch</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{chapters.map((chapter, index) => (
							<tr key={chapter._id} className="">
								<td className="p-3">
									<p>{index +1}</p>
								</td>
								<td className="p-3">
									<p>{chapter.name}</p>
								</td>
								<td className="p-3">
									<p>{chapter.subjectId?.name || "N/A"}</p>
								</td>
								<td className="p-3">
									<p>{chapter.subjectId.groupId?.name || "N/A"}</p>
								</td>
								<td className="p-3">
									<p>{chapter.subjectId.batchId?.name || "N/A"}</p>
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
					<h2 className="text-xl font-semibold">Create Chapter</h2>
					<form onSubmit={handleChapterSubmit} className="space-y-5">
						<input
							type="text"
							name="name"
							placeholder="Chapter Name"
							className="w-full border p-2 rounded"
							required
						/>
						<select
							name="subject"
							className="w-full border p-2.5 rounded"
							required
						>
							<option>Select Subject</option>
                     {
                        subjects.map(subject => (
                           <option key={subject._id} value={subject._id}>{subject.name}</option>
                        ))
                     }
							
						</select>
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

export default Chapters;
