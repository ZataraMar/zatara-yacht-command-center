# Zatara Yacht Command Center

Professional yacht charter management system for Zatara fleet operations. Built with React 18, TypeScript, and Supabase for production deployment and mobile app store distribution.

## 🚀 Features

### Core Functionality
- **User Management**: Multi-role system (Owner, Management, Skippers, Staff, Clients)
- **Booking Management**: Complete charter booking lifecycle
- **Fleet Operations**: Real-time boat management and scheduling
- **Financial Analytics**: Revenue tracking and commission management
- **Customer CRM**: Guest relationship management and history
- **Mobile-First Design**: Responsive design optimized for tablets and phones

### Production Ready
- **Progressive Web App**: Installable web app with offline capabilities
- **Mobile Apps**: Native iOS and Android apps via Capacitor
- **Security**: Row Level Security (RLS) and role-based access control
- **Performance**: Service workers, caching, and optimization
- **Scalability**: Built on Supabase with PostgreSQL backend

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Edge Functions + Auth)
- **Mobile**: Capacitor for iOS/Android native apps
- **Styling**: Tailwind CSS with custom design system
- **State**: React Query + Context API
- **Security**: Supabase RLS + RBAC

## 📱 Mobile App Development

### Prerequisites
1. Export project to GitHub using Lovable's "Export to GitHub" button
2. Clone repository locally: `git clone [your-repo-url]`
3. Install dependencies: `npm install`

### iOS Development (macOS required)
```bash
# Add iOS platform
npx cap add ios

# Build and sync
npm run build
npx cap sync

# Open in Xcode
npx cap run ios
```

### Android Development
```bash
# Add Android platform
npx cap add android

# Build and sync
npm run build
npx cap sync

# Open in Android Studio
npx cap run android
```

## 🌐 Production Deployment

### Web App Deployment
1. **Build**: `npm run build`
2. **Deploy**: to cruise.zatara.es
3. **Configure**: Supabase auth URLs

### Domain Configuration
- **Production**: cruise.zatara.es
- **Staging**: d7313886-9c5d-4953-8a7c-210a860cadae.lovableproject.com

### Supabase Configuration
Update authentication URLs in [Supabase Dashboard](https://supabase.com/dashboard/project/eefenqehcesevuudtpti/auth/url-configuration):
- **Site URL**: `https://cruise.zatara.es`
- **Redirect URLs**: `https://cruise.zatara.es/**`

## 👥 User Roles & Permissions

### Owner
- Full system access
- User management
- Financial overview
- System configuration

### Management
- Administrative functions
- Staff management
- Financial reporting
- Operations oversight

### Skippers
- Operations management
- Booking coordination
- Fleet status updates
- Guest communications

### Staff
- Booking assistance
- Customer support
- Basic operations
- Limited reporting

### Clients
- Customer portal access
- Booking history
- Profile management
- Communication tools

## 🔧 Development

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```env
VITE_SUPABASE_URL=https://eefenqehcesevuudtpti.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_NODE_ENV=development
```

## 📊 Key Features

### Dashboard
- Real-time booking overview
- Fleet status monitoring
- Financial metrics
- Performance analytics

### Booking Management
- Charter scheduling
- Guest information
- Payment tracking
- Confirmation workflows

### Fleet Operations
- Boat availability
- Maintenance scheduling
- Skipper assignments
- GPS tracking integration

### Analytics
- Revenue reporting
- Customer insights
- Operational efficiency
- Seasonal trends

### Customer CRM
- Guest profiles
- Booking history
- Communication logs
- Preference tracking

## 🔒 Security

### Authentication
- Supabase Auth with email/password
- Role-based access control
- Session management
- Multi-device support

### Data Protection
- Row Level Security (RLS) policies
- Encrypted data transmission
- Secure API endpoints
- GDPR compliance ready

### Access Control
- Granular permissions
- Role inheritance
- Audit logging
- Session monitoring

## 📱 Mobile Features

### Native Capabilities
- Push notifications
- Camera integration
- GPS/location services
- Offline functionality
- Touch-optimized UI

### Progressive Web App
- Installable from browser
- Offline data access
- Background sync
- App-like experience

## 🚀 App Store Deployment

### iOS App Store
- **Bundle ID**: app.lovable.d73138869c5d49538a7c210a860cadae
- **App Name**: Zatara Yacht Command Center
- **Category**: Business, Productivity

### Google Play Store
- **Package Name**: app.lovable.d73138869c5d49538a7c210a860cadae
- **App Name**: Zatara Yacht Command Center
- **Category**: Business, Productivity

## 📞 Support

For technical support or business inquiries:
- **Technical Issues**: Check the troubleshooting guide in `/docs`
- **Feature Requests**: Submit via the admin panel
- **Business Support**: Contact Zatara Charter Mallorca

## 📝 License

Proprietary software for Zatara Charter Mallorca. All rights reserved.

---

Built with ❤️ for professional yacht charter operations.
