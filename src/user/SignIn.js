import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {signin} from "../_actions/userAction";
import {setAuthToken} from "../utils/axios";
import {store} from "../index";
import {USER_MESSAGE_FAILED} from "../_reducers/userReducer";
import {toast_basic_error, toast_basic_success} from "../utils/toastifies";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      username: data.get('email'),
      password: data.get('password'),
    };
    dispatch(signin(body))
        .then((res) => {
            console.log(res);
            let message = store.getState().user.message;
            if(message === USER_MESSAGE_FAILED) {
                toast_basic_error("로그인에 실패하였습니다");
                localStorage.removeItem('AuthToken');
                setAuthToken(localStorage.AuthToken);
            }else{
                localStorage.setItem('AuthToken', res.payload.token);
                setAuthToken(localStorage.AuthToken);
                navigate('/dashboard');
                toast_basic_success(`안녕하세요 ${res.payload.username}님`);
            }
        })
        .catch((err) => {
            console.log(err);
            toast_basic_error("로그인에 실패하였습니다");
            localStorage.removeItem('AuthToken');
            setAuthToken(localStorage.AuthToken);
        });

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                로그인
            </Button>
            <Grid container direction={"column"}>
              <Grid item xs component={Link} to="/password/reset">
                  비밀번호를 잊으셨나요?
              </Grid>
              <Grid item component={Link} to="/signup">
                  {"아직 회원이 아니신가요? 회원가입 하세요!"}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}