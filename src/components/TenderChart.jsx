import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TenderChart = ({ tenders }) => {
  const [chartType, setChartType] = useState('bar');  // state to hold the selected chart type

  const chartData = tenders.slice(0, 10).map(t => ({
    title: t.title.slice(0, 25) + '...',
    value: t.estimated_value || Math.floor(Math.random() * 1000000),
  }));

  // Chart Type Selection Handler
  const handleChartChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1976d2" />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="title" outerRadius={80} fill="#1976d2" label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#1976d2" : "#00C49F"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#1976d2" fill="#1976d2" />
          </AreaChart>
        );
      case 'radar':
        return (
          <RadarChart outerRadius={90} width={500} height={300} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="title" />
            <PolarRadiusAxis />
            <Radar name="Value" dataKey="value" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
          </RadarChart>
        );
      default:
        return <div>Select a chart type</div>;
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Top 10 Estimated Tender Values
      </h3>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <FormControl variant="outlined" style={{ width: 150, marginBottom: '1rem' }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={handleChartChange}
            label="Chart Type"
            style={{ fontSize: '14px', padding: '5px 15px' }}  
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="area">Area Chart</MenuItem>
            <MenuItem value="radar">Radar Chart</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default TenderChart;
