# 💬 Web Chat App with AI, File Upload, Image Generation, and Reminders

A modern, interactive web chat application powered by OpenAI GPT-4o Mini and DALL·E 3, with support for:
- **Multi-session chat** (sidebar with chat history)
- **Model selection** (GPT-4o Mini for chat, DALL·E 3 for image generation)
- **File upload** (for fine-tuning or context)
- **AI-powered reminders** (with email notifications via OpenAI Agent SDK)
- **Modern, responsive UI**

---

## 🚀 Features

- **Chat with AI:** Natural conversation using GPT-4o Mini.
- **Image Generation:** Use DALL·E 3 to generate images from prompts.
- **File Upload:** Upload `.jsonl` files for fine-tuning or context.
- **Reminders:** Ask the AI to remind you of tasks at specific times—get notified by email!
- **Multi-Session:** Sidebar to switch between previous chats.
- **Modern UI:** Responsive, clean, and user-friendly design.

---

## 📸 Screenshots

![Chat UI Screenshot](![image](https://github.com/user-attachments/assets/2098a7f6-c902-4fb7-a635-219e36cd30c8)
)
![Sidebar Screenshot](![image](https://github.com/user-attachments/assets/4d9e07b1-4c4f-4578-99b0-01a598682cbc)
)
---

## 🛠️ Setup & Installation

### 1. **Clone the Repository**

```sh
git clone https://github.com/AyaSHEHAT/web-chat-app.git
cd web-chat-app
```

### 2. **Backend Setup (for Reminders & Secure API)**

> **Required for reminders and secure API key usage.**

#### a. Install dependencies

```sh
npm install openai nodemailer express body-parser dotenv cors
```

#### b. Create a `.env` file

```env
OPENAI_API_KEY=sk-...your-openai-key...
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

#### c. Start the backend server

```sh
node reminder-agent.js
```

The backend will run at [http://localhost:4000](http://localhost:4000).

---

### 3. **Frontend Setup**

- Open `index.html` directly in your browser  
  **OR**  
- Serve with a local server for best results:

```sh
npx serve .
# or
python -m http.server
```
Then visit [http://localhost:8000](http://localhost:8000) or the shown port.

---

## ✨ Usage

- **Chat:** Type your message and click **Send**.
- **Switch Model:** Use the dropdown to select GPT-4o Mini (chat) or DALL·E 3 (image).
- **Upload File:** Click the 📁 icon, select a `.jsonl` file, and ask questions about its content.
- **Reminders:** Type a message like  
  `Please remind me to drink water on 07/01/2025 11:25:55`  
  and receive an email at the specified time.
- **Sidebar:** Click previous chats to revisit or continue conversations.
- **New Chat:** Click **New Chat** to start a fresh session.

---

## 🧑‍💻 Project Structure

```
web-chat-app/
│
├── index.html         # Main UI
├── style.css          # Modern styles
├── script.js          # Frontend logic
├── reminder-agent.js  # Node.js backend for reminders & secure API
├── .env               # (Not committed) API keys and email credentials
├── .gitignore         # Ignores .env and node_modules
└── README.md          # This file
```

---

## ⚠️ Security & Best Practices

- **Never commit your `.env` file or API keys** to public repositories.
- Use the backend (`reminder-agent.js`) to keep your keys secure.
- For production, consider deploying the backend on a secure server and using HTTPS.

---

## 📝 Example `.env.example`

```env
OPENAI_API_KEY=sk-...your-openai-key...
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

## 📬 Contact & Contributions

- Issues and PRs are welcome!
- For questions, open an issue or contact [AyaSHEHAT](https://github.com/AyaSHEHAT).

---

## 📄 License

MIT License

---

**Enjoy chatting, generating, and getting reminded—powered by OpenAI!**
