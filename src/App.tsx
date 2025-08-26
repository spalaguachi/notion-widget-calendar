import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Design from "./pages/Design";
import Gallery from "./pages/Gallery";
import Calendar from "./pages/Calendar";
import NotFound from "./components/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Design />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/create/:id" element={<Calendar />} />
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
