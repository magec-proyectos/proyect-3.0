
// Chart data for different time periods and metrics

// Earnings data for different time periods
export const earningsData = {
  '1m': [
    { month: 'Week 1', withBet3: 580, withoutBet3: 290 },
    { month: 'Week 2', withBet3: 620, withoutBet3: 310 },
    { month: 'Week 3', withBet3: 750, withoutBet3: 340 },
    { month: 'Week 4', withBet3: 850, withoutBet3: 380 },
  ],
  '3m': [
    { month: 'Jan', withBet3: 2400, withoutBet3: 1200 },
    { month: 'Feb', withBet3: 3000, withoutBet3: 1300 },
    { month: 'Mar', withBet3: 3800, withoutBet3: 1600 },
  ],
  '6m': [
    { month: 'Jan', withBet3: 2400, withoutBet3: 1200 },
    { month: 'Feb', withBet3: 3000, withoutBet3: 1300 },
    { month: 'Mar', withBet3: 2800, withoutBet3: 900 },
    { month: 'Apr', withBet3: 3800, withoutBet3: 1600 },
    { month: 'May', withBet3: 4000, withoutBet3: 1700 },
    { month: 'Jun', withBet3: 4500, withoutBet3: 2100 },
  ],
  '1y': [
    { month: 'Jan', withBet3: 2400, withoutBet3: 1200 },
    { month: 'Feb', withBet3: 3000, withoutBet3: 1300 },
    { month: 'Mar', withBet3: 2800, withoutBet3: 900 },
    { month: 'Apr', withBet3: 3800, withoutBet3: 1600 },
    { month: 'May', withBet3: 4000, withoutBet3: 1700 },
    { month: 'Jun', withBet3: 3500, withoutBet3: 1400 },
    { month: 'Jul', withBet3: 4500, withoutBet3: 2100 },
    { month: 'Aug', withBet3: 5000, withoutBet3: 2400 },
    { month: 'Sep', withBet3: 5200, withoutBet3: 2500 },
    { month: 'Oct', withBet3: 5800, withoutBet3: 2600 },
    { month: 'Nov', withBet3: 6000, withoutBet3: 2700 },
    { month: 'Dec', withBet3: 6500, withoutBet3: 2800 },
  ]
};

// Win rate data for different time periods
export const winRateData = {
  '1m': [
    { month: 'Week 1', withBet3: 58, withoutBet3: 29 },
    { month: 'Week 2', withBet3: 62, withoutBet3: 31 },
    { month: 'Week 3', withBet3: 65, withoutBet3: 34 },
    { month: 'Week 4', withBet3: 68, withoutBet3: 38 },
  ],
  '3m': [
    { month: 'Jan', withBet3: 60, withoutBet3: 32 },
    { month: 'Feb', withBet3: 65, withoutBet3: 35 },
    { month: 'Mar', withBet3: 68, withoutBet3: 38 },
  ],
  '6m': [
    { month: 'Jan', withBet3: 60, withoutBet3: 32 },
    { month: 'Feb', withBet3: 65, withoutBet3: 35 },
    { month: 'Mar', withBet3: 63, withoutBet3: 30 },
    { month: 'Apr', withBet3: 68, withoutBet3: 36 },
    { month: 'May', withBet3: 70, withoutBet3: 37 },
    { month: 'Jun', withBet3: 72, withoutBet3: 39 },
  ],
  '1y': Array(12).fill(0).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    withBet3: 60 + Math.floor(Math.random() * 15),
    withoutBet3: 30 + Math.floor(Math.random() * 10)
  }))
};

// ROI data for different time periods
export const roiData = {
  '1m': [
    { month: 'Week 1', withBet3: 15, withoutBet3: 5 },
    { month: 'Week 2', withBet3: 18, withoutBet3: 6 },
    { month: 'Week 3', withBet3: 20, withoutBet3: 8 },
    { month: 'Week 4', withBet3: 22, withoutBet3: 10 },
  ],
  '3m': [
    { month: 'Jan', withBet3: 18, withoutBet3: 8 },
    { month: 'Feb', withBet3: 22, withoutBet3: 10 },
    { month: 'Mar', withBet3: 25, withoutBet3: 12 },
  ],
  '6m': [
    { month: 'Jan', withBet3: 18, withoutBet3: 8 },
    { month: 'Feb', withBet3: 22, withoutBet3: 10 },
    { month: 'Mar', withBet3: 20, withoutBet3: 6 },
    { month: 'Apr', withBet3: 25, withoutBet3: 12 },
    { month: 'May', withBet3: 28, withoutBet3: 13 },
    { month: 'Jun', withBet3: 32, withoutBet3: 15 },
  ],
  '1y': Array(12).fill(0).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    withBet3: 18 + Math.floor(Math.random() * 20),
    withoutBet3: 8 + Math.floor(Math.random() * 10)
  }))
};

// Chart configuration for legend and styling
export const chartConfig = {
  withBet3: {
    label: "With Bet 3.0",
    theme: {
      light: "#00f0ff",
      dark: "#00f0ff",
    },
  },
  withoutBet3: {
    label: "Without Bet 3.0",
    theme: {
      light: "#555",
      dark: "#888",
    },
  },
};
