import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./modules/public/pages/Home";
import { About } from "./modules/public/pages/About";
import { Courses } from "./modules/public/pages/Courses";
import { Faculty } from "./modules/public/pages/Faculty";
import { Admissions } from "./modules/public/pages/Admissions";
import { Events } from "./modules/public/pages/Events";
import { News } from "./modules/public/pages/News";
import { Contact } from "./modules/public/pages/Contact";
import { Login } from "./modules/auth/pages/Login";
import { ForgotPassword } from "./modules/auth/pages/ForgotPassword";
import { ResetPassword } from "./modules/auth/pages/ResetPassword";
import { Dashboard } from "./modules/dashboard/pages/Dashboard";
import { ProtectedRoute } from "./modules/auth/guards/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "courses", Component: Courses },
      { path: "faculty", Component: Faculty },
      { path: "admissions", Component: Admissions },
      { path: "events", Component: Events },
      { path: "news", Component: News },
      { path: "contact", Component: Contact },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/reset-password", Component: ResetPassword },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
]);