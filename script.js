// const { log } = require("console");

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const newChatBtn = document.getElementById('new-chat-btn');
const chatList = document.getElementById('chat-list');
const modelSelect = document.getElementById('model-select');
const fileUploadInput = document.getElementById('file-upload');
const fileUploadLabel = document.querySelector('.file-upload-label');
//const apiKey = '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'; // <-- Replace with your API key
const apiKey = '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'; // <-- Replace with your API key

// Array of chat sessions, each session is {id, title, conversation}
let chatSessions = [];
let currentSessionId = null;

// Helper to generate a short title from the first user message
function getChatTitle(conversation) {
  const firstUserMsg = conversation.find(m => m.role === 'user');
  return firstUserMsg ? firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '') : 'New Chat';
}

// Render chat messages for a session
function renderConversation(conversation) {
  chatMessages.innerHTML = '';
  conversation.forEach(msg => appendMessage(msg.role === 'assistant' ? 'bot' : msg.role, msg.content));
}

// Render sidebar chat tabs
function renderChatList() {
  chatList.innerHTML = '';
  chatSessions.forEach(session => {
    const li = document.createElement('li');
    li.textContent = session.title || 'New Chat';
    li.className = session.id === currentSessionId ? 'active' : '';
    li.onclick = () => {
      currentSessionId = session.id;
      renderConversation(session.conversation);
      renderChatList();
    };
    chatList.appendChild(li);
  });
}

// Append a message to the chat window
function appendMessage(role, content) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}`;
  if (role === 'bot') {
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\n/g, '<br>');
    msgDiv.innerHTML = formatted;
  } else {
    msgDiv.textContent = content;
  }
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send a message in the current session
async function sendMessage(message) {
  const session = chatSessions.find(s => s.id === currentSessionId);
  appendMessage('user', message);
  session.conversation.push({ role: 'user', content: message });

  appendMessage('bot', '...'); // Placeholder

  const selectedModel = modelSelect.value;

  let promptToSend = message;
  if (window.lastUploadedFileContent) {
    promptToSend = `Here is the file content:\n${window.lastUploadedFileContent}\n\nUser question: ${message}`;
  }

  if (selectedModel === 'gpt-4o-mini') {
    // Use Chat Completion API
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            ...session.conversation.slice(0, -1),
            { role: 'user', content: promptToSend }
          ],
          max_tokens: 50
        })
      });

      if (!response.ok) {
        console.log(`Error: ${response.status} ${response.statusText}`);
        throw new Error('API error');
      }

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content?.trim() || 'No response';
      session.conversation.push({ role: 'assistant', content: botReply });

      // Replace last bot placeholder with actual reply (formatted)
      const botPlaceholders = chatMessages.querySelectorAll('.bot');
      let formatted = botReply
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br>');
      botPlaceholders[botPlaceholders.length - 1].innerHTML = formatted;

      // Update chat title if it's the first message
      if (!session.title || session.title === 'New Chat') {
        session.title = getChatTitle(session.conversation);
        renderChatList();
      }
    } catch (err) {
      const botPlaceholders = chatMessages.querySelectorAll('.bot');
      botPlaceholders[botPlaceholders.length - 1].textContent = 'Error: ' + err.message;
    }
  } else if (selectedModel === 'dall-e-3') {
    // Use DALL-E 3 API
    const endpoint = 'https://api.openai.com/v1/images/generations';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: message,
          n: 1,
          size: '256x256'
        })
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();
      const imageUrl = data.data?.[0]?.url;
      let botReply;
      if (imageUrl) {
        botReply = `<b>Generated Image:</b><br><img src="${imageUrl}" alt="DALL-E 3 Image" style="max-width:100%;border-radius:8px;margin-top:8px;">`;
      } else {
        botReply = 'No image generated.';
      }
      session.conversation.push({ role: 'assistant', content: botReply });

      // Replace last bot placeholder with actual reply (formatted)
      const botPlaceholders = chatMessages.querySelectorAll('.bot');
      botPlaceholders[botPlaceholders.length - 1].innerHTML = botReply;

      // Update chat title if it's the first message
      if (!session.title || session.title === 'New Chat') {
        session.title = getChatTitle(session.conversation);
        renderChatList();
      }
    } catch (err) {
      const botPlaceholders = chatMessages.querySelectorAll('.bot');
      botPlaceholders[botPlaceholders.length - 1].textContent = 'Error: ' + err.message;
    }
  }
}

async function trySetReminder(message, userEmail) {
  if (!/remind me|reminder/i.test(message)) return false;
  appendMessage('bot', 'Setting your reminder...');
  const res = await fetch('http://localhost:4000/api/reminder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, email: userEmail })
  });
  const data = await res.json();
  if (data.success) {
    appendMessage('bot', `✅ Reminder set for <b>${data.reminder.datetime}</b>: ${data.reminder.task}`);
  } else {
    appendMessage('bot', '❌ Could not set reminder: ' + (data.error || 'Unknown error'));
  }
  return true;
}

// Handle form submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  userInput.value = '';

  (async () => {
    // Check and set reminder first
    if (await trySetReminder(message, 'user@email.com')) return;
    // Send the message if not a reminder
    sendMessage(message);
  })();
});

// Handle New Chat button
newChatBtn.addEventListener('click', () => {
  // Save current session if it has messages
  const currentSession = chatSessions.find(s => s.id === currentSessionId);
  if (currentSession && currentSession.conversation.length > 0) {
    currentSession.title = getChatTitle(currentSession.conversation);
  }
  // Create new session
  const newSession = {
    id: Date.now().toString(),
    title: 'New Chat',
    conversation: []
  };
  chatSessions.unshift(newSession);
  currentSessionId = newSession.id;
  renderConversation(newSession.conversation);
  renderChatList();
  userInput.value = '';
  userInput.focus();
});

// Handle file upload
fileUploadInput.addEventListener('change', async function () {
  const file = fileUploadInput.files[0];
  if (!file) return;

  appendMessage('bot', 'Uploading file...');
  const formData = new FormData();
  formData.append('purpose', 'fine-tune');
  formData.append('file', file);

  try {
    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`// Replace with your API key or proxy endpoint
      },
      body: formData
    });

    if (!response.ok) {
        console.log(`Error uploading file: ${response.status} ${response.statusText}`);
        
      throw new Error('File upload failed');
    }

    const data = await response.json();
    // Show file info and let user know they can ask about it
    appendMessage('bot', 
      `<b>File uploaded!</b><br>
      <b>Filename:</b> ${data.filename}<br>
      <b>File ID:</b> ${data.id}<br>
      <b>Purpose:</b> ${data.purpose}<br>
      <i>You can now ask questions about this file.</i>`
    );

    // Optionally, store file ID for future reference in your app
    window.lastUploadedFileId = data.id;

    // Read file content as text and store in a global variable
    const reader = new FileReader();
    reader.onload = function(e) {
      window.lastUploadedFileContent = e.target.result;
    };
    reader.readAsText(file);

  } catch (err) {
    appendMessage('bot', 'Error: ' + err.message);
  }
});

// Initialize with one chat session
function init() {
  const firstSession = {
    id: Date.now().toString(),
    title: 'New Chat',
    conversation: []
  };
  chatSessions.push(firstSession);
  currentSessionId = firstSession.id;
  renderConversation(firstSession.conversation);
  renderChatList();
}

init();
