import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";
import { PhotoCamera, PictureAsPdf, LocationOn } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import { ColorModeContext } from "../../theme";
import { styled } from "@mui/material/styles";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Input = styled("input")({
  display: "none",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  maxWidth: "800px",
  margin: "auto",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.8)"
      : theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: "all 0.3s ease-in-out",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px 0 rgba(0,0,0,0.5)"
      : theme.shadows[3],
}));

const createLocationOnIcon = (color) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32" fill="${color}">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  `;
  return L.divIcon({
    html: svgIcon,
    iconSize: [32, 32],
    className: "custom-location-icon",
  });
};


const PropertyMap = ({ location, setLocation }) => {
  const theme = useTheme();
  const markerColor = theme.palette.mode === "dark" ? "#B0BEC5" : "#333333";
  const markerIcon = createLocationOnIcon(markerColor);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return location ? (
      <Marker
        position={location}
        icon={markerIcon}
      >
        <Tooltip>{`Lat: ${location[0].toFixed(4)}, Lng: ${location[1].toFixed(4)}`}</Tooltip>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[45.24518492531696, 19.84803071801117]}
      zoom={13}
      style={{
        height: 300,
        width: "100%",
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <TileLayer
        url={
          theme.palette.mode === "dark"
            ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        }
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <LocationMarker />
    </MapContainer>
  );
};

const BasicInformationStep = ({ formData, onChange }) => (
  <Box>
    <TextField
      fullWidth
      label="Address"
      value={formData.address}
      onChange={(e) => onChange("address", e.target.value)}
      margin="normal"
    />
    <TextField
      select
      fullWidth
      label="City"
      value={formData.city}
      onChange={(e) => onChange("city", e.target.value)}
      margin="normal"
    >
      {formData.cityList.map((cityItem) => (
        <MenuItem key={cityItem} value={cityItem}>
          {cityItem}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      fullWidth
      label="Number of Floors"
      value={formData.floors}
      onChange={(e) => onChange("floors", e.target.value)}
      margin="normal"
      type="number"
    />
  </Box>
);

const LocationStep = ({ location, onChange }) => (
  <Box>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Select Property Location
    </Typography>
    <PropertyMap
      location={location}
      setLocation={(loc) => onChange("location", loc)}
    />
  </Box>
);

const MediaStep = ({ formData, onChange }) => {
  const handleFileChange = (event, field) => {
    const selectedFiles = Array.from(event.target.files);
    onChange(field, selectedFiles);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Property Images
      </Typography>
      <label htmlFor="image-upload">
        <Input
          accept="image/*"
          id="image-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e, "images")}
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PhotoCamera />}
          component="span"
        >
          Upload Images
        </Button>
      </label>

      {formData.images.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Images:</Typography>
          <List>
            {formData.images.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Upload Documents (PDF)
      </Typography>
      <label htmlFor="pdf-upload">
        <Input
          accept="application/pdf"
          id="pdf-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e, "documents")}
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PictureAsPdf />}
          component="span"
        >
          Upload PDFs
        </Button>
      </label>

      {formData.documents.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Documents:</Typography>
          <List>
            {formData.documents.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

const HouseholdsStep = ({ households, onChange }) => {
  const addHousehold = () => {
    onChange("households", [
      ...households,
      { floor: "", area: "", identifier: "" },
    ]);
  };

  const removeHousehold = (index) => {
    if (index >= 0) {
      onChange(
        "households",
        households.filter((_, i) => i !== index),
      );
    }
  };

  const handleHouseholdChange = (index, field, value) => {
    const updatedHouseholds = [...households];
    updatedHouseholds[index][field] = value;
    onChange("households", updatedHouseholds);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Households
      </Typography>
      {households.map((household, index) => (
        <Box
          key={index}
          sx={{
            mt: 2,
            pt: 2,
            borderTop: index !== 0 ? 1 : 0,
            borderRadius: 1,
          }}
        >
          <TextField
            fullWidth
            label="Floor"
            value={household.floor}
            onChange={(e) =>
              handleHouseholdChange(index, "floor", e.target.value)
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Area (sqm)"
            value={household.area}
            onChange={(e) =>
              handleHouseholdChange(index, "area", e.target.value)
            }
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Identifier"
            value={household.identifier}
            onChange={(e) =>
              handleHouseholdChange(index, "identifier", e.target.value)
            }
            margin="normal"
          />
        </Box>
      ))}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => removeHousehold(households.length - 1)}
          fullWidth
        >
          Remove Household
        </Button>
        <Button variant="contained" onClick={addHousehold} fullWidth>
          Add Household
        </Button>
      </Box>
    </Box>
  );
};

const steps = ["Basic Information", "Location", "Media Upload", "Households"];

const NewPropertyComponent = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    floors: "",
    location: null,
    images: [],
    documents: [],
    households: [{ floor: "", area: "", identifier: "" }],
    cityList: ["Paris", "Belgrade", "Novi Sad"],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setOpenDialog(true);
  };

  const handleConfirmSubmit = () => {
    setOpenDialog(false);
    setOpenSnackbar(true);
    console.log("Form submitted:", formData);
    // TODO: Handle form submission logic here
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInformationStep
            formData={formData}
            onChange={handleFormChange}
          />
        );
      case 1:
        return (
          <LocationStep
            location={formData.location}
            onChange={handleFormChange}
          />
        );
      case 2:
        return <MediaStep formData={formData} onChange={handleFormChange} />;
      case 3:
        return (
          <HouseholdsStep
            households={formData.households}
            onChange={handleFormChange}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ p: 3, minHeight: "100vh" }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <StyledPaper>
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep} sx={{ width: "100%" }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </StyledPaper>

      <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  BackdropComponent={Backdrop}
  BackdropProps={{
    sx: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(5px)",
    },
  }}
  PaperProps={{
    sx: {
      padding: 3,
      borderRadius: 3,
      maxWidth: 600,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "#333333"
          : theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[10],
    },
  }}
>
  <DialogTitle
    sx={{
      color: theme.palette.primary.main,
      fontSize: "1.4rem",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Confirm 
  </DialogTitle>
  <DialogContent>
    <DialogContentText
      sx={{
        color: theme.palette.text.secondary,
        textAlign: "center",
        fontSize: "1.1rem",
      }}
    >
      Are you sure you want to submit this property information?
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center" }}>
    <Button onClick={() => setOpenDialog(false)} color="primary" variant="outlined">
      Cancel
    </Button>
    <Button onClick={handleConfirmSubmit} color="primary" variant="contained" sx={{ ml: 2 }}>
      Confirm
    </Button>
  </DialogActions>
</Dialog>

<Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setOpenSnackbar(false)}
    severity="success"
    variant="filled"
    sx={{
      width: "100%",
      backgroundColor:
        theme.palette.mode === "dark" ? "#B0BEC5" : "#333333",
      color: theme.palette.mode === "dark" ? "#333333" : "#FFFFFF",
    }}
  >
    Property information successfully submitted!
  </Alert>
</Snackbar></Grid>
    </Grid>
  );
};

export default NewPropertyComponent;
