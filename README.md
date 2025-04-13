# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Configuration

Before running the app, you need to configure the Google Generative AI API key.

1.  **Get an API Key:** Obtain an API key from the Google Cloud Console.
2.  **Set the Environment Variable:** Add the API key to your `.env` file:

    ```
    GOOGLE_GENAI_API_KEY=YOUR_API_KEY
    ```
  Replace `YOUR_API_KEY` with the actual API key you obtained.
  - **Ensure API Usage:** Make sure your frontend/backend code is calling the right API to generate insights from the data.
3.  **Redeploy/Refresh:** Restart the development server (if local) and re-deploy if it's a hosted app. Then refresh the page.
