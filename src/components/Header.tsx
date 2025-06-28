import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Upload, FileText, Info, User, LogOut } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import SmoothButton from './SmoothButton';

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();

  const navItems = [
    { path: '/upload-image', label: 'Upload', icon: Upload },
    { path: '/results', label: 'Results', icon: FileText },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <header className="bg-white border-b-4 border-neutral-900 relative will-change-transform">
      {/* Bauhaus geometric accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-600 via-blue-600 to-yellow-400 gradient-animation"></div>
      
      <div className="container mx-auto px-3 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group lightning-hover">
            <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center relative group-hover:bg-accent-600 transition-all duration-300 transform-gpu">
              <Activity className="h-5 w-5 text-white" />
              {/* Bauhaus corner accent */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 transition-all duration-300 group-hover:scale-125"></div>
            </div>
            <div>
              <h1 className="text-xl font-black text-neutral-900 tracking-tight uppercase flex items-center space-x-2 text-reveal">
                <span>MediScan AI</span>
                <div className="w-1 h-4 bg-accent-600 transition-all duration-300 group-hover:bg-blue-600"></div>
              </h1>
              <p className="text-xs text-neutral-600 font-bold uppercase tracking-wide fade-in stagger-1">Medical Analysis</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navItems.map(({ path, label, icon: Icon }, index) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link flex items-center space-x-2 text-sm font-bold uppercase tracking-wide transition-all duration-300 relative group lightning-hover ${
                    location.pathname === path
                      ? 'text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>{label}</span>
                  
                  {/* Bauhaus active indicator */}
                  {location.pathname === path && (
                    <div className="absolute -bottom-2 left-0 flex space-x-1 fade-in">
                      <div className={`w-2 h-1 transition-all duration-300 ${
                        index === 0 ? 'bg-accent-600' : 
                        index === 1 ? 'bg-blue-600' : 
                        'bg-yellow-400'
                      }`}></div>
                      <div className="w-1 h-1 bg-neutral-900"></div>
                    </div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Bauhaus Authentication UI */}
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <SmoothButton variant="primary" size="md">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </SmoothButton>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center space-x-3 fade-in">
                  {/* Bauhaus User Info */}
                  <div className="hidden sm:block text-right relative">
                    <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-accent-600 to-blue-600"></div>
                    <p className="text-xs text-neutral-600 font-bold uppercase tracking-wide flex items-center space-x-1">
                      <span>Welcome</span>
                      <div className="w-1 h-1 bg-yellow-400"></div>
                    </p>
                    <p className="text-sm font-black text-neutral-900">
                      {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'}
                    </p>
                  </div>
                  
                  {/* Bauhaus User Button */}
                  <div className="relative lightning-hover">
                    {/* Bauhaus frame */}
                    <div className="absolute -inset-1 border-2 border-transparent group-hover:border-accent-600 transition-colors duration-300"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400"></div>
                    
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 border-2 border-neutral-900 relative transition-transform duration-200 hover:scale-105",
                          userButtonPopoverCard: "bg-white border-4 border-neutral-900 shadow-lg",
                          userButtonPopoverActionButton: "text-neutral-900 hover:bg-accent-50 font-bold uppercase tracking-wide text-xs relative transition-all duration-200",
                          userButtonPopoverActionButtonText: "font-black",
                          userButtonPopoverFooter: "hidden",
                        }
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;