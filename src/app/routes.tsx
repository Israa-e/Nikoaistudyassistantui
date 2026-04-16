import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PDFUploadScreen from "./screens/PDFUploadScreen";
import AIChatScreen from "./screens/AIChatScreen";
import QuizScreen from "./screens/QuizScreen";
import FlashcardsScreen from "./screens/FlashcardsScreen";
import StudyPlannerScreen from "./screens/StudyPlannerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./screens/NotFound";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/onboarding",
    element: <OnboardingScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "upload", element: <PDFUploadScreen /> },
      { path: "chat", element: <AIChatScreen /> },
      { path: "quiz", element: <QuizScreen /> },
      { path: "flashcards", element: <FlashcardsScreen /> },
      { path: "planner", element: <StudyPlannerScreen /> },
      { path: "profile", element: <ProfileScreen /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);