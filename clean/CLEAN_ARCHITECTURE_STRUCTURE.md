# CLEAN Architecture Folder Structure Reference

This document describes the recommended folder structure for a scalable CLEAN architecture, both for backend (Node.js) and frontend (React or similar), using a feature-first approach.

---

## Backend Structure (Node.js Example)

```
clean/
  features/
    <featureName>/
      delivery/
        controllers/    # Handles HTTP requests, calls usecases, returns responses
        routes/         # Defines HTTP endpoints and maps them to controllers
        middlewares/    # (Optional) Feature-specific middleware
      domain/
        entities/       # Pure business objects (no framework/DB code)
        repositories/   # Repository interfaces (contracts for data access)
        usecases/       # Application-specific business logic
      data/
        models/         # DB schemas/models (e.g., Mongoose, Sequelize)
        datasources/    # DB connections, API clients, or external services
        repositories/   # Implements domain repository interfaces using models/datasources
  shared/               # Utilities, constants, shared types across features
  config/               # App and DB configuration files
  app.js                # Express app setup
  server.js             # Server entry point
```

### **Subfolder Functions**

- **delivery/**  
  - `controllers/`: Receive HTTP requests, validate input, call usecases, return responses.
  - `routes/`: Define and organize API endpoints.
  - `middlewares/`: (Optional) Feature-specific middleware for request processing.

- **domain/**  
  - `entities/`: Define business objects/entities, pure JS/TS classes or interfaces.
  - `repositories/`: Define repository interfaces (contracts) for data access.
  - `usecases/`: Implement business logic and application rules.

- **data/**  
  - `models/`: Define database schemas/models (e.g., Mongoose, Sequelize).
  - `datasources/`: Handle DB connections, API clients, or other external data sources.
  - `repositories/`: Implement domain repository interfaces using models/datasources.

- **shared/**  
  - Utilities, constants, and types shared across features.

- **config/**  
  - Application and database configuration files.

---

## Frontend Structure (React Example)

```
src/
  features/
    <featureName>/
      presentation/
        components/     # UI widgets and reusable components
        screens/        # Pages/screens for routing
        providers/      # State management (context, hooks, etc.)
      domain/
        entities/       # Types/interfaces for business objects
        repositories/   # Repository interfaces (contracts for data access)
        usecases/       # Business logic and interactors
      data/
        repositories/   # Implementations of domain repository interfaces (API, local storage)
        datasources/    # API clients, fetch logic, or storage handlers
  shared/               # Shared components, hooks, utilities, types
  routes/               # App-level routing
  App.tsx               # Main app component
  main.tsx              # Entry point
```

### **Subfolder Functions**

- **presentation/**  
  - `components/`: Reusable UI widgets.
  - `screens/`: Pages/screens for navigation/routing.
  - `providers/`: State management (context, hooks, etc.).

- **domain/**  
  - `entities/`: Business object types/interfaces.
  - `repositories/`: Repository interfaces (contracts).
  - `usecases/`: Business logic and interactors.

- **data/**  
  - `repositories/`: Implement domain repository interfaces (API, local storage, etc.).
  - `datasources/`: API clients, fetch logic, or storage handlers.

- **shared/**  
  - Shared UI components, hooks, utilities, and types.

- **routes/**  
  - Application-level routing.

---

## Key Principles

- **Separation of concerns:** Each layer/folder has a single responsibility.
- **Feature-first:** Each feature is self-contained and scalable.
- **Testability:** Business logic is decoupled from frameworks and data sources.
- **Replaceability:** Swap data sources or UI frameworks with minimal changes.

---

**Tip:**  
For strict contracts and better maintainability, use **TypeScript** for both frontend and backend.

---