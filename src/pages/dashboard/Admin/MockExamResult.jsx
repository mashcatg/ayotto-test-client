import { useState, useEffect } from 'react';
import { SquareCheckBig, CircleX, Clock2 } from 'lucide-react';
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import Chart from "react-apexcharts";
import { GoBook } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import QuestionRenderer from '../../../components/CustomEditor/QuestionRenderer';
import ChallengerResults from '../../../components/ChallengerResults';

// Simple loading component
const Loading = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const MockExamResult = () => {
   const navigate = useNavigate();
   const { quizId } = useParams(); // Get quizId from URL params
   const axios = useAxios();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [resultData, setResultData] = useState(null);
   const [quizData, setQuizData] = useState([]);
   const [quizScore, setQuizScore] = useState(0);
   const [correctCount, setCorrectCount] = useState(0);
   const [incorrectCount, setIncorrectCount] = useState(0);
   const [skippedCount, setSkippedCount] = useState(0);
   const [subject, setSubject] = useState('');
   const [chapter, setChapter] = useState('');

   // Fetch quiz result data
   useEffect(() => {
      const fetchQuizResults = async () => {
         setLoading(true);
         try {
            const response = await axios.get(`/quiz/${quizId}`);
            console.log("API Response:", response.data);
            
            // Handle case where response is an array
            const data = Array.isArray(response.data) ? response.data[0] : response.data;
            
            if (!data || !data.quiz) {
               throw new Error("Quiz data is missing or invalid");
            }
            
            setResultData(data);
            
            // Process quiz data
            let questions = [];
            if (data.quiz && data.quiz.question) {
               questions = data.quiz.question.map(q => {
                  const correctOptionIndex = q.questionOption.findIndex(option => option.isCorrect === true);
                  
                  return {
                     id: q._id,
                     question: q.questionText,
                     reference: q.questionRef || "",
                     solution: q.solution || "",
                     options: q.questionOption.map(option => option.text),
                     correctAnswer: correctOptionIndex !== -1 ? correctOptionIndex : 0,
                     topic: q.topicId && q.topicId.length > 0 && typeof q.topicId[0] === 'object' 
                           ? q.topicId[0].name 
                           : "Unknown Topic"
                  };
               });
            }
            setQuizData(questions);
            
            // Process user answers
            const userAnswers = {};
            if (data.selectedOption && Array.isArray(data.selectedOption)) {
               data.selectedOption.forEach((answer) => {
                  // Skip empty answers (indicating skipped questions)
                  if (!answer.selectedOption) {
                     return;
                  }
                  
                  // Convert from letter (A, B, C, D) to index (0, 1, 2, 3)
                  const answerIndex = answer.selectedOption.charCodeAt(0) - 65;
                  userAnswers[answer.questionId] = answerIndex;
               });
            }
            
            // Calculate scores
            let correct = 0;
            let incorrect = 0;
            let skipped = 0;
            
            questions.forEach((question) => {
               // Check if the question has an answer
               if (userAnswers[question.id] !== undefined) {
                  // If answer matches correct answer
                  if (userAnswers[question.id] === question.correctAnswer) {
                     correct++;
                  } else {
                     incorrect++;
                  }
               } else {
                  // If no answer found, it was skipped
                  skipped++;
               }
            });
            
            setCorrectCount(correct);
            setIncorrectCount(incorrect);
            setSkippedCount(skipped);
            setQuizScore(correct);
            
            // Set subject and chapter if available
            if (data.quiz.subject) {
               setSubject(data.quiz.subject);
            }
            if (data.quiz.chapter) {
               setChapter(data.quiz.chapter);
            }
            
         } catch (error) {
            console.error("Error fetching quiz results:", error);
            setError(`Error loading quiz results: ${error.message}`);
         } finally {
            setLoading(false);
         }
      };

      if (quizId) {
         fetchQuizResults();
      }
   }, [quizId, axios]);

   // Calculate stars: correctAnswers - incorrectAnswers, minimum 0
   const stars = Math.max(0, correctCount - incorrectCount);

   // Calculate XP: 1 star = 30 XP
   const xpEarned = stars * 30;

   // Chart options
   const options = {
      chart: {
         type: "donut",
      },
      labels: ["Correct", "Incorrect", "Skipped"],
      colors: ["#00e372", "#FF4560", "#FFA500"],
      dataLabels: {
         enabled: false,
      },
      legend: {
         position: "bottom",
      },
      responsive: [
         {
            breakpoint: 480,
            options: {
               chart: {
                  width: 250,
               },
               legend: {
                  show: false,
               },
            },
         },
      ],
   };

   // Render star display (filled and empty stars)
   const renderStars = (count) => {
      const starArray = [];
      for (let i = 0; i < 5; i++) {
         if (i < count) {
            starArray.push(<FaStar key={i} className="text-yellow-500 text-xl" />);
         } else {
            starArray.push(<FaRegStar key={i} className="text-yellow-500 text-xl" />);
         }
      }
      return starArray;
   };

   // Update chart series to include skipped questions
   const series = [correctCount, incorrectCount, skippedCount];

   // Error state
   if (error) {
      return (
         <div className="max-w-2xl mx-auto mt-8 p-6 border border-red-400 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Results</h2>
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
         <div className="max-w-7xl mx-auto mt-8 p-6 border border-primary rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl mb-4 text-primary">কুইজ পরীক্ষা</h2>
            <Loading />
         </div>
      );
   }

   // No data state
   if (!resultData || !quizData || quizData.length === 0) {
      return (
         <div className="max-w-2xl mx-auto mt-8 p-6 border border-yellow-400 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-yellow-600">No Quiz Data Found</h2>
            <p>We couldn&apos;t find any quiz data for this result. The quiz may have been deleted or is not available.</p>
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

   return (
      <div className="max-w-7xl mx-auto mt-8 p-6 border border-primary rounded-lg shadow-lg bg-white">
         <h2 className="text-2xl mb-4 text-primary">কুইজ পরীক্ষা</h2>
         <div className="space-y-4">
            <div className="p-4 bg-[#EDF0FF] border border-primary rounded-lg">
               <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-2'>
                     <MdOutlineLibraryBooks className='text-slate-700' />
                     <span className='font-light'>Subject : {subject || 'N/A'}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <GoBook className='text-slate-700' />
                     <span className='font-light'>Chapter : {chapter || 'N/A'}</span>
                  </div>
               </div>

               <div className='my-6 grid md:grid-cols-3 gap-6'>
                  <div className='bg-white p-3 flex items-center gap-5 rounded-lg'>
                     <SquareCheckBig className='text-green-500' />
                     <div>
                        <p>Correct</p>
                        <span className='text-3xl text-green-500'>{correctCount}</span>
                     </div>
                  </div>

                  <div className='bg-white p-3 flex items-center gap-5 rounded-lg'>
                     <CircleX className='text-red-500' />
                     <div>
                        <p>Incorrect</p>
                        <span className='text-3xl text-red-500'>{incorrectCount}</span>
                     </div>
                  </div>

                  <div className='bg-white p-3 flex items-center gap-5 rounded-lg'>
                     <Clock2 className='text-amber-500' />
                     <div>
                        <p>Skip</p>
                        <span className='text-3xl text-amber-500'>{skippedCount}</span>
                     </div>
                  </div>
               </div>

               <div className='flex justify-evenly items-center text-center py-6'>
                  <div className='text-2xl md:text-3xl text-primary'>
                     <h2 className='font-semibold'>Final Result</h2>
                     <h2>{quizScore}/{quizData.length}</h2>
                     <p className='text-gray-800/80 text-sm font-light pt-1.5'>Questions Answered Correctly</p>
                  </div>

                  <div className='text-2xl md:text-3xl text-primary'>
                     <h2 className='font-semibold'>XP</h2>
                     <h2 className={`${xpEarned > 0 ? '' : 'text-red-500'}`}>{xpEarned}</h2>
                     <p className='text-gray-800/80 text-sm font-light pt-1.5'>Added to your profile</p>
                  </div>
               </div>

               {/* Star Rating Display */}
               <div className='flex justify-center items-center mb-4'>
                  <div className='flex flex-col items-center'>
                     <p className='text-lg font-medium mb-2'>Your Performance</p>
                     <div className='flex gap-1'>
                        {renderStars(stars)}
                     </div>
                  </div>
               </div>

               <div className="w-full flex justify-center">
                  <Chart options={options} series={series} type="donut" width={250} />
               </div>
            </div>

            <ChallengerResults
               quizId={quizId} 
               totalQuestions={quizData.length} 
            />

            <div className="mt-6 space-y-6">
               <h3 className="text-lg font-semibold">Question Review</h3>
               {quizData.map((question, index) => {
                  const selectedOptionObj = resultData.selectedOption.find(
                     (opt) => opt.questionId === question.id
                  );
                  
                  const selectedOption = selectedOptionObj?.selectedOption;
                  const selectedIndex = selectedOption ? selectedOption.charCodeAt(0) - 65 : null;
                  
                  // Determine if question was skipped
                  const isSkipped = !selectedOption || selectedOption === "";

                  return (
                     <div key={index} className={`p-4 border rounded-lg ${
                        isSkipped 
                           ? 'border-amber-400 bg-amber-50' 
                           : selectedIndex === question.correctAnswer 
                              ? 'border-green-400 bg-green-50' 
                              : 'border-red-400 bg-red-50'
                     }`}>
                        <div className="font-medium">
                           <span className="inline-block mr-1">{index + 1}. </span>
                           <QuestionRenderer content={question.question} className="inline-block" />
                        </div>
                        {question.reference && <p className="text-xs text-gray-500 mt-1">{question.reference}</p>}

                        <div className="mt-3 grid grid-cols-1 gap-2">
                           {question.options.map((option, optIdx) => (
                              <div
                                 key={optIdx}
                                 className={`p-2 rounded ${
                                    optIdx === question.correctAnswer
                                       ? 'bg-green-200 border border-green-400'
                                       : !isSkipped && selectedIndex === optIdx
                                          ? 'bg-red-200 border border-red-400'
                                          : 'bg-gray-100 border border-gray-200'
                                 }`}
                              >
                                 <div className={optIdx === question.correctAnswer ? 'font-medium' : ''}>
                                    <QuestionRenderer content={option} className="option-content" />
                                 </div>
                                 {optIdx === question.correctAnswer &&
                                    <span className="ml-2 text-green-600 text-sm">✓ Correct</span>
                                 }
                                 {!isSkipped && selectedIndex === optIdx &&
                                    <span className="ml-2 text-blue-600 text-sm"> </span>
                                 }
                              </div>
                           ))}
                        </div>

                        {isSkipped && (
                           <div className="mt-2 text-amber-600 font-medium">
                              <span>⚠️ You skipped this question</span>
                           </div>
                        )}

                        {question.solution && (
                           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                              <p className="text-sm font-medium mb-1">Solution:</p>
                              <div className="text-sm">
                                 <QuestionRenderer content={question.solution} />
                              </div>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>

            <div className='text-center mt-8'>
               <button
                  onClick={() => navigate('/dashboard/mock-test')}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-600/90 transition-colors"
               >
                  Return to Mock Test
               </button>
            </div>
         </div>
      </div>
   );
};

export default MockExamResult;