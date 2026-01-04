import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AboutUs = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Patients', icon: <PeopleIcon />, color: '#2563eb' },
    { number: '500+', label: 'Expert Doctors', icon: <LocalHospitalIcon />, color: '#10b981' },
    { number: '50+', label: 'Specializations', icon: <VerifiedUserIcon />, color: '#f59e0b' },
    { number: '99%', label: 'Satisfaction Rate', icon: <TrendingUpIcon />, color: '#ef4444' },
  ];

  const values = [
    {
      title: 'Patient-Centered Care',
      description:
        'We prioritize your health and well-being above all else, ensuring personalized care tailored to your needs.',
    },
    {
      title: 'Medical Excellence',
      description:
        'Our team of certified professionals is committed to delivering the highest standards of medical care.',
    },
    {
      title: 'Innovation',
      description:
        'We leverage cutting-edge technology to make healthcare more accessible and efficient for everyone.',
    },
    {
      title: 'Trust & Transparency',
      description:
        'We believe in building lasting relationships based on trust, honesty, and transparent communication.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            About HelloDoc
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              opacity: 0.9,
              fontWeight: 400,
            }}
          >
            We are revolutionizing healthcare by connecting patients with expert
            doctors through an innovative, user-friendly platform.
          </Typography>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                className="hover-lift"
              >
                <Avatar
                  sx={{
                    bgcolor: stat.color,
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: stat.color, mb: 1 }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}
              >
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                At HelloDoc, our mission is to make quality healthcare accessible
                to everyone, everywhere. We believe that everyone deserves access
                to expert medical care, regardless of their location or
                circumstances.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Through our innovative platform, we connect patients with
                certified healthcare professionals, making it easier than ever
                to book appointments, consult with doctors, and manage your
                health.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We are committed to continuously improving our services and
                expanding our network of healthcare providers to serve you
                better.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  To become the leading healthcare platform that transforms how
                  people access and experience medical care, making healthcare
                  more convenient, affordable, and effective for everyone.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', fontWeight: 700, mb: 6, color: 'primary.main' }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                className="hover-lift"
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;

