import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import { Homepage } from './pages/Homepage/Homepage';
import { Signup } from './pages/SignUp/Signup';
import { Signin } from './pages/Signin/Signin';
import { userLoader } from './loaders/userLoader';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: userLoader,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/signin",
                element: <Signin />
            },
            {
                path: '/profile',
                element:  (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
        ]
    }
])