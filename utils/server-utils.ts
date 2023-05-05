import type { VercelResponse } from "@vercel/node";

export function sendErrorResponse(
  response: VercelResponse,
  statusCode: number,
  msg: string
) {
  response.status(statusCode);
  response.json({ status: "error", msg });
}

export function sendSuccessResponse(
  response: VercelResponse,
  statusCode: number,
  msg: string
) {
  response.status(statusCode);
  response.json({ status: "success", msg });
}
