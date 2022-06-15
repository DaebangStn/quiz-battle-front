import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="http://www.leemworld.shop/">
        임건호의 웹사이트
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
