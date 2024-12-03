const http = require('http');
const url = require('url');
// Remove bcrypt import, we don't need hashing for plain text passwords
// const bcrypt = require('bcrypt');  

const port = 3000;

// Mock user database (use plain text passwords for this example)
let users = [
  { username: 'user1', email: 'samirgrbg561@gmail.com', password: 'password1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2' },
];

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/signup') {
    handlePostRequest(req, res, signupHandler);
  } else if (req.method === 'POST' && parsedUrl.pathname === '/login') {
    handlePostRequest(req, res, loginHandler);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Not Found' }));
  }
});

function handlePostRequest(req, res, handler) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      if (!body) {
        throw new Error('Empty request body');
      }
      let data;
      if (req.headers['content-type'] === 'application/json') {
        data = JSON.parse(body);
      } else {
        data = Object.fromEntries(new URLSearchParams(body));
      }
      handler(data, res);
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: error.message }));
    }
  });
}

// Login handler (checks plain text password)
function loginHandler(data, res) {
  const { username, password } = data;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Login successful' }));
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Invalid username or password' }));
  }
}

// Signup handler (stores plain text passwords)
async function signupHandler(data, res) {
  try {
    const { username, email, password, confirmPassword } = data;
    
    // Input validation
    if (!username || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (username.length < 3 || username.length > 20) {
      throw new Error('Username must be between 3 and 20 characters');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Check for existing users
    if (users.some(user => user.username === username)) {
      throw new Error('Username already exists');
    }
    if (users.some(user => user.email === email)) {
      throw new Error('Email already exists');
    }

    // Store the user with the plain text password
    users.push({ username, email, password }); // Store plain password here
    
    // Log signup details to console
    console.log(`New user signed up successfully:`);
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Signup time: ${new Date().toISOString()}`);
    console.log(`Password: ${password}`);

    // Send success response
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Signup successful! You can now log in with your new account.'
    }));

  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: error.message }));
    console.error(`Signup failed: ${error.message}`);
  }
}

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
