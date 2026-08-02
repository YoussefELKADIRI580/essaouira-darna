import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { CMI_CONFIG, verifyCmiHash } from "@/lib/cmi";
import { updateProjectRaisedAmount, markSupplyFulfilled } from "@/lib/queries";

export async function POST(req: Request) {
  try {
    // CMI sends data as application/x-www-form-urlencoded
    const formData = await req.formData();
    const params: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      params[key] = value.toString();
    }

    const { HASH, oid, ProcReturnCode, amount } = params;

    // 1. Verify Hash to ensure response is truly from CMI
    if (!HASH || !verifyCmiHash(params, CMI_CONFIG.store_key, HASH)) {
      console.error("CMI Callback: Invalid Hash", params);
      // Even if it fails, we redirect user to failure page
      return NextResponse.redirect(new URL("/projects?payment=failed", req.url));
    }

    // 2. Process the transaction
    if (ProcReturnCode === "00") {
      // Payment Successful
      
      // Get the donation from DB to know the project and supply
      const { data: donation } = await supabase
        .from("donations")
        .select("*")
        .eq("transaction_id", oid)
        .single();

      if (donation && donation.payment_status === "pending") {
        // Update donation status
        await supabase
          .from("donations")
          .update({ payment_status: "completed" })
          .eq("id", donation.id);

        // Update project raised amount
        await updateProjectRaisedAmount(donation.project_id, donation.amount);

        // Mark supply as fulfilled if applicable
        if (donation.supply_id) {
          await markSupplyFulfilled(donation.supply_id);
        }
        
        return NextResponse.redirect(new URL(`/donate/${donation.project_id}?payment=success`, req.url));
      }
    }

    // Payment Failed or Cancelled
    if (oid) {
      await supabase
        .from("donations")
        .update({ payment_status: "failed" })
        .eq("transaction_id", oid);
    }
    
    return NextResponse.redirect(new URL("/projects?payment=failed", req.url));

  } catch (error) {
    console.error("CMI Callback Error:", error);
    return NextResponse.redirect(new URL("/projects?payment=error", req.url));
  }
}
