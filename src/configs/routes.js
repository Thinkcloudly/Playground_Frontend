import  SignIn  from '../containers/SignIn';
import Playground from '../containers/Playground';
import UserLogggedIn from '../HOC/UserLoggedIn/userLoggedIn';
import Instructions from '../containers/Instructions';

const routes = [
    {
        path: '/signIn',
        component: <SignIn />,
    },
    {
        path: '/',
        component: UserLogggedIn(Playground),
    },
    {
        path: '/instructions/:courseId',
        component: UserLogggedIn(Instructions),
    },
]

export default routes;