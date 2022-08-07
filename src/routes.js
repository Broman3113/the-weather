import AuthPage from "./Components/Auth/AuthPage";
import Main from "./Components/Main/Main";

export const notAuthRoutes = [
    {
        path: '/',
        Component: AuthPage
    },
]

export const authRoutes = [
    {
        path: '/',
        Component: Main
    },
    {
        path: '/:location',
        Component: Main
    },
    {
        path: '/:location/:date',
        Component: Main
    },
]
