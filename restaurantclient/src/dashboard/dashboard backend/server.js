const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();
const mongoUrl=process.env.MONGO_URL;

const monthsData = [
  {
    month: 'January',
    kpis: [
      { label: 'Users', value: 1200 ,percent:50},
      { label: 'Sales', value: '$34,000' ,percent:40},
      { label: 'Orders', value: 430,percent: 60},
      { label: 'Revenue', value: '$12,000' ,percent:70}
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [300, 400, 250, 250,300,400,700] },
        { label: 'Sales', data: [8000, 9000, 7000, 10000,1200,300,500] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [300, 500, 200, 100, 400]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [70, 30]
    },
    mapData: [
      { country: 'USA', value: 100 },
      { country: 'India', value: 80 },
      { country: 'Germany', value: 60 }
    ]
  },
  {
    month: 'February',
    kpis: [
      { label: 'Users', value: 1300,percent:60},
      { label: 'Sales', value: '$35,000',percent:50},
      { label: 'Orders', value: 440,percent: 70},
      { label: 'Revenue', value: '$12,500',percent:80}

    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [320, 410, 270, 300,200,500,600] },
        { label: 'Sales', data: [8200, 9100, 7500, 10200,600,700,8000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [320, 520, 210, 100, 400]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [68, 32]
    },
    mapData: [
      { country: 'USA', value: 110 },
      { country: 'India', value: 85 },
      { country: 'Germany', value: 65 }
    ]
  },
  {
    month: 'March',
    kpis: [
      { label: 'Users', value: 1400,percent:70}, 
      { label: 'Sales', value: '$37,000',percent:60},
      { label: 'Orders', value: 460,percent: 80},
      { label: 'Revenue', value: '$13,500',percent:90}

    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [340, 420, 290, 350,400,500,600] },
        { label: 'Sales', data: [8300, 9200, 7600, 10400,4000,3000,5000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [340, 540, 220, 120, 500]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [69, 31]
    },
    mapData: [
      { country: 'USA', value: 120 },
      { country: 'India', value: 90 },
      { country: 'Germany', value: 70 }
    ]
  },
  {
    month: 'April',
    kpis: [
      { label: 'Users', value: 1500,percent:80},
      { label: 'Sales', value: '$39,000',percent:70},
      { label: 'Orders', value: 480,percent: 90},
      { label: 'Revenue', value: '$14,000',percent:100}

    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [360, 430, 310, 400,500,600,700] },
        { label: 'Sales', data: [8400, 9300, 7700, 10600,3000,2000,100] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [360, 560, 230, 130, 600]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [70, 30]
    },
    mapData: [
      { country: 'USA', value: 130 },
      { country: 'India', value: 95 },
      { country: 'Germany', value: 75 }
    ]
  },
  {
    month: 'May',
    kpis: [
      { label: 'Users', value: 1600 ,percent:90 },
      { label: 'Sales', value: '$42,000' ,percent:80},
      { label: 'Orders', value: 520 ,percent:100},
      { label: 'Revenue', value: '$16,000' ,percent:110}
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [380, 440, 330, 450,500,600,800] },
        { label: 'Sales', data: [8500, 9400, 7800, 10800,8000,9000,2000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [380, 580, 240, 140, 700]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [71, 29]
    },
    mapData: [
      { country: 'USA', value: 140 },
      { country: 'India', value: 100 },
      { country: 'Germany', value: 80 }
    ]
  },
  {
    month: 'June',
    kpis: [
      { label: 'Users', value: 1700 ,percent:75},
      { label: 'Sales', value: '$44,000' ,percent:60},
      { label: 'Orders', value: 540 ,percent:85},
      { label: 'Revenue', value: '$17,000' ,percent:50}
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [400, 450, 350, 500,600,700,300] },
        { label: 'Sales', data: [8600, 9500, 7900, 11000,6000,7000,3000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [400, 600, 250,300, 800]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [72, 28]
    },
    mapData: [
      { country: 'USA', value: 150 },
      { country: 'India', value: 105 },
      { country: 'Germany', value: 85 }
    ]
  },
  {
    month: 'July',
    kpis: [
      { label: 'Users', value: 1800 ,percent:80},
      { label: 'Sales', value: '$45,000' ,percent:70},
      { label: 'Orders', value: 550 ,percent:90},
      { label: 'Revenue', value: '$18,000' ,percent:60}
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [420, 460, 370, 550,770,800,400] },
        { label: 'Sales', data: [8700, 9600, 8000, 11200,7000,4000,2000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [420, 620, 260, 300, 800]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [73, 27]
    },
    mapData: [
      { country: 'USA', value: 160 },
      { country: 'India', value: 110 },
      { country: 'Germany', value: 90 }
    ]
  },
  {
    month: 'August',
    kpis: [
      { label: 'Users', value: 1900 ,percent:90},
      { label: 'Sales', value: '$47,000' ,percent:80},
      { label: 'Orders', value: 570 ,percent:100},    
      { label: 'Revenue', value: '$19,000',percent:70} 
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [440, 470, 390, 600,700,800,600] },
        { label: 'Sales', data: [8800, 9700, 8100, 11400,5000,4000,3000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [440, 640, 270, 320, 900]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [74, 26]
    },
    mapData: [
      { country: 'USA', value: 170 },
      { country: 'India', value: 115 },
      { country: 'Germany', value: 95 }
    ]
  },
  {
    month: 'September',
    kpis: [
      { label: 'Users', value: 2000 ,percent:100},
      { label: 'Sales', value: '$49,000' ,percent:90},
      { label: 'Orders', value: 590 ,percent:100},
      { label: 'Revenue', value: '$19,500' ,percent:80}

    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [460, 480, 410, 650,700,800,300] },
        { label: 'Sales', data: [8900, 9800, 8200, 11600,7000,9000,3000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','product D','product E'],
      data: [460, 660, 280, 300, 400]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [75, 25]
    },
    mapData: [
      { country: 'USA', value: 180 },
      { country: 'India', value: 120 },
      { country: 'Germany', value: 100 }
    ]
  },
  {
    month: 'October',
    kpis: [
      { label: 'Users', value: 2100,percent:100},
      { label: 'Sales', value: '$51,000' ,percent:90},
      { label: 'Orders', value: 610 ,percent:100},
      { label: 'Revenue', value: '$20,000' ,percent:80}

    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [480, 490, 430, 700,800,500,600] },
        { label: 'Sales', data: [9000, 9900, 8300, 11800,4000,5000,8000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [480, 680, 290, 320, 500]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [76, 24]
    },
    mapData: [
      { country: 'USA', value: 190 },
      { country: 'India', value: 125 },
      { country: 'Germany', value: 105 }
    ]
  },
  {
    month: 'November',
    kpis: [
      { label: 'Users', value: 2200 ,percent:100},      
      { label: 'Sales', value: '$54,000',percent:90},
      { label: 'Orders', value: 630 ,percent:100},
      { label: 'Revenue', value: '$21,000' ,percent:80} 

    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week5','week6','week7'],
      datasets: [
        { label: 'Users', data: [500, 500, 450, 750,670,850,350] },
        { label: 'Sales', data: [9100, 10000, 8400, 12000,13000,2300,4500] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [500, 700, 300,700, 600]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [77, 23]
    },
    mapData: [
      { country: 'USA', value: 200 },
      { country: 'India', value: 130 },
      { country: 'Germany', value: 110 }
    ]
  },
  {
    month: 'December',
    kpis: [
      { label: 'Users', value: 2300 ,percent:50},
      { label: 'Sales', value: '$56,000' ,percent:60},
      { label: 'Orders', value: 660 ,percent:80},
      { label: 'Revenue', value: '$23,000',percent:70 }
    ],
    lineChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4','week 5','week 6','week 7'],
      datasets: [
        { label: 'Users', data: [520, 510, 470, 800,900,500,400] },
        { label: 'Sales', data: [9200, 10100, 8500, 12200,5000,6000,4000] }
      ]
    },
    barChart: {
      labels: ['Product A', 'Product B', 'Product C','Product D','Product E'],
      data: [520, 720, 310,600, 700]
    },
    pieChart: {
      labels: ['Online', 'In-Store'],
      data: [78, 22]
    },
    mapData: [
      { country: 'USA', value: 210 },
      { country: 'India', value: 135 },
      { country: 'Germany', value: 115 }
    ]
  }
];

app.get('/api/dashboard', (req, res) => {
  const { month } = req.query;
  const data = monthsData.find(m => m.month === month) || monthsData[0];
  res.json(data);
});


app.listen(5000, () => console.log('API running on port 5000'));