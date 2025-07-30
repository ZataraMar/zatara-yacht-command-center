import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { 
  Target, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';

interface Task {
  id: string;
  task_title: string;
  task_description: string;
  priority: string;
  task_status: string;
  estimated_time_hours: number;
  created_at: string;
  due_date?: string;
}

export const ProjectOverview = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'in_progress': return 'bg-[#00A3E4] text-white';
      case 'pending': return 'bg-[#CCCC33] text-black';
      case 'blocked': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-[#CCCC33] text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const completedTasks = tasks.filter(t => t.task_status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.task_status === 'in_progress').length;
  const pendingTasks = tasks.filter(t => t.task_status === 'pending').length;
  const blockedTasks = tasks.filter(t => t.task_status === 'blocked').length;

  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A3E4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
          Project Overview
        </h3>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
          CURRENT PROJECT STATUS & TASKS
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#00A3E4]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-[#00A3E4]">{inProgressTasks}</p>
              </div>
              <Zap className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#CCCC33]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-[#CCCC33]">{pendingTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-[#CCCC33]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked</p>
                <p className="text-2xl font-bold text-red-500">{blockedTasks}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-[#00A3E4]" />
            <span style={{ fontFamily: 'Cosmoball, cursive' }}>Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Project Completion</span>
              <span className="text-sm font-bold text-[#00A3E4]">{completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-medium text-gray-900">{task.task_title}</h4>
                    <Badge className={getStatusColor(task.task_status)}>
                      {task.task_status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{task.task_description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.estimated_time_hours}h estimated
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created {new Date(task.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  VIEW
                </Button>
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No tasks found. Create your first project task to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};