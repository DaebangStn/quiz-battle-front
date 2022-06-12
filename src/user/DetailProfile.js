import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import * as React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function DetailProfile(){
    return(
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          사용자 상세
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'username'}
        </Typography>
        <Typography variant="body1">user@net</Typography>
      </Container>
        </Box>

    );
}