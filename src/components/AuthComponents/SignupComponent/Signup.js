import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './signup.scss';


const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
  },
  input: {
      marginBottom: "30px"
  },
  submit: {
    marginBottom: "30px"
  }
}));

function Signup() {

  const classes = useStyles();
  const history = useHistory();

  const [SignupData, setSignupData] = useState({full_name: '', email: '', password: '' });
  const [signupErrors, setSignupErrors] = useState({ full_name: '', email: '', password: '' });


  const handleSignupDataChange = event => {
    event.persist();
    setSignupData({ ...SignupData, [event.target.id]: event.target.value});
  };

  const handleSubmite = (event) => {
    event.preventDefault();

    
    axios.post('http://localhost:8000/api/signup', SignupData)
    .then( response => {
        history.push('/login');
    })
    .catch( error => {
        setSignupErrors(error.response.data);
    } )
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>

        {signupErrors.full_name && <p className="signupError">{signupErrors.full_name[0]}</p>}

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            name="full_name"
            autoComplete="full_name"
            autoFocus
            onChange={handleSignupDataChange}
            value={SignupData.full_name}
            className={classes.input}
          />
          {signupErrors.email && <p className="signupError">{signupErrors.email[0]}</p>}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleSignupDataChange}
            value={SignupData.email}
            className={classes.input}

          />
        {signupErrors.password && <p className="signupError">{signupErrors.password[0]}</p>}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleSignupDataChange}
            value={SignupData.password}
            className={classes.input}

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmite}

          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link className="goLogin" to="/login" variant="body2">
                {"Have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Signup
