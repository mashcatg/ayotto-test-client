/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";

const Categories = ({ props }) => {
  const axiosPublic = useAxios();
  const { topicId, setTopicId } = props;
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");

  // Fetch batches on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const { data } = await axiosPublic.get("/batch");
        setBatches(data.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchBatches();
  }, [axiosPublic]);

  // Fetch groups when batchId changes
  useEffect(() => {
    const fetchGroups = async () => {
      if (!batchId) {
        setGroups([]);
        setGroupId("");
        return;
      }
      try {
        const { data } = await axiosPublic.get(`/group`);
        const filteredGroups = data.data.filter((group) => group.batchId._id === batchId);
        setGroups(filteredGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [axiosPublic, batchId]);

  // Fetch subjects when groupId changes
  useEffect(() => {
    const fetchSubjects = async () => {
     
      try {
        const { data } = await axiosPublic.get(`/subject`);
        
        if(groupId === "") {
          
          setSubjects(data.data);
        } 
        if(groupId){
          const filteredSubjects = data.data.filter((subject) => 
            subject?.groupId && subject?.groupId._id === groupId 
          
          );
        console.log("filtered subjects", filteredSubjects);

          setSubjects(filteredSubjects);
        }
        console.log("all subjects", data.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [axiosPublic, groupId , batchId]);

  // Fetch chapters when subjectId changes
  useEffect(() => {
    const fetchChapters = async () => {
      if (!subjectId) {
        setChapters([]);
        setChapterId("");
        return;
      }
      try {
        const { data } = await axiosPublic.get(`/chapter`);
        const filteredChapters = data.data.filter((chapter) => chapter.subjectId._id === subjectId);
        setChapters(filteredChapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchChapters();
  }, [axiosPublic, subjectId]);

  // Fetch topics when chapterId changes
  useEffect(() => {
    const fetchTopics = async () => {
      if (!chapterId) {
        setTopics([]);
        setTopicId("");
        return;
      }
      try {
        const { data } = await axiosPublic.get(`/topic`);
        const filteredTopics = data.data.filter((topic) => topic.chapterId._id === chapterId);
        setTopics(filteredTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, [axiosPublic, chapterId, setTopicId]);

  // Reset dependent fields when parent selection changes
  const handleBatchChange = (e) => {
    setBatchId(e.target.value);
    setGroupId("");
    setSubjectId("");
    setChapterId("");
    setTopicId("");
  };

  const handleGroupChange = (e) => {
    setGroupId(e.target.value);
    setSubjectId("");
    setChapterId("");
    setTopicId("");
  };

  const handleSubjectChange = (e) => {
    setSubjectId(e.target.value);
    setChapterId("");
    setTopicId("");
  };

  const handleChapterChange = (e) => {
    setChapterId(e.target.value);
    setTopicId("");
  };

  return (
    <div className="flex flex-wrap xl:flex-nowrap gap-2 mb-6">
      {/* batches select */}
      <select
        onChange={handleBatchChange}
        value={batchId}
        className="bg-[#E9E4E4] hover:bg-gray-200 text-[#6a6b6c] text-sm  rounded-xl px-4 py-2 flex items-center"
      >
        <option value="">Select Batch</option>
        {batches.map((batch, idx) => (
          <option key={idx} value={batch._id}>
            {batch.name}
          </option>
        ))}
      </select>

      {/* groups select */}
      <select
        onChange={handleGroupChange}
        value={groupId}
        className="bg-[#E9E4E4] hover:bg-gray-200 text-[#6a6b6c] text-sm  rounded-xl px-4 py-2 flex items-center"
      >
        <option value="">Select Group</option>
        {groups.map((group, idx) => (
          <option key={idx} value={group._id}>
            {group.name}
          </option>
        ))}
      </select>

      {/* subjects select */}
      <select
        onChange={handleSubjectChange}
        value={subjectId}
        className="bg-[#E9E4E4] hover:bg-gray-200 text-[#6a6b6c] text-sm  rounded-xl px-4 py-2 flex items-center"
      >
        <option value="">Select Subject</option>
        {subjects.map((subject, idx) => (
          <option key={idx} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      {/* chapters select */}
      <select
        onChange={handleChapterChange}
        value={chapterId}
        className="bg-[#E9E4E4] hover:bg-gray-200 text-[#6a6b6c] text-sm  rounded-xl px-4 py-2 flex items-center"
      >
        <option value="">Select Chapter</option>
        {chapters.map((chapter, idx) => (
          <option key={idx} value={chapter._id}>
            {chapter.name}
          </option>
        ))}
      </select>

      {/* topics select */}
      <select
        onChange={(e) => {
          setTopicId(e.target.value);
        }}
        value={topicId}
        className="bg-[#E9E4E4] hover:bg-gray-200 text-[#6a6b6c] text-sm  rounded-xl px-4 py-2 flex items-center"
      >
        <option value="">Select Topic</option>
        {topics.map((topic, idx) => (
          <option key={idx} value={topic._id}>
            {topic.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
