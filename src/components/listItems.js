import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import { AddBox } from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="홈" />
    </ListItemButton>
    <ListItemButton component={Link} to="/quiz/create">
      <ListItemIcon>
        <AddBox />
      </ListItemIcon>
      <ListItemText primary="게임 만들기" />
    </ListItemButton>
    <ListItemButton component={Link} to="/quiz/available">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="게임 목록" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      계정
    </ListSubheader>
    <ListItemButton component={Link} to="/profile">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="사용자 정보" />
    </ListItemButton>
    <ListItemButton component={Link} to="/signout">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="로그아웃" />
    </ListItemButton>
  </React.Fragment>
);
