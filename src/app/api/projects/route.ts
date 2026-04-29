import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        contributors:project_contributors(*)
      `)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const projects = (data || []).map((p: any) => ({
      id: p.id,
      num: p.num,
      title: p.title,
      description: p.description,
      longDesc: p.long_desc,
      icon: p.icon,
      features: p.features,
      tech: p.tech,
      github: p.github,
      contributors: (p.contributors || []).map((c: any) => ({
        name: c.name,
        github: c.github
      }))
    }));

    return NextResponse.json(projects);
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, num, title, description, long_desc, icon, features, tech, github } = body;

    const { data, error } = await supabase
      .from('projects')
      .insert([
        { 
          id, 
          num, 
          title, 
          description, 
          long_desc, 
          icon, 
          features, 
          tech, 
          github
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
