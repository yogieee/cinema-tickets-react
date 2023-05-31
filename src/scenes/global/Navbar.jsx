import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            "&:hover": { cursor: "pointer" },
            fontSize: "16px",
            fontWeight: 600,
          }}
          color={shades.secondary[500]}
        >
          CINEMA TICKETS
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
