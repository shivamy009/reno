import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db-es';
import fs from 'fs';
import path from 'path';

// GET - Get a single school by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const schools = await query('SELECT * FROM schools WHERE id = ?', [id]);
    
    if (schools.length === 0) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }
    
    return NextResponse.json(schools[0]);
  } catch (error) {
    console.error('Error fetching school:', error);
    return NextResponse.json({ error: 'Failed to fetch school' }, { status: 500 });
  }
}

// DELETE - Delete a school by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
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

// PATCH - Update a school by ID
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    
    // Get current school data to check for existing image
    const currentSchool = await query('SELECT * FROM schools WHERE id = ?', [id]);
    if (currentSchool.length === 0) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

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
