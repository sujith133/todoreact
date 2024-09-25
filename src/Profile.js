import NavBar from "./Components/NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const id = Cookies.get("jwtToken"); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/userdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), 
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setEmail(data.email);
          setPassword(data.password); 
        } else {
          console.error("No user found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserDetails(); 
  }, [id]);

  const changeName = (event) => setName(event.target.value);
  const changeEmail = (event) => setEmail(event.target.value);
  const changePassword = (event) => setPassword(event.target.value);
  const changeRePassword = (event) => setRePassword(event.target.value);

  const edit = () => setIsEdit(true);
  const cancel = () => setIsEdit(false);

  const save = async () => {
    if (password !== rePassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        setIsEdit(false); 
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "100%", paddingBottom: 30, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <NavBar />
      </div>

      <h1 style={{ color: "white", marginTop: 100 }}>Hello, {name}</h1>
      <Typography variant="h4">Profile</Typography>
      <Link to="/login">
        <Button variant="contained" style={{ position: "absolute", right: 10, backgroundColor: "red" }} onClick={()=>Cookies.remove('jwtToken')}>Logout</Button>
      </Link>
      
      <div style={{ padding: 15, borderRadius: 15, height: 400, width: "40%",minWidth:270, backgroundColor: "#fff", color: "#333", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <Typography variant="h5">User Name: {name}</Typography>
        <Typography variant="h5">User Email: {email}</Typography>
        <Button variant="contained" onClick={edit}>Edit Profile</Button>
      </div>

      {isEdit && (
        <div style={{ marginTop: 20, padding: 15, borderRadius: 15, height: 400, width: "40%",minWidth:270, backgroundColor: "#fff", color: "#333", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
          <TextField label="Username" variant="outlined" value={name} onChange={changeName} style={{ marginBottom: 25, backgroundColor: "white", width: "90%" }} />
          <TextField label="Email" variant="outlined" value={email} onChange={changeEmail} style={{ marginBottom: 25, backgroundColor: "white", width: "90%" }} />
          <TextField label="Password" variant="outlined" value={password} onChange={changePassword} style={{ marginBottom: 25, backgroundColor: "white", width: "90%" }} />
          <TextField label="Re-Password" variant="outlined" value={rePassword} onChange={changeRePassword} style={{ marginBottom: 25, backgroundColor: "white", width: "90%" }} />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <Button variant="contained" onClick={save}>Save</Button>
            <Button variant="contained" onClick={cancel} style={{ backgroundColor: "red" }}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
