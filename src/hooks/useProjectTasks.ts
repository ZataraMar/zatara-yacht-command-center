import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectTask {
  id: string;
  task_title: string;
  task_description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  task_status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  estimated_time_hours: number;
  created_at: string;
  updated_at: string;
  project_name: string;
  assigned_to?: string;
  completed_at?: string;
  deliverables?: any;
  dependencies?: any;
  notes?: string;
}

export const useProjectTasks = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('project_tasks')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTasks((data || []) as ProjectTask[]);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: {
    task_title: string;
    task_description: string;
    priority: ProjectTask['priority'];
    estimated_time_hours: number;
    project_name: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .insert([{
          ...taskData,
          task_status: 'pending' as const
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchTasks(); // Refresh the list
      return data;
    } catch (err) {
      console.error('Error adding task:', err);
      throw err;
    }
  };

  const updateTaskStatus = async (taskId: string, status: ProjectTask['task_status']) => {
    try {
      const updateData: any = { 
        task_status: status,
        updated_at: new Date().toISOString()
      };
      
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('project_tasks')
        .update(updateData)
        .eq('id', taskId);

      if (error) throw error;
      await fetchTasks(); // Refresh the list
    } catch (err) {
      console.error('Error updating task status:', err);
      throw err;
    }
  };

  const updateTaskPriority = async (taskId: string, priority: ProjectTask['priority']) => {
    try {
      const { error } = await supabase
        .from('project_tasks')
        .update({ 
          priority,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);

      if (error) throw error;
      await fetchTasks(); // Refresh the list
    } catch (err) {
      console.error('Error updating task priority:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('project_tasks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_tasks'
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getNextPriorityTask = () => {
    const priorityOrder = ['urgent', 'high', 'medium', 'low'];
    const pendingTasks = tasks.filter(task => task.task_status === 'pending');
    
    for (const priority of priorityOrder) {
      const task = pendingTasks.find(t => t.priority === priority);
      if (task) return task;
    }
    
    return null;
  };

  const getCurrentTask = () => {
    return tasks.find(task => task.task_status === 'in_progress') || null;
  };

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.task_status === 'completed').length;
    const inProgress = tasks.filter(t => t.task_status === 'in_progress').length;
    const pending = tasks.filter(t => t.task_status === 'pending').length;
    const blocked = tasks.filter(t => t.task_status === 'blocked').length;
    
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? (completed / totalTasks) * 100 : 0;
    
    return {
      completed,
      inProgress,
      pending,
      blocked,
      total: totalTasks,
      completionRate
    };
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTaskStatus,
    updateTaskPriority,
    getNextPriorityTask,
    getCurrentTask,
    getTaskStats,
    refetch: fetchTasks
  };
};