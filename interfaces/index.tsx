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

export interface NPC {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  voice: string;
  style: string;
  intents: Intent[];
}

export interface DataTypeProject {
  key: React.Key;
  id: number;
  name: string;
  description: string;
  userId: number;
}

export interface DataTypeNPC {
  key: React.Key;
  id: number;
  name: string;
  avatar: string;
  bio: string;
  voice: string;
  style: string;
}

export interface NPCCardProps {
  npc: NPC;
}

export interface NPCDetailsDrawerProps {
  open: boolean;
  onClose: any;
  npc: NPC;
}
