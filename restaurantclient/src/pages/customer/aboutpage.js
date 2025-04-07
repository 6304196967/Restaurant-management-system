import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Divider, IconButton } from '@mui/material';
import { Restaurant, Group, Assessment, Inventory, Schedule, Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn, Copyright } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Custom orange palette
const orangePalette = {
  light: '#FFB74D',
  main: '#FF9800',
  dark: '#F57C00',
  contrastText: '#fff'
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box 
        textAlign="center" 
        mb={10}
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography 
          variant="h2" 
          component={motion.h1}
          gutterBottom 
          sx={{ 
            fontWeight: 800, 
            color: orangePalette.dark,
            letterSpacing: 1,
            mb: 2,
            textTransform: 'uppercase'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ROYAL FEAST
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          sx={{
            fontStyle: 'italic',
            color: orangePalette.main
          }}
        >
          Elevating Restaurant Management
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box 
        mb={10}
        component={motion.section}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 4,
            color: orangePalette.dark,
            display: 'flex',
            alignItems: 'center',
            '&:after': {
              content: '""',
              flex: 1,
              ml: 3,
              height: '1px',
              backgroundColor: 'divider'
            }
          }}
          component={motion.div}
          variants={fadeInUp}
        >
          Our Mission
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.primary' }}
          component={motion.div}
          variants={fadeInUp}
        >
          At <strong style={{ color: orangePalette.dark }}>Royal Feast</strong>, we're transforming restaurant operations with our 
          cutting-edge platform that seamlessly integrates order management, inventory control, 
          and customer relations - all designed to help you deliver unforgettable dining experiences.
        </Typography>
      </Box>

      {/* Features Section - Horizontal Cards */}
      <Box mb={10}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 4,
            color: orangePalette.dark,
            display: 'flex',
            alignItems: 'center',
            '&:after': {
              content: '""',
              flex: 1,
              ml: 3,
              height: '1px',
              backgroundColor: 'divider'
            }
          }}
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </Typography>
        
        <Box 
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                x: 10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card sx={{ 
                borderRadius: 3,
                borderLeft: `4px solid ${orangePalette.main}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: orangePalette.light,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        color: 'white',
                        flexShrink: 0
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: orangePalette.dark }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Developer Team Section - MODIFIED FOR SINGLE ROW */}
      <Box mb={10}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 6,
            textAlign: 'center',
            color: orangePalette.dark,
            position: 'relative',
            '&:before, &:after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              width: '30%',
              height: '1px',
              bgcolor: 'divider'
            },
            '&:before': {
              left: 0
            },
            '&:after': {
              right: 0
            }
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Developed By
        </Typography>
        
        {/* Single row developer cards with horizontal scrolling */}
        <Box 
          sx={{ 
            display: 'flex',
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'rgba(0,0,0,0.05)',
              borderRadius: 4
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: orangePalette.light,
              borderRadius: 4
            }
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {developers.map((dev, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                sx={{ 
                  flexShrink: 0, 
                  width: 250,
                  mx: 1,
                  '&:first-of-type': { ml: 0 },
                  '&:last-of-type': { mr: 0 }
                }}
              >
                <Card sx={{ 
                  textAlign: 'center', 
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  borderTop: `3px solid ${orangePalette.main}`,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Avatar
                        src={dev.photo}
                        alt={dev.name}
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          mx: 'auto', 
                          mb: 2,
                          border: `3px solid ${orangePalette.light}`,
                          boxShadow: 3
                        }}
                      />
                    </motion.div>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 1,
                        color: orangePalette.dark,
                        fontSize: '1rem'
                      }}
                    >
                      {dev.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 2,
                        color: orangePalette.main,
                        fontSize: '0.875rem'
                      }}
                    >
                      {dev.role}
                    </Typography>
                    <Divider sx={{ my: 1, borderColor: orangePalette.light }} />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontStyle: 'italic',
                        position: 'relative',
                        px: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      "{dev.bio}"
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Gallery Section */}
      <Box mb={10}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 6,
            textAlign: 'center',
            color: orangePalette.dark,
            position: 'relative',
            '&:before, &:after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              width: '30%',
              height: '1px',
              bgcolor: 'divider'
            },
            '&:before': {
              left: 0
            },
            '&:after': {
              right: 0
            }
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Celebrity Dining Gallery
        </Typography>
        
        <Box
          sx={{
            position: 'relative',
            height: 300,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              left: 0,
              height: '100%',
              animation: 'scroll 30s linear infinite',
              '@keyframes scroll': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              },
              '&:hover': {
                animationPlayState: 'paused'
              }
            }}
          >
            {/* Double the images for continuous scrolling effect */}
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{ flexShrink: 0 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: 350,
                    height: 300,
                    mx: 1,
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img 
                    src={image.src} 
                    alt={image.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      p: 1,
                      color: 'white'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {image.caption}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Contact Section */}
      <Box 
        mb={10}
        component={motion.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        sx={{
          background: `linear-gradient(135deg, ${orangePalette.light} 0%, ${orangePalette.dark} 100%)`,
          borderRadius: 3,
          p: 6,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 3
          }}
        >
          Get In Touch
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4, maxWidth: 600, mx: 'auto' }}>
          Have questions or feedback? Our team is ready to assist you with any inquiries about our restaurant management solution.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ 
              width: 10, 
              height: 10, 
              bgcolor: 'white', 
              borderRadius: '50%', 
              mr: 2 
            }} />
            contact@royalfeast.com
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ 
              width: 10, 
              height: 10, 
              bgcolor: 'white', 
              borderRadius: '50%', 
              mr: 2 
            }} />
            (555) 123-4567
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box 
        component={motion.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        sx={{
          bgcolor: '#1A1A1A',
          color: 'white',
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ py: 5 }}>
            {/* Logo and About */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ color: orangePalette.main, fontWeight: 700, mb: 2 }}>
                ROYAL FEAST
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
                The ultimate restaurant management solution designed to streamline operations and enhance customer experience.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton sx={{ color: orangePalette.light }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: orangePalette.light }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: orangePalette.light }}>
                  <Instagram />
                </IconButton>
                <IconButton sx={{ color: orangePalette.light }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ color: orangePalette.main, fontWeight: 600, mb: 2 }}>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {['Home', 'About', 'Features', 'Pricing', 'Demo', 'Support'].map((link) => (
                  <Box 
                    component="li" 
                    key={link} 
                    sx={{ 
                      mb: 1.5, 
                      transition: 'all 0.2s',
                      '&:hover': { pl: 1, color: orangePalette.light },
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        width: 6, 
                        height: 6, 
                        bgcolor: orangePalette.main, 
                        mr: 1.5, 
                        borderRadius: '50%' 
                      }} 
                    />
                    {link}
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ color: orangePalette.main, fontWeight: 600, mb: 2 }}>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: orangePalette.light }} />
                  <Typography variant="body2">
                    123 Restaurant Lane, Foodie City, FC 12345
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ color: orangePalette.light }} />
                  <Typography variant="body2">
                    (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: orangePalette.light }} />
                  <Typography variant="body2">
                    contact@royalfeast.com
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <Box sx={{ py: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Copyright sx={{ mr: 1, fontSize: 'small', color: 'rgba(255,255,255,0.5)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              {new Date().getFullYear()} Royal Feast. All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

const features = [
  {
    icon: <Restaurant fontSize="large" />,
    title: 'Streamlined Operations',
    description: 'Our intuitive interface simplifies every aspect of restaurant management, from table reservations to order processing, saving you time and reducing errors.'
  },
  {
    icon: <Inventory fontSize="large" />,
    title: 'Smart Inventory',
    description: 'Automated tracking and predictive ordering ensure you never run out of ingredients while minimizing waste through intelligent stock management.'
  },
  {
    icon: <Assessment fontSize="large" />,
    title: 'Data-Driven Insights',
    description: 'Comprehensive analytics help you understand customer preferences, peak hours, and menu performance to make informed business decisions.'
  }
];

const developers = [
  {
    name: 'Aarav Sharma',
    role: 'Lead Developer',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Architected the entire system with a focus on performance and usability'
  },
  {
    name: 'Meera Nair',
    role: 'UX Designer',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    bio: 'Created the elegant interface that makes complex tasks simple'
  },
  {
    name: 'Rahul Iyer',
    role: 'Backend Engineer',
    photo: 'https://randomuser.me/api/portraits/men/83.jpg',
    bio: 'Built the robust infrastructure that powers our platform'
  },
  {
    name: "Aarav Mehta",
    role: "Frontend Engineer",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Designing elegant interfaces with performance in mind"
  },
  {
    name: "Riya Kapoor",
    role: "Backend Developer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Ensuring secure and scalable server-side logic"
  }
];

// Gallery images for the scrolling gallery section
const galleryImages = [
  {
    src: "https://th.bing.com/th/id/OIP.Kt_l1n44-ioCZ-VN-z5S_AHaE8?w=256&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    caption: "Bollywood Star Priyanka Chopra enjoying our signature dish"
  },
  {
    src: "https://th.bing.com/th/id/OIP.-LqKkcQ_0ahes8mt0f_6bQHaFW?w=248&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    caption: "Cricket legend Virat Kohli celebrating with family"
  },
  {
    src: "https://th.bing.com/th/id/OIP.Kt_l1n44-ioCZ-VN-z5S_AHaE8?w=256&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    caption: "Business mogul Mukesh Ambani at our private dining area"
  },
  {
    src: "https://th.bing.com/th/id/OIP.OTKwdUBKCiA-0lPZIN75ZAHaE8?w=289&h=193&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    caption: "Film director Karan Johar hosting a dinner party"
  },
  {
    src: "https://th.bing.com/th/id/OIP.-LqKkcQ_0ahes8mt0f_6bQHaFW?w=248&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    caption: "Actor Shah Rukh Khan with our executive chef"
  },
  {
    src: "https://th.bing.com/th/id/OIP.dDRiVQn_HjRBB8o2yPsCWAHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    caption: "Tennis star Sania Mirza celebrating her victory"
  }
];

export default AboutPage;