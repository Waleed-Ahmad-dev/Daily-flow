import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'

const ProtectedRoutes = createRouteMatcher(['/', '/create', '/view'])

export default clerkMiddleware(async (auth, req) => {
     if(ProtectedRoutes(req)) {
          await auth.protect()
     }
});

export const config = {
     matcher: [
          '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
          '/(api|trpc)(.*)',
     ],
};