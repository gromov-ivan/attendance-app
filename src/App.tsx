import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { Session } from '@supabase/supabase-js';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Header from '@/sections/Header';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';

import Pages from './routes/Pages';
import { supabase } from './supabaseClient';
import HotKeys from './sections/HotKeys';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/background.jpeg")'
        }}
        >
          <React.Fragment>
          <CssBaseline />
          <Notifications />
              <SW />
          <BrowserRouter>
        {session && (
          <>
            <HotKeys />
                <Header />
                <Sidebar />
          </>
        )}
            <Pages session={session} />
          </BrowserRouter>
          </React.Fragment>
          </div>
        );
      }

      export default withErrorHandler(App, AppErrorBoundaryFallback);
