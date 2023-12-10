import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Udemy, SignUp Below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button
                    sx={{bgcolor:"secondary.main"}}
                    size={"large"}
                    variant="contained"
                    onClick={async() => {
                        const response = await axios.post("http://localhost:3000/admin/signup", {
                            "email": email,
                            "password": password
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        window.location = "/"
                    }}

                > Signup</Button>
            </Card>
        </div>
    </div>
}

export default Signup;