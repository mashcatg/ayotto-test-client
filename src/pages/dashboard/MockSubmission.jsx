import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowRightAlt } from "react-icons/md";
import useAxios from "../../hooks/useAxios";
import QuestionRenderer from '../../components/CustomEditor/QuestionRenderer';

// Simple loading component
const Loading = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const QuizSubmission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isChallenge, setIsChallenge] = useState(false);

  // Initialize quiz
  useEffect(() => {
    // Check if we're accepting a challenge or starting a new quiz
    const acceptingChallenge = location.state?.acceptingChallenge;
    const challengeId = location.state?.challengeId;
    
    if (acceptingChallenge && challengeId) {
      setIsChallenge(true);
      fetchChallengeQuiz(challengeId);
    } else if (!location.state?.subject) {
      navigate('/dashboard/mock-test');
      return;
    } else {
      createQuizAndFetchQuestions();
    }
  }, [location.state, navigate, axios]);

  // Fetch existing quiz for a challenge
  const fetchChallengeQuiz = async (challengeId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/quiz/challenge/${challengeId}`);
      console.log(response?.data?.questions ,"challage quiz")
      
      if (!response?.data?.questions ) {
        throw new Error("No questions returned for this challenge");
      }
      
      // Set the quizId from the challenge
      setQuizId(response?.data?.quizId);
      
      const formattedQuestions = response?.data?.questions.map((q) => {
        const correctOptionIndex = q.questionOption.findIndex(option => option.isCorrect === true);
        
        return {
          id: q._id,
          question: q.questionText,
          reference: q.questionRef || "",
          solution: q.solution || "",
          options: q.questionOption.map(option => option.text),
          correctAnswer: correctOptionIndex !== -1 ? correctOptionIndex : 0,
          fullOptions: q.questionOption,
          topic: q.topicId?.name || "Unknown Topic"
        };
      });
      
      setQuizData(formattedQuestions);
      console.log(quizData, "quiz daa")
    } catch (error) {
      console.error("Error fetching challenge quiz:", error);
      setError(`Failed to load challenge questions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create a new quiz
  const createQuizAndFetchQuestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const requestBody = {
        topicId: location.state.topicIds || [],
        totalQuestions: 5,
        challengedTo: location.state.challengedUser
      };
      
      const quizResponse = await axios.post("/quiz", requestBody);
      
      if (!quizResponse.data?.questions || quizResponse.data.questions.length === 0) {
        throw new Error("No questions returned from quiz API");
      }
      
      if (quizResponse.data.quizId) {
        setQuizId(quizResponse.data.quizId);
      }
      
      const formattedQuestions = quizResponse.data.questions.map((q) => {
        const correctOptionIndex = q.questionOption.findIndex(option => option.isCorrect === true);
        
        return {
          id: q._id,
          question: q.questionText,
          reference: q.questionRef || "",
          solution: q.solution || "",
          options: q.questionOption.map(option => option.text),
          correctAnswer: correctOptionIndex !== -1 ? correctOptionIndex : 0,
          fullOptions: q.questionOption,
          topic: q.topicId?.name || "Unknown Topic"
        };
      });
      
      setQuizData(formattedQuestions);
      console.log(quizData, "quiz daa")

    } catch (error) {
      console.error("Error creating quiz:", error);
      setError(`Failed to load questions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (loading || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, showResults]);

  // Navigate to results page when quiz is submitted
  useEffect(() => {
    if (showResults && quizId) {
      // Navigate directly without showing the submitting state
      navigate(`/dashboard/result/${quizId}`);
    }
  }, [showResults, quizId, navigate]);

  // Prevent page navigation/refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showResults) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showResults]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedOption) => {
    if (showResults || timeLeft === 0) return;

    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  // Handle skip question
  const handleSkipQuestion = (questionId) => {
    if (showResults || timeLeft === 0) return;

    // Set answer to null to indicate it was skipped
    setAnswers(prev => ({
      ...prev,
      [questionId]: null
    }));
    
    // Go to next question if not the last one
    if (currentQuestion < quizData.length - 1) {
      goToNextQuestion();
    }
  };

  // Calculate score and count correct/incorrect answers
  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    
    quizData.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
        correct++;
      } else if (answers[question.id] !== undefined && answers[question.id] !== null) {
        incorrect++;
      }
    });
    
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    
    return score;
  };

  // Submit quiz
  const handleSubmitQuiz = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    const finalScore = calculateScore();
    setQuizScore(finalScore);
    
    try {
      if (quizId) {

        console.log("Submitting quiz with ID:", quizId);
        const selectedAnswers = quizData.map(question => {
          const answerIndex = answers[question.id];
          
          // If the answer is null (skipped) or undefined (not answered), return empty string
          if (answerIndex === null || answerIndex === undefined) {
            return "";
          }
          
          // Otherwise return the letter representation
          return String.fromCharCode(65 + answerIndex);
        });
  
        const payload = {
          quizId: quizId,
          selectedAnswers: selectedAnswers,
          isChallengeResponse: isChallenge
        };
        
        await axios.post('/quiz/submit', payload);
        console.log("Quiz successfully submitted with ID:", quizId);
        setShowResults(true);
      } else {
        console.error("No quizId available for submission");
        setError("Cannot submit quiz: No quiz ID available");
        setSubmitting(false); // Make sure to reset submitting if there's an error
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError(`Failed to submit quiz: ${error.message}`);
      setSubmitting(false); // Make sure to reset submitting if there's an error
    }
    // Remove the setSubmitting(false) from the finally block
  };

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    return quizData.length > 0 && 
           currentQuestion < quizData.length && 
           answers[quizData[currentQuestion]?.id] !== undefined;
  };

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 border border-red-400 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Quiz</h2>
        <p>{error}</p>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/dashboard/mock-test')}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Return to Mock Test
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // No questions found state
  if (!loading && quizData.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 border border-yellow-400 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
        <p>There are no questions available for this topic at the moment.</p>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/dashboard/mock-test')}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Return to Mock Test
          </button>
        </div>
      </div>
    );
  }

  // Quiz submitting state
  if (submitting) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 border border-primary rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 text-primary">Submitting Quiz</h2>
        <div className="flex justify-center py-8">
          <Loading />
        </div>
        <p className="text-center text-gray-600">Please wait while we process your results...</p>
      </div>
    );
  }

  // Quiz taking page
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800/90">
          {isChallenge ? "Challenge Quiz" : "Quiz in Progress"}
        </h2>
        <div className="text-sm text-gray-600">
          Time Remaining: <span className='text-primary'>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="border border-gray-100 rounded-lg bg-white p-6">
        {quizData.length > 0 && currentQuestion < quizData.length && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quizData.length}
              </span>
              <span className="text-sm text-gray-500">
                {Object.keys(answers).length} of {quizData.length} answered
              </span>
            </div>

            <div className="mb-6">
              <div className="text-lg mb-1">
                <span className="inline-block mr-1">{currentQuestion + 1}. </span>
                <QuestionRenderer 
                  content={quizData[currentQuestion]?.question} 
                  className="inline-block"
                />
              </div>
              {quizData[currentQuestion]?.reference && (
                <p className="text-xs text-gray-500 mb-4">{quizData[currentQuestion]?.reference}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quizData[currentQuestion]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 border rounded cursor-pointer transition-colors
                    ${answers[quizData[currentQuestion]?.id] === index ? 'bg-[#F0FDF4] border-[#83f8a6]' : 'hover:bg-gray-50 bg-slate-50 border-gray-100'}`}
                  onClick={() => handleAnswerSelect(quizData[currentQuestion]?.id, index)}
                >
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${quizData[currentQuestion]?.id}`}
                    checked={answers[quizData[currentQuestion]?.id] === index}
                    onChange={() => {}}
                    className="mr-3 hidden"
                    disabled={timeLeft === 0}
                  />
                  <label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                    <QuestionRenderer content={option} className="option-content" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0 || timeLeft === 0}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <MdArrowRightAlt className='text-2xl rotate-180' />
            <span>Previous</span>
          </button>

          <div className="flex gap-2">
            {/* Skip button */}
            <button
              onClick={() => handleSkipQuestion(quizData[currentQuestion]?.id)}
              disabled={timeLeft === 0}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              Skip
            </button>
            
            {currentQuestion === quizData.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={timeLeft === 0 || submitting}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                disabled={timeLeft === 0}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <span>Next</span>
                <MdArrowRightAlt className='text-2xl' />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmission;