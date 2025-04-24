import { useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Award, Star } from "lucide-react";
import { LuChevronRight } from "react-icons/lu";

const MockTest = () => {
	const navigate = useNavigate();
	const axios = useAxios();
	const [subjects, setSubjects] = useState([]);
	const [groupId, setGroupId] = useState("");
	const [batchId, setBatchId] = useState("");
	const { user } = useAuth();
	const [subjectId, setSubjectId] = useState("");
	const [chapterId, setChapterId] = useState("");
	const [chapterName, setChapterName] = useState("");
	const [chapters, setChapters] = useState([]);
	const [topics, setTopics] = useState([]);
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [availableUsers, setAvailableUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [challengedUser, setChallengedUser] = useState([]);
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		if (user) {
			setGroupId(user.groupId || "");
			setBatchId(user.batchId || "");
		}
	}, [user]);

	useEffect(() => {
		const fetchChallengesQuiz = async () => {
			try {
				const { data } = await axios.get("/quiz/my-challenges");
				console.log("challange data ",data);
				setChallenges(data?.quizzes);
			} catch (error) {
				console.error("Error fetching chapters:", error);
			}
		};
		fetchChallengesQuiz();
	}, []);

	// Fetch batch data
	const { data: batchData = [] } = useQuery({
		queryKey: ["batches"],
		queryFn: async () => {
			const { data } = await axios.get("/batch");
			return data.data;
		},
	});

	const { data: groupData = [] } = useQuery({
		queryKey: ["groups"],
		queryFn: async () => {
			const { data } = await axios.get("/group");
			return data.data;
		},
	});

	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				const { data } = await axios.get(`/subject`);

				const commonSubjects = data.data.filter(
					(subject) =>
						!subject.groupId ||
						subject.groupId === null ||
						subject.groupId === ""
				);

				if (!user?.groupId) {
					setSubjects(commonSubjects);
					return;
				}

				const groupSpecificSubjects = data.data.filter(
					(subject) =>
						subject.groupId &&
						(subject.groupId === user.groupId ||
							subject.groupId._id === user.groupId)
				);

				const accessibleSubjects = [
					...commonSubjects,
					...groupSpecificSubjects,
				];
				setSubjects(accessibleSubjects);
			} catch (error) {
				console.error("Error fetching subjects:", error);
			}
		};

		// Fetch available users to challenge
		const fetchUsers = async () => {
			try {
				const { data } = await axios.post("/user/batch-group", {
					batchId: user?.batchId,
					groupId: user?.batchId,
				});

				console.log({
					batchId: user?.batchId,
					groupId: user?.batchId,
				});

				// Filter out current user
				const filteredUsers = data.data.filter((u) => u._id !== user?._id);
				setAvailableUsers(filteredUsers || []);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			console.log("called");
			fetchSubjects();
		}
		if (user?.batchId && user?.batchId) {
			fetchUsers();
		}
	}, [axios, user]);

	// Fetch chapters when subjectId changes
	useEffect(() => {
		const fetchChapters = async () => {
			if (!subjectId) {
				setChapters([]);
				setChapterId("");
				setChapterName("");
				return;
			}
			try {
				const { data } = await axios.get("/chapter");
				const filteredChapters = data.data.filter(
					(chapter) => chapter.subjectId?._id === subjectId
				);
				setChapters(filteredChapters);
			} catch (error) {
				console.error("Error fetching chapters:", error);
			}
		};
		fetchChapters();
	}, [axios, subjectId]);

	useEffect(() => {
		const fetchTopics = async () => {
			if (!chapterId) {
				setTopics([]);
				setSelectedTopics([]);
				return;
			}
			try {
				const { data } = await axios.get("/topic");

				// Filter topics by chapter ID, not chapter name
				const filteredTopics = data.data.filter(
					(topic) => topic.chapterId._id === chapterId
				);

				setTopics(filteredTopics);
			} catch (error) {
				console.error("Error fetching topics:", error);
			}
		};

		fetchTopics();
	}, [axios, chapterId]);

	const userBatch = batchData.find((batch) => batch._id === user?.batchId);
	const userGroup = groupData.find((group) => group._id === user?.groupId);

	const [quizParams, setQuizParams] = useState({
		batch: userBatch?.name || "",
		group: userGroup?.name || "",
		subject: "",
		chapter: "",
		// For multiple topics
		topics: [],
		// Add IDs for clearer data passing
		subjectId: "",
		chapterId: "",
		topicIds: [],
	});

	useEffect(() => {
		setQuizParams((prev) => ({
			...prev,
			batch: userBatch?.name || "",
			group: userGroup?.name || "",
		}));
	}, [userBatch, userGroup]);

	const handleInputChange = (e) => {
		setQuizParams({
			...quizParams,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubjectChange = (e) => {
		const selectedSubjectId = e.target.value;
		const selectedSubjectName = e.target.options[e.target.selectedIndex].text;

		setSubjectId(selectedSubjectId);
		setChapterId("");
		setChapterName("");
		setSelectedTopics([]);

		setQuizParams((prev) => ({
			...prev,
			subject: selectedSubjectName,
			subjectId: selectedSubjectId,
			chapter: "",
			chapterId: "",
			topics: [],
			topicIds: [],
		}));
	};

	const handleChapterChange = (e) => {
		const selectedChapterIndex = e.target.selectedIndex;
		if (selectedChapterIndex === 0) {
			// "Select Chapter" option
			setChapterId("");
			setChapterName("");
		} else {
			const selectedChapter = chapters[selectedChapterIndex - 1]; // -1 to account for the default option
			setChapterId(selectedChapter._id);
			setChapterName(selectedChapter.name);
		}

		setSelectedTopics([]);

		setQuizParams((prev) => ({
			...prev,
			chapter:
				selectedChapterIndex === 0
					? ""
					: chapters[selectedChapterIndex - 1].name,
			chapterId:
				selectedChapterIndex === 0
					? ""
					: chapters[selectedChapterIndex - 1]._id,
			topics: [],
			topicIds: [],
		}));
	};

	const handleTopicChange = (e) => {
		// Convert HTMLCollection to Array and extract selected options
		const selectedOptions = Array.from(e.target.selectedOptions);
		const selectedTopicIds = selectedOptions.map((option) => option.value);
		const selectedTopicNames = selectedOptions.map((option) => option.text);

		setSelectedTopics(selectedTopicIds);

		setQuizParams((prev) => ({
			...prev,
			topics: selectedTopicNames,
			topicIds: selectedTopicIds,
		}));
	};

	const handleStartQuiz = (e) => {
		e.preventDefault();

		if (
			!quizParams.subject ||
			!quizParams.chapter ||
			quizParams.topicIds.length === 0
		) {
			alert("Please fill in all required fields and select at least one topic");
			return;
		}

		navigate("/dashboard/mock-submission", {
			state: {
				...quizParams,
				// Pass both ID and name for clarity
				subjectId: subjectId,
				chapterId: chapterId,
				topicIds: selectedTopics,
				challengedUser,
			},
			replace: true,
		});
	};
	const handleAcceptChallenge = async (challenge) => {
		try {
		  const response = await axios.post('/quiz/challenge-response', { 
			quizId: challenge, 
			action: "accept" 
		  });
	  
		  if (response.data?.success) {  // Ensure we access the correct property
			navigate('/dashboard/mock-submission', {
			  state: {
				acceptingChallenge: true,
				challengeId: challenge,
			  },
			  replace: true,
			});
		  }
		} catch (error) {
		  console.error("Error accepting challenge:", error);
		}
	  };
	  

	const handleSendChallenge = async (userId) => {
		if (selectedTopics.length === 0) {
			alert("Please select at least one topic for the challenge");
			return;
		}

		setChallengedUser((prev) => [...prev, userId]);
	};

	console.log(challengedUser);

	// Use dummy data if real data is empty for demonstration
	const dummyUsers = [
		{ _id: "u3", name: "Robert Johnson", batch: "Batch 2023" },
		{ _id: "u4", name: "Susan Williams", batch: "Batch 2023" },
		{ _id: "u5", name: "Michael Brown", batch: "Batch 2024" },
	];

	const displayUsers = availableUsers.length > 0 ? availableUsers : dummyUsers;

	console.log(quizParams.batch);

	return (
		<div className="py-6 border px-6 border-gray-200 rounded-lg bg-slate-100">
			<h2 className="text-2xl font-bold mb-6 text-center">Mock Test</h2>

			<form onSubmit={handleStartQuiz}>
				<div className="grid items-center gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-5 mb-8">
					<select
						name="batch"
						value={quizParams.batch}
						onChange={handleInputChange}
						className="border p-2 border-gray-300 rounded-sm w-full"
						disabled
					>
						<option value={userBatch?.name}>
							{userBatch?.name || "Loading..."}
						</option>
					</select>
					<select
						name="group"
						value={quizParams.group}
						onChange={handleInputChange}
						className="border p-2 border-gray-300 rounded-sm w-full"
						disabled
					>
						<option value={userGroup?.name}>
							{userGroup?.name || "Loading..."}
						</option>
					</select>
					<select
						name="subject"
						value={subjectId}
						onChange={handleSubjectChange}
						className="border p-2 border-gray-300 rounded-sm w-full"
						required
					>
						<option value="">Select Subject</option>
						{subjects.map((subject, i) => (
							<option value={subject._id} key={i}>
								{subject.name}
							</option>
						))}
					</select>

					<select
						name="chapter"
						value={chapterId}
						onChange={handleChapterChange}
						className="border p-2 border-gray-300 rounded-sm w-full"
						required
					>
						<option value="">Select Chapter</option>
						{chapters.map((chapter, i) => (
							<option value={chapter._id} key={i}>
								{chapter.name}
							</option>
						))}
					</select>

					<select
						name="topics"
						multiple
						value={selectedTopics}
						onChange={handleTopicChange}
						className="border p-2 border-gray-300 rounded-sm w-full"
						required
						size={4}
					>
						{topics.map((topic, i) => (
							<option value={topic._id} key={i}>
								{topic.name}
							</option>
						))}
					</select>
				</div>
				<div className="text-center mb-6">
					<button
						type="submit"
						className="bg-primary text-white px-12 py-2.5 rounded hover:bg-primary/90 transition-colors"
					>
						Start Quiz
					</button>
				</div>
			</form>

			{selectedTopics.length > 0 && (
				<div className="mb-4 text-center">
					<p className="text-sm font-medium">
						Selected Topics: {selectedTopics.length}
					</p>
					<div className="flex flex-wrap justify-center gap-2 mt-2">
						{selectedTopics.map((topicId) => {
							const topic = topics.find((t) => t._id === topicId);
							return (
								<span
									key={topicId}
									className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
								>
									{topic?.name}
								</span>
							);
						})}
					</div>
				</div>
			)}

			{/* Challenge Section */}
			{/* Challenge Sections */}
			<div className="mt-8 border-t pt-8">
				{/* Send Challenge Section */}
				<div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
					<div className="flex items-center gap-3 mb-4">
						<FaUserFriends className="text-xl text-[#516FFA]" />
						<h3 className="sm:text-xl text-xl text-[#211951] font-bold">
							Give Challenge
						</h3>
					</div>

					<p className="text-[13px] text-[#697177] mb-4">
						Challenge your classmates to take the same quiz. You'll start your
						quiz immediately after sending a challenge.
					</p>

					{selectedTopics.length === 0 ? (
						<div className="flex items-center justify-center gap-2 bg-blue-50 rounded-xl p-4 text-blue-600">
							<CiWarning className="text-xl" />
							<p className="text-sm font-medium">
								Please select a subject, chapter and topics to enable challenges
							</p>
						</div>
					) : loading ? (
						<div className="flex justify-center py-4">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#516FFA]"></div>
						</div>
					) : displayUsers.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-2">
							{displayUsers.map((user) => (
								<div
									key={user._id}
									className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
								>
									<div className="flex items-center gap-3">
										<div className="size-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-[#5271ff]">
											<span className="text-lg font-bold text-[#5271ff]">
												{user.name.charAt(0)}
											</span>
										</div>
										<div>
											<p className="font-medium">{user.name}</p>
											<p className="text-xs text-gray-500">
												{user.batch || "Same Batch"}
											</p>
										</div>
									</div>
									<button
										type="button"
										disabled={challengedUser.some((userId) => {
											console.log(userId === user._id);
											return userId === user._id;
										})}
										onClick={() => handleSendChallenge(user._id)}
										className={
											challengedUser.some((userId) => userId === user._id)
												? "flex items-center gap-1 bg-[#36363743] text-white py-1.5 px-4 rounded-md text-sm cursor-no-drop "
												: "flex items-center gap-1 bg-[#516FFA] text-white py-1.5 px-4 rounded-md text-sm hover:bg-[#4561e8] transition-colors"
										}
									>
										<IoIosSend />
										<span>
											{challengedUser.some((userId) => userId === user._id)
												? "Challenged"
												: "Challenge"}
										</span>
									</button>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-10 text-gray-500">
							<FaUserFriends className="h-12 w-12 text-gray-300 mb-2" />
							<p>No users available to challenge</p>
						</div>
					)}
				</div>

				{/* Accept Challenge Section */}
				<div className="bg-white rounded-2xl p-5 shadow-sm">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-3">
							<Award className="h-6 w-6 text-[#516FFA]" />
							<h3 className="sm:text-xl text-xl text-[#211951] font-bold">
								Accept Challenges
							</h3>
						</div>
						<button className="cursor-pointer flex justify-between gap-x-2 items-center px-3 py-2 font-semibold rounded-md bg-[#EEF1FF] text-[#516FFA]">
							<span>View All</span>
							<LuChevronRight size={19} />
						</button>
					</div>

					<p className="text-[13px] text-[#697177] mb-4">
						Respond to challenges sent by your classmates and compete to top the
						leaderboard
					</p>

					{/* Sample pending challenges - This would be replaced with actual data */}
					<div className="space-y-3">
						{/* Sample Challenge 1 */}
						{challenges?.map((challenge) => (
							<div
								key={challenge?._id}
								className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								<div className="flex justify-between items-center mb-3">
									<div className="flex items-center gap-3">
										<div className="size-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-[#5271ff]">
											<span className="text-lg font-bold text-[#5271ff]">
												J
											</span>
										</div>
										<div>
											<p className="font-medium">{challenge?.user?.name}</p>
											<p className="text-xs text-gray-500">
												Challenged you 2 hours ago
											</p>
										</div>
									</div>
									<div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="text-sm font-medium">150 XP</span>
									</div>
								</div>
								<div className="flex flex-wrap gap-2 mb-3">
									{challenge?.topicIds?.map((topic) => (
										<>
											<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
												{topic.name}
											</span>
											
										</>
									))}
									<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
										{challenge?.totalQuestions} Questions
									</span>
								</div>
								<div className="flex gap-2 mt-2">
									<button onClick={()=> handleAcceptChallenge(challenge?._id)} className="flex-1 bg-[#516FFA] text-white py-2 rounded-md text-sm hover:bg-[#4561e8] transition-colors">
										Accept Challenge
									</button>
									<button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors">
										Decline
									</button>
								</div>
							</div>
						))}

						{/* Empty state */}
						{false && (
							<div className="flex flex-col items-center justify-center py-10 text-gray-500">
								<Award className="h-12 w-12 text-gray-300 mb-2" />
								<p>No pending challenges</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<p className="flex items-center justify-center space-x-2 text-gray-600 text-[13px] mt-8">
				<CiWarning />
				<small>
					Do not reload the page. Otherwise, you may lose your progress and be
					unable to submit all questions.
				</small>
			</p>
		</div>
	);
};

export default MockTest;
