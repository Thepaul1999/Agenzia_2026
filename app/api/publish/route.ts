import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("pages")
    .select("html")
    .eq("id", "draft")
    .single();

  if (error) {
    console.error("Errore caricamento bozza:", error);
    return NextResponse.json({ ok: false, error });
  }

  // Se non c'è una bozza, imposto stringa vuota
  const html = data?.html ?? "";

  const { error: updateError } = await supabase
    .from("pages")
    .update({ html })
    .eq("id", "published");

  if (updateError) {
    console.error("Errore pubblicazione:", updateError);
    return NextResponse.json({ ok: false, error: updateError });
  }

  return NextResponse.json({ ok: true });
}