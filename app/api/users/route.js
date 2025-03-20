import db from "@/lib/db";
import bcrypt from "bcryptjs"

export async function POST(request) {
  const { email, password } = await request.json();
  try {
    const hashedPassword = await bcrypt.hash(password,10)
    const [result] = await db.query(
      "Insert into users (email,password) values (?,?)",
      [email, hashedPassword]
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
