import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';

const Services = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/doctors');
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  const specializations = [
    'all',
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      selectedSpecialization === 'all' ||
      doctor.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <Box sx={{ py: 8, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}
          >
            Our Services
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Browse through our comprehensive list of healthcare services and find
            the perfect doctor for your needs.
          </Typography>
        </Box>

        {/* Search and Filter */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Tabs
                value={selectedSpecialization}
                onChange={(e, newValue) => setSelectedSpecialization(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    minWidth: 'auto',
                    px: 2,
                  },
                }}
              >
                {specializations.map((spec) => (
                  <Tab
                    key={spec}
                    label={spec === 'all' ? 'All' : spec}
                    value={spec}
                  />
                ))}
              </Tabs>
            </Grid>
          </Grid>
        </Paper>

        {/* Results */}
        {loading ? (
          <Typography textAlign="center" color="text.secondary" sx={{ py: 8 }}>
            Loading doctors...
          </Typography>
        ) : filteredDoctors.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No doctors found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            </Typography>
            <Grid container spacing={4}>
              {filteredDoctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                  <DoctorCard doctor={doctor} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Services;

