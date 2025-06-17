
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  Calendar,
  Anchor,
  MessageCircle,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface TaskAssignment {
  id: number;
  task_name: string;
  task_description: string;
  task_type: string;
  assigned_to: string;
  task_priority: number;
  due_date: string;
  booking_locator: string;
  boat_involved: string;
  task_status: string;
  estimated_duration_minutes: number;
  customer_facing: boolean;
  completion_notes: string;
  created_at: string;
}

export const TaskManagementCenter = () => {
  const { profile } = useAuth();
  const [tasks, setTasks] = useState<TaskAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<TaskAssignment | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');

  useEffect(() => {
    fetchTasks();
    setupRealtimeSubscription();
  }, [profile]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('task_assignments')
        .select('*')
        .in('task_status', ['pending', 'in_progress'])
        .order('due_date')
        .order('task_priority', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('task_assignments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'task_assignments'
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const completeTask = async (taskId: number) => {
    try {
      const { error } = await supabase
        .from('task_assignments')
        .update({
          task_status: 'completed',
          completed_at: new Date().toISOString(),
          completion_notes: completionNotes,
          completed_by: profile?.email || 'unknown'
        })
        .eq('id', taskId);

      if (error) {
        console.error('Error completing task:', error);
        return;
      }

      setSelectedTask(null);
      setCompletionNotes('');
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-500 text-white';
      case 2: return 'bg-orange-500 text-white';
      case 3: return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'preparation': return <Anchor className="h-4 w-4" />;
      case 'communication': return <MessageCircle className="h-4 w-4" />;
      case 'payment': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const myTasks = tasks.filter(task => 
    task.assigned_to === profile?.email || 
    task.assigned_to === profile?.role ||
    task.assigned_to === 'all'
  );

  const urgentTasks = tasks.filter(task => 
    task.task_priority === 1 || 
    new Date(task.due_date) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Task Management Center</h2>
          <p className="text-zatara-blue">Automated workflow and task assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Active</p>
                <p className="text-2xl font-bold text-zatara-navy">{tasks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Tasks</p>
                <p className="text-2xl font-bold text-zatara-navy">{myTasks.length}</p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentTasks.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Today</p>
                <p className="text-2xl font-bold text-orange-600">
                  {tasks.filter(task => 
                    new Date(task.due_date).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="completed">Recently Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="my-tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Tasks</CardTitle>
              <CardDescription>Tasks assigned to you or your role</CardDescription>
            </CardHeader>
            <CardContent>
              {myTasks.length > 0 ? (
                <div className="space-y-4">
                  {myTasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                         onClick={() => setSelectedTask(task)}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getTaskTypeIcon(task.task_type)}
                            <h4 className="font-medium">{task.task_name}</h4>
                            <Badge className={getPriorityColor(task.task_priority)}>
                              Priority {task.task_priority}
                            </Badge>
                            {task.customer_facing && (
                              <Badge variant="outline">Customer Facing</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.task_description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                            {task.booking_locator && (
                              <span>Booking: {task.booking_locator}</span>
                            )}
                            {task.boat_involved && (
                              <span>Boat: {task.boat_involved}</span>
                            )}
                            <span>Est. {task.estimated_duration_minutes}min</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Badge variant={task.task_status === 'pending' ? 'secondary' : 'default'}>
                            {task.task_status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No tasks assigned to you</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Urgent Tasks</CardTitle>
              <CardDescription>High priority and overdue tasks requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              {urgentTasks.length > 0 ? (
                <div className="space-y-4">
                  {urgentTasks.map((task) => (
                    <div key={task.id} className="border-l-4 border-red-500 rounded-lg p-4 bg-red-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-red-800">{task.task_name}</h4>
                          <p className="text-sm text-red-600">{task.task_description}</p>
                          <p className="text-xs text-red-500 mt-1">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="destructive" size="sm" 
                                onClick={() => setSelectedTask(task)}>
                          Action Required
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No urgent tasks</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Active Tasks</CardTitle>
              <CardDescription>Complete view of all pending and in-progress tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{task.task_name}</h4>
                        <p className="text-sm text-gray-600">{task.task_description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{task.assigned_to}</Badge>
                          <Badge variant="outline">{task.task_type}</Badge>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.task_priority)}>
                        P{task.task_priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed Tasks</CardTitle>
              <CardDescription>Tasks completed in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Completed tasks will be shown here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold">{selectedTask.task_name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getPriorityColor(selectedTask.task_priority)}>
                    Priority {selectedTask.task_priority}
                  </Badge>
                  <Badge variant="outline">{selectedTask.task_type}</Badge>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
                Close
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-gray-600">{selectedTask.task_description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedTask.due_date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Estimated Duration</label>
                  <p className="text-sm text-gray-600">{selectedTask.estimated_duration_minutes} minutes</p>
                </div>
              </div>

              {selectedTask.booking_locator && (
                <div>
                  <label className="text-sm font-medium">Related Booking</label>
                  <p className="text-sm text-gray-600">{selectedTask.booking_locator}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Completion Notes</label>
                <Textarea
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  placeholder="Add notes about task completion..."
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => completeTask(selectedTask.id)} className="flex-1">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
