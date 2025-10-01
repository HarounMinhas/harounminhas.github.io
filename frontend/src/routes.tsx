import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Library from './pages/Library';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/discover', element: <Discover /> },
  { path: '/library', element: <Library /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
