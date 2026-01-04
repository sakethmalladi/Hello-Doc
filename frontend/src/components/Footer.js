import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e293b',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocalHospitalIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                HelloDoc
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
              Your trusted healthcare partner. We connect you with the best doctors
              and provide comprehensive healthcare services.
            </Typography>
            {/* <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: '#94a3b8',
                  '&:hover': { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#94a3b8',
                  '&:hover': { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#94a3b8',
                  '&:hover': { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#94a3b8',
                  '&:hover': { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box> */}
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}>
                Home
              </Link>
              <Link href="/services" sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}>
                Services
              </Link>
              <Link href="/about-us" sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}>
                About Us
              </Link>
              <Link href="/contact-us" sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                Doctor Appointments
              </Typography>
            </Box>
          </Grid> */}

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  +1 (804) 610-3818
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  sakethmalladiusa@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 20, color: '#3b82f6', mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  3919 Fairfax Square, Fairfax, VA 22031
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 4,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            © {new Date().getFullYear()} HelloDoc. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
