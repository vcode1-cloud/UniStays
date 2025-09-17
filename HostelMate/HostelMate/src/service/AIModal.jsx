import { GoogleGenAI } from "@google/genai";

// helper: download binary/image in browser
function saveFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function generateGeminiContent(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
  });

  const config = {
    responseModalities: ["TEXT"], // force JSON/text
  };

  const model = "gemini-2.5-flash"; // text model (no image-preview to avoid quota issues)

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${prompt}`,
        },
      ],
    },
  ];

  let attempt = 0;
  while (attempt < 3) {
    try {
      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      const textResponse =
        response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Try parsing as JSON
      try {
        const jsonData = JSON.parse(textResponse);
        return { success: true, data: jsonData };
      } catch (err) {
        console.warn("Response was not valid JSON:", textResponse);
        return { success: false, error: "Invalid JSON", raw: textResponse };
      }
    } catch (error) {
      if (error.message?.includes("429")) {
        attempt++;
        console.warn(
          `Rate limit hit. Retrying in ${attempt * 5} seconds...`
        );
        await new Promise((r) => setTimeout(r, attempt * 5000));
      } else {
        return { success: false, error: error.message };
      }
    }
  }

  return { success: false, error: "Max retries reached" };
}

export const AI_prompt =
  "Generate a list of all hostels present in {location} with hostel image (provide URL only), hostel website URL, hostel location, hostel price, geo coordinates, rating and description in JSON format.";
