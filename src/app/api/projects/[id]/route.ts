import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        contributors:project_contributors(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    const project = {
      id: data.id,
      num: data.num,
      title: data.title,
      description: data.description,
      longDesc: data.long_desc,
      icon: data.icon,
      features: data.features,
      tech: data.tech,
      github: data.github,
      isPublished: data.is_published,
      contributors: (data.contributors || []).map((c: any) => ({
        name: c.name,
        github: c.github
      }))
    };

    return NextResponse.json(project);
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { num, title, description, long_desc, icon, features, tech, github, is_published } = body;

    const { data, error } = await supabase
      .from('projects')
      .update({ num, title, description, long_desc, icon, features, tech, github, is_published })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
