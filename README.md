# Blasta Empire

Malaysian Golden Mantao and Mantao ButterClam event catering.

Live website: [blastaempire.com](https://blastaempire.com/)

The cream and sage design is the main website. The previous design has been removed.

- Homepage: `/` (existing `#/garden` links still work).
- Event enquiry: `#/enquiry?package=mantao-silver&guests=100`.
- Six event tiers, a guest slider with live RM totals, seven dipping sauces, and a swipeable event gallery.
- Enquiries carry the selected package and guest count into a WhatsApp draft for the visitor to review and send.

## Development

```sh
npm ci
npm run dev
npm run build
npm run lint
```

React, TypeScript and Vite. Current package rates are in `src/data/eventPackages.ts`; sauces are in `src/data/sauces.ts`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml` to build and deploy GitHub Pages. `public/CNAME` preserves the custom domain.
