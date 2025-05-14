import apiBrinquedos from '../api/apiBrinquedos';

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export const login = (email: string, password: string): Promise<AuthResponse> => {
  return new Promise(async (resolve) => {
    try {
      const response = await apiBrinquedos.post('/api/login', { 
        email, 
        password 
      });

      const user = response.data.user;

      if (user && password.length > 0) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', response.data.token);
        resolve({ success: true, user });
      } else {
        resolve({ success: false, error: 'Invalid email or password' });
      }
    } catch (error) {
      resolve({ success: false, error: 'Network error or invalid credentials' });
    }
   
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    resolve();
  });
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};