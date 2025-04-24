import { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";
 
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ChallengeComponent = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const [userChallenges, setUserChallenges] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Fetch incoming challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await axios.get("/quiz/challenges");
        // Assuming the API returns challenges where the current user is in challengedTo array
        setUserChallenges(data.data || []);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    // Fetch available users to challenge
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/users/classmates");
        // Filter out current user
        const filteredUsers = data.data.filter(u => u._id !== user?._id);
        setAvailableUsers(filteredUsers || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch subjects
    const fetchSubjects = async () => {
      try {
        const { data } = await axios.get(`/subject`);
        setSubjects(data.data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    if (user) {
      fetchChallenges();
      fetchUsers();
      fetchSubjects();
    }
  }, [axios, user]);

  // Fetch topics when subject changes
  useEffect(() => {
    const fetchTopics = async () => {
      if (!selectedSubjectId) {
        setTopicsList([]);
        return;
      }

      try {
        const { data } = await axios.get("/topic");
        // Filter topics by selected subject
        const relevantTopics = data.data.filter(topic => 
          topic.chapterId?.subjectId?._id === selectedSubjectId
        );
        setTopicsList(relevantTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [axios, selectedSubjectId]);

  const handleSubjectChange = (e) => {
    setSelectedSubjectId(e.target.value);
    setSelectedTopics([]);
  };

  const handleTopicChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const topicIds = selectedOptions.map(option => option.value);
    setSelectedTopics(topicIds);
  };

  const handleAcceptChallenge = (challengeId) => {
    navigate(`/dashboard/quiz/${challengeId}`, { replace: true });
  };

  const handleSendChallenge = async (userId) => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic for the challenge");
      return;
    }

    try {
      const requestBody = {
        topicId: selectedTopics,
        totalQuestions: 5,
        challengedTo: [userId] // Add the user's ID to challengedTo array
      };
      
      await axios.post("/quiz", requestBody);
      alert("Challenge sent successfully! Starting your quiz now...");
      
      // Navigate to take quiz immediately
      navigate("/dashboard/mock-submission", {
        state: {
          topicIds: selectedTopics
        },
        replace: true,
      });
    } catch (error) {
      console.error("Error sending challenge:", error);
      alert("Failed to send challenge. Please try again.");
    }
  };

  // Dummy data for demonstration
  const dummyChallenges = [
    { _id: "c1", from: { _id: "u1", name: "John Doe" }, subject: "Physics", createdAt: "2025-03-01" },
    { _id: "c2", from: { _id: "u2", name: "Jane Smith" }, subject: "Mathematics", createdAt: "2025-03-02" }
  ];

  const dummyUsers = [
    { _id: "u3", name: "Robert Johnson", batch: "Batch 2023" },
    { _id: "u4", name: "Susan Williams", batch: "Batch 2023" },
    { _id: "u5", name: "Michael Brown", batch: "Batch 2024" }
  ];

  // Use dummy data if real data is empty
  const displayChallenges = userChallenges.length > 0 ? userChallenges : dummyChallenges;
  const displayUsers = availableUsers.length > 0 ? availableUsers : dummyUsers;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Received Challenges Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MdOutlineQuiz className="text-xl text-primary" />
          <h3 className="text-lg font-semibold">Challenges Received</h3>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : displayChallenges.length > 0 ? (
          <div className="space-y-3">
            {displayChallenges.map(challenge => (
              <div key={challenge._id} className="border rounded-md p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{challenge.from?.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-600">{challenge.subject || "Multiple Topics"}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(challenge.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button 
                  onClick={() => handleAcceptChallenge(challenge._id)}
                  className="mt-2 w-full bg-primary text-white py-1.5 px-4 rounded text-sm hover:bg-primary/90 transition-colors"
                >
                  Accept Challenge
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No challenges received yet</p>
          </div>
        )}
      </div>

      {/* Send Challenge Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FaUserFriends className="text-xl text-primary" />
          <h3 className="text-lg font-semibold">Challenge a Classmate</h3>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Subject</label>
              <select
                value={selectedSubjectId}
                onChange={handleSubjectChange}
                className="border p-2 border-gray-300 rounded-sm w-full"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option value={subject._id} key={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Topics</label>
              <select
                multiple
                value={selectedTopics}
                onChange={handleTopicChange}
                className="border p-2 border-gray-300 rounded-sm w-full"
                required
                size={4}
                disabled={!selectedSubjectId}
              >
                {topicsList.map((topic) => (
                  <option value={topic._id} key={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs text-gray-500 italic mb-4">
            Note: When you challenge someone, you will immediately take the quiz yourself.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : displayUsers.length > 0 ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {displayUsers.map(user => (
              <div key={user._id} className="border rounded-md p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex justify-between items-center">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.batch || "Same Batch"}</p>
                </div>
                <button
                  onClick={() => handleSendChallenge(user._id)}
                  disabled={selectedTopics.length === 0}
                  className="flex items-center gap-1 bg-primary text-white py-1.5 px-4 rounded text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosSend />
                  <span>Challenge</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No users available to challenge</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeComponent;