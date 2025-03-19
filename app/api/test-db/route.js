import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT NOW() as time");
    return Response.json({ success: true, time: rows[0].time });

  } catch (error) {
    return Response.json({succes:false, error:error.message})
  }
}
