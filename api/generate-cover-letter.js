export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { jobDescription } = req.body;
  if (!jobDescription) {
    return res.status(400).json({ error: "Job description is required." });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates professional cover letters." },
          { role: "user", content: `Generate a cover letter for the following job description:\n\n${jobDescription}` }
        ],
        temperature: 0.7
      })
    });

    const data = await openaiResponse.json();
    return res.status(200).json({ coverLetter: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate cover letter." });
  }
}

