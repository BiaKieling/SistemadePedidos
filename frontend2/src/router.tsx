import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import OrdersList from "./pages/OrdersPage/OrderList";
import GloboplayUsers from "./pages/GloboplayUsers";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/orders", element: <OrdersList /> },
  { path: "/globoplay-users", element: <GloboplayUsers /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
