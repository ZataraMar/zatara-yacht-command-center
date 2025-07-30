import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  GripVertical,
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  Plus,
  Calendar,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import { useProjectTasks, ProjectTask } from '@/hooks/useProjectTasks';

interface DraggableTaskProps {
  task: ProjectTask;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, dropIndex: number) => void;
  onClick: (task: ProjectTask) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  index,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onClick
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-[#CCCC33] text-black';
      case 'low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-[#00A3E4]';
      case 'blocked': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressPercentage = (task: ProjectTask) => {
    const deliverables = task.deliverables as any;
    if (!deliverables || typeof deliverables !== 'object') return 0;
    
    // Basic progress calculation based on task status
    switch (task.task_status) {
      case 'completed': return 100;
      case 'in_progress': return 60;
      case 'pending': return 10;
      default: return 0;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onClick={() => onClick(task)}
      className="group border rounded-lg p-4 hover:bg-gray-50 cursor-move transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-medium text-gray-900 truncate">{task.task_title}</h4>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className={getStatusColor(task.task_status)}>
              {task.task_status.replace('_', ' ')}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.task_description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span>{getProgressPercentage(task)}%</span>
            </div>
            <Progress value={getProgressPercentage(task)} className="h-1" />
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {task.estimated_time_hours}h
              </span>
              <span className="flex items-center">
                <Target className="h-3 w-3 mr-1" />
                {task.project_name}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {task.priority === 'urgent' && (
                <AlertTriangle className="h-3 w-3 text-red-500" />
              )}
              {task.task_status === 'completed' && (
                <CheckCircle2 className="h-3 w-3 text-green-600" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EnhancedTaskManagement = () => {
  const { 
    tasks, 
    loading, 
    addTask, 
    updateTaskStatus, 
    updateTaskPriority, 
    getTaskStats 
  } = useProjectTasks();
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [taskOrder, setTaskOrder] = useState<ProjectTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  
  const taskStats = getTaskStats();

  useEffect(() => {
    // Sort tasks by priority and creation date, then set order
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority; // Higher priority first
      }
      
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
    
    setTaskOrder(sortedTasks);
  }, [tasks]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    const newOrder = [...taskOrder];
    const draggedTask = newOrder[draggedIndex];
    
    // Remove dragged item and insert at new position
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedTask);
    
    setTaskOrder(newOrder);
    
    // Update priority based on new position
    const priorities: Array<'urgent' | 'high' | 'medium' | 'low'> = ['urgent', 'high', 'medium', 'low'];
    const newPriority = priorities[Math.min(Math.floor(dropIndex / Math.ceil(newOrder.length / 4)), 3)];
    
    if (draggedTask.priority !== newPriority) {
      await updateTaskPriority(draggedTask.id, newPriority);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    try {
      await addTask({
        task_title: newTaskTitle,
        task_description: newTaskDescription || 'No description provided',
        priority: 'medium',
        estimated_time_hours: 2,
        project_name: 'Landing Pages'
      });
      
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowAddTask(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleQuickStatusUpdate = async (task: ProjectTask) => {
    const statusFlow = {
      'pending': 'in_progress',
      'in_progress': 'completed',
      'completed': 'pending',
      'blocked': 'pending'
    };
    
    const newStatus = statusFlow[task.task_status as keyof typeof statusFlow] as ProjectTask['task_status'];
    await updateTaskStatus(task.id, newStatus);
  };

  const landingPageTasks = taskOrder.filter(task => task.project_name === 'Landing Pages');

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A3E4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#00A3E4]">Enhanced Task Management</h2>
          <p className="text-gray-600">Drag & drop to prioritize tasks, track landing page progress</p>
        </div>
        <Button 
          onClick={() => setShowAddTask(true)}
          className="bg-[#CCCC33] hover:bg-[#B8B82A] text-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Quick Add Task
        </Button>
      </div>

      {/* Task Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-[#00A3E4]">{taskStats.total}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-[#CCCC33]">{taskStats.inProgress}</p>
              </div>
              <Zap className="h-8 w-8 text-[#CCCC33]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-[#D4AF37]">{Math.round(taskStats.completionRate)}%</p>
              </div>
              <Target className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Landing Page Project Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#00A3E4]">Landing Pages Project</CardTitle>
              <CardDescription>
                Current deadline progress - {landingPageTasks.length} tasks total
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-[#CCCC33] border-[#CCCC33]">
              <Calendar className="h-3 w-3 mr-1" />
              Deadline Tracking
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(taskStats.completionRate)}% Complete</span>
            </div>
            <Progress value={taskStats.completionRate} className="h-3" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">{taskStats.pending}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#00A3E4]">{taskStats.inProgress}</p>
                <p className="text-xs text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{taskStats.completed}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Draggable Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Task Priority Queue</CardTitle>
          <CardDescription>
            Drag tasks to reorder priority. Higher positions = higher priority
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {taskOrder.map((task, index) => (
              <DraggableTask
                key={task.id}
                task={task}
                index={index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={setSelectedTask}
              />
            ))}
            
            {taskOrder.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tasks found. Add your first task to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Task Form */}
      {showAddTask && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Task</CardTitle>
            <CardDescription>Add a new task to the Landing Pages project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Task Title</label>
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Describe the task..."
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddTask}
                  disabled={!newTaskTitle.trim()}
                  className="bg-[#00A3E4] hover:bg-[#0085B8]"
                >
                  Add Task
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddTask(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#00A3E4]">{selectedTask.task_title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={selectedTask.priority === 'urgent' ? 'bg-red-500' : 'bg-[#CCCC33] text-black'}>
                    {selectedTask.priority}
                  </Badge>
                  <Badge variant="outline">{selectedTask.task_status}</Badge>
                  <Badge variant="secondary">{selectedTask.project_name}</Badge>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
                Close
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-600 mt-1">{selectedTask.task_description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Estimated Time</label>
                  <p className="text-sm text-gray-600">{selectedTask.estimated_time_hours} hours</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedTask.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedTask.deliverables && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Deliverables</label>
                  <pre className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                    {JSON.stringify(selectedTask.deliverables, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleQuickStatusUpdate(selectedTask)}
                  className="bg-[#00A3E4] hover:bg-[#0085B8]"
                >
                  Update Status
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTask(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};