# LaparHub: Smart Dining Lead Magnet 🥩

This repository is a personal initiative and technical project developed for the **Marketing React Developer** position at **HungryHub**.

The goal of this project is to demonstrate the integration of modern frontend engineering (Next.js & Tailwind CSS 4) with marketing automation (n8n & Open AI) to create a high-converting, personalized lead generation engine.

---

## 🎯 Project Objective

Traditional lead magnets often feel generic. **LaparHub** solves this by using AI to provide instant, personalized value. Instead of just a "50% off" voucher, the user receives a tailored dining insight based on their specific steak preferences, significantly increasing the perceived value and the likelihood of a restaurant visit.

### 🤖 Automation Workflow

![n8n Workflow Screenshoot](/public/n8n-workflow.png)

### Key Technical Features:

* **Encapsulated Logic:** A self-contained `LeadForm` component that manages its own states (Idle, Submitting, Success).
* **Marketing Automation:** Seamless integration with **n8n** via secure webhooks and API keys.
* **AI Personalization:** Real-time data processing using **Open AI** to return custom menu recommendations.
* **SEO Optimized:** Fully configured Metadata API, OpenGraph tags for social sharing (Meta Ads ready), and JSON-LD structured data.

---

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS 4
* **Icons:** FontAwesome
* **Testing:** Jest & React Testing Library (RTL)

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js 18+** installed on your machine.

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone git@github.com:rezadaulay/lapar-hub-smart-dining-lead-magnet.git
cd lapar-hub-smart-dining-lead-magnet
npm install

```

### 3. Environment Variables

Create a `.env.local` file in the root directory and fill in your n8n credentials. This setup ensures that your frontend can securely communicate with your automation pipeline.

```env
# n8n Automation Settings
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
N8N_WEBHOOK_API_KEY=your_secure_api_key_here

```

### 4. Running the Project

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the landing page.

---

## 🧪 Automated Testing

This project follows a strict testing protocol to ensure conversion points never break. We use **Jest** and **React Testing Library** to simulate real user interactions and network latency.

To run the test suite:

```bash
npm test

```

### What is covered in the tests?

* **Form Lifecycle:** Verifies the transition from the initial form to the "AI Processing" state and finally to the "Success" UI.
* **Network Simulation:** Mocks `fetch` with a 100ms delay to ensure the loading spinner is visible to users during API calls.
* **Data Integrity:** Ensures that headers (including the `X-N8N-API-KEY`) are sent correctly to the automation server.
* **Accessibility:** Validates that labels and inputs are correctly linked via IDs, supporting screen readers and high-quality UX.

---

## 📈 Marketing Insight

By utilizing a **headless automation** approach (Next.js + n8n), we achieve:

1. **Faster Page Loads:** No heavy third-party marketing scripts.
2. **Data Ownership:** All lead data is sent directly to our controlled workflow.
3. **A/B Testing Ready:** The component-based architecture allows for quick variations in copywriting or CTA designs to optimize the conversion rate (CRO).

---

## 👨‍💻 Author

**Reza** *Full-stack Developer & Digital Marketer based in Medan, Indonesia.*
