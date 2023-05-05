import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runBotAction } from "../utils/bot-utils";
import { sendErrorResponse, sendSuccessResponse } from "../utils/server-utils";

const authUser = process.env.IDENTIFIER;
const authPass = process.env.PASSWORD;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const key = request.query.key;

  if (!key || key !== process.env.API_KEY) {
    sendErrorResponse(response, 401, "unauthorized");
    return;
  } else if (!authUser || !authPass) {
    sendErrorResponse(response, 500, "server misconfiguration");
    return;
  }

  try {
    await runBotAction(authUser, authPass);
  } catch (err) {
    sendErrorResponse(response, 500, "server execution error");
    return;
  }

  sendSuccessResponse(response, 200, "bot run completed");
}
