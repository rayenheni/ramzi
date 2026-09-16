import { useCallback, useEffect, useState } from 'react';
import { verifyAdminPassword, setAdminPassword as setAdminPasswordInDb } from './db';

// ─────────────────────────────────────────────────────────────────
// Authentication
//
// The admin password is stored — hashed (SHA-256) — inside the same
// embedded SQLite database as the site content (table `admin`). This
// is real credential storage in a real database, without requiring
// any external authentication service. The session itself (whether
// the browser tab is currently "logged in") is kept in
// sessionStorage, so it resets when the browser tab is closed.
//
// Default password on first run: "Ajmi2025!" — change it from the
// admin panel (Général → Sécurité) as soon as possible.
// ─────────────────────────────────────────────────────────────────

const SESSION_KEY = 'ajmi-admin-session';

export interface AuthState {
  loading: boolean;
  authed: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    loading: true,
    authed: false,
    error: null,
  });

  useEffect(() => {
    const authed = sessionStorage.getItem(SESSION_KEY) === 'true';
    setState((s) => ({ ...s, loading: false, authed }));
  }, []);

  const signIn = useCallback(async (password: string) => {
    setState((s) => ({ ...s, error: null }));
    try {
      const ok = await verifyAdminPassword(password);
      if (ok) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setState((s) => ({ ...s, authed: true }));
        return true;
      }
      setState((s) => ({ ...s, error: 'Mot de passe incorrect.' }));
      return false;
    } catch (err) {
      console.error('Erreur de vérification du mot de passe :', err);
      setState((s) => ({ ...s, error: 'Une erreur est survenue. Merci de réessayer.' }));
      return false;
    }
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setState((s) => ({ ...s, authed: false }));
  }, []);

  return { ...state, signIn, signOut };
}

export async function changeAdminPassword(newPassword: string): Promise<void> {
  await setAdminPasswordInDb(newPassword);
}
