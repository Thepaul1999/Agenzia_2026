import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('projects')
    .select('id, data')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    const templateUrl = new URL('/templates/gjs-project.grapesjs', request.url);
    const templateRes = await fetch(templateUrl);

    if (!templateRes.ok) {
      return NextResponse.json(
        { error: 'Template iniziale non trovato' },
        { status: 500 }
      );
    }

    const templateText = await templateRes.text();
    const templateData = JSON.parse(templateText);

    return NextResponse.json({
      id,
      data: templateData,
    });
  }

  return NextResponse.json({
    id: data.id,
    data: data.data,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { error } = await supabase.from('projects').upsert({
    id,
    data: body.data,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    id,
  });
}