import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
        >
            <Typography 
                variant="h2"
                color={colors.blueAccent[200]}
                fontWeight="bold"
                sx={{ m: "0 0 10px 0"}}>
                {title}
            </Typography>

            <Typography variant="h5" color={colors.primary[400]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
