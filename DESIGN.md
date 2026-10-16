# Blasta website

The cream and sage design is the production homepage at /. The former design and its components have been removed. Existing #/garden links still resolve to this homepage; enquiries use #/enquiry, with the former #/garden/enquiry route supported for existing links.

The user's supplied café reference governs this alternate page: a cream canvas, deep green text, warm orange actions, curved photography and a compact green package strip. The page runs edge to edge without an outer border or rounded frame, as requested after mobile review. Safari theme and overscroll backgrounds match the pale header while this route is mounted. Use Blasta's existing photographs, branding and shared data. Do not introduce café products or unsupported business claims.

Tokens are scoped under .garden-page: cream #f6f1e5, sage #b6c4ad, green #395b43, ink #263329, orange #ad491f. Fraunces headings and DM Sans body text. The typography detector flags Fraunces as common; this is a non-blocking style warning. Mobile stacks the hero and packages; desktop presents the photo alongside the heading and packages in a comparison strip.

The package section heading sits above one fixed sage tile. Swipe only the package name, or use adjacent arrow buttons and keyboard arrows. The tile stays still while its details change. A native guest slider respects the active tier's minimum and maximum and updates the RM total immediately. Remember guest counts per package while mounted, and carry the selected package and count to the enquiry URL. Dips are inline, without a flavour popup on this route.

The fixed package tile covers three tiers each for Golden Mantao and Mantao ButterClam, using src/data/eventPackages.ts. Show the guest range, rate per guest, short inclusions, guest slider and live total. Enquiry totals calculate from actual guest count. Seven sauces are defined in src/data/sauces.ts.

The enquiry lives at #/enquiry?package=<id>&guests=<count>, with cream fields, sage summary and orange WhatsApp action. Offer all six menus in a compact selector. Show required event/contact fields, optional venue/notes, live totals and native validation. It opens a WhatsApp draft for the visitor to review and send. Hash routing supports static GitHub Pages direct links.
