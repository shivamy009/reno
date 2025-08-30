import { NextResponse } from 'next/server';
import { query } from '../../../lib/db-es';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    const schools = await query('SELECT * FROM schools ORDER BY id DESC');
    return NextResponse.json(schools);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    let imagePath = null;
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const fileName = `${Date.now()}-${imageFile.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'schoolImages', fileName);
      
      await fs.promises.writeFile(uploadPath, buffer);
      imagePath = fileName;
    }

    await query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    );
    
    return NextResponse.json({ message: 'School added successfully' });
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 });
  }
}

// To create the table, you can run this once
export async function PUT() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        contact VARCHAR(20),
        image TEXT,
        email_id TEXT
      )
    `);
    return NextResponse.json({ message: 'Table created' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create table' }, { status: 500 });
  }
}
