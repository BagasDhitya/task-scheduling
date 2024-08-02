export interface User {
  username: string;
  email?: string;
  password: string;
  profilePhoto?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
}
