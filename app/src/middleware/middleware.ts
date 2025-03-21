import { NextRequest, NextResponse } from "next/server";
import { logger } from "../lib/helpers/logger";

export function middleware(req: NextRequest) {
  logger.info("Request received", { url: req.url, method: req.method });
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};