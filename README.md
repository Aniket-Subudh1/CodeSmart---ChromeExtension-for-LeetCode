# CodeSmart

CodeSmart is an AI-powered Chrome extension designed to enhance your LeetCode problem-solving experience. It offers real-time hints, instant code feedback, visualizations for better understanding, and collaboration features, making your journey smoother and more insightful.

## Features

- **Real-Time Hints**: Receive AI-generated hints powered by the Gemini API, with caching for quick responses using Redis.
- **Code Execution Feedback**: Test your solutions in real-time against sample test cases using the Judge0 API.
- **Visualizations**: Leverage D3.js for interactive visualizations, helping you grasp data structures like arrays and trees with ease.
- **Collaboration**: Connect with peers solving the same problem, chat via an integrated system, with all interactions logged using Kafka and broadcasted via Socket.io.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, D3.js
- **Backend**: Next.js API routes, Redis, Kafka, Socket.io
- **Chrome Extension**: Built using the Chrome Extension API
- **Services**: Gemini API, Judge0 API for code execution

## Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- Docker (for running Redis and Kafka containers)
- Chrome browser (latest version)

## Installation

Follow these steps to set up CodeSmart:

1. **Clone the Repository**  
   Open your terminal and clone the CodeSmart repository:
   ```bash
   git clone https://github.com/Aniket-Subudh1/CodeSmart---ChromeExtension-for-LeetCode.git
   cd CodeSmart
   ```

2. **Install Dependencies**  
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env.local` file in the root directory and add the required environment variables:
   ```bash
   GEMINI_API_KEY=<your-gemini-api-key>
   JUDGE0_API_URL=<judge0-api-url>
   REDIS_URL=<your-redis-url>
   KAFKA_BROKER_URL=<your-kafka-broker-url>
   ```

4. **Start Docker Services**  
   Use Docker to set up Redis and Kafka services:
   ```bash
   docker-compose up
   ```

5. **Run the Application**  
   Start the Next.js application in development mode:
   ```bash
   npm run dev
   ```

6. **Load the Extension in Chrome**  
   - Open Chrome and go to `chrome://extensions/`.
   - Enable Developer Mode.
   - Click on "Load unpacked" and select the `extension` directory from the repository.

7. **You're all set!**  
   CodeSmart is now up and running. Open LeetCode and start solving problems with real-time hints and collaboration features.
