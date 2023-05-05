import { BskyAgent, RichText } from "@atproto/api";
import { getLunarData } from "./data-utils";

export async function runBotAction(authUser: string, authPass: string) {
  const agent = new BskyAgent({ service: "https://bsky.social" });

  await agent.login({
    identifier: authUser,
    password: authPass,
  });

  const { date, phase, illumination, moonAge } = await getLunarData();

  const postText = `${date}\n\nPhase: ${phase}\nIllumination: ${illumination}\nAge: ${moonAge}`;
  const rt = new RichText({ text: postText });
  const postRecord = {
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  };
  console.log(await agent.post(postRecord));
}
