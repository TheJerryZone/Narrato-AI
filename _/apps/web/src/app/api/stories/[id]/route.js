import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

// Get a single story
export async function GET(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const rows = await sql`
      SELECT id, title, notes, theme, panels, created_at
      FROM stories
      WHERE id = ${id} AND user_id = ${session.user.id}
    `;

    if (rows.length === 0) {
      return Response.json({ error: "Story not found" }, { status: 404 });
    }

    return Response.json({ story: rows[0] });
  } catch (error) {
    console.error("Error fetching story:", error);
    return Response.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}

// Delete a story
export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    await sql`
      DELETE FROM stories
      WHERE id = ${id} AND user_id = ${session.user.id}
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting story:", error);
    return Response.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
