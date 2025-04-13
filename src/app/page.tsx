"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartLine, ChartXAxis, ChartYAxis, ChartGrid, } from "@/components/ui/chart";
import type { ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateInsights } from "@/ai/flows/generate-insights";
import { Skeleton } from "@/components/ui/skeleton";

const mockCategoryData = {
  "Electronics": 120000,
  "Clothing": 95000,
  "Home Goods": 80000,
  "Books": 55000,
  "Beauty": 40000,
};

const mockSalesData = [
  { month: "Jan", sales: 50000 },
  { month: "Feb", sales: 55000 },
  { month: "Mar", sales: 62000 },
  { month: "Apr", sales: 70000 },
  { month: "May", sales: 78000 },
  { month: "Jun", sales: 85000 },
  { month: "Jul", sales: 92000 },
  { month: "Aug", sales: 100000 },
  { month: "Sep", sales: 108000 },
  { month: "Oct", sales: 115000 },
  { month: "Nov", sales: 125000 },
  { month: "Dec", sales: 135000 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

export default function Home() {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const generatedInsights = await generateInsights({
          totalSales: 1000000,
          averageRating: 4.5,
          discountRate: 0.10,
          categorySales: mockCategoryData,
        });
        setInsights(generatedInsights?.insights || "No insights generated.");
      } catch (error) {
        console.error("Error generating insights:", error);
        setInsights("Failed to generate insights.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

      {/* Sales Trend Charts */}
      <Card className="bg-background shadow-md rounded-lg md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sales Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart.Container config={chartConfig}>
            <ChartLine
              dataKey="sales"
              name="Sales"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              type="monotone"
            />
            <ChartXAxis dataKey="month" />
            <ChartYAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Chart.TooltipContent />
            <ChartGrid strokeDasharray="3 3" />
          </Chart.Container>
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

      {/* Automated Insights */}
      <Card className="bg-background shadow-md rounded-lg md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Automated Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24" />
          ) : (
            <p className="text-sm">{insights}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
