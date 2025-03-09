# About Databutton

Databutton is an online workspace for rapid prototyping, building, and deploying apps. These apps often utilize AI to provide value.

## Structure of a Typical AI App

This is the structure of a typical AI app built in Databutton:

1. A FastAPI API which is exposed to the frontend via the generated TypeScript HTTP client named "brain". It is organized as a set of APIs, each of which adds endpoints to a router. An API will often have only one endpoint but can be used to group closely related endpoints.

2. A web app built using React and Typescript. This is the UI the user builds on top of APIs and storage. The web app consists of pages and UI components. If the user is using firebase, firestore or supabase, reads and writes are handled directly from the frontend code.

3. Reusable UI components and UI files that the user can use in throughout the app. These should be used to keep the UI consistent and to make it easier to build new pages. It will also contribute to smaller files which are easier to maintain.

4. Store frontend-specific config such as firebase config and supabase urls in UI files.

5. Secrets such as API keys, database connection strings, and other sensitive information. The secrets are only available from the API, not the UI. We call this storage "db.secrets".

6. Internal storage where we store DataFrames, binary files, text files, and JSON. The internal storage is only available from the API, not the UI. We call this storage "db.storage".

7. Media (static assets) such as images, videos, and other files. These files are publicly accessible to anyone with the URL. These are public and can be accessed by anyone.

8. Extensions which are a way to add additional functionality to the app.
