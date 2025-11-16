export interface User {
  id: string;
  username: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface AuthState {
  user: null | User;
  access_token: string | null;
  isAuthenticated: boolean;
}
