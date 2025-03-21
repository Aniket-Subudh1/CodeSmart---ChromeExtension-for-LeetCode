export interface ChatMessage {
    userId: string;
    message: string;
    timestamp: string;
  }
  
  export interface CollabRequest {
    problem: string;
    message: string;
    userId: string;
  }
  
  export interface CollabResponse {
    success: boolean;
  }