# Garden preview

Scope: src/pages/GardenPage.tsx and src/pages/garden.css, available at #/garden. The original root page retains its existing design.

The user's supplied café reference governs this alternate page: a cream canvas, deep green text, warm orange actions, curved photography and a compact green package strip. The page runs edge to edge without an outer border or rounded frame, as requested after mobile review. Safari theme and overscroll backgrounds match the pale header while this route is mounted. Use Blasta's existing photographs, branding and shared data. Do not introduce café products or unsupported business claims.

Tokens are scoped under .garden-page: cream #f6f1e5, sage #b6c4ad, green #395b43, ink #263329, orange #ad491f. Fraunces headings and DM Sans body text. The typography detector flags Fraunces as common; this is a non-blocking style warning. Mobile stacks the hero and packages; desktop presents the photo alongside the heading and packages in a comparison strip.

The package section heading sits on the cream canvas above a layered sage card deck. Show one package at a time in RM, with horizontal drag/swipe, arrow buttons and keyboard arrows. Use directional spring transitions and immediate changes for reduced motion. Keep vertical page scrolling available during touch gestures. The enquiry uses the displayed package. Dips are inline, without a flavour popup on this route.

Package cards are compact, with no pictures or expandable details. The six cards cover three tiers each for Golden Mantao and Mantao ButterClam, using src/data/eventPackages.ts. Show the guest range, rate per guest, short inclusions and an explicitly labelled example total. Enquiry totals calculate from actual guest count. Keep the original homepage's legacy package data separate.

Reuse the existing enquiry dialog. Route with a hash so static GitHub Pages hosting supports direct links. Keep original page markup and styles intact.
