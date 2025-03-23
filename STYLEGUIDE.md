# Style Guide

## Overview

- **Goal**: Balance a fun, kawaii aesthetic for the landing page with a sleek, professional interface for the app (Dashboard, Messages, Business Profile).
- **Approach**: Distinct styles in `styles.js` for landing (playful) vs. app (minimal).

## Design Tokens

### Colors

- **Landing (Fun)**:
  - Primary: `purple-500` (#8B5CF6) - Buttons, headers.
  - Accent: `pink-100` (#FCE7F3) - Backgrounds, cards.
  - Text: `gray-700` (#374151) - Readable contrast.
- **App (Professional)**:
  - Primary: `gray-100` (#F3F4F6) - Section backgrounds.
  - Accent: `gray-50` (#F9FAFB) - Page background.
  - Text: `gray-700` (#374151) - Headings, body.
  - Icon: `gray-600` (#4B5563) - Buttons, hoverable.

### Typography

- **Landing**: Bold, larger (e.g., `text-4xl`, `font-bold`).
- **App**: Medium, smaller (e.g., `text-md`, `font-medium`; labels `text-xs`).

### Sizes

- **Buttons**:
  - Landing: `p-2` (medium, playful).
  - App (Text): `px-2 py-1` (small, subtle), `text-sm`.
  - App (Icon): `p-1`, icon size `14px`.
- **Spacing**:
  - Landing: `p-6`, `mb-6` (open, airy).
  - App: `p-3`, `mb-2` (tight, functional); sections `p-2`.

## Rules

1. **Landing Page**: Use `button`, `hero`, `featureCard` for vibrant, playful design.
2. **App Interface**: Use `iconButtonSubtle` for actions, `wideContainer` with `bg-gray-50`, sections with `bg-gray-100`, minimal effects.
3. **Consistency**: Define styles in `styles.js`, use icons (e.g., `react-icons`) for intuitive controls.

## Components

- **Button**:
  - Fun: `button` (purple, rounded-full, hover scale).
  - Subtle (Text): `buttonSubtle` (gray, rounded-md, hover color).
  - Subtle (Icon): `iconButtonSubtle` (gray, small padding, hover bg).
- **Container**:
  - Fun: Wider padding, shadows (e.g., `p-6`, `shadow-md`).
  - App: Tight padding, subtle bg (e.g., `p-3`, `bg-gray-50`).
