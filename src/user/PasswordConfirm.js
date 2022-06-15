import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import QueryString from "qs";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useDispatch} from "react-redux";
import {confirm_password} from "../_actions/userAction";
import {store} from "../index";
import {USER_MESSAGE_FAILED, USER_MESSAGE_NOT_FOUND} from "../_reducers/userReducer";
import {toast_basic_error, toast_basic_success, toast_basic_warn} from "../utils/toastifies";

const theme = createTheme();

export default function PasswordConfirm(){
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if(data.get('password') === data.get('password-confirm')) {
          const token_obj = QueryString.parse(location.search, {ignoreQueryPrefix: true});
          const body = {
              password: data.get('password'),
              token: token_obj.token
          };
          console.log(body);
          dispatch(confirm_password(body))
              .then((res) => {
                  console.log(res);
                  const message = store.getState().user.message;
                  if(message === USER_MESSAGE_FAILED){
                      toast_basic_error("요청에 실패했습니다");
                      console.log(res.payload.request.response);
                  }else if(message === USER_MESSAGE_NOT_FOUND){
                      toast_basic_error("요청에 실패했습니다");
                  }else{
                      toast_basic_success("비밀번호 변경에 성공했습니다");
                      navigate('/signin');
                  }
              })
              .catch((err) => {
                  console.log(err);
              })
      }else{
          toast_basic_warn("비밀번호가 확인과 일치하지 않습니다");
    }
  }

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
              비밀번호 재설정
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="새로운 비밀번호"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="새로운 비밀번호 확인"
                  type="password"
                  id="password-confirm"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                재설정
            </Button>
            <Grid container direction={"column"}>
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