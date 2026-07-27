import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/PrivateRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import AllClasses from "./pages/AllClasses";
import ClassDetails from "./pages/ClassDetails";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import UserOverview from "./pages/dashboard/UserOverview";
import BookedClasses from "./pages/dashboard/BookedClasses";
import ApplyTrainer from "./pages/dashboard/ApplyTrainer";
import Favorites from "./pages/dashboard/Favorites";

import ManageSlots from "./pages/dashboard/ManageSlots";
import AddNewSlot from "./pages/dashboard/AddNewSlot";
import AddNewClass from "./pages/dashboard/AddNewClass";
import AddNewForumPost from "./pages/dashboard/AddNewForumPost";

import AppliedTrainers from "./pages/dashboard/AppliedTrainers";
import AllTrainers from "./pages/dashboard/AllTrainers";
import Balance from "./pages/dashboard/Balance";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col justify-between font-sans">
        
        <Navbar />

        
        <main className="flex-grow">
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/all-classes" element={<AllClasses />} />
            <Route path="/classes/:id" element={<ClassDetails />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              
              <Route index element={<UserOverview />} />
              <Route path="booked-classes" element={<BookedClasses />} />
              <Route path="apply-trainer" element={<ApplyTrainer />} />
              <Route path="favorites" element={<Favorites />} />

              
              <Route path="manage-slots" element={<ManageSlots />} />
              <Route path="add-slot" element={<AddNewSlot />} />
              <Route path="add-class" element={<AddNewClass />} />
              <Route path="add-forum" element={<AddNewForumPost />} />

              
              {/* Admin Routes - Matched with Sidebar links */}
              <Route 
                path="manage-users" 
                element={
                  <div className="p-8 text-white font-bold text-2xl">
                    Manage Users Component (Under Construction)
                  </div>
                } 
              />
              <Route path="applied-trainers" element={<AppliedTrainers />} />
              <Route path="manage-trainers" element={<AllTrainers />} />
              <Route path="all-trainers" element={<AllTrainers />} />
              <Route path="transactions" element={<Balance />} />
              <Route path="balance" element={<Balance />} />
            </Route>

            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        
        <Footer />
      </div>
    </Router>
  );
}

export default App;