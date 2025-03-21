# CodeSmart Architecture

## Overview

CodeSmart is an AI-powered browser extension for LeetCode, providing real-time hints, code execution feedback, visualizations, and collaboration. It consists of two main parts: a Chrome extension and a Next.js app.

## Components

### 1. Chrome Extension

- **Purpose**: Injects a sidebar into LeetCode problem pages and communicates with the Next.js app.
- **Structure**:
  - `manifest.json`: Defines extension metadata and permissions.
  - `content.js`: Injects the sidebar iframe and extracts problem data.
  - `background.js`: Handles communication with the Next.js app.
  - `domUtils.js`: Utility functions for DOM manipulation.

### 2. Next.js App

- **Purpose**: Serves the sidebar UI and handles backend logic (hints, code execution, collaboration).
- **Structure**:
  - **Frontend**: React components (`Sidebar`, `HintPanel`, `CodeFeedback`, `ChatPanel`, `VizPanel`) for the UI.
  - **Backend**: API routes (`/api/hints`, `/api/execute`, `/api/collab`) for business logic.
  - **Services**:
    - Gemini API: Generates hints.
    - Judge0: Executes code.
    - Redis: Caches hints.
    - Kafka: Logs collaboration events.
    - Socket.io: Enables real-time chat.

## Data Flow

1. **User Action**: User navigates to a LeetCode problem page.
2. **Extension**: `content.js` injects the sidebar iframe pointing to the Next.js app and sends the problem title to `background.js`.
3. **Background Script**: Forwards the problem data to the Next.js app via `/api/collab`.
4. **Next.js App**:
   - Renders the sidebar UI.
   - Fetches hints from Gemini API (cached in Redis) via `/api/hints`.
   - Executes code using Judge0 via `/api/execute`.
   - Manages collaboration (chat, events) via `/api/collab`, using Kafka for logging and Socket.io for real-time updates.
5. **Visualization**: D3.js renders problem-specific visualizations in the sidebar.

## Deployment

- **Development**: Run `npm run dev` in `app/` and load the `extension/` folder in Chrome.
- **Production**: Build the Next.js app (`npm run build`), deploy to a server, and package the extension as a `.crx` file.
