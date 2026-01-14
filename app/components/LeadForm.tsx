"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUtensils, faFire, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { submitLeadAction } from "@/app/actions/lead"; // Import action

type FormData = {
  name: string;
  email: string;
  steak: string;
  doneness: string;
};

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [data, setData] = useState<FormData | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Retrieve the Webhook URL from ENV
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    const apiKey = process.env.NEXT_PUBLIC_N8N_WEBHOOK_API_KEY;

    const formData = new FormData(e.currentTarget);
    const submittedData = Object.fromEntries(formData.entries()) as FormData;

    try {
      // Panggil Server Action sebagai ganti fetch langsung
      const result = await submitLeadAction(submittedData);

      if (result.success) {
        setAiInsight(result.aiInsight || "Enjoy your premium steak experience!");
        setData(submittedData);
        
        setStatus("success");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("idle");
    }
  };

  // --- SUCCESS STATE UI ---
  if (status === "success" && data) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-hungry-dark animate-in fade-in slide-in-from-bottom-4 duration-700 border border-gray-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <h2 className="text-3xl font-bold text-center mb-3">Check Your Inbox, {data.name}!</h2>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Your 50% voucher is on its way. Our AI is also analyzing the perfect side dish for your <span className="font-bold text-hungry-red">{data.steak}</span>.
        </p>
        <div className="p-5 bg-hungry-gray rounded-xl border-l-4 border-hungry-red italic text-sm text-gray-700">
          <span className="font-bold text-hungry-red block not-italic mb-1 tracking-wide uppercase text-xs">AI Insight:</span>
          {/* "Since you prefer {data.steak} served {data.doneness}, we recommend pairing it with a rich Béarnaise sauce and a glass of full-bodied Malbec." */}
          { aiInsight }
        </div>
        <button 
          onClick={() => setStatus("idle")} 
          className="mt-8 w-full text-gray-400 text-xs hover:text-hungry-red transition-colors underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // --- FORM STATE UI ---
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 text-hungry-dark transition-all">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold mb-1.5 text-gray-700">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FontAwesomeIcon icon={faUser} size="sm" />
            </span>
            <input 
              name="name" 
              required 
              disabled={status === "submitting"}
              className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-hungry-red focus:border-hungry-red outline-none transition-all disabled:bg-gray-50" 
              placeholder="e.g. John Doe" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1.5 text-gray-700">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} size="sm" />
            </span>
            <input 
              name="email" 
              type="email" 
              required 
              disabled={status === "submitting"}
              className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-hungry-red focus:border-hungry-red outline-none transition-all disabled:bg-gray-50" 
              placeholder="john@example.com" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1.5 text-gray-700" htmlFor="steak-select">Favorite Cut</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                <FontAwesomeIcon icon={faUtensils} size="sm" />
              </span>
              <select name="steak" id="steak-select" disabled={status === "submitting"} className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-hungry-red appearance-none">
                <option>Juicy Ribeye</option>
                <option>Lean Sirloin</option>
                <option>Tender Fillet Mignon</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 text-gray-700" htmlFor="doneness-select">Doneness</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                <FontAwesomeIcon icon={faFire} size="sm" />
              </span>
              <select name="doneness" id="doneness-select" disabled={status === "submitting"} className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-hungry-red appearance-none">
                <option>Medium Rare</option>
                <option>Medium</option>
                <option>Well Done</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-hungry-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-all transform active:scale-95 shadow-lg shadow-red-200 disabled:bg-gray-400 disabled:shadow-none"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2" id="loading-info">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>AI processing...</span>
            </span>
          ) : "CLAIM MY 50% VOUCHER NOW"}
        </button>
      </div>
    </form>
  );
}