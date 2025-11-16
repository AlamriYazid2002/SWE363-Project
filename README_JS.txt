
# KFUPM Events Hub (Converted to JavaScript React)

This folder is an automated conversion from TypeScript React to **JavaScript React**.

## How to run

1) Install deps:
   npm install

2) Start dev server:
   npm run dev

If you are creating a fresh project, you can also scaffold a clean Vite React (JS) project and copy `src/` and config files here:

   npm create vite@latest my-app -- --template react
   cd my-app
   npm i
   # copy /src and vite.config.js over your project

## Notes

- All `*.tsx` files were converted to `*.jsx` and `*.ts` to `*.js` with TypeScript annotations removed.
- `vite.config.ts` was converted to `vite.config.js` with an alias `@ -> ./src`.
- If you see import paths like "@/components/...", they will work via the alias in `vite.config.js`.
- If any compile/runtime errors appear related to types or casts, they likely were TS-only and have been stripped.

Converted automatically on this system.
