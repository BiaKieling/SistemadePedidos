// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { OrdersList } from "./pages/OrdersPage/OrderList";
import GloboplayUsers from "./pages/GloboplayUsers"; // Importe a nova página

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Página principal
  },
  {
    path: "/orders",
    element: <OrdersList />, // Página de lista de pedidos
  },
  {
    path: "/globoplay-users",
    element: <GloboplayUsers />, // Nova página para usuários do Globoplay
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
