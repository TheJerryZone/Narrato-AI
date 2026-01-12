import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

// Generate comic panels for a story
export async function POST(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    // Get the story
    const rows = await sql`
      SELECT id, title, notes, theme
      FROM stories
      WHERE id = ${id} AND user_id = ${session.user.id}
    `;

    if (rows.length === 0) {
      return Response.json({ error: "Story not found" }, { status: 404 });
    }

    const story = rows[0];

    // Create prompts for AI to generate comic panels
    const systemPrompt = `You are a comic book writer. Break down the following story into 4-6 exciting comic panels. Each panel should have:
1. A vivid scene description for illustration
2. Dialogue or narration text (keep it concise and punchy)

Format your response as a JSON array of panels:
[
  {
    "sceneDescription": "Description of what's happening in the panel",
    "text": "Dialogue or narration for this panel"
  }
]

Make it exciting, dynamic, and true to the ${story.theme} comic style!`;

    const userPrompt = `Story Title: ${story.title}\n\nStory Notes: ${story.notes}`;

    // Call ChatGPT integration to generate panel descriptions
    const aiResponse = await fetch(
      `${process.env.APP_URL}/integrations/chat-gpt/conversationgpt4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      },
    );

    if (!aiResponse.ok) {
      throw new Error("Failed to generate comic panels");
    }

    const aiData = await aiResponse.json();
    const panelsText = aiData.choices[0].message.content;

    // Parse the JSON response
    let panels;
    try {
      // Try to extract JSON from the response
      const jsonMatch = panelsText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        panels = JSON.parse(jsonMatch[0]);
      } else {
        panels = JSON.parse(panelsText);
      }
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      throw new Error("Invalid AI response format");
    }

    // Generate images for each panel using DALL-E integration
    const panelsWithImages = await Promise.all(
      panels.map(async (panel, index) => {
        const imagePrompt = `${story.theme} comic book panel: ${panel.sceneDescription}. Style: bold outlines, vibrant colors, dynamic composition, professional comic art.`;

        const imageResponse = await fetch(
          `${process.env.APP_URL}/integrations/dall-e-3/?prompt=${encodeURIComponent(imagePrompt)}`,
          {
            method: "GET",
          },
        );

        if (!imageResponse.ok) {
          console.error(`Failed to generate image for panel ${index + 1}`);
          return {
            ...panel,
            imageUrl: null,
          };
        }

        const imageData = await imageResponse.json();
        return {
          ...panel,
          imageUrl: imageData.data[0],
        };
      }),
    );

    // Update the story with generated panels
    await sql`
      UPDATE stories
      SET panels = ${JSON.stringify(panelsWithImages)}::jsonb
      WHERE id = ${id}
    `;

    return Response.json({ panels: panelsWithImages });
  } catch (error) {
    console.error("Error generating comic:", error);
    return Response.json(
      { error: "Failed to generate comic: " + error.message },
      { status: 500 },
    );
  }
}
