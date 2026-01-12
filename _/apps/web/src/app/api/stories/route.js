import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

// Create a new story
export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, notes, theme } = await request.json();

    if (!title || !notes) {
      return Response.json(
        { error: "Title and notes are required" },
        { status: 400 },
      );
    }

    const rows = await sql`
      INSERT INTO stories (user_id, title, notes, theme, panels)
      VALUES (${session.user.id}, ${title}, ${notes}, ${theme || "classic"}, '[]'::jsonb)
      RETURNING id
    `;

    return Response.json({ id: rows[0].id });
  } catch (error) {
    console.error("Error creating story:", error);
    return Response.json({ error: "Failed to create story" }, { status: 500 });
  }
}

// Get all stories for the current user
export async function GET(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stories = await sql`
      SELECT id, title, notes, theme, panels, created_at
      FROM stories
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;

    return Response.json({ stories });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return Response.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
