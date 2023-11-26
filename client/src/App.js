import "./stylesheets/theme.css";
import "./stylesheets/alignment.css";
import "./stylesheets/textelement.css";
import "./stylesheets/layout.css";
import "./stylesheets/custom.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/common/Registration";
import Login from "./pages/user/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/common/Home";
import WriteExam from "./pages/user1/WriteExam";
import UserReports from "./pages/user1/UserReports";
import Exams from "./pages/admin/Exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";
import AdminReports from "./pages/admin/Exams/AdminReports";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* common Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
             <Route
            path="/user/write-exam/:id"
            element={
              <ProtectedRoute>
                <WriteExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/reports"
            element={
              <ProtectedRoute>
                <UserReports />
              </ProtectedRoute>
            }
          />
          {/* admin routes */}
          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            }
          />

          {/* Exam edit Route */}
          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
