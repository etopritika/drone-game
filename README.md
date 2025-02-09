# **Drone Game**

## **Overview**

This project is a **React-based web application** that integrates state management, form handling, animations, and real-time updates through **web sockets**. It provides a dynamic and interactive experience for drone simulation and cave exploration. The cave structure is dynamically rendered based on real-time coordinates received through a web socket connection.

The project uses **Zustand** for state management, **React Hook Form** for form validation, **Radix UI** for accessible UI components, **Tailwind CSS** for styling, and **WebSockets** for real-time data transfer.

---

## **Features**

- **Real-time cave rendering:**  
  The cave structure is generated dynamically based on coordinates received via a web socket connection.
- **Dynamic loading progress:**  
  Custom messages and animations during the loading phase.
- **State management with Zustand.**
- **Form validation** with **React Hook Form** and **Zod**.
- **Interactive UI components** using **Radix UI** (dialog, toast, progress, etc.).
- **Animations and visual effects** powered by **Tailwind CSS**.
- **Routing** with **React Router**.
- **Type-safe validation** using **Zod**.

---

## **Technologies**

### **Core Dependencies:**

- **react:** Core library for building user interfaces.
- **react-dom:** Provides DOM-specific methods for React.

### **UI & Animations:**

- **@radix-ui/react-dialog:** Accessible dialog component for modals.
- **@radix-ui/react-icons:** Icon set for UI elements.
- **@radix-ui/react-label:** Accessible label component.
- **@radix-ui/react-progress:** Progress bar component for visualizing progress.
- **@radix-ui/react-slot:** For composing components with slots.
- **@radix-ui/react-toast:** Toast notifications component.
- **tailwindcss-animate:** CSS animations based on Tailwind CSS.
- **clsx:** Utility for conditionally joining class names.
- **tailwind-merge:** Utility for merging Tailwind CSS classes.

### **State Management:**

- **zustand:** A small but powerful state management library.

### **Form Handling & Validation:**

- **react-hook-form:** A performant library for managing forms in React.
- **@hookform/resolvers:** Zod resolver for validation integration.
- **zod:** A TypeScript-first schema declaration and validation library.

### **Real-time Communication:**

- **WebSocket:** Used to receive real-time coordinates of the cave, enabling dynamic rendering during drone exploration.

---

## **Prerequisites**

Make sure you have **Node.js** and **npm** installed on your machine. You can download Node.js [here](https://nodejs.org/).

---

## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

---

## **Running the Project**

1. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will start the project in development mode. You can now open the project in your browser by navigating to **http://localhost:5173**.

2. **Build for production:**

   ```bash
   npm run build
   ```

3. **Preview the production build:**
   ```bash
   npm run preview
   ```
