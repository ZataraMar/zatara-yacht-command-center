import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '@/utils/financialUtils';
import { supabase } from '@/integrations/supabase/client';

export const ExpenseAnalysis: React.FC = () => {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      // Fetch historical expense data from zatara_2023_charters table
      const { data: historicalData, error } = await supabase
        .from('zatara_2023_charters')
        .select('fuel_cost, food_cost, crew_cost, boat_cost, charter_date')
        .not('fuel_cost', 'is', null)
        .not('food_cost', 'is', null)
        .not('crew_cost', 'is', null)
        .not('boat_cost', 'is', null);

      if (error) {
        console.error('Error fetching expense data:', error);
        // Use fallback data if database query fails
        setExpenseData([
          { name: 'Fuel', value: 15000, color: '#ef4444' },
          { name: 'Food & Beverages', value: 12000, color: '#f97316' },
          { name: 'Crew', value: 25000, color: '#3b82f6' },
          { name: 'Boat Maintenance', value: 8000, color: '#10b981' },
          { name: 'Insurance', value: 6000, color: '#8b5cf6' },
          { name: 'Port Fees', value: 4000, color: '#f59e0b' }
        ]);
        setMonthlyExpenses([
          { month: 'Jan', costs: 8000 },
          { month: 'Feb', costs: 9500 },
          { month: 'Mar', costs: 11000 },
          { month: 'Apr', costs: 13500 },
          { month: 'May', costs: 16000 },
          { month: 'Jun', costs: 18500 }
        ]);
        return;
      }

      if (historicalData && historicalData.length > 0) {
        // Process expense breakdown
        const totalFuel = historicalData.reduce((sum, item) => sum + (item.fuel_cost || 0), 0);
        const totalFood = historicalData.reduce((sum, item) => sum + (item.food_cost || 0), 0);
        const totalCrew = historicalData.reduce((sum, item) => sum + (item.crew_cost || 0), 0);
        const totalBoat = historicalData.reduce((sum, item) => sum + (item.boat_cost || 0), 0);

        setExpenseData([
          { name: 'Fuel', value: totalFuel, color: '#ef4444' },
          { name: 'Food & Beverages', value: totalFood, color: '#f97316' },
          { name: 'Crew', value: totalCrew, color: '#3b82f6' },
          { name: 'Boat Maintenance', value: totalBoat, color: '#10b981' },
          { name: 'Insurance', value: 6000, color: '#8b5cf6' }, // Estimated
          { name: 'Port Fees', value: 4000, color: '#f59e0b' } // Estimated
        ]);

        // Process monthly expenses - need to parse the charter_date format
        const monthlyMap = historicalData.reduce((acc: any, item) => {
          // Parse the charter_date which is in format like "Sat 8/4"
          const dateStr = item.charter_date;
          let month = 'Unknown';
          
          if (typeof dateStr === 'string' && dateStr.includes('/')) {
            const parts = dateStr.trim().split(' ');
            const datePart = parts.length > 1 ? parts[1] : parts[0];
            
            if (datePart.includes('/')) {
              const [monthNum] = datePart.split('/');
              const monthNumber = parseInt(monthNum, 10);
              if (monthNumber >= 1 && monthNumber <= 12) {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                month = monthNames[monthNumber - 1];
              }
            }
          }
          
          if (!acc[month]) {
            acc[month] = { month, costs: 0 };
          }
          acc[month].costs += (item.fuel_cost || 0) + (item.food_cost || 0) + (item.crew_cost || 0) + (item.boat_cost || 0);
          return acc;
        }, {});

        setMonthlyExpenses(Object.values(monthlyMap));
      }
    } catch (error) {
      console.error('Error processing expense data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Operating costs by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
          <CardDescription>Cost trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="costs" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
