export enum MemoryType {
  MESSAGE = 'message',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video'
}

export interface Memory {
  id: string;
  type: MemoryType;
  title: string;
  date: string;
  content: string;
  color?: string;
  media?: {
    url: string;
    thumbnail?: string;
  };
}