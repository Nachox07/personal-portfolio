// Colour themes the Shuffle button cycles through. Each has a matching
// html[data-accent] block in app/globals.css, and tests/interactions.spec.ts
// checks every one reaches 4.5:1 contrast on both theme backgrounds.
export const accents = ["teal", "amber", "cobalt", "rose", "violet"] as const;

export type Accent = (typeof accents)[number];

export const ACCENT_KEY = "accent";
