import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    function callback2(data) {
      if (data.email) {
        setUserEmail(data.email);
      }
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    console.log("token - " + localStorage.getItem("token"));
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  if (userEmail) {
    return (
      <div
        style={{
          zIndex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: 16,
            maxWidth: 1780,
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
          }}
        >
          <img
            src="assets/icon.svg"
            alt="logo"
            width="200"
            height="45"
            onClick={() => {
              navigate("/");
            }}
          ></img>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginRight: 20 }}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 20 }}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>
            <div>
              <Button
                variant={"contained"}
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/";
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: 72,
          zIndex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: 16,
            maxWidth: 1780,
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
          }}
        >
          <img
            src="assets/icon.svg"
            alt="logo"
            width="200"
            height="45"
            onClick={() => {
              navigate("/");
            }}
          ></img>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 30 }}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </div>
            <div>
              <Button
                variant={"contained"}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Signin
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
