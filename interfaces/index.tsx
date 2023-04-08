export interface Intent {
  id: number;
  tag: string;
  patterns: Pattern[];
  responses: Response[];
}

export interface Pattern {
  id: number;
  text: string;
}

export interface Response {
  id: number;
  text: string;
}

export interface CustomTableProps {
  data: Intent[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  user_id: number;
}

export interface DataType {
  key: React.Key;
  id: number;
  name: string;
  description: string;
  userId: number;
}
