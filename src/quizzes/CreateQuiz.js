import * as React from "react";
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../components/listItems";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { quiz_create, toggle_sidebar } from "../_actions/pageAction";
import { useDispatch } from "react-redux";
import { store } from "../index";
import { get_list } from "../_actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast_basic_error, toast_basic_success } from "../utils/toastifies";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function CreateQuizContent() {
  const [open, setOpen] = useState(store.getState().page.showSidebar);
  const [member, setMember] = useState("");
  const [name, setName] = useState("");
  const [memberList, setMemberList] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_list())
      .then((res) => {
        res.payload.forEach((item, i) => {
          item.id = i + 1;
        });
        setMemberList(res.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const toggleDrawer = () => {
    dispatch(toggle_sidebar());
    setOpen(store.getState().page.showSidebar);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const slug = name.replaceAll(" ", "-").toLowerCase();

    let memberString = "";
    console.log(member.newMember);
    member.newMember.forEach((item, i) => {
      if (i === 0) {
        memberString = item.username;
      } else {
        memberString += "," + item.username;
      }
    });

    const body = {
      name: name,
      participants_username: memberString,
    };
    dispatch(quiz_create(slug, body))
      .then((res) => {
        console.log(res);
        toast_basic_success("퀴즈를 만들었습니다");
        navigate(`/quiz/${slug}`);
      })
      .catch((err) => {
        toast_basic_error("퀴즈를 만들지 못하였습니다.");
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
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
              퀴즈 만들기
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
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
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 480,
                  }}
                >
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="quizname"
                          required
                          fullWidth
                          id="quizname"
                          label="퀴즈 이름"
                          autoFocus
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          id="participants"
                          multiple
                          isOptionEqualToValue={(opt, val) => opt.id === val.id}
                          options={memberList}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.username}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="참가자"
                              variant="outlined"
                            />
                          )}
                          onChange={(_event, newMember) => {
                            setMember({ member, newMember });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                    >
                      퀴즈 시작
                    </Button>
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

export default function CreateQuiz() {
  return <CreateQuizContent />;
}
