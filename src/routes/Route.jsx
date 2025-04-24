import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Dashboard from "../layouts/Dashboard";
import DashHome from "../pages/dashboard/DashHome";
import Leaderboard from "../pages/dashboard/Leaderboard";
import PrivateRoute from "./PrivateRoute";
import ManageStudents from "../pages/dashboard/ManageStudents";
import AllAdmins from "../pages/dashboard/Admin/AllAdmins";
import Questions from "../pages/dashboard/Admin/Questions/Questions";
import Category from "../pages/dashboard/Admin/Category";
import RapidRead from "../pages/dashboard/RapidRead";
import Logs from "../pages/dashboard/Admin/Logs";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Transactions from "../pages/dashboard/Admin/Transactions";

import ManageQuestions from "../pages/dashboard/Admin/Questions/ManageQuestions";

import EditProfile from "../components/profile/EditProfile";

import MyProfile from "../pages/dashboard/MyProfile";
import MockTest from "../pages/dashboard/MockTest";
import MockSubmission from "../pages/dashboard/MockSubmission";
import MockExamResult from "../pages/dashboard/Admin/MockExamResult";
import NewsFeed from "../pages/dashboard/NewsFeed";
import PublicProfile from "../components/publicProfile/PublicProfile";
import Follow from "../components/publicProfile/Follow";



export const router = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      children: [
         {
            index: true,
            element: <Home />
         },
         {
            path: '/login',
            element: <Login />
         },
         {
            path: '/register',
            element: <Register />
         },
         {
            path: '/forgotPassword',
            element: <ForgotPassword />
         },
         {
            path: '/verifyOTP',
            element: <VerifyOTP />
         }
      ]
   },
   {
      path: "/dashboard",
      element: (
         <PrivateRoute>
            <Dashboard />
         </PrivateRoute>
      ),
      children: [
         {
            path: 'admin-dashboard',
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <DashHome />
               </RoleProtectedRoute>
            ),
         },
         {
            path: 'student-dashboard',
            element: (
               <RoleProtectedRoute role={'user'}>
                  <DashHome />
               </RoleProtectedRoute>
            ),
         },
         {
            path: 'leaderboard',
            element: <Leaderboard />
         },
         {
            path: 'rapidRead',
            element: (
               <RoleProtectedRoute role={'user'}>
                  <RapidRead />
               </RoleProtectedRoute>
            ),
         },
         {
            path: 'transactions',
            element: <Transactions></Transactions>
         },
         {
            path: 'profile',
            element: <MyProfile></MyProfile>
         },
         {
            path: 'public-profile/:userId',
            element: <PublicProfile></PublicProfile>
         },
         {
            path: 'follow',
            element: <Follow></Follow>
         },
         {
            path: 'editProfile',
            element: <EditProfile></EditProfile>
         },
         {
            path: 'mock-test',
            element: <MockTest />
         },
         {
            path: 'mock-submission',
            element: <MockSubmission />
         },
         {
            path: 'result/:quizId',
            element: <MockExamResult />
         },
         {
            path: 'news-feed',
            element: <NewsFeed />
         },

         {

            path: 'ManageStudents',
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <ManageStudents />
               </RoleProtectedRoute>
            ),
         },
         {
            path: 'allAdmins',
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <AllAdmins />
               </RoleProtectedRoute>
            ),
         },
         {
            path: "logs",
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <Logs />
               </RoleProtectedRoute>
            ),
         },
         {
            path: 'category',
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <Category />
               </RoleProtectedRoute>
            )
         },
         {
            path: 'create-questions',
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <Questions />
               </RoleProtectedRoute>
            )
         },
         {
            path: 'manage-questions',
            element: (
               <RoleProtectedRoute role={'admin'}>
                  <ManageQuestions />
               </RoleProtectedRoute>
            )
         }
      ]
   },
]);
