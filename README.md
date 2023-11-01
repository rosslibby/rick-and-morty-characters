# Rick and Morty Characters Project

This is an application built on the [Rick and Morty API](https://rickandmortyapi.com/). Check out the cast by browsing through each episode.

## Overview

- I built this application using __NextJS__ and __TypeScript__
- I _did not_ install any packages that were not bundled in `create-next-app`
- I utilized [NextJS API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) to handle API requests
- I implemented [Context API](https://react.dev/reference/react/useContext) for state management
- I made use of several [React Hooks](https://react.dev/reference/react/hooks) including `useCallback`, `useContext`, `useEffect` and `useState`
- I built custom hooks for functionality, including [`useInfiniteScroll`](https://github.com/rosslibby/rick-and-morty-characters/blob/develop/src/components/infinite-scroll/hooks.tsx), [`useApi`](https://github.com/rosslibby/rick-and-morty-characters/blob/develop/src/app/api/hooks/api.tsx) and [`useNavigation`](https://github.com/rosslibby/rick-and-morty-characters/blob/develop/src/app/api/hooks/navigation.tsx)
- I implemented [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) for locally scoped styling classes

## Highlights

- Episodes navigation uses infinite-scroll to lazy-load each page of episodes
- Character API requests are made only for characters that are not currently displayed
- Loading indicator displays whenever content is loading
- Page title dynamically updates to reflect currently selected episode

## How to run

1. Clone this repository
2. Navigate to project directory
3. Install dependencies (`yarn` / `npm i`)
4. Run the project (`yarn dev` / `npm run dev`)
