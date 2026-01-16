const GH_API = "https://api.github.com";

async function loadJSON() {
  const res = await fetch(
    `${GH_API}/repos/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
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

function getNewSentence(data) {
  return data.find(item => item.status === "chưa học");
}

function getOldSentence(data) {
  const learned = data.filter(item => item.status === "đã học");
  if (!learned.length) return null;
  return learned[Math.floor(Math.random() * learned.length)];
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { tool } = req.body;
    const { json, sha } = await loadJSON();

    if (tool === "learn_new") {
      const sentence = getNewSentence(json);
      if (!sentence) {
        return res.json({ error: "Hết bài mới" });
      }

      sentence.status = "đã học";
      await saveJSON(json, sha);

      return res.json(sentence);
    }

    if (tool === "review_old") {
      return res.json(getOldSentence(json));
    }

    return res.status(400).json({ error: "Unknown tool" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
