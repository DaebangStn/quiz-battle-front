import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import * as React from "react";
import { useDispatch } from "react-redux";
import { get_password_token } from "../_actions/userAction";
import { store } from "../index";
import { USER_MESSAGE_FAILED } from "../_reducers/userReducer";
import {
  toast_basic_loading,
  toast_basic_update_error,
  toast_basic_update_success,
} from "../utils/toastifies";

const theme = createTheme();

export default function PasswordReset() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const id = toast_basic_loading("요청중입니다...");
    dispatch(get_password_token(data.get("email")))
      .then((res) => {
        console.log(res);
        const message = store.getState().user.message;
        if (message === USER_MESSAGE_FAILED) {
          toast_basic_update_error(
            id,
            "요청에 실패했습니다 유효한 메일인지 확인해주세요"
          );
        } else {
          toast_basic_update_success(
            id,
            "성공적으로 요청했습니다 메일함을 확인해주세요"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast_basic_update_error(id, "서버에 장애가 생겼습니다");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            비밀번호 초기화
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="계정 등록시에 사용한 이메일"
              name="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              초기화 링크 전송
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
