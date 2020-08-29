import React, { useEffect, useState } from "react";
import logo from "../logo.png";
import { Modal, Input, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useStateValue } from "../stateProvider/StateProvider";
import { actionTypes } from "../stateProvider/reducer";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Nav = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleShow, setHandleShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(true);
  const [uid, setUid] = useState("");
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHandleShow(true);
      } else setHandleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        let email = authUser.email.split("@");
        let name = email[0];
        let user = name[0].charAt(0).toUpperCase() + name.slice(1);
        setUid(authUser.uid);
        setUser(authUser.email);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then(
      (cred) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: cred.user,
        });
        localStorage.setItem("current-user", JSON.stringify(cred.user));
        setUid(cred.user.uid);
        return db.collection("users").doc(cred.user.uid).set({
          displayName: username,
          email: cred.user.email,
          id: cred.user.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      },
      (err) => alert(err.message)
    );

    setShow(true);
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem("current-user", JSON.stringify(result.user));
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })

      .catch((err) => alert(err.message));
    setOpenSignIn(false);
  };

  return (
    <div className={`nav ${handleShow && "nav_black"}`}>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="form_signUp">
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="E-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="form_button" onClick={signUp}>
              Sign Up
            </Button>
            <Button
              className="form_button"
              onClick={() => {
                setOpen(false);
                setOpenSignIn(true);
              }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="form_signUp">
            <TextField
              label="E-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
            <Button
              className="form_button"
              onClick={() => {
                setOpen(true);
                setOpenSignIn(false);
              }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Link to="/">
        <img className="nav_logo" src={logo} alt="netflix logo" />
      </Link>
      {user ? (
        <div className="nav_avatarUser ">
          <h5
            style={{ color: "#fff", cursor: "pointer", fontSize: "20px" }}
            onClick={() => setShow(!show)}
          >
            Hello, {user}
          </h5>
          {show ? (
            ""
          ) : (
            <div className="nav_show">
              <Link className="nav_movieList" to={`/mymovielist/${uid}`}>
                <h5>My movie list</h5>
              </Link>
              <Link to="/">
                <h5
                  style={{
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => auth.signOut()}
                >
                  Log out
                </h5>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <img
          onClick={() => setOpen(true)}
          className="nav_avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
          alt="avatar"
        />
      )}
    </div>
  );
};

export default Nav;
