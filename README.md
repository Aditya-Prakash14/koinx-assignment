# KoinX - Tax Loss Harvesting Tool

A fully responsive, premium React application built for the KoinX Frontend Intern Assignment. This tool helps Indian crypto investors comply with Section 115BBH (flat 30% tax on VDA gains) by identifying loss-making assets and simulating how selling them reduces overall tax liability.

## Features

- **Tax Loss Harvesting Simulation**: Interactive "Pre-Harvesting" and "After Harvesting" breakdown of Short-term and Long-term gains.
- **Dynamic Holdings Table**: View capital gains across individual assets with interactive checkboxes to simulate selling.
- **Premium Design System**: "Glass Clubhouse" aesthetic featuring glassmorphism, fluid micro-animations, custom SVG icons, and smooth transitions.
- **Dark/Light Mode**: Full theme-awareness with a beautiful toggle.
- **Standalone Architecture**: Emulated API latency and business logic within the React application, ensuring immediate deployability without a separate backend.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd koinx-tlh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Assumptions & API Handling

As per the assignment instructions, the required dummy JSON data and business logic are fully encapsulated within the React application. 
- API calls to the mock data have simulated network latency (using `setTimeout`) to authentically represent loading states and skeleton UI components.
- The `After Harvesting` tax liabilities dynamically update based on the selection logic:
  - Selected asset gains `> 0` are added to generic profits.
  - Selected asset gains `< 0` are added to generic losses.
- All calculations assume the standard 30% flat tax rate on Virtual Digital Assets.

## Tech Stack
- **Framework:** React 18 / Vite
- **Styling:** Vanilla CSS + Component-level inline theming (Premium aesthetic)
- **Icons:** Custom SVG inline elements
- **Deployment:** Ready for Vercel/Netlify (Static export via `npm run build`)
