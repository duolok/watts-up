import React, { useContext } from 'react';
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
  useTheme
} from '@mui/material';
import { PhotoCamera, PictureAsPdf } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { ColorModeContext } from '../../theme';
import { styled } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';

const PropertyMap = ({ location, setLocation }) => {
  const theme = useTheme();

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return location ? <Marker position={location} /> : null;
  };

  return (
    <MapContainer 
      center={[45.24518492531696, 19.84803071801117]} 
      zoom={13} 
      style={{ 
        height: 300, 
        width: '100%', 
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

const BasicInformationStep = ({ address, setAddress, city, setCity, floors, setFloors, cityList }) => {
  const theme = useTheme();

  return (
    <Box>
      <TextField 
        fullWidth 
        label="Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      />

      <TextField
        select
        fullWidth
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
      >
        {cityList.map((cityItem) => (
          <MenuItem key={cityItem} value={cityItem}>{cityItem}</MenuItem>
        ))}
      </TextField>

      <TextField 
        fullWidth 
        label="Number of Floors" 
        value={floors} 
        onChange={(e) => setFloors(e.target.value)} 
        margin="normal" 
        type="number"
      />
    </Box>
  );
};

const LocationStep = ({ location, setLocation }) => (
  <Box>
    <Typography variant="h6" sx={{ mb: 2 }}>Select Property Location</Typography>
    <PropertyMap location={location} setLocation={setLocation} />
  </Box>
);


const Input = styled('input')({
  display: 'none',
});

const MediaStep = ({ images, setImages, documents, setDocuments }) => {
  const theme = useTheme();

  const handleFileChange = (event, setFiles) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Upload Property Images</Typography>
      <label htmlFor="image-upload">
        <Input
          accept="image/*"
          id="image-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e, setImages)}
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PhotoCamera />}
          component="span"
          sx={{
            mt: 2,
            color: theme.palette.text.primary,
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(144, 202, 249, 0.08)'
                  : 'rgba(144, 202, 249, 0.04)',
            },
          }}
        >
          Upload Images
        </Button>
      </label>

      {images.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Images:</Typography>
          <List>
            {images.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Upload Documents (PDF)</Typography>
      <label htmlFor="pdf-upload">
        <Input
          accept="application/pdf"
          id="pdf-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e, setDocuments)}
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PictureAsPdf />}
          component="span"
          sx={{
            mt: 2,
            color: theme.palette.text.primary,
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(144, 202, 249, 0.08)'
                  : 'rgba(144, 202, 249, 0.04)',
            },
          }}
        >
          Upload PDFs
        </Button>
      </label>

      {documents.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Selected Documents:</Typography>
          <List>
            {documents.map((file, index) => (
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


const HouseholdsStep = ({ households, handleHouseholdChange, addHousehold, removeHousehold }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Add Households</Typography>
      {households.map((household, index) => (
        <Box 
          key={index} 
          sx={{ 
            mt: 2, 
            pt: 2, 
            borderTop: index !== 0 ? `1px solid ${theme.palette.divider}` : 0,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            padding: 2,
            borderRadius: 1
          }}
        >
          <TextField 
            fullWidth 
            label="Floor" 
            value={household.floor} 
            onChange={(e) => handleHouseholdChange(index, 'floor', e.target.value)} 
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Area (sqm)" 
            value={household.area} 
            onChange={(e) => handleHouseholdChange(index, 'area', e.target.value)} 
            margin="normal" 
            type="number" 
          />
          <TextField 
            fullWidth 
            label="Identifier (e.g., apartment number)" 
            value={household.identifier} 
            onChange={(e) => handleHouseholdChange(index, 'identifier', e.target.value)} 
            margin="normal"
          />
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={() => removeHousehold(households.length - 1)} 
          fullWidth
          sx={{
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(211, 47, 47, 0.04)'
            }
          }}
        >
          Remove Household
        </Button>
        <Button 
          variant="contained" 
          onClick={addHousehold} 
          fullWidth
          sx={{
            boxShadow: theme.shadows[4],
            '&:hover': {
              boxShadow: theme.shadows[8]
            }
          }}
        >
          Add Household
        </Button>
      </Box>
    </Box>
  );
};


const steps = [
  'Basic Information',
  'Location',
  'Media Upload',
  'Households'
];

const NewPropertyForm = ({ cityList }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [floors, setFloors] = React.useState('');
  const [location, setLocation] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [households, setHouseholds] = React.useState([{ floor: '', area: '', identifier: '' }]);

  const handleFileChange = (e, setFiles) => {
    setFiles([...e.target.files]);
  };

  const addHousehold = () => {
    setHouseholds([...households, { floor: '', area: '', identifier: '' }]);
  };

  const removeHousehold = (index) => {
    if (index >= 0) {
      setHouseholds(households.filter((_, i) => i !== index));
    }
  };

  const handleHouseholdChange = (index, field, value) => {
    const updatedHouseholds = [...households];
    updatedHouseholds[index][field] = value;
    setHouseholds(updatedHouseholds);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInformationStep 
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            floors={floors}
            setFloors={setFloors}
            cityList={cityList}
          />
        );
      case 1:
        return (
          <LocationStep 
            location={location}
            setLocation={setLocation}
          />
        );
      case 2:
        return (
          <MediaStep
            images={images}
            setImages={setImages}
            documents={documents}
            setDocuments={setDocuments}
          />
        );
      case 3:
        return (
          <HouseholdsStep 
            households={households}
            handleHouseholdChange={handleHouseholdChange}
            addHousehold={addHousehold}
            removeHousehold={removeHousehold}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, // Increased padding
        borderRadius: 2,
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease-in-out',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 4px 20px 0 rgba(0,0,0,0.5)'
          : theme.shadows[3]
      }}
    >
      <Box 
        sx={{ 
          mb: 4, 
          p: 3,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.03)',
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            width: '100%',
            '& .MuiStepLabel-label': {
              color: theme.palette.text.primary,
              fontSize: '1rem', // Bigger text
              fontWeight: 500,
              mt: 0.5
            },
            '& .MuiStepIcon-root': {
              color: theme.palette.primary.main,
              fontSize: '2rem', // Bigger icons
              '&.Mui-active': {
                color: theme.palette.primary.main,
                boxShadow: `0 0 0 8px ${theme.palette.mode === 'dark' 
? 'rgba(144, 202, 249, 0.16)' 
: 'rgba(144, 202, 249, 0.08)'}`,
                borderRadius: '50%'
              }
            },
            '& .MuiStepConnector-line': {
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(0, 0, 0, 0.1)',
              borderTopWidth: 3
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {getStepContent(activeStep)}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            color: theme.palette.text.primary,
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(144, 202, 249, 0.08)'
                : 'rgba(144, 202, 249, 0.04)'
            },
            '&.Mui-disabled': {
              borderWidth: 2
            }
          }}
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              boxShadow: theme.shadows[4],
              '&:hover': {
                boxShadow: theme.shadows[8],
                backgroundColor: theme.palette.primary.dark
              }
            }}
          >
            Submit
          </Button>
        ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                boxShadow: theme.shadows[4],
                '&:hover': {
                  boxShadow: theme.shadows[8],
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              Next
            </Button>
          )}
      </Box>
    </Paper>
  );
};


const NewPropertyComponent = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [cityList, setCityList] = React.useState([]);

  React.useEffect(() => {
    setCityList(['City1', 'City2', 'City3']); 
  }, []);

  return (
    <Grid 
      container 
      justifyContent="center" 
      sx={{ 
        p: 3, 
        minHeight: '100vh',
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <NewPropertyForm cityList={cityList} />
      </Grid>
    </Grid>
  );
};

export default NewPropertyComponent;
