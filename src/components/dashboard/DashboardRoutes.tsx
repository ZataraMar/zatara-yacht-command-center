import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { DashboardOperations } from '@/components/dashboard/DashboardOperations';
import { FleetOverview } from '@/components/dashboard/fleet/FleetOverview';
import { StaffManagement } from '@/components/dashboard/team/StaffManagement';
import { AdvancedFinancials } from '@/components/dashboard/financial/AdvancedFinancials';
import { GuestExperience } from '@/components/dashboard/crm/GuestExperience';
import { OperationalExcellence } from '@/components/dashboard/operations/OperationalExcellence';
import { AdvancedReporting } from '@/components/dashboard/analytics/AdvancedReporting';
import { AutomationWorkflows } from '@/components/dashboard/integration/AutomationWorkflows';
import { UserManagement } from '@/components/dashboard/admin/UserManagement';
import { AdminSettings } from '@/components/dashboard/admin/AdminSettings';
import SystemOverview from '@/components/dashboard/admin/SystemOverview';
import { FieldAnalysisDashboard } from '@/components/dashboard/admin/FieldAnalysisDashboard';
import { CompactCalendarSync } from '@/components/calendar/CompactCalendarSync';
import { Phase2Dashboard } from '@/components/dashboard/Phase2Dashboard';
import { LandingPagesManagement } from '@/components/dashboard/LandingPagesManagement';
import { ZataraCommandCenter } from '@/components/dashboard/ZataraCommandCenter';
import { AccessControlRoute } from './AccessControlRoute';
import { ClientDashboard } from './ClientDashboard';
import { UserSettings } from './UserSettings';
import { MultiRoleCRM } from './crm/MultiRoleCRM';
import { MaintenanceManagement } from './maintenance/MaintenanceManagement';
import { YachtBrokerage } from './brokerage/YachtBrokerage';
import { SalesPartners } from './partners/SalesPartners';
import { BoatClubManagement } from './boat-club/BoatClubManagement';
import { ProjectManagement } from './projects/ProjectManagement';
import { isOwner, canAccessOperations, canAccessFinancials, canManageFleet } from '@/utils/authSecurity';

interface DashboardRoutesProps {
  userRole: string;
  profile: any;
}

export const DashboardRoutes = ({ userRole, profile }: DashboardRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      
      {/* System Overview - Owner only */}
      <Route 
        path="/system-overview" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <SystemOverview />
          </AccessControlRoute>
        } 
      />
      
      {/* Operations - Available to skippers, staff, management, and owner */}
      <Route 
        path="/operations" 
        element={
          <AccessControlRoute accessCheck={canAccessOperations} userRole={userRole}>
            <DashboardOperations />
          </AccessControlRoute>
        } 
      />
      
      {/* Fleet Management - Available to management and owner */}
      <Route 
        path="/fleet" 
        element={
          <AccessControlRoute accessCheck={canManageFleet} userRole={userRole}>
            <FleetOverview />
          </AccessControlRoute>
        } 
      />
      
      {/* Team Management - Owner only */}
      <Route 
        path="/team" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <StaffManagement />
          </AccessControlRoute>
        } 
      />
      
      {/* User Management - Owner only */}
      <Route 
        path="/users" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <UserManagement />
          </AccessControlRoute>
        } 
      />
      
      {/* Admin Settings - Owner only */}
      <Route 
        path="/admin-settings" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <AdminSettings />
          </AccessControlRoute>
        } 
      />
      
      {/* Field Analysis Dashboard - Owner only */}
      <Route 
        path="/field-analysis" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <FieldAnalysisDashboard />
          </AccessControlRoute>
        } 
      />
      
      {/* Calendar Sync - Owner only */}
      <Route 
        path="/calendar-sync" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <CompactCalendarSync />
          </AccessControlRoute>
        } 
      />
      
      {/* Financials - Management and owner only */}
      <Route 
        path="/financials" 
        element={
          <AccessControlRoute accessCheck={canAccessFinancials} userRole={userRole}>
            <AdvancedFinancials />
          </AccessControlRoute>
        } 
      />
      
      {/* Guest Experience - Owner only for now */}
      <Route 
        path="/guests" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <GuestExperience />
          </AccessControlRoute>
        } 
      />
      
      {/* Operations Excellence - Owner only */}
      <Route 
        path="/operations-excellence" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <OperationalExcellence />
          </AccessControlRoute>
        } 
      />
      
      {/* Analytics - Owner only */}
      <Route 
        path="/analytics" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <AdvancedReporting />
          </AccessControlRoute>
        } 
      />
      
      {/* Zatara Command Center - Owner only */}
      <Route 
        path="/zatara-command" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <ZataraCommandCenter />
          </AccessControlRoute>
        } 
      />
      
      {/* Automation - Owner only */}
      <Route 
        path="/automation" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <AutomationWorkflows />
          </AccessControlRoute>
        } 
      />
      
      {/* Landing Pages Management - Owner only */}
      <Route 
        path="/landing-pages" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <LandingPagesManagement />
          </AccessControlRoute>
        } 
      />
      
      {/* Phase 2 Management - Owner only */}
      <Route 
        path="/phase2" 
        element={
          <AccessControlRoute accessCheck={isOwner} userRole={userRole}>
            <Phase2Dashboard />
          </AccessControlRoute>
        } 
      />
      
      {/* Client Routes - Booking Management */}
      <Route path="/bookings" element={<ClientDashboard />} />
      
      {/* New Management Areas - Owner only */}
      <Route path="/crm" element={<AccessControlRoute accessCheck={isOwner} userRole={userRole}><MultiRoleCRM /></AccessControlRoute>} />
      <Route path="/maintenance" element={<AccessControlRoute accessCheck={isOwner} userRole={userRole}><MaintenanceManagement /></AccessControlRoute>} />
      <Route path="/brokerage" element={<AccessControlRoute accessCheck={isOwner} userRole={userRole}><YachtBrokerage /></AccessControlRoute>} />
      <Route path="/partners" element={<AccessControlRoute accessCheck={isOwner} userRole={userRole}><SalesPartners /></AccessControlRoute>} />
      <Route path="/boat-club" element={<AccessControlRoute accessCheck={isOwner} userRole={userRole}><BoatClubManagement /></AccessControlRoute>} />
      <Route path="/projects" element={<ProjectManagement />} />
      
      {/* Settings - Available to all authenticated users */}
      <Route path="/settings" element={<UserSettings userRole={userRole} profile={profile} />} />
    </Routes>
  );
};