import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProjectTasks, ProjectTask } from '@/hooks/useProjectTasks';
import { 
  Target, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  TrendingUp,
  Zap,
  Plus,
  ArrowRight,
  Play,
  Pause,
  CheckCheck,
  XCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const LiveProjectDashboard = () => {
  const { 
    tasks, 
    loading, 
    error, 
    addTask, 
    updateTaskStatus, 
    updateTaskPriority,
    getNextPriorityTask,
    getCurrentTask,
    getTaskStats 
  } = useProjectTasks();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    task_title: '',
    task_description: '',
    priority: 'medium' as ProjectTask['priority'],
    estimated_time_hours: 1,
    project_name: 'Landing Pages'
  });

  const stats = getTaskStats();
  const nextTask = getNextPriorityTask();
  const currentTask = getCurrentTask();

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
      case 'urgent': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-[#CCCC33] text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleAddTask = async () => {
    try {
      await addTask(newTask);
      setShowAddTask(false);
      setNewTask({
        task_title: '',
        task_description: '',
        priority: 'medium',
        estimated_time_hours: 1,
        project_name: 'Landing Pages'
      });
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: ProjectTask['task_status']) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success(`Task marked as ${newStatus.replace('_', ' ')}`);
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleStartTask = async (taskId: string) => {
    try {
      // First, mark any current in_progress task as pending
      if (currentTask) {
        await updateTaskStatus(currentTask.id, 'pending');
      }
      // Then start the new task
      await updateTaskStatus(taskId, 'in_progress');
      toast.success('Task started');
    } catch (error) {
      toast.error('Failed to start task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A3E4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-600">
            <XCircle className="h-5 w-5" />
            <span>Error loading project data: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Live Project Dashboard
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            REAL-TIME PROJECT MANAGEMENT & TASK TRACKING
          </p>
        </div>
        
        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
          <DialogTrigger asChild>
            <Button className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
              <Plus className="mr-2 h-4 w-4" />
              ADD TASK
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.task_title}
                  onChange={(e) => setNewTask({...newTask, task_title: e.target.value})}
                  placeholder="Enter task title..."
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.task_description}
                  onChange={(e) => setNewTask({...newTask, task_description: e.target.value})}
                  placeholder="Describe what needs to be done..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: ProjectTask['priority']) => setNewTask({...newTask, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hours">Estimated Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newTask.estimated_time_hours}
                    onChange={(e) => setNewTask({...newTask, estimated_time_hours: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask} className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                  Add Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Focus Section */}
      {currentTask && (
        <Card className="border-[#00A3E4] bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#00A3E4]">
              <Zap className="h-5 w-5" />
              <span style={{ fontFamily: 'Cosmoball, cursive' }}>Currently Working On</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#00A3E4] mb-2">{currentTask.task_title}</h3>
                <p className="text-gray-700 mb-3">{currentTask.task_description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <Badge className={getPriorityColor(currentTask.priority)}>
                    {currentTask.priority}
                  </Badge>
                  <span className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentTask.estimated_time_hours}h estimated
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChange(currentTask.id, 'pending')}
                >
                  <Pause className="mr-1 h-4 w-4" />
                  Pause
                </Button>
                <Button 
                  onClick={() => handleStatusChange(currentTask.id, 'completed')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCheck className="mr-1 h-4 w-4" />
                  Complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Priority Task */}
      {!currentTask && nextTask && (
        <Card className="border-[#CCCC33] bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#CCCC33]">
              <Target className="h-5 w-5" />
              <span style={{ fontFamily: 'Cosmoball, cursive' }}>Next Priority Task</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{nextTask.task_title}</h3>
                <p className="text-gray-700 mb-3">{nextTask.task_description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <Badge className={getPriorityColor(nextTask.priority)}>
                    {nextTask.priority}
                  </Badge>
                  <span className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {nextTask.estimated_time_hours}h estimated
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => handleStartTask(nextTask.id)}
                className="bg-[#00A3E4] hover:bg-[#0085B8] text-white"
              >
                <Play className="mr-1 h-4 w-4" />
                Start Working
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
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
                <p className="text-2xl font-bold text-[#00A3E4]">{stats.inProgress}</p>
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
                <p className="text-2xl font-bold text-[#CCCC33]">{stats.pending}</p>
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
                <p className="text-2xl font-bold text-red-500">{stats.blocked}</p>
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
            <span style={{ fontFamily: 'Cosmoball, cursive' }}>Project Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm font-bold text-[#00A3E4]">{stats.completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={stats.completionRate} className="h-3" />
            <div className="text-sm text-gray-600">
              {stats.completed} of {stats.total} tasks completed
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>All Project Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{task.task_title}</h4>
                    <Badge className={getStatusColor(task.task_status)}>
                      {task.task_status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.task_description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                <div className="flex space-x-2">
                  {task.task_status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStartTask(task.id)}
                      className="bg-[#00A3E4] hover:bg-[#0085B8] text-white"
                    >
                      <Play className="mr-1 h-3 w-3" />
                      Start
                    </Button>
                  )}
                  {task.task_status === 'in_progress' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(task.id, 'pending')}
                      >
                        <Pause className="mr-1 h-3 w-3" />
                        Pause
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(task.id, 'completed')}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCheck className="mr-1 h-3 w-3" />
                        Complete
                      </Button>
                    </>
                  )}
                  {task.task_status === 'completed' && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Done
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No tasks found. Create your first task to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};