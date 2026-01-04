import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post('http://localhost:8081/api/contact', formData);
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: 'Phone',
      content: '+1 (804) 310-3818',
      color: '#2563eb',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: 'Email',
      content: 'sakethmalladiusa@gmail.com',
      color: '#10b981',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      title: 'Address',
      content: '3919 Fairfax Sqaure, Fairfax, VA 22031',
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ py: 8, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}
          >
            Get In Touch
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Have a question or need assistance? We're here to help. Reach out to
            us and we'll get back to you as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Info Cards */}
          <Grid item xs={12} md={4}>
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  p: 3,
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
                <Box sx={{ color: info.color, mb: 2, display: 'flex', justifyContent: 'center' }}>
                  {info.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {info.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {info.content}
                </Typography>
              </Card>
            ))}
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Send us a Message
              </Typography>

              {submitStatus && (
                <Alert
                  severity={submitStatus.type}
                  sx={{ mb: 3 }}
                  onClose={() => setSubmitStatus(null)}
                >
                  {submitStatus.message}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
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
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
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
                      disabled={submitting}
                      endIcon={<SendIcon />}
                      sx={{
                        px: 4,
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
                      {submitting ? 'Sending...' : 'Send Message'}
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

export default ContactUs;

