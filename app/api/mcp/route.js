import { NextResponse } from "next/server";

const GH_API = "https://api.github.com";

/* ====== LOAD JSON FROM GITHUB ====== */
async function loadJSON() {
  const res = await fetch(
    `${GH_API}/repos/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Cannot load JSON from GitHub");
  }

  const data = await res.json();

  return {
    json: JSON.parse(Buffer.from(data.content, "base64").toString("utf-8")),
    sha: data.sha,
  };
}

/* ====== SAVE JSON TO GITHUB ====== */
async function saveJSON(json, sha) {
  const res = await fetch(
    `${GH_API}/repos/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: "update learning status",
        content: Buffer.from(
          JSON.stringify(json, null, 2),
          "utf-8"
        ).toString("base64"),
        sha,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Cannot save JSON to GitHub");
  }
}

/* ====== LEARNING LOGIC ====== */
function getNewSentence(data) {
  return data.find(item => item.status === "chưa học");
}

function getOldSentence(data) {
  const learned = data.filter(item => item.status === "đã học");
  if (learned.length === 0) return null;
  return learned[Math.floor(Math.random() * learned.length)];
}

/* ====== MCP ENTRY ====== */
export async function POST(req) {
  try {
    const body = await req.json();
    const { tool } = body;

    const { json, sha } = await loadJSON();

    // HỌC BÀI MỚI
    if (tool === "learn_new") {
      const sentence = getNewSentence(json);

      if (!sentence) {
        return NextResponse.json({ error: "Hết bài mới" });
      }

      sentence.status = "đã học";
      await saveJSON(json, sha);

      return NextResponse.json(sentence);
    }

    // ÔN BÀI CŨ
    if (tool === "review_old") {
      const sentence = getOldSentence(json);
      return NextResponse.json(sentence);
    }

    return NextResponse.json({ error: "Unknown tool" });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
