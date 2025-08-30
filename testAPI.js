import fetch from 'node-fetch';

// Test the API endpoint
async function testAPI() {
  try {
    console.log('Testing GET /api/schools...');
    const response = await fetch('http://localhost:3000/api/schools');
    const data = await response.json();
    console.log('✅ GET schools successful:', data);
  } catch (error) {
    console.log('API test requires the dev server to be running');
    console.log('Run: npm run dev');
  }
}

testAPI();
