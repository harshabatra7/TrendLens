// This file is machine-generated - do not edit!

'use server';

/**
 * @fileOverview A sales data insights generator.
 *
 * - generateInsights - A function that handles the generation of insights from sales data.
 * - GenerateInsightsInput - The input type for the generateInsights function.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateInsightsInputSchema = z.object({
  totalSales: z.number().describe('The total sales amount.'),
  averageRating: z.number().describe('The average product rating.'),
  discountRate: z.number().describe('The average discount rate applied to products.'),
  categorySales: z
    .record(z.string(), z.number())
    .describe('A record of product categories and their corresponding sales.'),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  insights: z.string().describe('Insights generated from the sales data.'),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: {
    schema: z.object({
      totalSales: z.number().describe('The total sales amount.'),
      averageRating: z.number().describe('The average product rating.'),
      discountRate: z.number().describe('The average discount rate applied to products.'),
      categorySales: z
        .record(z.string(), z.number())
        .describe('A record of product categories and their corresponding sales.'),
    }),
  },
  output: {
    schema: z.object({
      insights: z.string().describe('Insights generated from the sales data.'),
    }),
  },
  prompt: `You are an AI assistant that analyzes sales data and provides insights.

  Analyze the following sales data to generate insights, such as reasons for sales increases or decreases, and category performance summaries.

  Total Sales: {{{totalSales}}}
  Average Rating: {{{averageRating}}}
  Discount Rate: {{{discountRate}}}
  Category Sales: {{{categorySales}}}

  Provide a detailed summary of insights that could help the business improve sales and marketing strategies. Focus on potential reasons for sales increases or decreases, and how specific categories are performing relative to each other. Format your answer as a paragraph.`,
});

const generateInsightsFlow = ai.defineFlow<
  typeof GenerateInsightsInputSchema,
  typeof GenerateInsightsOutputSchema
>({
  name: 'generateInsightsFlow',
  inputSchema: GenerateInsightsInputSchema,
  outputSchema: GenerateInsightsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
