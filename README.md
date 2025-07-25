# 💬 Web Chat App with AI, File Upload, Image Generation, and Reminders

A modern, interactive web chat application powered by OpenAI GPT-4o Mini and DALL·E 3, with support for:
- **Multi-session chat** (sidebar with chat history)
- **Model selection** (GPT-4o Mini for chat, DALL·E 3 for image generation)
- **File upload** (for fine-tuning or context)
- **AI-powered reminders** (with email notifications via OpenAI Agent SDK or in-app notifications)
- **Modern, responsive UI**

---

## 🚀 Features

- **Chat with AI:** Natural conversation using GPT-4o Mini.
- **Image Generation:** Use DALL·E 3 to generate images from prompts.
- **File Upload:** Upload `.jsonl` files for fine-tuning or context.
- **Reminders:** 
  - Ask the AI to remind you of tasks at specific times—get notified by email (backend) or in-app notification (frontend modal).
  - Click the **Make a Reminder** button for a modern modal popup to set reminders.
- **Multi-Session:** Sidebar to switch between previous chats.
- **Modern UI:** Responsive, clean, and user-friendly design.

---

## 📸 Screenshots

![WhatsApp Image 2025-07-02 at 15 54 58_5697e9d9](https://github.com/user-attachments/assets/239d9749-6609-4a93-87a3-f4676a2379eb)
![WhatsApp Image 2025-07-02 at 16 38 36_9ac8a415](https://github.com/user-attachments/assets/cc2040f8-ae1c-43b1-9e7b-67a443fa224d)
![WhatsApp Image 2025-07-02 at 16 00 57_b4bb6c6a](https://github.com/user-attachments/assets/aaf458fb-67ec-4c49-b71b-dd8584b9f593)
![WhatsApp Image 2025-07-02 at 15 59 40_00e1daa7](https://github.com/user-attachments/assets/4219ae1b-898c-445b-89af-9dbfa121069b)
![WhatsApp Image 2025-07-02 at 15 58 31_a84fe6bf](https://github.com/user-attachments/assets/00b474a8-64b7-466a-aa3c-bebeafed939e)
![WhatsApp Image 2025-07-02 at 15 56 15_ae0dfe62](https://github.com/user-attachments/assets/8a8085b5-2612-493d-94cd-19d1d2743aaa)
![WhatsApp Image 2025-07-02 at 15 55 49_369b7787](https://github.com/user-attachments/assets/bca86673-d689-4354-8086-f913371271bd)
![WhatsApp Image 2025-07-02 at 15 54 58_5697e9d9](https://github.com/user-attachments/assets/e73df66c-d3f5-4707-ac73-22276cc35293)



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
- **Reminders:** 
  - Type a message like  
    `Please remind me to drink water on 07/01/2025 11:25:55`  
    and receive an email at the specified time (backend).
  - Or click **Make a Reminder** for a modern modal, set your task and time, and get an in-app notification.
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
├── README.md          # This file
└── instructions.txt   # Full chat-based project instructions and history
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

## 📚 Project Instructions & History

See [`instructions.txt`](./instructions.txt) for a full log of the chat-based development process, including all user requests and assistant responses.

---

## 📬 Contact & Contributions

- Issues and PRs are welcome!
- For questions, open an issue or contact [AyaSHEHAT](https://github.com/AyaSHEHAT).

---

## 📄 License

MIT License

---

**Enjoy chatting, generating, and getting reminded—powered by OpenAI!**
