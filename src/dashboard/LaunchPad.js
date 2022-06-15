import * as React from 'react';
import Button from "@mui/material/Button";
import Title from '../dashboard/Title';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast_basic_info} from "../utils/toastifies";

export default function LaunchPad() {
    const [val, setVal] = useState("");
    const navigate = useNavigate();

    const handleGameStart = event => {
        event.preventDefault();
        navigate('/quiz/create');
    }

    const handleGameParticipate = event =>{
        event.preventDefault();
        const roomName = val;
        const slug = roomName.replaceAll(' ', '-').toLowerCase();
        console.log(slug);
        toast_basic_info(`게임방 [${roomName}]에 참가합니다.`);
        navigate(`/quiz/${slug}`);
    }

  return (
    <React.Fragment>
      <Title>빠른 시작</Title>
        <Grid container direction={"column"} spacing={2} justifyItems="center">
        <Grid item>
                <TextField
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value);
                    }}
                  fullWidth
                  label="방 이름"
                  autoFocus
                />

        </Grid>
      <Grid item>
          <Button
              variant="contained"
              fullWidth
              style={{
                  fontSize: "20px"
          }}
              onClick={handleGameParticipate}
              href="#"
          >
              게임 참여하기
          </Button>
      </Grid>
      <Grid item>
          <Button
              variant="contained"
              fullWidth
              style={{
                  fontSize: "20px"
          }}
              onClick={handleGameStart}
          >
              게임 만들기
          </Button>
      </Grid>
        </Grid>
    </React.Fragment>
  );
}
