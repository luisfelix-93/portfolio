# Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

-   **Responsive Design**: Fully responsive layout that works seamlessly on desktop and mobile devices.
-   **GitHub Integration**:
    -   Fetches and displays featured projects from your GitHub profile.
    -   Dynamically loads your GitHub profile picture.
-   **Resume Download**: Generates and downloads a PDF version of your resume directly from the markdown source.
-   **Interactive UI**: Smooth animations and transitions using Framer Motion and CSS.
-   **Analytics**: Integrated with Vercel Analytics for performance tracking.

## Tech Stack

-   **Frontend Framework**: [React](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```
src/
├── components/     # Reusable UI components (Header, Hero, Projects, etc.)
├── data/          # Static data files (profile information)
├── services/      # API services (GitHub integration)
├── App.tsx        # Main application component
├── main.tsx       # Entry point
└── index.css      # Global styles and Tailwind directives
docs/
└── resume.md      # Resume content in Markdown format
```

## Customization

-   **Profile Data**: Update `src/data/profile.ts` with your personal information.
-   **Resume**: Edit `docs/resume.md` to update your resume content.
-   **GitHub Username**: Update the username in `src/services/github.ts` and components to fetch your data.

## License

MIT
