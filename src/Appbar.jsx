import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Appbar() {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        function callback2(data) {
            if (data.email) {
                setUserEmail(data.email)
            }
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        console.log("token - " + localStorage.getItem("token"));
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 30,
            zIndex: 1,
            backgroundColor: "#FFFFFF"
        }}>
            <div style={{marginLeft: 30}}>
                <Typography variant={"h5"}>CourseApp</Typography>
            </div>
    
            <div style={{display: "flex" , justifyContent: "space-around"}}>
                    <div >
                        <Button
                            onClick={() => {
                                navigate("/addcourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div >
                        <Button
                            onClick={() => {
                                navigate("/courses")
                            }}
                        >Courses</Button>
                    </div>
                    <div style={{marginLeft:10}}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                    >Logout</Button>
                    </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 30,
            zIndex: 1,
            backgroundColor: "#FFFFFF"
        }}>
            <div style={{marginLeft: 30}}>
                <Typography variant={"h5"}>CourseApp</Typography>
            </div>
    
            <div style={{display: "flex" ,justifyContent:"space-between"}}>
                <div style={{marginRight: 30}}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;