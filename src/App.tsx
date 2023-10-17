import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Join from './routes/Join';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/join', element: <Join /> },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

`;

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
