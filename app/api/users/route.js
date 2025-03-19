import db from "@/lib/db";

export async function POST(request) {
  const { email, password } = await request.json();
  try {
    const [result] = await db.query(
      "Insert into users (email,password) values (?,?)",
      [email, password]
    );
    return Response.json({ success: true, id: result.insertId });
} catch (error) {
    return Response.json({ success: false, error: error.message });
}
}

export async function GET() {
    const [rows] = await db.query("Select * from users");
    
    try{
        
        return Response.json({ success: true, users:rows});
    }catch(error){
        return Response.json({ success: false, error: error.message });
        
    }

}
