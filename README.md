 📖 NARRATO – AI Comic Story Generator

Narrato is a creative mobile application that leverages AI to transform your ideas into engaging stories and comic panels. Users can input story concepts, and Narrato generates AI-powered narratives and visual comic panels, combining the storytelling power of ChatGPT with the artistic capabilities of DALL-E.

This project demonstrates the integration of AI-driven content generation into a cross-platform mobile application, making creative storytelling accessible to everyone.

---

## 🛠️ Project Features

* **AI-Powered Story Generation**: Transform ideas into fully-fledged stories using ChatGPT.

* **Comic Panel Creation**: Generate visually appealing comic panels for your story using DALL-E.

* **Interactive Mobile App**: Users can input prompts, view story content, and visualize comics in real-time.

* **Cross-Platform Support**: Works on both Android and iOS devices via React Native (Expo).

* **User-Friendly Interface**: Clean UI with intuitive navigation and interactive components.

---

## 💻 Tech Stack

| Layer      | Technology                                                 |
| ---------- | ---------------------------------------------------------- |
| Frontend   | React Native (Expo), TypeScript, JSX                       |
| Styling    | React Native StyleSheet, Tailwind                          |
| Backend    | Node.js, Express, Flask API for AI calls 
| AI Models  | Chat GPT / DALL·E (for story panel generation)           |
| Deployment | Expo Go / Android / iOS                                    |

---

## Project Structure

```
Narrato/
├─ apps/
│  └─ mobile/
│     ├─ App.tsx          # Main app entry
│     ├─ src/
│     │  ├─ screens/      # Screens like Home, Preview, Settings
│     │  ├─ components/   # Reusable components like PanelCard
│     │  └─ utils/        # Helper functions, API calls
├─ assets/                # Images, icons, fonts
├─ package.json
├─ tsconfig.json
├─ README.md
└─ ...
```

---

## Installation & Running

1. **Clone the repo**

git clone https://github.com/TheJerryZone/Narrato-AI.git
cd Narrato/apps/mobile


2. **Install dependencies**

npm install

3. **Run the app**

npx expo start

4. **Open in simulator or Expo Go app** on your phone.

---

## 📝 How to Use

1. Open the app and enter your story text in the **“Input Story”** field.

   Input Example: A brave astronaut discovers a mysterious planet filled with friendly alien creatures.

2. Click **Generate Comic Panels**.

3. Preview the generated comic.

4. Save/export as **PDF** or **image gallery**.

---

## 📊 Additional Resources

* **PPT Presentation:**
  [Narrato Project PPT][(https://github.com/<your-username>/Narrato/blob/main/resources/Narrato_Presentation.pptx)](https://github.com/TheJerryZone/Narrato-AI/blob/main/Narrato_PPT.pdf)


---

## 🚀 Future Enhancements

* Allow user to **edit each panel’s AI-generated image**.
* Add **voice-to-text story input**.
* Integrate **story saving and sharing** features.

---

## ⚖️ License

This project is **for educational purposes**. You can modify it for personal use.

---

