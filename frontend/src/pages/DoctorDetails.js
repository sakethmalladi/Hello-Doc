import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  TextField,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/doctors/${id}`);
      setDoctor(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      setLoading(false);
    }
  };

  const handleAppointmentChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/appointments', {
        ...appointmentData,
        doctorId: id,
      });
      alert('Appointment booked successfully!');
      navigate('/services');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'DR';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading doctor details...</Typography>
      </Container>
    );
  }

  if (!doctor) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Doctor not found
        </Typography>
        <Button
          onClick={() => navigate('/services')}
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIcon />}
        >
          Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/services')}
          sx={{ mb: 4, textTransform: 'none' }}
        >
          Back to Services
        </Button>

        <Grid container spacing={4}>
          {/* Doctor Info */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 4,
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  p: 4,
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontSize: 48,
                    fontWeight: 700,
                  }}
                >
                  {getInitials(doctor.name)}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {doctor.name}
                </Typography>
                <Chip
                  label={doctor.specialization}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 2.5,
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="body1">{doctor.location}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="body1">
                      {doctor.openingTime} - {doctor.closingTime}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoneyIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="body1">
                      ${doctor.feePer30Min} per 30 minutes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Appointment Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Book an Appointment
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleBookAppointment}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="patientName"
                      value={appointmentData.patientName}
                      onChange={handleAppointmentChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="patientEmail"
                      type="email"
                      value={appointmentData.patientEmail}
                      onChange={handleAppointmentChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="patientPhone"
                      value={appointmentData.patientPhone}
                      onChange={handleAppointmentChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Appointment Date"
                      name="appointmentDate"
                      type="date"
                      value={appointmentData.appointmentDate}
                      onChange={handleAppointmentChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Appointment Time"
                      name="appointmentTime"
                      type="time"
                      value={appointmentData.appointmentTime}
                      onChange={handleAppointmentChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Reason for Visit"
                      name="reason"
                      multiline
                      rows={4}
                      value={appointmentData.reason}
                      onChange={handleAppointmentChange}
                      placeholder="Please describe the reason for your appointment..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                        },
                      }}
                    >
                      Confirm Appointment
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorDetails;

