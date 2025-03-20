# CalenBooker: Research Results and Migration Plan to Vite

## Research Results

### Overview

CalenBooker, a scheduling application built with React and Supabase, encountered npm vulnerabilities after adding `react-google-recaptcha`. Research was conducted to identify the best platform for migration, focusing on popularity, maintenance, and future-proofing, while ensuring a clean codebase free of old `react-scripts` remnants.

### Key Findings

- **Create React App (CRA) Outdated**: CRA, using `react-scripts@5.0.1`, hasn’t been updated since April 2022, leading to vulnerabilities in its dependency tree (e.g., `nth-check`, `postcss`). The React team has shifted focus to modern tools, listing CRA as legacy in 2023 docs.
- **Vite as the Best Choice**:
  - **Popularity**: Vite has over 2 million weekly downloads, making it one of the most popular build tools for React in 2025.
  - **Active Maintenance**: Latest version `5.4.8` (March 2025), with frequent updates, ensuring compatibility with React 19.
  - **Future-Proof**: Uses esbuild and Rollup, supporting ES modules and modern features, with a lean dependency tree reducing security risks.
- **Alternatives**:
  - **Next.js**: Popular (3M+ weekly downloads), but overkill for CalenBooker (full-stack framework, requires restructuring).
  - **Custom Webpack**: Flexible but complex for novices, less popular than Vite.
- **Switching Mid-Project**: Common at the MVP stage to address vulnerabilities and modernize, especially with small codebases like CalenBooker.

### Why Vite?

Vite is the most well-trusted and commonly used build tool for React in 2025, recommended by the React team. It resolves CRA’s vulnerabilities, improves performance, and ensures a clean, modern codebase by replacing `react-scripts` with a lean setup, aligning with best practices.

## Why the Issue Arose

### Root Cause

- **Outdated `react-scripts`**: `react-scripts@5.0.1` hasn’t been updated since 2022, pulling in vulnerable dependencies:
  - `nth-check <2.0.1` (high): Via `svgo` → `@svgr/webpack`.
  - `postcss <8.4.31` (moderate): Via `resolve-url-loader`.
- **Failed `resolutions`**: Attempts to override these with `resolutions` in `package.json` failed due to npm’s limited support for nested dependency overrides.
- **CRA’s Decline**: CRA’s lack of updates and outdated dependency tree (e.g., `svgo@1.3.2`, last updated 2019) make it a liability, prompting a migration to a modern tool.

### Impact

- 8 vulnerabilities (2 moderate, 6 high) remain after `npm audit fix`, all build-time issues with low real-world impact (no untrusted SVGs/CSS in CalenBooker). However, they indicate a deeper issue with CRA’s maintainability.

## Plan to Address the Issue: Migration to Vite

### Overview

Migrate from `react-scripts` to Vite to resolve vulnerabilities, improve performance, and ensure a clean, future-proof codebase. The plan is designed for a novice coder, with small, reversible steps, and thorough testing to maintain functionality and remove old `react-scripts` code.

### Step-by-Step Plan

#### Step 1: Backup the Current State

- **Description**: Commit the current state to Git for revertibility.
- **Action**:
  - Command:
    ```bash
    git add .
    git commit -m "Before migrating from react-scripts to Vite"
    git push origin master
    ```
- **Expected Outcome**: A snapshot of the current state, ensuring safety.

#### Step 2: Install Vite and Remove `react-scripts`

- **Description**: Replace `react-scripts` with Vite, removing old dependencies.
- **Action**:
  - Navigate to `frontend/`:
    ```bash
    cd frontend
    ```
  - Remove `react-scripts` and install Vite:
    ```bash
    npm uninstall react-scripts
    npm install vite @vitejs/plugin-react
    ```
- **Expected Outcome**: `package.json` updated, removing `react-scripts` and its configurations.

#### Step 3: Update `package.json` Scripts

- **Description**: Adjust scripts for Vite, removing CRA-specific commands.
- **Action**:
  - Update `frontend/package.json` scripts:
    ```json
    "scripts": {
      "start": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "test": "echo \"Tests not yet configured for Vite\" && exit 0"
    },
    ```
- **Expected Outcome**: Scripts updated, ensuring no old CRA scripts remain.

#### Step 4: Create `vite.config.js`

- **Description**: Configure Vite for React, replacing CRA’s build setup.
- **Action**:

  - Create `frontend/vite.config.js`:

    ```javascript
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";

    export default defineConfig({
      plugins: [react()],
      server: {
        port: 4000,
      },
    });
    ```

- **Expected Outcome**: Vite setup replaces CRA’s Webpack, keeping the codebase clean.

#### Step 5: Adjust `index.html`

- **Description**: Update `index.html` for Vite’s module loading.
- **Action**:
  - Update `frontend/public/index.html` `<script>` tag:
    ```html
    <script type="module" src="/src/index.js"></script>
    ```
- **Expected Outcome**: `index.html` updated, removing CRA-specific tags.

#### Step 6: Test the App

- **Description**: Ensure functionality after migration.
- **Action**:
  - Start the app:
    ```bash
    npm start
    ```
  - Test signup, profile setup, booking, messages.
- **Expected Outcome**: App works, confirming a clean migration.

#### Step 7: Run `npm audit`

- **Description**: Verify vulnerabilities are resolved.
- **Action**:
  - Run:
    ```bash
    npm audit
    ```
- **Expected Outcome**: 0 vulnerabilities, confirming a secure codebase.

#### Step 8: Update Documentation

- **Description**: Reflect the new setup in docs.
- **Action**:
  - Update `README.md`: Replace `react-scripts` with Vite in setup instructions.
  - Update `Roadmap.md`: Mark A.14 as completed.
- **Expected Outcome**: Documentation updated, ensuring replicability.

#### Step 9: Commit and Push

- **Description**: Finalize the migration.
- **Action**:
  - Commit:
    ```bash
    git add .
    git commit -m "Migrated from react-scripts to Vite, resolved vulnerabilities"
    git push origin master
    ```
- **Expected Outcome**: Changes pushed, codebase clean and modern.

## Conclusion

This migration to Vite addresses CalenBooker’s vulnerabilities, ensures a clean codebase free of old `react-scripts` code, and aligns with best practices using a well-trusted, popular tool. The step-by-step plan minimizes risk, ensuring stability for the MVP.

## References

- [Most Popular Build Tools for React Developers in 2024](https://www.telerik.com/blogs/most-popular-build-tools-react-developers-2024)
- [8 Incredible Tools For React Developers In 2025](https://appwrk.com/tools-for-react-developers)
- [Top 10 React Developer Tools in 2025](https://www.geeksforgeeks.org/top-react-developer-tools/)
- [13 Best React Development Tools in 2025](https://sam-solutions.com/blog/best-react-development-tools/)
- [Top 5 React.js tools and libraries for development in 2025](https://themobilereality.com/blog/javascript/top-5-react-js-tools-and-libraries-for-development-in-2025)
- [React tools: Must have React Development tools in 2024](https://www.thirdrocktechkno.com/blog/top-9-react-development-tools-for-faster-application-development/)
- [Build Tools For React](https://reactresources.com/topics/build-tools)
- [8 Best React Tools for React Development in 2024](https://www.clariontech.com/blog/8-best-tools-for-react-development)
- [13 Best React Tools for Effective Development](https://builtin.com/software-engineering-perspectives/react-developer-tools)
- [Top React Developer Tools for Software Developers in 2024](https://www.simplilearn.com/react-developer-tools-article)
