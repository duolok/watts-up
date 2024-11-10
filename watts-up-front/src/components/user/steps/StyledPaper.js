import { styled, Paper } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  maxWidth: "800px",
  margin: "auto",
  backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.8)" : theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: "all 0.3s ease-in-out",
  boxShadow: theme.palette.mode === "dark" ? "0 4px 20px 0 rgba(0,0,0,0.5)" : theme.shadows[3],
}));

export default StyledPaper;
