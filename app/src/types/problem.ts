export interface HintRequest {
    problem: string;
  }
  
  export interface HintResponse {
    hint: string;
    cached?: boolean;
  }
  
  export interface ExecuteRequest {
    code: string;
    language: string;
  }
  
  export interface ExecuteResponse {
    output?: string;
    error?: string;
    status: string;
  }