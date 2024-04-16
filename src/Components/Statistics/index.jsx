import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics = () => {

    useEffect(() => {
        //buscar data
    },[]);

    const data = [
        {
          name: 'Enero',
          uv: 4000
        },
        {
          name: 'Febrero',
          uv: 3000
        }
      ];

    return(
        
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis/>
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    )
}

export { Statistics }