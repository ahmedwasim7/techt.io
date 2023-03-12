import { Route, Routes } from "react-router-dom"
import "./App.css"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import NavigationBar from "./components/NavigationBar"
import PageNotFound from "./components/PageNotFound"
import AllChatRooms from "./pages/AllChatRooms"
import JoinedRooms from "./pages/JoinedRooms"
import AddRoom from "./pages/AddRoom"
import ProtectedRoute from "./components/ProtectedRoute"
import ChatPage from "./pages/ChatPage"

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/allrooms"
          element={
            <ProtectedRoute>
              <AllChatRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/joinedrooms"
          element={
            <ProtectedRoute>
              <JoinedRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addroom"
          element={
            <ProtectedRoute>
              <AddRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
