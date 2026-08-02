import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { CMI_CONFIG, generateCmiHash } from "@/lib/cmi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, supplyId, amount, donorName, email, userId } = body;

    // 1. Generate a unique order ID
    const orderId = `DON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 2. Prepare CMI parameters
    // Note: CMI amounts must be formatted properly, usually string with 2 decimals
    const cmiAmount = Number(amount).toFixed(2);
    
    // Using current app URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const cmiParams: Record<string, string> = {
      clientid: CMI_CONFIG.client_id,
      amount: cmiAmount,
      oid: orderId,
      okUrl: `${baseUrl}/api/cmi/callback`, // Callback on success
      failUrl: `${baseUrl}/api/cmi/callback`, // Callback on failure
      tranType: "PreAuth",
      currency: "504", // 504 is MAD (Moroccan Dirham)
      rnd: Date.now().toString(),
      storetype: "3D_PAY_HOSTING",
      hashAlgorithm: "ver2",
      lang: "ar",
      encoding: "UTF-8",
      email: email || "donor@example.com",
      BillToName: donorName || "فاعل خير",
    };

    // 3. Generate the security hash
    const hash = generateCmiHash(cmiParams, CMI_CONFIG.store_key);
    cmiParams.hash = hash;

    // 4. Save the "pending" donation to database
    // We save it now so that when CMI calls back, we can verify it exists
    const { error } = await supabase.from("donations").insert({
      project_id: projectId,
      supply_id: supplyId,
      donor_name: donorName || "فاعل خير",
      amount: Number(amount),
      payment_method: "cmi",
      payment_status: "pending",
      transaction_id: orderId,
      user_id: userId || null,
    });

    if (error) {
      console.error("DB Error creating pending donation:", error);
      return NextResponse.json({ error: "Failed to create donation record" }, { status: 500 });
    }

    // 5. Return the params to the frontend
    return NextResponse.json({
      gatewayUrl: CMI_CONFIG.gateway_url,
      params: cmiParams,
    });

  } catch (error) {
    console.error("CMI Initiate Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
