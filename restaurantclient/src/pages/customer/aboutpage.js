import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Divider, IconButton, useTheme } from '@mui/material';
import { Restaurant, Group, Assessment, Inventory, Schedule, Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn, Copyright } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../customer/navbarcustomer";
import Footer from "../customer/Footer";

// Background images
const heroBgImage = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const missionBgImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const statsBgImage = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const contactBgImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Enhanced orange palette with contrast colors
const orangePalette = {
  light: '#FFB74D',
  main: '#FF9800',
  dark: '#F57C00',
  contrastText: '#fff',
  background: '#FFF3E0'
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardHover = {
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const pulseAnimation = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Typing animation
const typingVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const AboutPage = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ backgroundColor: orangePalette.background }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section with Parallax Effect */}
        <Box 
          sx={{
            marginTop: 10,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            py: 10,
            px: 2,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            boxShadow: theme.shadows[10],
            mb: 12
          }}
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Typography 
              variant="h1" 
              component={motion.h1}
              gutterBottom 
              sx={{
                textAlign: 'center',
                fontWeight: 900, 
                letterSpacing: 2,
                mb: 2,
                textTransform: 'uppercase',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ROYAL FEAST
            </Typography>
            <Box 
              component={motion.div}
              initial="hidden"
              animate="visible"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              {"Where Culinary Excellence Meets Digital Innovation".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={typingVariants}
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </Box>
          </motion.div>
          
          {/* Decorative elements */}
          <Box 
            component={motion.div}
            animate={pulseAnimation}
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          />
          <Box 
            component={motion.div}
            animate={pulseAnimation}
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          />
        </Box>

        {/* Mission Section with Animated Underline */}
        <Box 
          mb={12}
          component={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <Box sx={{ position: 'relative', mb: 6 }}>
            <Typography 
              variant="h3"
              sx={{ 
                fontWeight: 800, 
                color: orangePalette.dark,
                display: 'inline-block',
                position: 'relative',
                zIndex: 1,
                px: 1,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
              component={motion.div}
              variants={fadeInUp}
            >
              Our Mission
            </Typography>
            <Box 
              component={motion.div}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 1 }}
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 0,
                right: 0,
                height: 12,
                backgroundColor: orangePalette.light,
                opacity: 0.3,
                zIndex: 0
              }}
            />
          </Box>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.6, 
                  color: 'text.primary',
                  mb: 3
                }}
                component={motion.div}
                variants={fadeInUp}
              >
                At <strong style={{ color: orangePalette.dark }}>Royal Feast</strong>, we're revolutionizing the restaurant industry with our innovative platform that seamlessly integrates every aspect of restaurant management.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.6, 
                  color: 'text.primary' 
                }}
                component={motion.div}
                variants={fadeInUp}
              >
                Our mission is to empower restaurant owners with tools that enhance efficiency, improve customer satisfaction, and drive profitability - all while maintaining the artistry of culinary service.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[10],
                  position: 'relative',
                  height: 300
                }}
              >
                <img 
                  src={missionBgImage} 
                  alt="Restaurant interior"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    p: 3,
                    color: 'white'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Modern Solutions for Modern Restaurants
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Completely Redesigned Why Choose Us Section */}
        <Box mb={12} sx={{ position: 'relative' }}>
          {/* Background decorative elements */}
          <Box
            component={motion.div}
            animate={{
              rotate: 360,
              transition: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            sx={{
              position: 'absolute',
              top: 50,
              left: '10%',
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 184, 77, 0.1)',
              zIndex: 0
            }}
          />
          
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: 8,
              color: orangePalette.dark,
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Royal Feast?
          </Typography>
          
          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Card sx={{ 
                    borderRadius: 4,
                    height: '100%',
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    background: 'white',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: `0 12px 48px ${orangePalette.light}50`,
                      transform: 'translateY(-8px)'
                    }
                  }}>
                    {/* Gradient accent */}
                    <Box sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 6,
                      background: `linear-gradient(90deg, ${orangePalette.light}, ${orangePalette.dark})`
                    }} />
                    
                    <CardContent sx={{ 
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          transition: {
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: orangePalette.light,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            color: 'white',
                            mb: 4,
                            boxShadow: `0 8px 24px ${orangePalette.light}80`
                          }}
                        >
                          {feature.icon}
                        </Box>
                      </motion.div>
                      
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 2, 
                          color: orangePalette.dark,
                          position: 'relative',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '25%',
                            width: '50%',
                            height: 3,
                            backgroundColor: orangePalette.main,
                            borderRadius: 3
                          }
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          lineHeight: 1.7,
                          mb: 3
                        }}
                      >
                        {feature.description}
                      </Typography>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ marginTop: 'auto' }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 3,
                            py: 1.5,
                            backgroundColor: 'transparent',
                            color: orangePalette.dark,
                            borderRadius: 50,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            border: `2px solid ${orangePalette.main}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: orangePalette.main,
                              color: 'white'
                            }
                          }}
                        >
                          Discover More
                          <Box 
                            component="span" 
                            sx={{ 
                              ml: 1,
                              display: 'inline-flex',
                              transition: 'transform 0.3s ease'
                            }}
                          >
                            →
                          </Box>
                        </Box>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box 
          mb={12}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${statsBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 3,
            p: 6,
            color: 'white',
            textAlign: 'center',
            boxShadow: theme.shadows[10]
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 6 }}>
            By The Numbers
          </Typography>
          
          <Grid container spacing={4}>
            {[
              { value: '500+', label: 'Restaurants Powered' },
              { value: '95%', label: 'Customer Satisfaction' },
              { value: '40%', label: 'Operational Efficiency Gain' },
              { value: '24/7', label: 'Support Availability' }
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Developer Team Section - All 5 in one row */}
        <Box mb={12}>
          <Typography 
            variant="h3"
            sx={{ 
              fontWeight: 800, 
              mb: 8,
              textAlign: 'center',
              color: orangePalette.dark,
              position: 'relative'
            }}
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box 
              component="span"
              sx={{
                position: 'relative',
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  width: 50,
                  height: 2,
                  backgroundColor: orangePalette.main,
                  borderRadius: 3
                },
                '&:before': {
                  left: -60
                },
                '&:after': {
                  right: -60
                },
                [theme.breakpoints.down('sm')]: {
                  '&:before, &:after': {
                    width: 25
                  },
                  '&:before': {
                    left: -40
                  },
                  '&:after': {
                    right: -40
                  }
                }
              }}
            >
              Our Team
            </Box>
          </Typography>
          
          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
            sx={{
              [theme.breakpoints.down('lg')]: {
                flexWrap: 'nowrap',
                overflowX: 'auto',
                py: 2,
                px: 1,
                mx: -2,
                '& > .MuiGrid-item': {
                  minWidth: 280
                }
              }
            }}
          >
            {developers.map((dev, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={true}
                sx={{ flex: '0 0 20%' }}
                key={index}
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    flexShrink: 0
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  <Card sx={{ 
                    textAlign: 'center', 
                    borderRadius: 3,
                    p: 3,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: theme.shadows[4],
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    '&:hover': {
                      boxShadow: theme.shadows[12],
                      transform: 'translateY(-5px)'
                    }
                  }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 5,
                        background: `linear-gradient(90deg, ${orangePalette.light}, ${orangePalette.dark})`
                      }}
                    />
                    <CardContent sx={{ p: 2, pt: 4 }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Avatar
                          sx={{ 
                            width: 120, 
                            height: 120, 
                            mx: 'auto', 
                            mb: 3,
                            bgcolor: 'white',
                            border: `3px solid ${orangePalette.light}`,
                            boxShadow: `0 4px 20px ${orangePalette.light}80`,
                            color: orangePalette.dark,
                            fontSize: '3rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {dev.name.charAt(0)}
                        </Avatar>
                      </motion.div>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 1,
                          color: orangePalette.dark
                        }}
                      >
                        {dev.name}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 2,
                          color: orangePalette.main
                        }}
                      >
                        {dev.role}
                      </Typography>
                      <Divider sx={{ 
                        my: 2, 
                        borderColor: orangePalette.light,
                        borderWidth: 1
                      }} />
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontStyle: 'italic',
                          position: 'relative',
                          px: 1
                        }}
                      >
                        "{dev.bio}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box mb={12}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: 8,
              textAlign: 'center',
              color: orangePalette.dark
            }}
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            COLLABORATIONS
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    p: 3,
                    position: 'relative',
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      boxShadow: theme.shadows[10]
                    }
                  }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 5,
                        background: `linear-gradient(to right, ${orangePalette.light}, ${orangePalette.dark})`
                      }}
                    />
                    <CardContent sx={{ p: 0, pt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar 
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            mr: 2,
                            bgcolor: 'white',
                            border: `2px solid ${orangePalette.light}`,
                            color: orangePalette.dark,
                            fontWeight: 'bold'
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.position}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Box 
                            key={i}
                            sx={{ 
                              color: i < testimonial.rating ? orangePalette.main : 'grey.300',
                              mr: 0.5 
                            }}
                          >
                            ★
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Box 
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${contactBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 3,
            p: 6,
            color: 'white',
            textAlign: 'center',
            boxShadow: theme.shadows[10],
            position: 'relative',
            overflow: 'hidden'
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative elements */}
          <Box
            component={motion.div}
            animate={{
              rotate: 360,
              transition: { duration: 60, repeat: Infinity, ease: "linear" }
            }}
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              border: '2px dashed rgba(255,255,255,0.2)'
            }}
          />
          <Box
            component={motion.div}
            animate={{
              rotate: -360,
              transition: { duration: 80, repeat: Infinity, ease: "linear" }
            }}
            sx={{
              position: 'absolute',
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: '50%',
              border: '2px dashed rgba(255,255,255,0.2)'
            }}
          />
          
          <Box position="relative" zIndex={1}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                mb: 3
              }}
              component={motion.div}
              initial={{ y: -20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              For Any Queries?
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                fontSize: '1.1rem', 
                mb: 4, 
                maxWidth: 700, 
                mx: 'auto',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Schedule a call today and discover how Royal Feast can streamline services, very delighted to answer your call and please don't forget to review us!!
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'center', 
                gap: 4,
                mb: 4
              }}
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6">
                  contact@royalfeast.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6">
                  (+91) 6304196967
                </Typography>
              </Box>
            </Box>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  px: 6,
                  py: 2,
                  backgroundColor: 'white',
                  color: orangePalette.dark,
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    backgroundColor: orangePalette.light,
                    color: 'white'
                  }
                }}
              >
                Request Call
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

const features = [
  {
    icon: <Restaurant fontSize="large" />,
    title: 'Culinary Innovation',
    description: 'Our platform brings cutting-edge technology to your kitchen, helping chefs create and manage menus with unprecedented ease and creativity.'
  },
  {
    icon: <Group fontSize="large" />,
    title: 'Team Harmony',
    description: 'Streamline staff communication and scheduling with our intuitive team management tools designed specifically for restaurant environments.'
  },
  {
    icon: <Assessment fontSize="large" />,
    title: 'Data Mastery',
    description: 'Transform raw numbers into actionable insights with our powerful analytics dashboard that tracks everything from food costs to customer preferences.'
  }
];

const developers = [
  {
    name: 'Sainath Reddy',
    role: 'Backend Developer/LEAD',
    bio: 'Architected the entire system with a focus on performance, usability and organized the team.'
  },
  {
    name: 'Harika',
    role: 'UI Designer',
    bio: 'Created visually appealing and user-friendly website interfaces and well coded for user experience.'
  },
  {
    name: 'Vishnu Sravan',
    role: 'Frontend Developer',
    bio: 'Built the robust infrastructure that powers our platform and elegant interface.'
  },
  {
    name: "Gousiya",
    role: "Database Manager",
    bio: "Maintained the structure, organization, and security of data in the database."
  },
  {
    name: "Sankeerthana",
    role: "Project Manager",
    bio: "Managed the planning, execution and delivery of projects by ensuring timelines."
  }
  
];

const testimonials = [
  {
    name: "Sanjay Swamy",
    position: "Owner, Spice Route",
    quote: "Royal Feast was really Top-Notch. Collaborating with them was the best decision ever!",
    rating: 5
  },
  {
    name: "Priya Desai",
    position: "Manager, Urban Bistro",
    quote: "Very pleased by your food, Our Company's day starts with your breakfast",
    rating: 4
  },
  {
    name: "Vikram Singh",
    position: "CEO, FoodChain Group",
    quote: "We've rolled out Royal Feast across all 12 of our locations. The consistency it provides is unmatched.",
    rating: 5
  }
];

export default AboutPage;