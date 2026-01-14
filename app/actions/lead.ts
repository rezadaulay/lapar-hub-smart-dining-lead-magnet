"use server";

export async function submitLeadAction(formData: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const apiKey = process.env.N8N_WEBHOOK_API_KEY;

  if (!webhookUrl || !apiKey) {
    throw new Error("Server configuration missing");
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'X-N8N-API-KEY': apiKey 
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    return { success: false, error: "Failed to connect to automation server" };
  }

  const result = await response.json();
  return { 
    success: true, 
    aiInsight: result?.data?.aiInsight 
  };
}