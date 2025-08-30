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
    const data = await request.json();
    
    const { name, address, city, state, contact, email_id, image } = data;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Insert school data with Cloudinary image URL
    const result = await query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image || null, email_id]
    );
    
    return NextResponse.json({ 
      message: 'School added successfully',
      id: result.insertId 
    }, { status: 201 });
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

// UPDATE - Update a school by ID
export async function PATCH(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    // Get current school data to check for existing image
    const currentSchool = await query('SELECT * FROM schools WHERE id = ?', [id]);
    if (currentSchool.length === 0) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    let imagePath = currentSchool[0].image; // Keep existing image by default
    
    // If new image is provided, handle image upload
    if (imageFile && imageFile.size > 0) {
      // Delete old image if it exists
      if (currentSchool[0].image) {
        const oldImagePath = path.join(process.cwd(), 'public', 'schoolImages', currentSchool[0].image);
        try {
          await fs.promises.unlink(oldImagePath);
        } catch (error) {
          console.log('Old image not found, continuing...');
        }
      }

      // Save new image
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const fileName = `${Date.now()}-${imageFile.name}`;
      const uploadPath = path.join(process.cwd(), 'public', 'schoolImages', fileName);
      
      await fs.promises.writeFile(uploadPath, buffer);
      imagePath = fileName;
    }

    await query(
      'UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?',
      [name, address, city, state, contact, imagePath, email_id, id]
    );
    
    return NextResponse.json({ message: 'School updated successfully' });
  } catch (error) {
    console.error('Error updating school:', error);
    return NextResponse.json({ error: 'Failed to update school' }, { status: 500 });
  }
}

// DELETE - Delete a school by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    // Get school data to delete associated image
    const school = await query('SELECT * FROM schools WHERE id = ?', [id]);
    if (school.length === 0) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    // Delete image file if it exists
    if (school[0].image) {
      const imagePath = path.join(process.cwd(), 'public', 'schoolImages', school[0].image);
      try {
        await fs.promises.unlink(imagePath);
      } catch (error) {
        console.log('Image file not found, continuing with database deletion...');
      }
    }

    // Delete school from database
    await query('DELETE FROM schools WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Error deleting school:', error);
    return NextResponse.json({ error: 'Failed to delete school' }, { status: 500 });
  }
}
