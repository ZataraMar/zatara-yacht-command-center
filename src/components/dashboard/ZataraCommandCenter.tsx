import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send, 
  Brain, 
  MessageSquare, 
  Clock, 
  User, 
  Bot,
  Workflow,
  History,
  Settings,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';
import { useProjectTasks } from '@/hooks/useProjectTasks';

interface ChatMessage {
  id: number;
  session_id: string;
  message_content: string;
  message_type: 'user' | 'ai' | 'system';
  agent_id?: number;
  function_calls?: any;
  function_results?: any;
  message_metadata?: any;
  created_at: string;
}

interface ChatSession {
  id: number;
  session_id: string;
  session_type: string;
  user_id?: string;
  active_agent_id?: number;
  session_context?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const ZataraCommandCenter = () => {
  const { user, profile } = useAuth();
  const { tasks, getTaskStats, addTask } = useProjectTasks();
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const taskStats = getTaskStats();

  useEffect(() => {
    initializeSession();
    fetchSessions();
  }, [user]);

  useEffect(() => {
    if (currentSession) {
      fetchMessages(currentSession);
      setupRealtimeSubscription();
    }
  }, [currentSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    if (!user) return;

    const sessionId = `zatara-cmd-${Date.now()}`;
    
    try {
      const { data, error } = await supabase
        .from('ai_chat_sessions')
        .insert({
          session_id: sessionId,
          session_type: 'zatara_command',
          user_id: user.id,
          session_context: {
            user_role: profile?.role,
            active_tasks: taskStats.total,
            session_start: new Date().toISOString()
          },
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      
      setCurrentSession(sessionId);
      
      // Send initial system message
      await sendSystemMessage(sessionId, `Zatara Command Center session started. User: ${profile?.email || 'Unknown'}, Role: ${profile?.role || 'Unknown'}. Active tasks: ${taskStats.total}`);
      
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_chat_sessions')
        .select('*')
        .eq('session_type', 'zatara_command')
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as ChatMessage[]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('zatara_command_messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_chat_messages'
        },
        (payload) => {
          if (payload.new && (payload.new as any).session_id === currentSession) {
            setMessages(prev => [...prev, payload.new as ChatMessage]);
            setIsTyping(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendSystemMessage = async (sessionId: string, content: string) => {
    try {
      await supabase
        .from('ai_chat_messages')
        .insert({
          session_id: sessionId,
          message_content: content,
          message_type: 'system',
          message_metadata: {
            timestamp: new Date().toISOString(),
            user_id: user?.id
          }
        });
    } catch (error) {
      console.error('Error sending system message:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentSession || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Add user message to database
      await supabase
        .from('ai_chat_messages')
        .insert({
          session_id: currentSession,
          message_content: userMessage,
          message_type: 'user',
          message_metadata: {
            timestamp: new Date().toISOString(),
            user_id: user?.id,
            user_role: profile?.role
          }
        });

      // Here you would send to your n8n webhook
      // For now, we'll simulate an AI response
      setTimeout(async () => {
        try {
          await supabase
            .from('ai_chat_messages')
            .insert({
              session_id: currentSession,
              message_content: `I received your message: "${userMessage}". This message would typically be processed by your n8n workflow and return an AI response. The system is ready for n8n integration.`,
              message_type: 'ai',
              message_metadata: {
                timestamp: new Date().toISOString(),
                ai_agent: 'zatara_command_ai',
                processing_time: '0.5s'
              }
            });
        } catch (error) {
          console.error('Error sending AI response:', error);
        }
        setIsTyping(false);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="h-4 w-4" />;
      case 'ai': return <Bot className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getMessageSender = (type: string, metadata?: any) => {
    switch (type) {
      case 'user': return profile?.email || 'You';
      case 'ai': return metadata?.ai_agent || 'Zatara AI';
      case 'system': return 'System';
      default: return 'Unknown';
    }
  };

  const createTaskFromChat = async () => {
    if (!inputMessage.trim()) return;

    try {
      await addTask({
        task_title: `Chat Request: ${inputMessage.slice(0, 50)}...`,
        task_description: inputMessage,
        priority: 'medium' as const,
        estimated_time_hours: 1,
        project_name: 'Zatara Command Center'
      });

      setInputMessage('');
      
      // Send confirmation message
      if (currentSession) {
        await sendSystemMessage(currentSession, `Task created from chat: "${inputMessage.slice(0, 50)}..."`);
      }
    } catch (error) {
      console.error('Error creating task from chat:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Main Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-[#00A3E4]" />
                <div>
                  <CardTitle className="text-[#00A3E4]">Zatara Command Center</CardTitle>
                  <CardDescription>AI-powered business management interface</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-[#00A3E4]">
                  <Clock className="h-3 w-3 mr-1" />
                  Live
                </Badge>
                {currentSession && (
                  <Badge variant="secondary">
                    Session Active
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.message_type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.message_type !== 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00A3E4] text-white flex items-center justify-center">
                        {getMessageIcon(message.message_type)}
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.message_type === 'user'
                          ? 'bg-[#00A3E4] text-white'
                          : message.message_type === 'system'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium opacity-75">
                          {getMessageSender(message.message_type, message.message_metadata)}
                        </span>
                        <span className="text-xs opacity-50">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.message_content}</p>
                      {message.function_calls && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <span className="font-medium">Function Call:</span> {JSON.stringify(message.function_calls)}
                        </div>
                      )}
                    </div>
                    {message.message_type === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CCCC33] text-black flex items-center justify-center">
                        {getMessageIcon(message.message_type)}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00A3E4] text-white flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Send a command to Zatara AI..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-[#00A3E4] hover:bg-[#0085B8]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={createTaskFromChat}
                  disabled={!inputMessage.trim()}
                  className="text-[#00A3E4] border-[#00A3E4]"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Create Task
                </Button>
                <Button variant="outline" size="sm" className="text-[#CCCC33] border-[#CCCC33]">
                  <Workflow className="h-3 w-3 mr-1" />
                  N8N Workflow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Task Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Task Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#00A3E4]">{taskStats.total}</p>
                <p className="text-xs text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#CCCC33]">{taskStats.inProgress}</p>
                <p className="text-xs text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{taskStats.pending}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round(taskStats.completionRate)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#00A3E4] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${taskStats.completionRate}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{task.task_title}</span>
                    <Badge variant={task.priority === 'urgent' ? 'destructive' : 'secondary'}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{task.task_description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{task.project_name}</span>
                    <Badge variant="outline" className="text-xs">
                      {task.task_status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((session) => (
                <div 
                  key={session.id}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-50 ${
                    session.session_id === currentSession ? 'bg-[#00A3E4] bg-opacity-10' : ''
                  }`}
                  onClick={() => setCurrentSession(session.session_id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      {new Date(session.created_at).toLocaleDateString()}
                    </span>
                    <Badge variant={session.is_active ? 'default' : 'secondary'} className="text-xs">
                      {session.is_active ? 'Active' : 'Ended'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(session.created_at).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};