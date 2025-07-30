-- Update project tasks with security implementation progress
-- Add security tasks to track remaining work

-- Mark previous security tasks as completed
UPDATE project_tasks 
SET task_status = 'completed',
    completed_at = NOW(),
    updated_at = NOW()
WHERE task_title IN (
    'Implement Row Level Security (RLS)',
    'Role-based access control system',
    'Prevent role escalation vulnerabilities',
    'Enhanced audit logging system',
    'Convert SECURITY DEFINER views',
    'Fix function search path issues'
) AND task_status != 'completed';

-- Add new tasks for remaining security work
INSERT INTO project_tasks (
    task_title,
    task_description,
    priority,
    task_status,
    estimated_time_hours,
    project_name,
    deliverables,
    notes
) VALUES 
(
    'Convert remaining SECURITY DEFINER views',
    'Convert the remaining 34 SECURITY DEFINER views to SECURITY INVOKER for better security. These views currently bypass RLS and should use the querying user permissions instead.',
    'high',
    'pending',
    4,
    'Security Implementation',
    '{"items": ["Convert 34 remaining views", "Test view functionality", "Verify RLS compliance", "Update documentation"]}',
    'Non-critical views but should be addressed for complete security compliance'
),
(
    'Implement automated security monitoring',
    'Set up automated monitoring and alerting for security policy violations, failed authentication attempts, and suspicious database access patterns.',
    'medium',
    'pending',
    6,
    'Security Implementation',
    '{"items": ["Security event triggers", "Alert system", "Dashboard monitoring", "Automated reports"]}',
    'Proactive security monitoring to detect and respond to threats'
),
(
    'Update project knowledge with security best practices',
    'Document the implemented security architecture and create custom instructions for maintaining security standards in future development.',
    'medium',
    'pending',
    2,
    'Documentation',
    '{"items": ["Security architecture docs", "Custom instructions", "Developer guidelines", "Maintenance procedures"]}',
    'Ensure security standards are maintained and properly documented'
);