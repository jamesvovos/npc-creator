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
