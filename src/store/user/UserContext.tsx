import React, { createContext, useContext, useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '@/supabaseClient';

type UserContextType = {
  session: Session | null;
  userRole: string | null;
  fullName: string | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

type UserProviderProps = { children: React.ReactNode };

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
      if (data?.session?.user?.id) {
        fetchUserProfile(data.session.user.id);
      } else {
        setLoading(false);
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        if (session?.user?.id) {
          fetchUserProfile(session.user.id);
        } else {
          setUserRole(null);
        }
      });

      return () => subscription?.unsubscribe();
    };
    init();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setUserRole(data.role);
      setFullName(data.full_name);
    } else {
      console.error('Error fetching user profile:', error);
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ session, userRole, fullName, loading }}>
      {children}
    </UserContext.Provider>
  );
};
