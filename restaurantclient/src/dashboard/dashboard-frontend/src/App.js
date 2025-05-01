import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Grid, Card, Typography, Select, MenuItem, Box } from '@mui/material';
import theme from './theme';
import axios from 'axios';
import CircularProgress  from '@mui/material/CircularProgress';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const pieColors = ['#ff9800', 'black'];
const kpiIcons = [
  <PeopleIcon fontSize="large" sx={{ color: 'white' }} />,
  <AttachMoneyIcon fontSize="large" sx={{ color: 'white' }} />,
  <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />,
  <BarChartIcon fontSize="large" sx={{ color: 'white' }} />,
];
const kpiLabels = ['Users', 'Sales', 'Orders', 'Revenue'];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/dashboard?month=${selectedMonth}`)
      .then(res => setDashboardData(res.data));
  }, [selectedMonth]);

  if (!dashboardData) return <div>Loading...</div>;
  const indiaStates = [
    { name: "Delhi", position: [28.6139, 77.2090] },
    { name: "Mumbai", position: [19.0760, 72.8777] },
    { name: "Bangalore", position: [12.9716, 77.5946] },
    { name: "Chennai", position: [13.0827, 80.2707] },
    { name: "Kolkata", position: [22.5726, 88.3639] }
  ];
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
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {/* First row: Centered Month Selector */}
        <Grid container justifyContent="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, bgcolor: 'silver', color: 'primary.main', minWidth: 260 }}>
              <Typography variant="subtitle1" align="center">Select Month</Typography>
              <Select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                fullWidth
                sx={{ color: 'primary.main', bgcolor: 'background.paper', mt: 1 }}
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
            </Card>
          </Grid>
        </Grid>

        {/* Second row: KPI Cards */}
        <Container maxWidth={false} disableGutters sx={{pt:1,width:"97vw"}}>
        <Grid container spacing={1} wrap="nowrap" alignItems="stretch" sx={{mb:3}}>
          {dashboardData.kpis.map((kpi, idx) => (
            <Grid item xs={3}  key={idx} sx={{width:"99%"}}>
              <Card
                sx={{
                  width:'100%',
            
                  p: 3,
                  bgcolor: 'silver',
                  color: 'primary.main',
                  textAlign: 'left',
                  display: 'flex',
                
                  alignItems: 'center',
                  justifyContent:'space-between',
                  minHeight: 140,
                  boxShadow: 4,
                  mb:2
                }}
              >
                {/* Icon in Circle */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start',flexDirection:'column' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff9800 60%, #242424 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
      
                  }}
                >
                  {kpiIcons[idx]}
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                  {kpiLabels[idx]}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {kpi.value}
                </Typography>
                </Box>
                 {/* Donut Progress Circle */}
  <Box sx={{ position: 'relative', display: 'inline-flex', ml: 2 }}>
    <CircularProgress
      variant="determinate"
      value={100}
      size={60}
      thickness={5}
      sx={{
        color: 'white',
       position: 'absolute',
       left:0,
        
      }}
    />
    <CircularProgress
      variant="determinate"
      value={kpi.percent}
      size={60}
      thickness={5}
      sx={{
        color: '#ff9800',
        position: 'relative',
        background:'transparent',
      }}
/>
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle" component="div" color="white" fontWeight={700}>
        
      </Typography>
    </Box>
  </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Container>

        {/* Third row: Statistics and Products */}
        <Container maxWidth={false} disableGutters sx={{ pt:1 ,width:"100vw"}}>
        <Grid container spacing={3} alignItems="stretch" sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ p: 3,  bgcolor: 'silver', height:'100%',width:'100%' }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#ff9800',fontWeight:'bold' }}>Statistics</Typography>
              <ResponsiveContainer width={700} height={240}>
                <LineChart data={dashboardData.lineChart.labels.map((label, i) => ({
                  name: label,
                  ...dashboardData.lineChart.datasets.reduce((acc, ds) => {
                    acc[ds.label] = ds.data[i];
                    return acc;
                  }, {})
                }))}>
                  <XAxis dataKey="name" stroke="#ff9800" />
                  <YAxis stroke="#ff9800" />
                  <Tooltip />
                  <Legend />
                  {dashboardData.lineChart.datasets.map((ds, idx) => (
                    <Line key={ds.label} type="monotone" dataKey={ds.label} stroke="black" strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={6} >
            <Card sx={{ p: 3, bgcolor: 'silver', height:'100%',width:'100% ' }}>
              <Typography variant="h5" sx={{ mb: 2, color: 'black',fontWeight:'bold' }}>Products</Typography>
              <ResponsiveContainer width={400} height={240}>
                <BarChart data={dashboardData.barChart.labels.map((label, i) => ({
                  name: label,
                  value: dashboardData.barChart.data[i]
                }))}>
                  <XAxis dataKey="name" stroke="#ff9800" />
                  <YAxis stroke="#ff9800" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        </Container>

        {/* Fourth row: Order Distribution, Order Status, Population by Country */}
        <Container maxWidth={false} disableGutters sx={{ pt:1 ,width:"100vw"}}></Container>
        <Grid container spacing={2}>
          <Grid item xs={3} md={3}>
            <Card sx={{ p: 3, bgcolor: 'silver', height: 340 }}>
              <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' ,fontWeight:'bold'}}>Order Distribution</Typography>
              <ResponsiveContainer width={350} height={250}>
                <PieChart>
                  <Pie
                    data={dashboardData.pieChart.labels.map((label, i) => ({
                      name: label,
                      value: dashboardData.pieChart.data[i]
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#ff9800"
                    label
                  >
                    {dashboardData.pieChart.data.map((_, idx) => (
                      <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          
          <Grid item xs={6} md={6}>
            <Card sx={{ p:3, bgcolor: 'silver', height: 340,width:350}}>
              <Typography variant="h5" sx={{ mb: 2, color: 'primary.main',fontWeight:'bold' }}>Order Status</Typography>
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3}}>
                  <Typography  color="black" fontWeight="bold">Completed</Typography>
                  <Box sx={{ width: 190, bgcolor: '#ff9800', height: 10, borderRadius: 5 }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography color="black" fontWeight="bold">Pending</Typography>
                  <Box sx={{ width: 150, bgcolor: '#ff9800', height: 10, borderRadius: 5 }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography color="black" fontWeight="bold">Cancelled</Typography>
                  <Box sx={{ width: 100, bgcolor: '#ff9800', height: 10, borderRadius: 5 }} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary"  fontSize={27}>Order statistics for {selectedMonth}</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} md={3}>
            <Card sx={{ p:3, bgcolor: 'silver', height: 340,width:450 }}>
              <Typography variant="h5" sx={{ mb: 2, color: 'primary.main',fontWeight:'bold' }}>Population by Country</Typography>


<Box
  sx={{
    bgcolor: 'silver',
    height: 220,
    width: 390,
    borderRadius: 3,
    overflow: 'hidden'
  }}
>
  <MapContainer
    center={[22.9734, 78.6569]}
    zoom={4.5}
    style={{ height: '220px', width: '100%' }}
    scrollWheelZoom={false}
  >
<TileLayer
  url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg"
  attribution="NASA Blue Marble, image service by OpenGeo"
  maxNativeZoom={8}
/>
    {indiaStates.map((state) => (
      <Marker key={state.name} position={state.position}  icon={customIcon}>
        <Popup>{state.name}</Popup>
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