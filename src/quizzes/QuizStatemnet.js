import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function QuizStatemnet(props) {
  if (props.round === 0) {
    return (
      <Box height="100vh" display="flex" flexDirection="column">
        <Typography variant="h5" gutterBottom>
          게임이 시작되지 않았습니다. 제출 버튼으로 시작하세요.
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box height="100vh" display="flex" flexDirection="column">
        <Typography variant="body1" align="right">
          Round {props.round}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {props.quiz}
        </Typography>
      </Box>
    );
  }
}
