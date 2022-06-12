import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from "./Copyright";

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Quiz Battle
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {'재미있는 '}
          {'퀴즈게임'}
        </Typography>
        <Typography variant="body1">친구들과 같이 즐겨요!</Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Site administrator: gunho1107@naver.com
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}