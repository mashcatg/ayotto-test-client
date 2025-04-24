import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MdArrowCircleDown, MdVerified, MdDelete, MdEdit } from "react-icons/md";
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from "date-fns";
import { RiNewsLine } from "react-icons/ri";
import { BiComment, BiWorld } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaHotjar } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import PostModal from "./PostModal";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

const NewsFeed = () => {
   const { user } = useAuth();
   const [showCommentBoxes, setShowCommentBoxes] = useState({});
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [expandedContent, setExpandedContent] = useState({});
   const [activeTab, setActiveTab] = useState('all');
   const [editingPost, setEditingPost] = useState(null);
   const [selectedCategory, setSelectedCategory] = useState('');
   const [expandedComments, setExpandedComments] = useState({});
   const [editingComment, setEditingComment] = useState(null);
   const axios = useAxios();

   const categories = [
      { value: "", label: "All Categories" },
      { value: "question", label: "Questions" },
      { value: "announcement", label: "Announcements" },
      { value: "discussion", label: "Discussions" },
      { value: "resource", label: "Resources" }
   ];

   const { data: posts = [], refetch } = useQuery({
      queryKey: ['posts', activeTab, selectedCategory],
      queryFn: async () => {
         const params = new URLSearchParams();
         if (activeTab === 'myPosts') params.append('myPosts', true);
         if (selectedCategory) params.append('category', selectedCategory);
         
         const res = await axios.get(`/post?${params.toString()}`);
         return res.data.data.posts;
      }
   });

   const toggleCommentBox = (postId) => {
      setShowCommentBoxes(prev => ({
         ...prev,
         [postId]: !prev[postId]
      }));
   };

   const toggleContentExpansion = (postId) => {
      setExpandedContent(prev => ({
         ...prev,
         [postId]: !prev[postId]
      }));
   };

   const handleQuestionSubmit = async (post) => {
      try {
         const postData = {
            ...post,
            category: post.category || "question",
            title: post.title || post.content.substring(0, 100)
         };

         const res = await axios.post('/post', postData);
         if (res.data.success) {
            refetch();
            setIsModalOpen(false);
            return toast.success("Your post has been submitted successfully!");
         }
      } catch (error) {
         console.error('Error submitting post:', error);
         toast.error(error.response?.data?.message || 'Failed to submit post. Please try again.');
      }
   };

   const handleUpvote = async (id) => {
      try {
         const res = await axios.post(`/post/${id}/toggle-upvote`);
         if (res.data.success) {
            refetch();
            const message = res.data.message || 'Post vote updated successfully';
            toast.success(message);
         }
      } catch (error) {
         console.error('Error updating vote:', error);
         toast.error(error.response?.data?.message || 'Failed to update vote');
      }
   }

   const isPostUpvotedByUser = (post) => {
      return post.upvotedBy && post.upvotedBy.includes(user?._id);
   };

   const handleComment = (postId) => async (e) => {
      e.preventDefault();
      const content = e.target.commentText.value;
      
      try {
         const res = await axios.post(`/post/${postId}/comments`, { content });
         if(res.data.success){
            toast.success(res.data.message || 'Comment has been posted!');
            e.target.reset();
            refetch();
         }
      } catch (error) {
         console.error('Error posting comment:', error);
         toast.error(error.response?.data?.message || 'Failed to post comment');
      }
   }

   const handleDeletePost = async (postId) => {
      if (!window.confirm('Are you sure you want to delete this post?')) return;

      try {
         const res = await axios.delete(`/post/${postId}`);
         if (res.data.success) {
            refetch();
            toast.success("Post deleted successfully!");
         }
      } catch (error) {
         console.error('Error deleting post:', error);
         toast.error(error.response?.data?.message || 'Failed to delete post');
      }
   };

   const handleUpdatePost = async (post) => {
      try {
         const res = await axios.put(`/post/${post._id}`, post);
         if (res.data.success) {
            refetch();
            setEditingPost(null);
            setIsModalOpen(false);
            toast.success("Post updated successfully!");
         }
      } catch (error) {
         console.error('Error updating post:', error);
         toast.error(error.response?.data?.message || 'Failed to update post');
      }
   };

   const handleUpdateComment = async (postId, commentId, newContent) => {
      try {
         setEditingComment(null);
         await axios.put(`/post/${postId}/comments/${commentId}`, { content: newContent });
         refetch();
         toast.success("Comment updated successfully");
      } catch (error) {
         console.error('Error updating comment:', error);
         toast.error(error.response?.data?.message || 'Failed to update comment');
      }
   };

   const handleDeleteComment = async (postId, commentId) => {
      if (!window.confirm('Are you sure you want to delete this comment?')) return;
      
      try {
         await axios.delete(`/post/${postId}/comments/${commentId}`);
         refetch();
         toast.success("Comment deleted successfully");
      } catch (error) {
         console.error('Error deleting comment:', error);
         toast.error(error.response?.data?.message || 'Failed to delete comment');
      }
   };

   const toggleExpandComments = (postId) => {
      setExpandedComments(prev => ({
         ...prev,
         [postId]: !prev[postId]
      }));
   };

   const renderContent = (post) => {
      const content = post?.content || "";
      const isLongContent = content.length > 60;
      const isExpanded = expandedContent[post?._id] || false;

      if (!isLongContent) {
         return <p className="py-4">{content}</p>;
      }

      if (isExpanded) {
         return (
            <div className="py-4">
               <p>{content}</p>
               <button 
                  onClick={() => toggleContentExpansion(post?._id)}
                  className="text-primary font-medium mt-2 hover:underline"
               >
                  See Less
               </button>
            </div>
         );
      } else {
         return (
            <div className="py-4">
               <p>{content.substring(0, 60)}...</p>
               <button 
                  onClick={() => toggleContentExpansion(post?._id)}
                  className="text-primary font-medium mt-2 hover:underline"
               >
                  See More
               </button>
            </div>
         );
      }
   };

   const renderComments = (post) => {
      const isExpanded = expandedComments[post._id];
      const comments = post.comments || [];
      const displayComments = isExpanded ? comments : comments.slice(0, 3);
      const hasMoreComments = comments.length > 3;

      return (
         <div className="space-y-5">
            {displayComments.map((comment) => (
               <div key={comment?._id} className="flex items-start gap-4">
                  <Link target="_blank" to={`/dashboard/profile/${comment?.author?._id}`}>
                     <img
                        src={comment?.author?.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                     />
                  </Link>
                  <div className="flex-grow">
                     <div className="bg-slate-200 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1 text-sm">
                              <h4 className="font-semibold">{comment?.author?.name}</h4>
                              <MdVerified className="text-blue-600" title="Verified" />
                           </div>
                           {(comment.author?._id === user?._id || user?.role === 'admin') && (
                              <div className="flex gap-2">
                                 {editingComment?._id === comment._id ? (
                                    <div className="flex gap-2">
                                       <button
                                          onClick={() => handleUpdateComment(post._id, comment._id, editingComment.content)}
                                          className="text-blue-600 hover:text-blue-800 text-sm"
                                       >
                                          Save
                                       </button>
                                       <button
                                          onClick={() => setEditingComment(null)}
                                          className="text-gray-600 hover:text-gray-800 text-sm"
                                       >
                                          Cancel
                                       </button>
                                    </div>
                                 ) : (
                                    <>
                                       <button
                                          onClick={() => setEditingComment(comment)}
                                          className="text-blue-600 hover:text-blue-800"
                                       >
                                          <MdEdit className="text-sm" />
                                       </button>
                                       <button
                                          onClick={() => handleDeleteComment(post._id, comment._id)}
                                          className="text-red-600 hover:text-red-800"
                                       >
                                          <MdDelete className="text-sm" />
                                       </button>
                                    </>
                                 )}
                              </div>
                           )}
                        </div>
                        {editingComment?._id === comment._id ? (
                           <input
                              type="text"
                              value={editingComment.content}
                              onChange={(e) => setEditingComment({...editingComment, content: e.target.value})}
                              className="mt-2 w-full p-2 border rounded"
                           />
                        ) : (
                           <p className="text-gray-700 mt-1">{comment.content}</p>
                        )}
                     </div>
                     <span className="text-xs text-gray-500 ml-2">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                     </span>
                  </div>
               </div>
            ))}
            
            {hasMoreComments && (
               <button
                  onClick={() => toggleExpandComments(post._id)}
                  className="text-primary hover:underline text-sm font-medium ml-14"
               >
                  {isExpanded ? 'Show Less Comments' : `Show All ${comments.length} Comments`}
               </button>
            )}
         </div>
      );
   };

   const getTrendingPostsCount = () => {
      return posts.filter(post => (post.upVotes || 0) > 5).length;
   };

   const getTotalCommentsCount = () => {
      return posts.reduce((total, post) => total + (post.comments.length || 0), 0);
   };

   const getUniqueAuthorsCount = () => {
      const uniqueAuthors = new Set();
      posts.forEach(post => {
         if (post.author?._id) {
            uniqueAuthors.add(post.author._id);
         }
      });
      return uniqueAuthors.size;
   };

   return (
      <div>
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-5">
               <Link to='/dashboard/public-profile'>
                  <img
                     src={user?.avatar}
                     alt=""
                     className="w-10 h-10 rounded-full object-cover"
                  />
               </Link>
               <div
                  onClick={() => {
                     setEditingPost(null);
                     setIsModalOpen(true);
                  }}
                  className="bg-gray-200 p-2 rounded-lg text-gray-500 grow cursor-pointer"
               >
                  Ask a question
               </div>
            </div>

            <div className="flex flex-col gap-4 border-b pb-2">
               {/* Tab buttons */}
               <div className="flex gap-4">
                  <button
                     className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                       activeTab === 'all' 
                         ? 'bg-primary text-white shadow-md' 
                         : 'bg-white text-gray-700 hover:bg-gray-200'
                     }`}
                     onClick={() => setActiveTab('all')}
                  >
                     All Posts
                  </button>
                  <button
                     className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                       activeTab === 'myPosts' 
                         ? 'bg-primary text-white shadow-md' 
                         : 'bg-white text-gray-700 hover:bg-gray-200'
                     }`}
                     onClick={() => setActiveTab('myPosts')}
                  >
                     My Posts
                  </button>
               </div>
               
               {/* Category buttons */}
               <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                     <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                           selectedCategory === category.value
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                        }`}
                     >
                        {category.label}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6">
            <div className="col-span-2 order-2 md:order-1">
               <div className="bg-[#EDF0FF] p-4 rounded-sm mt-4 border border-blue-400 space-y-14">
                  {posts.map((post) => (
                     <div key={post?._id}>
                        <div className="flex items-center justify-between w-full">
                           <div className="flex items-center gap-4">
                              <Link to={`/dashboard/public-profile/${post?.author?._id}`}>
                                 <img
                                    src={post?.author?.avatar}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover"
                                 />
                              </Link>
                              <div>
                                 <div className="flex items-center gap-1">
                                    <h4 className="font-semibold">
                                       {post?.author?.name || 'No name found'}
                                    </h4>
                                    <MdVerified
                                       className="text-blue-600 cursor-pointer"
                                       title="Verified"
                                    />
                                 </div>
                                 <div className="flex items-center gap-1 font-light text-gray-700">
                                    <p>
                                       {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                    </p>
                                    <BiWorld />
                                 </div>
                              </div>
                           </div>
                           {post.author?._id === user?._id && (
                              <div className="flex gap-2">
                                 <button
                                    onClick={() => {
                                       setEditingPost(post);
                                       setIsModalOpen(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                 >
                                    <MdEdit className="text-xl" />
                                 </button>
                                 <button
                                    onClick={() => handleDeletePost(post._id)}
                                    className="text-red-600 hover:text-red-800"
                                 >
                                    <MdDelete className="text-xl" />
                                 </button>
                              </div>
                           )}
                        </div>

                        {renderContent(post)}

                        {post?.image && (
                           <div className="w-full">
                              <img
                                 src={post.image}
                                 alt="post"
                                 className="w-full rounded-lg"
                              />
                           </div>
                        )}

                        <div className="flex items-center gap-6 py-4">
                           <div className="flex items-center gap-0.5">
                              <MdArrowCircleDown className="rotate-180 text-xl text-primary" />
                              <span>{post?.upvoteCount || 0}</span>
                           </div>
                           <div className="flex items-center gap-0.5">
                              <FaRegCommentDots className="text-primary text-xl" />
                              <span>{post.comments.length}</span>
                           </div>
                        </div>

                        <hr className="text-gray-400" />

                        <div className="flex items-center justify-evenly py-4">
                           <div 
                              onClick={() => handleUpvote(post?._id)} 
                              className={`flex items-center gap-0.5 text-xl cursor-pointer ${
                                 isPostUpvotedByUser(post) 
                                    ? 'text-primary font-medium' 
                                    : 'hover:text-primary'
                              }`}
                           >
                              <MdArrowCircleDown 
                                 className={`rotate-180 text-xl ${
                                    isPostUpvotedByUser(post) ? 'text-primary' : ''
                                 }`} 
                              />
                              <span>Upvote</span>
                           </div>
                           <div
                              onClick={() => toggleCommentBox(post?._id)}
                              className="flex items-center gap-0.5 text-xl cursor-pointer hover:text-primary"
                           >
                              <BiComment className="text-xl" />
                              <span>Opinion</span>
                           </div>
                           <div className="flex items-center gap-0.5 text-xl cursor-pointer hover:text-primary">
                              <CiBookmark className="text-xl" />
                              <span>Save</span>
                           </div>
                        </div>

                        {showCommentBoxes[post?._id] && (
                           <form
                              onSubmit={handleComment(post?._id)}
                              className="flex items-center gap-4 border border-gray-300 mb-4 mx-auto rounded-lg"
                           >
                              <input
                                 type="text"
                                 name="commentText"
                                 placeholder="Write your comment."
                                 className="p-2 outline-0 grow"
                                 required
                              />
                              <button
                                 type="submit"
                                 className="bg-primary text-white px-4 py-2 hover:bg-primary/90 rounded-r-lg"
                              >
                                 <span>Comment</span>
                              </button>
                           </form>
                        )}

                        {renderComments(post)}
                     </div>
                  ))}
               </div>

               <PostModal
                  isOpen={isModalOpen}
                  onClose={() => {
                     setIsModalOpen(false);
                     setEditingPost(null);
                  }}
                  onSubmit={editingPost ? handleUpdatePost : handleQuestionSubmit}
                  initialData={editingPost}
               />
            </div>

            <div className="order-1 md:order-2 mt-4 relative">
               <div className="border border-blue-400 bg-[#EDF0FF] p-4 rounded-md space-y-4 sticky top-32">
                  <div className="flex items-center space-x-1.5 bg-white p-2.5 rounded-md shadow-sm border border-blue-300">
                     <RiNewsLine className="text-2xl text-primary" />
                     <span>
                        <span className="font-light">Total Posts: </span>
                        <span className="font-semibold">{posts.length}</span>
                     </span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 bg-white p-2.5 rounded-md shadow-sm border border-red-300">
                     <FaHotjar className="text-2xl text-red-500" />
                     <span>
                        <span className="font-light">Trending Posts: </span>
                        <span className="font-semibold">{getTrendingPostsCount()}</span>
                     </span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 bg-white p-2.5 rounded-md shadow-sm border border-purple-300">
                     <FaRegCommentDots className="text-2xl text-purple-500" />
                     <span>
                        <span className="font-light">Total Comments: </span>
                        <span className="font-semibold">{getTotalCommentsCount()}</span>
                     </span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 bg-white p-2.5 rounded-md shadow-sm border border-green-300">
                     <BsPeopleFill className="text-2xl text-green-600" />
                     <span>
                        <span className="font-light">Active Contributors: </span>
                        <span className="font-semibold">{getUniqueAuthorsCount()}</span>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NewsFeed;