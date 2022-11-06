import  SignIn  from '../containers/SignIn';
import Playground from '../containers/Playground';
import UserLogggedIn from '../HOC/UserLoggedIn/userLoggedIn';
import Instructions from '../containers/Instructions';
import NotFound from '../containers/notFound';
import StudentInformation from '../containers/StudentInformation';

const routes = [
    {
        path: '/signIn',
        component: <SignIn />,
    },
    {
        path: '/student-data',
        component: <StudentInformation />,
    },
    {
        path: '/',
        component: UserLogggedIn(Playground),
    },
    {
        path: '/instructions/:courseId/:envName/',
        component: UserLogggedIn(Instructions),
    },
    {
        path: '*',
        component: <NotFound />,
    },
]

export default routes;