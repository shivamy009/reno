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
    
    // Check if school exists
    const school = await query('SELECT * FROM schools WHERE id = ?', [id]);
    if (school.length === 0) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    // Delete school from database
    // Note: Cloudinary images can be managed separately if needed
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
    const data = await request.json();
    
    // Get current school data to check if it exists
    const currentSchool = await query('SELECT * FROM schools WHERE id = ?', [id]);
    if (currentSchool.length === 0) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    const { name, address, city, state, contact, email_id, image } = data;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Use provided image URL or keep existing image
    const imageUrl = image || currentSchool[0].image;

    // Update school in database with Cloudinary image URL
    await query(
      'UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, image = ?, email_id = ? WHERE id = ?',
      [name, address, city, state, contact, imageUrl, email_id, id]
    );
    
    return NextResponse.json({ message: 'School updated successfully' });
  } catch (error) {
    console.error('Error updating school:', error);
    return NextResponse.json({ error: 'Failed to update school' }, { status: 500 });
  }
}
