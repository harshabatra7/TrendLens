"use client";

import {useEffect, useState} from "react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const mockCategoryData = {
  "Electronics": 120000,
  "Clothing": 95000,
  "Home Goods": 80000,
  "Books": 55000,
  "Beauty": 40000,
};

const mockSalesData = [
  {month: "Jan", sales: 50000},
  {month: "Feb", sales: 55000},
  {month: "Mar", sales: 62000},
  {month: "Apr", sales: 70000},
  {month: "May", sales: 78000},
  {month: "Jun", sales: 85000},
  {month: "Jul", sales: 92000},
  {month: "Aug", sales: 100000},
  {month: "Sep", sales: 108000},
  {month: "Oct", sales: 115000},
  {month: "Nov", sales: 125000},
  {month: "Dec", sales: 135000},
];

// Mock sales data with sale_date
const mockSalesDataWithDate = [
  {sale_date: "2024-01-01", sale_amount: 5000},
  {sale_date: "2024-01-01", sale_amount: 2000}, // Simulate multiple sales on the same date
  {sale_date: "2024-02-01", sale_amount: 5500},
  {sale_date: "2024-03-01", sale_amount: 6200},
  {sale_date: "2024-04-01", sale_amount: 7000},
  {sale_date: "2024-05-01", sale_amount: 7800},
  {sale_date: "2024-06-01", sale_amount: 8500},
  {sale_date: "2024-07-01", sale_amount: 9200},
  {sale_date: "2024-08-01", sale_amount: 10000},
  {sale_date: "2024-09-01", sale_amount: 10800},
  {sale_date: "2024-10-01", sale_amount: 11500},
  {sale_date: "2024-11-01", sale_amount: 12500},
  {sale_date: "2024-12-01", sale_amount: 13500},
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

export default function Home() {
  const [salesTrendData, setSalesTrendData] = useState<any[]>([]);

  useEffect(() => {
    // Process sales data to group by date and sum sale_amount
    const processedSalesData = mockSalesDataWithDate.reduce((acc: any, curr: any) => {
      const existingDateEntry = acc.find((item: any) => item.sale_date === curr.sale_date);
      if (existingDateEntry) {
        existingDateEntry.sale_amount += curr.sale_amount;
      } else {
        acc.push({sale_date: curr.sale_date, sale_amount: curr.sale_amount});
      }
      return acc;
    }, []);

    setSalesTrendData(processedSalesData);
  }, []);

  const totalSales = Object.values(mockCategoryData).reduce((acc, val) => acc + val, 0);
  const averageRating = 4.2;
  const discountRate = 0.15;

  return (
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Dashboard Overview */}
      <Card className="bg-background shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span>Total Sales:</span>
              <span>${totalSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating:</span>
              <span>{averageRating}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount Rate:</span>
              <span>{discountRate * 100}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis Table */}
      <Card className="bg-background shadow-md rounded-lg lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Category Analysis</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableCaption>Sales performance by product category</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-right">Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(mockCategoryData).map(([category, sales]) => (
                <TableRow key={category}>
                  <TableCell className="font-medium">{category}</TableCell>
                  <TableCell className="text-right">${sales.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sales Trend Charts */}
      <Card className="bg-background shadow-md rounded-lg md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sales Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sale_date" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sale_amount" fill="hsl(var(--chart-1))" name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


