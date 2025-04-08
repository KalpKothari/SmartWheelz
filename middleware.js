import { clerkMiddleware, createRouteMatcher,  } from "@clerk/nextjs/server";
import arcjet, {detectBot, shield, createMiddleware } from "@arcjet/next";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/admin(.*)",
    "/saved-cars(.*)",
    "/reservations(.*)",
]);

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        // Shield Protection for content and security
        shield({
            mode:"LIVE",
        }),
        detectBot({
            mode:"LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"], //Google,Bing,etc
        }),
    ],
});

const clerk =  clerkMiddleware(async (auth,req)=>{
    const {userId} = await auth();

    if (!userId && isProtectedRoute(req)) {
        const {redirectToSignIn} = await auth();
        return redirectToSignIn();
    }

    return NextResponse.next();
});
 export default createMiddleware(aj, clerk);
export const config = { matcher: ["/(.*)"] };
