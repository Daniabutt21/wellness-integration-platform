# Wellness Platform Frontend

A modern, beautiful React frontend for managing clients and appointments in a wellness clinic. Connects to the backend API (default: `http://localhost:3000/api/v1`).

---

## Features
- **Modern UI:** Material-UI (MUI), responsive, dark mode toggle
- **Clients:** List, search, avatars, details
- **Appointments:** List, create, edit, delete, show client info, notes
- **Feedback:** Snackbar notifications, confirmation dialogs
- **Attractive Design:** Gradients, cards, avatars, polished AppBar
- **Easy Setup:** Works out of the box with the backend

---

## Setup & Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set API base URL (optional):**
   - Create `.env` in the frontend root:
     ```
     REACT_APP_API_BASE=http://localhost:3000/api/v1
     ```
3. **Start the frontend:**
   ```sh
   npm start
   ```
   - The app will open at `http://localhost:3001` (or another port if 3000 is in use).

---

## Demo
- **Switch between Clients and Appointments tabs**
- **Dark mode toggle** in the AppBar
- **Clients:** List, search, avatars, details
- **Appointments:** List, create (modal), edit (modal), delete (confirmation)
- **Error handling:** Snackbar feedback for all actions

---

## Code Structure & Best Practices
- **Component-based:**
  - `App.js` – Main layout, tabs, dark mode, theme
  - `ClientsPage.js` – Client list, search, avatars, cards
  - `AppointmentsPage.js` – Appointment list, add/edit/delete, modal, cards
  - `AppointmentForm.js` – Form for scheduling/editing
  - `api.js` – All backend API calls (axios, robust headers)
- **Styling:**
  - MUI theme with custom colors, gradients, dark mode
- **State Management:**
  - React hooks (`useState`, `useEffect`)
- **Feedback:**
  - Snackbar notifications for actions and errors
- **API Best Practices:**
  - Always sends `Accept: application/json`
  - Handles errors gracefully

---

## How to Extend
- Add new API calls in `api.js`, new components/pages, and update the UI as needed
- Use MUI components for more features (e.g., pagination, filters, avatars)

---

## Time Spent
**3 hours**

---

## Author & Contact
- For any issues, contact the developer or see the backend README for more details.
