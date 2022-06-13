import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../components/listItems';
import {useDispatch} from "react-redux";
import {quiz_start, quiz_status, quiz_submit, toggle_sidebar} from "../_actions/pageAction";
import {store} from "../index";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import QuizStatemnet from "./QuizStatemnet";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInterval from "../utils/useInterval";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


function QuizRoomContent() {
  const [open, setOpen] = React.useState(store.getState().page.showSidebar);
  const [name, setName] = useState("No Name");
  const [round, setRound] = useState(-1);
  const [quiz, setQuiz] = useState("No Quiz");
  const [solved, setSolved] = useState(false);

  const answerInput = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useInterval(() => {
      if(solved){
      refreshQuiz(true);
      setSolved(false);
      }else{
      refreshQuiz();
      }
  }, 200);

  const toggleDrawer = () => {
    dispatch(toggle_sidebar());
    setOpen(store.getState().page.showSidebar);
  };

  let {slug} = useParams();

  useEffect(() => {
      refreshQuiz(true);
  }, []);

  const handleSubmit = () => {
      if(round === 0){
          dispatch(quiz_start(slug))
              .then((res) => {
                  console.log(res);
                  alert("퀴즈를 시작합니다");
                  refreshQuiz(true);
              })
              .catch((err) => {
                  console.log(err);
                  refreshQuiz();
              })
      }else{
          dispatch(quiz_submit(slug, answerInput.current.value))
              .then((res) => {
                  if(store.getState().page.answerCorrect){
                      alert("정답입니다");
                      setSolved(true);
                      refreshQuiz(true);
                  }else{
                      alert("틀렸습니다");
                      refreshQuiz();
                  }
              })
              .catch((err) => {
                  console.log(err);
                  refreshQuiz();
              })
      }

      answerInput.current.value = "";
  }

  const refreshQuiz = (ignore_round = false) => {
      dispatch(quiz_status(slug))
          .then((res) => {
              console.log(res);
              let code = store.getState().page.quizForbidden;
              if(code){
                  console.log(`error code ${res.payload.code}`);
                  alert("참가자가 아닙니다. 참여할 수 없습니다");
                  navigate('/dashboard');
              }

              if(!ignore_round && round !== res.payload.round){
                  alert("다른 사람이 이미 맞추었습니다");
              }

              setName(res.payload.name);
              setRound(res.payload.round);
              setQuiz(res.payload.quiz);
          }).catch((err) => {
              console.log(err);
      });
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Quiz Room [{name}]
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent BriefProfile */}
              <Grid item xs={12} md={12} lg={6} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                  <QuizStatemnet round={round} quiz={quiz}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={6} >
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                  }}
                >
                    <Box>
                    <Grid
                        container direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        spacing={4}
                    >
                        <Grid item>
                    <TextField
                        inputRef={answerInput}
                      name="answer"
                      required
                      id="answer"
                      label="Answer"
                      fullWidth
                      autoFocus
                    />
                        </Grid>
                        <Grid item>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              제출
            </Button>
                        </Grid>
                    </Grid>
                        </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function QuizRoom() {
  return <QuizRoomContent />;
}
