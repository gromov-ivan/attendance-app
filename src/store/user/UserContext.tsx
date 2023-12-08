import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '@/supabaseClient';

type UserContextType = {
  session: Session | null;
  userRole: string | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

type UserProviderProps = { children: ReactNode };

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
      if (data?.session?.user?.id) {
        fetchUserRole(data.session.user.id);
      } else {
        setLoading(false);
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        if (session?.user?.id) {
          fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
        }
      });

      return () => subscription?.unsubscribe();
    };
    init();
  }, []);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setUserRole(data.role);
    } else {
      console.error('Error fetching user role:', error);
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ session, userRole, loading }}>{children}</UserContext.Provider>
  );
};
