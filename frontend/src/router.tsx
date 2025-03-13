// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home"; // Importação nomeada
import { OrdersList } from "./pages/OrdersPage/OrderList"; // Importação nomeada

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Página principal
  },
  {
    path: "/orders",
    element: <OrdersList />, // Página de lista de pedidos
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
