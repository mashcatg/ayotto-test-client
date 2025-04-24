import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from "react-icons/fa";
import { SquareCheckBig, CircleX, Clock2, Users } from 'lucide-react';
import useAxios from '../hooks/useAxios';

// Simple loading component
const Loading = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const ChallengerResults = ({ quizId, totalQuestions }) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challengerData, setChallengerData] = useState(null);

  useEffect(() => {
    const fetchChallengerResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/quiz/getChallengersResults/${quizId}`);
        console.log("Challenger Results:", response.data);
        setChallengerData(response.data);
      } catch (error) {
        console.error("Error fetching challenger results:", error);
        setError(`Error loading challenger results: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchChallengerResults();
    }
  }, [quizId, axios]);

  // Render star display (filled and empty stars)
  const renderStars = (count) => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < count) {
        starArray.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
      } else {
        starArray.push(<FaRegStar key={i} className="text-yellow-500 text-sm" />);
      }
    }
    return starArray;
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Error state
  if (error) {
    return (
      <div className="mt-6 p-4 border border-red-300 rounded-lg bg-red-50">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Challenger Results</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="mt-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-primary mb-2">Other Participants</h3>
        <Loading />
      </div>
    );
  }

  // No data state
  if (!challengerData || !challengerData.submissions || challengerData.submissions.length === 0) {
    return (
      <div className="mt-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-primary mb-2">Other Participants</h3>
        <p className="text-gray-500">No other participants have completed this quiz yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border border-primary rounded-lg bg-[#EDF0FF]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Other Participants ({challengerData.totalSubmissions})
        </h3>
      </div>
      
      <div className="space-y-4">
        {challengerData.submissions.map((submission) => (
          <div key={submission._id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {submission.user.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">{submission.user.name}</h4>
                  <p className="text-xs text-gray-500">
                    {submission.user.phone ? `Phone: ${submission.user.phone}` : ''}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(submission.createdAt)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="flex items-center">
                <SquareCheckBig className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm">Correct: <strong className="text-green-500">{submission.score}</strong></span>
              </div>
              <div className="flex items-center">
                <CircleX className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm">Incorrect: <strong className="text-red-500">{submission.incorrectAnswers}</strong></span>
              </div>
              <div className="flex items-center">
                <Clock2 className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm">Skipped: <strong className="text-amber-500">{totalQuestions - (submission.score + submission.incorrectAnswers)}</strong></span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm mr-2">Performance:</span>
                <div className="flex">{renderStars(submission.stars)}</div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-primary">Final Score: {submission.score}/{totalQuestions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengerResults;