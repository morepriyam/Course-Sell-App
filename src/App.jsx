import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import Appbar from "./Appbar.jsx";
import AddCourse from "./AddCourse.jsx";
import Courses from "./Courses";
import Course from "./Course";
import { createTheme , colors ,ThemeProvider} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
          main: '#2D2F31',
        },
        secondary: {
          main: '#5624D0',
        },
        background: {
          default: '#F7F9FA',
        },
        text: {
          primary: '#000000',
        }
        
        
      },
      typography : {
        fontFamily: ['DM Sans', 'sans-serif'].join(','),
        fontSize: 16,
  },
})

function App() {

    return (
        <ThemeProvider theme={theme}>
        <div style={{width: "100vw",
            height: "100vh",
            backgroundColor: "#F5F5F5" }}
        >
                <Router>
                    <Appbar />
                    <Routes>
                        <Route path={"/addcourse"} element={<AddCourse />} />
                        <Route path={"/course/:courseId"} element={<Course />} />
                        <Route path={"/courses"} element={<Courses />} />
                        <Route path={"/signin"} element={<Signin />} />
                        <Route path={"/signup"} element={<Signup />} />
                    </Routes>
                </Router>

        </div>
        </ThemeProvider>
    );
}

export default App;