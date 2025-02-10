import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {
    setLoading(true);
    setCoverLetter("");
    try {
      const response = await fetch("https://generate-cover-letter.vercel.app/api/generate-cover-letter", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (error) {
      setCoverLetter("Error generating cover letter. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Cover Letter Generator</h1>
      <Textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        className="mb-4"
      />
      <Button onClick={generateCoverLetter} disabled={loading}>
        {loading ? <Loader className="animate-spin" /> : "Generate Cover Letter"}
      </Button>
      {coverLetter && (
        <Card className="mt-4">
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{coverLetter}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
