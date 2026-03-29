import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Faculty } from "./pages/Faculty";
import { Admissions } from "./pages/Admissions";
import { Events } from "./pages/Events";
import { News } from "./pages/News";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";

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
  {
    path: "/login",
    Component: Login,
  },
]);
