import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Plus,
  Play,
  Pause,
  MoreHorizontal
} from 'lucide-react';

export const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      id: 'PROJ-001',
      name: 'Website Redesign',
      description: 'Complete overhaul of Zatara website with new booking system',
      status: 'In Progress',
      priority: 'High',
      progress: 75,
      startDate: '2024-06-01',
      dueDate: '2024-08-15',
      team: ['Jules', 'External Developer'],
      budget: 8500,
      spent: 6200,
      tasksTotal: 24,
      tasksCompleted: 18
    },
    {
      id: 'PROJ-002',
      name: 'Fleet Expansion Planning',
      description: 'Research and planning for adding 2 new boats to the fleet',
      status: 'Planning',
      priority: 'Medium',
      progress: 30,
      startDate: '2024-07-01',
      dueDate: '2024-12-31',
      team: ['Jules', 'Jo', 'Tom'],
      budget: 15000,
      spent: 2800,
      tasksTotal: 16,
      tasksCompleted: 5
    }
  ];

  const tasks = [
    {
      id: 'TASK-001',
      title: 'Finalize booking widget integration',
      project: 'Website Redesign',
      assignee: 'External Developer',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-07-18',
      estimatedHours: 8,
      timeSpent: 6
    },
    {
      id: 'TASK-002',
      title: 'Conduct market research for new boat types',
      project: 'Fleet Expansion Planning',
      assignee: 'Jo',
      priority: 'Medium',
      status: 'To Do',
      dueDate: '2024-07-25',
      estimatedHours: 12,
      timeSpent: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-[#CCCC33] text-black';
      case 'In Progress': return 'bg-[#00A3E4] text-white';
      case 'On Hold': return 'bg-orange-500 text-white';
      case 'Completed': return 'bg-green-500 text-white';
      case 'Cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-[#CCCC33] text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'To Do': return 'bg-gray-200 text-gray-700';
      case 'In Progress': return 'bg-[#00A3E4] text-white';
      case 'Review': return 'bg-[#CCCC33] text-black';
      case 'Done': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
            Project Management
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Tw Cen MT, sans-serif' }}>
            BUSINESS PROJECTS & TASKS
          </p>
        </div>
        <Button className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
          <Plus className="mr-2 h-4 w-4" />
          NEW PROJECT
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#00A3E4]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-[#00A3E4]">5</p>
              </div>
              <Briefcase className="h-8 w-8 text-[#00A3E4]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#CCCC33]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks This Week</p>
                <p className="text-2xl font-bold text-[#CCCC33]">18</p>
              </div>
              <Target className="h-8 w-8 text-[#CCCC33]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed This Month</p>
                <p className="text-2xl font-bold text-green-500">23</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Tasks</p>
                <p className="text-2xl font-bold text-red-500">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                            {project.name}
                          </h4>
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                          <Badge variant="outline" className="text-[#666] border-[#666]">
                            {project.id}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <div className="flex items-center mb-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              Start: {project.startDate}
                            </div>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-1" />
                              Due: {project.dueDate}
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-1">
                              <Users className="h-4 w-4 mr-1" />
                              Team: {project.team.join(', ')}
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Tasks: {project.tasksCompleted}/{project.tasksTotal}
                            </div>
                          </div>
                          
                          <div>
                            <div className="mb-1">
                              Budget: €{project.budget.toLocaleString()}
                            </div>
                            <div>
                              Spent: €{project.spent.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className="text-3xl font-bold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {project.progress}%
                        </p>
                        <p className="text-sm text-gray-500">Progress</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-[#00A3E4] h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 text-sm">
                        <span className="text-green-500">
                          €{(project.budget - project.spent).toLocaleString()} remaining
                        </span>
                        <span className="text-gray-500">
                          {project.tasksTotal - project.tasksCompleted} tasks left
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Play className="mr-1 h-4 w-4" />
                          VIEW DETAILS
                        </Button>
                        <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                          MANAGE PROJECT
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Cosmoball, cursive' }}>Current Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-[#00A3E4]" style={{ fontFamily: 'Cosmoball, cursive' }}>
                          {task.title}
                        </h4>
                        <Badge className={getTaskStatusColor(task.status)}>{task.status}</Badge>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <strong>Project:</strong> {task.project}
                      </div>
                      <div>
                        <strong>Assignee:</strong> {task.assignee}
                      </div>
                      <div>
                        <strong>Due:</strong> {task.dueDate}
                      </div>
                      <div>
                        <strong>Time:</strong> {task.timeSpent}h / {task.estimatedHours}h
                      </div>
                    </div>
                    
                    {/* Time Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-1 mb-3">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          task.timeSpent > task.estimatedHours ? 'bg-red-500' : 'bg-[#CCCC33]'
                        }`} 
                        style={{ width: `${Math.min((task.timeSpent / task.estimatedHours) * 100, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">EDIT</Button>
                      <Button size="sm" className="bg-[#00A3E4] hover:bg-[#0085B8] text-white">
                        UPDATE STATUS
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};