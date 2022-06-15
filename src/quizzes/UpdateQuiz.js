import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {quiz_delete, quiz_status, quiz_update} from "../_actions/pageAction";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../components/listItems';
import {toggle_sidebar} from "../_actions/pageAction";
import {store} from "../index";
import CssBaseline from "@mui/material/CssBaseline";
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import {get_list} from "../_actions/userAction";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListItemIcon from "@mui/material/ListItemIcon";
import {ContentCopy} from "@mui/icons-material";
import {PAGE_MESSAGE_FORBIDDEN} from "../_reducers/pageReducer";
import {toast_basic_error, toast_basic_success} from "../utils/toastifies";

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

function UpdateQuizContent() {
  const [open, setOpen] = useState(store.getState().page.showSidebar);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [round, setRound] = useState(-1);
  const [type, setType] = useState(-1);
  const [memberList, setMemberList] = useState([]);
  const [memberSelected, setMemberSelected] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let {slug} = useParams();
  const link = process.env.REACT_APP_BACKEND_HOST + '/quiz/' + slug;

  useEffect(() => {
      setDefault();
      dispatch(get_list())
      .then((res) => {
          setMemberList(res.payload.map(user => user.username));
      })
      .catch((err) => {
          console.log((err));
      })
      // eslint-disable-next-line
  }, []);

  const toggleDrawer = () => {
    dispatch(toggle_sidebar())
    setOpen(store.getState().page.showSidebar);
  };

  const copyClipboard = () => {
      navigator.clipboard.writeText(link)
          .then((res) => {
              toast("복사되었습니다")
          })
          .catch((err) => {
              console.log(err);
          })
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
          type: type,
          participants_username: memberSelected.toString()
      }
      dispatch(quiz_update(slug, data))
          .then((res) => {
              console.log(res);
              const message = store.getState().page.message;
              if(message === PAGE_MESSAGE_FORBIDDEN){
                  toast_basic_error("권한이 없습니다");
              }else{
                  toast_basic_success("수정되었습니다");
              }
          })
          .catch((err) => {
              console.log(err);
          })

      navigate('/quiz/available');
  }

  const setDefault = () => {
      dispatch(quiz_status(slug))
        .then((res) => {
            console.log(res);
            setName(res.payload.name);
            setHost(res.payload.host.username);
            setRound(res.payload.round);
            setType(res.payload.type);
            setMemberSelected(res.payload.participants.map(a => a.username));
        })
        .catch((err) => {
            console.log(err);
        })
  }

  const handleDelete = () => {
      dispatch(quiz_delete(slug))
          .then((res) => {
              console.log(res);
              console.log(store.getState().page.message);
              const message = store.getState().page.message;
              const msg_arr = message.split(' ');
              if(message === PAGE_MESSAGE_FORBIDDEN){
                  toast_basic_error("권한이 없습니다");
              }else if(msg_arr[msg_arr.length - 1] === 'deleted'){
                  toast_basic_success("삭제되었습니다");
              }else{
                  toast_basic_error("오류가 발생했습니다");
              }
          })
          .catch((err) => {
              console.log(err);
          })
      navigate('/quiz/available');
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
              퀴즈 설정 바꾸기
            </Typography>
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
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="quiz_name"
                  required
                  fullWidth
                  id="quiz_name"
                  label="퀴즈 이름"
                  value={name}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="room_host"
                  label="방장"
                  name="room_host"
                  value={host}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    id="participants"
                    multiple
                    value={memberSelected}
                    disableCloseOnSelect
                    options={memberList}
                    renderInput={(params) => (
                        <TextField {...params} label="참가자" variant="outlined"/>
                    )}
                    onChange={(e, v) => {
                        setMemberSelected(v);
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={type}
                  onChange={(e)=>{
                      setType(e.target.value);
                  }}
                  name="room_type"
                  label="게임 타입"
                  id="room_type"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="room_round"
                  label="게임 라운드"
                  id="room_round"
                  value={round}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                  <Grid container spacing={2} alignItems={"center"}>
                      <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  name="room_link"
                  label="클릭하여 링크 복사"
                  id="room_link"
                  value={link}
                  disabled
                />
                      </Grid>
                      <Grid item xs={2}>
                          <ListItemIcon onClick={copyClipboard}>
                              <ContentCopy/>
                          </ListItemIcon>
                      </Grid>
                  </Grid>
              </Grid>
            </Grid>
              <Grid
                  container
                  direction={"row"}
                  spacing={3}
              >
                  <Grid item>
                      <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={setDefault}
                      >
                          기본값
                      </Button>
                  </Grid>
                  <Grid item>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleSubmit}
                      >
                          수정
                      </Button>
                  </Grid>
                  <Grid item>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="error"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleDelete}
                      >
                          삭제
                      </Button>
                  </Grid>
              </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function UpdateQuiz() {
  return <UpdateQuizContent />;
}
