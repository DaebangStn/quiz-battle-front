import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../dashboard/Title';
import {useDispatch} from "react-redux";
import {get_profile} from "../_actions/userAction";
import {useEffect, useState} from "react";

export default function BriefProfile() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("Null");
  const [email, setEmail] = useState("Null");

  useEffect(() => {
  dispatch(get_profile())
      .then((res) => {
          setUsername(res.payload.username);
          setEmail(res.payload.email);
      })
      .catch((err) => {
          setUsername("Error");
          setEmail("Error");
      })
  }, [dispatch]);

  return (
    <React.Fragment>
      <Title>User</Title>
      <Typography component="p" variant="h4">
          {username}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
          {email}
      </Typography>
      <div>
        <Link color="primary" href="/profile">
            View Detail
        </Link>
      </div>
    </React.Fragment>
  );
}
