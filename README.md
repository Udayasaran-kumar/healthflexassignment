# ⏱️ Customizable Timer Management App

## 🚀 Objective

Build a React Native app that allows users to create, manage, and interact with multiple customizable timers. The app includes features like categories, progress visualization, grouped actions, and maintains clean UI/UX with minimal third-party dependencies.

---

## 📦 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/timer-app.git
cd timer-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the app**

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---
## 📸 Screenshots


<img src="./ss/IMG-20250518-WA0006.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0007.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0008.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0009.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0010.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0011.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0012.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0013.jpg" alt="Home Screen" width="300"/>
<img src="./ss/IMG-20250518-WA0014.jpg" alt="Home Screen" width="300"/>

## 🧠 Assumptions Made During Development

Initially planned and built the UI first, focusing on input fields for:

Name (text)

Minutes and Seconds (numeric inputs)

Category (dropdown)

Chose to use react-native-select-dropdown for category selection based on simplicity and appearance.

Assumed react-native-select-dropdown would offer the desired customization and integration flexibility, but later realized it didn’t align well with specific requirements (e.g., styling, value handling).

Pivoted from UI-first to data-first development after dropdown issues.

Defined and framed the internal data structure early (e.g., how timers should be stored, grouped, and represented).

Brainstormed and outlined the app flow, including timer lifecycle (create → run → pause → reset → complete) before implementation.

Set up the project environment with necessary dependencies and folder structure to streamline development.

- Timers must persist between sessions using AsyncStorage.
- All time-based logic is handled via `setInterval`, not background tasks.
- The app is used on phones in portrait mode.
- No user authentication is required.
- Modal feedback is sufficient for timer completion instead of push notifications.
- App structure uses basic screens with minimal third-party libraries for easier testing and deployment.

---
