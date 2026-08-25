import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TenantProvider } from "./modules/auth/context/TenantContext";
import { AuthProvider } from "./modules/auth/context/AuthContext";

export default function App() {
  return (
    <TenantProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </TenantProvider>
  );
}
