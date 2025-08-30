const { query } = require('./lib/db.js');

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // First create the table
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
    console.log('✅ Table created/verified successfully');
    
    // Test a simple query
    const result = await query('SELECT 1 as test');
    console.log('✅ Database connection successful:', result);
    
    // Check if table exists and show structure
    const tables = await query('SHOW TABLES LIKE "schools"');
    console.log('✅ Schools table exists:', tables);
    
    // Get current count of schools
    const count = await query('SELECT COUNT(*) as count FROM schools');
    console.log('✅ Current schools count:', count[0].count);
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  }
}

testDatabase();
