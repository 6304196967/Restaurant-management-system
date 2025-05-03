import React, { useState } from 'react';
import Navbar from "./navbaradmin";
import { 
  ThemeProvider, 
  CssBaseline, 
  Container, 
  Grid, 
  Card, 
  Typography, 
  Select, 
  MenuItem, 
  Box,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import theme from './theme';
import CircularProgress from '@mui/material/CircularProgress';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Enhanced sample data with more metrics
const sampleData = {
  January: {
    kpis: [
      { value: 1250, percent: 75, trend: 'up', change: '12%' },
      { value: '$12,450', percent: 60, trend: 'up', change: '8%' },
      { value: 430, percent: 45, trend: 'down', change: '5%' },
      { value: '$8,250', percent: 80, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [400, 600, 500, 800], color: '#4e79a7' },
        { label: 'Orders', data: [200, 300, 400, 500], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [400, 300, 600, 200],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [65, 25, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 190, total: 250 },
      { label: 'Pending', value: 40, total: 250 },
      { label: 'Cancelled', value: 10, total: 250 }
    ]
  },
  February: {
    kpis: [
      { value: 1350, percent: 80, trend: 'up', change: '8%' },
      { value: '$14,200', percent: 65, trend: 'up', change: '14%' },
      { value: 480, percent: 50, trend: 'up', change: '12%' },
      { value: '$9,100', percent: 85, trend: 'up', change: '10%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [450, 650, 550, 850], color: '#4e79a7' },
        { label: 'Orders', data: [250, 350, 450, 550], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [450, 350, 650, 250],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [70, 20, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 210, total: 280 },
      { label: 'Pending', value: 160, total: 280 },
      { label: 'Cancelled', value: 110, total: 280 }
    ]
  },
  March: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  April: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  May: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  June: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  July: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  August: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  September: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  October: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  November: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  },
  December: {
    kpis: [
      { value: 1450, percent: 85, trend: 'up', change: '7%' },
      { value: '$15,800', percent: 70, trend: 'up', change: '11%' },
      { value: 520, percent: 55, trend: 'up', change: '8%' },
      { value: '$10,500', percent: 90, trend: 'up', change: '15%' }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Users', data: [500, 700, 600, 900], color: '#4e79a7' },
        { label: 'Orders', data: [300, 400, 500, 600], color: '#f28e2b' }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      data: [500, 400, 700, 300],
      colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759']
    },
    pieChart: {
      labels: ['Online', 'In-store', 'Mobile'],
      data: [75, 15, 10],
      colors: ['#4e79a7', '#59a14f', '#f28e2b']
    },
    orderStatus: [
      { label: 'Completed', value: 230, total: 300 },
      { label: 'Pending', value: 170, total: 300 },
      { label: 'Cancelled', value: 120, total: 300 }
    ]
  }

};

const kpiIcons = [
  <PeopleIcon fontSize="large" />,
  <AttachMoneyIcon fontSize="large" />,
  <ShoppingCartIcon fontSize="large" />,
  <BarChartIcon fontSize="large" />,
];

const kpiLabels = ['Total Users', 'Total Sales', 'Total Orders', 'Total Revenue'];

const indiaStates = [
  { name: "Delhi", position: [28.6139, 77.2090], population: "19 million" },
  { name: "Mumbai", position: [19.0760, 72.8777], population: "20.7 million" },
  { name: "Bangalore", position: [12.9716, 77.5946], population: "12.3 million" },
  { name: "Chennai", position: [13.0827, 80.2707], population: "10.9 million" },
  { name: "Kolkata", position: [22.5726, 88.3639], population: "14.9 million" }
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const dashboardData = sampleData[selectedMonth];
  const theme = useTheme();

  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
        {/* Header with Month Selector */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Restaurant Dashboard
          </Typography>
          
          <Paper elevation={3} sx={{ 
            p: 1.5, 
            borderRadius: 4,
            minWidth: 260,
            background: theme.palette.background.paper
          }}>
            <Select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiSelect-select': {
                  py: 1.5,
                  fontWeight: 600,
                  color: theme.palette.text.primary
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month} sx={{ fontWeight: 600 }}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardData.kpis.map((kpi, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 4,
                boxShadow: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                color: 'white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                      {kpiLabels[idx]}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                      {kpi.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600,
                        color: kpi.trend === 'up' ? '#a5d6a7' : '#ef9a9a'
                      }}>
                        {kpi.change} {kpi.trend === 'up' ? '↑' : '↓'}
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 1, opacity: 0.7 }}>
                        vs last month
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(kpiIcons[idx], { sx: { fontSize: 30 } })}
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption">Progress</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {kpi.percent}%
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative', width: '100%', height: 6, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: `${kpi.percent}%`, 
                      height: '100%', 
                      borderRadius: 3,
                      bgcolor: 'white'
                    }} />
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Row 1 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.text.primary
              }}>
                User & Order Statistics
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dashboardData.lineChart.labels.map((label, i) => ({
                      name: label,
                      ...dashboardData.lineChart.datasets.reduce((acc, ds) => {
                        acc[ds.label] = ds.data[i];
                        return acc;
                      }, {})
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: theme.palette.background.default,
                        borderColor: theme.palette.divider,
                        borderRadius: 12
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: 20 }}
                    />
                    {dashboardData.lineChart.datasets.map((ds, idx) => (
                      <Line 
                        key={ds.label} 
                        type="monotone" 
                        dataKey={ds.label} 
                        stroke={ds.color} 
                        strokeWidth={3} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.text.primary
              }}>
                Product Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData.barChart.labels.map((label, i) => ({
                      name: label,
                      value: dashboardData.barChart.data[i]
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis 
                      tick={{ fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: theme.palette.background.default,
                        borderColor: theme.palette.divider,
                        borderRadius: 12
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                    >
                      {dashboardData.barChart.data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={dashboardData.barChart.colors[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Row 2 */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.text.primary
              }}>
                Order Distribution
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.pieChart.labels.map((label, i) => ({
                        name: label,
                        value: dashboardData.pieChart.data[i]
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {dashboardData.pieChart.data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={dashboardData.pieChart.colors[index]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: theme.palette.background.default,
                        borderColor: theme.palette.divider,
                        borderRadius: 12
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: 20 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.text.primary
              }}>
                Order Status
              </Typography>
              <Box sx={{ height: 250 }}>
                {dashboardData.orderStatus.map((status, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {status.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {status.value}/{status.total}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%', 
                      height: 8, 
                      borderRadius: 4, 
                      bgcolor: theme.palette.action.hover,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        width: `${(status.value / status.total) * 100}%`, 
                        height: '100%', 
                        bgcolor: dashboardData.barChart.colors[index],
                        transition: 'width 0.5s ease-in-out'
                      }} />
                    </Box>
                  </Box>
                ))}
                <Divider sx={{ my: 3 }} />
                <Typography variant="body1" sx={{ 
                  textAlign: 'center',
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic'
                }}>
                  Order statistics for {selectedMonth}
                </Typography>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: theme.palette.text.primary
              }}>
                Top Cities
              </Typography>
              <Box sx={{ 
                height: 250,
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <MapContainer
                  center={[22.9734, 78.6569]}
                  zoom={4.5}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {indiaStates.map((state) => (
                    <Marker key={state.name} position={state.position} icon={customIcon}>
                      <Popup>
                        <Box sx={{ p: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {state.name}
                          </Typography>
                          <Typography variant="body2">
                            Population: {state.population}
                          </Typography>
                        </Box>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;