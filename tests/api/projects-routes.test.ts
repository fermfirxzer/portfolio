import assert from 'node:assert/strict';
import { afterEach, before, describe, it, mock } from 'node:test';

type SupabaseResult = {
  data: any;
  error: { message: string } | null;
};

const supabase = {
  from: mock.fn(),
};

before(async () => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-key';

  mock.module('@/lib/supabase', {
    namedExports: { supabase },
  });
});

afterEach(() => {
  supabase.from.mock.resetCalls();
});

function jsonRequest(body: unknown) {
  return new Request('http://localhost/api/projects', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  });
}

function mockListProjects(result: SupabaseResult) {
  const order = mock.fn(async () => result);
  const select = mock.fn(() => ({ order }));
  supabase.from.mock.mockImplementationOnce(() => ({ select }));
  return { select, order };
}

function mockInsertProject(result: SupabaseResult) {
  const select = mock.fn(async () => result);
  const insert = mock.fn(() => ({ select }));
  supabase.from.mock.mockImplementationOnce(() => ({ insert }));
  return { insert, select };
}

function mockSingleProject(result: SupabaseResult) {
  const single = mock.fn(async () => result);
  const eq = mock.fn(() => ({ single }));
  const select = mock.fn(() => ({ eq }));
  supabase.from.mock.mockImplementationOnce(() => ({ select }));
  return { select, eq, single };
}

function mockUpdateProject(result: SupabaseResult) {
  const select = mock.fn(async () => result);
  const eq = mock.fn(() => ({ select }));
  const update = mock.fn(() => ({ eq }));
  supabase.from.mock.mockImplementationOnce(() => ({ update }));
  return { update, eq, select };
}

async function readJson(response: Response) {
  return response.json() as Promise<any>;
}

describe('projects collection API route', async () => {
  const route = await import('../../src/app/api/projects/route');

  it('GET maps Supabase projects to public API shape', async () => {
    const { select, order } = mockListProjects({
      data: [
        {
          id: 'portfolio',
          num: 'PROJECT_01',
          title: 'Portfolio',
          description: 'Personal site',
          long_desc: 'Long description',
          icon: 'layout',
          features: ['API'],
          tech: ['Next.js'],
          github: 'https://github.com/example/portfolio',
          is_published: true,
          contributors: [{ name: 'Jirayus', github: 'https://github.com/jirayus' }],
        },
      ],
      error: null,
    });

    const response = await route.GET();
    const body = await readJson(response);

    assert.equal(response.status, 200);
    assert.deepEqual(body, [
      {
        id: 'portfolio',
        num: 'PROJECT_01',
        title: 'Portfolio',
        description: 'Personal site',
        longDesc: 'Long description',
        icon: 'layout',
        features: ['API'],
        tech: ['Next.js'],
        github: 'https://github.com/example/portfolio',
        isPublished: true,
        contributors: [{ name: 'Jirayus', github: 'https://github.com/jirayus' }],
      },
    ]);
    assert.equal(select.mock.calls[0].arguments[0].includes('project_contributors'), true);
    assert.deepEqual(order.mock.calls[0].arguments, ['created_at', { ascending: true }]);
  });

  it('GET returns an empty array when Supabase has no rows', async () => {
    mockListProjects({ data: null, error: null });

    const response = await route.GET();

    assert.equal(response.status, 200);
    assert.deepEqual(await readJson(response), []);
  });

  it('GET returns 500 when Supabase returns an error', async () => {
    mockListProjects({ data: null, error: { message: 'database unavailable' } });

    const response = await route.GET();

    assert.equal(response.status, 500);
    assert.deepEqual(await readJson(response), { error: 'database unavailable' });
  });

  it('GET returns 500 when an unexpected error is thrown', async () => {
    supabase.from.mock.mockImplementationOnce(() => {
      throw new Error('network failure');
    });

    const response = await route.GET();

    assert.equal(response.status, 500);
    assert.deepEqual(await readJson(response), { error: 'Internal Server Error' });
  });

  it('POST inserts a project and defaults is_published to true', async () => {
    const createdProject = { id: 'new-project', title: 'New Project', is_published: true };
    const { insert } = mockInsertProject({ data: [createdProject], error: null });

    const response = await route.POST(jsonRequest({
      id: 'new-project',
      num: 'PROJECT_02',
      title: 'New Project',
      description: 'Description',
      long_desc: 'Long description',
      icon: 'box',
      features: ['Feature'],
      tech: ['Next.js'],
      github: 'https://github.com/example/new-project',
    }));

    assert.equal(response.status, 201);
    assert.deepEqual(await readJson(response), createdProject);
    assert.deepEqual(insert.mock.calls[0].arguments[0][0], {
      id: 'new-project',
      num: 'PROJECT_02',
      title: 'New Project',
      description: 'Description',
      long_desc: 'Long description',
      icon: 'box',
      features: ['Feature'],
      tech: ['Next.js'],
      github: 'https://github.com/example/new-project',
      is_published: true,
    });
  });

  it('POST preserves an explicit is_published value', async () => {
    mockInsertProject({ data: [{ id: 'draft-project', is_published: false }], error: null });

    const response = await route.POST(jsonRequest({
      id: 'draft-project',
      is_published: false,
    }));

    assert.equal(response.status, 201);
    assert.deepEqual(await readJson(response), { id: 'draft-project', is_published: false });
  });

  it('POST returns 400 when Supabase rejects the insert', async () => {
    mockInsertProject({ data: null, error: { message: 'duplicate id' } });

    const response = await route.POST(jsonRequest({ id: 'existing-project' }));

    assert.equal(response.status, 400);
    assert.deepEqual(await readJson(response), { error: 'duplicate id' });
  });

  it('POST returns 500 when the request body is invalid', async () => {
    const request = new Request('http://localhost/api/projects', {
      method: 'POST',
      body: '{not-json',
    });

    const response = await route.POST(request);

    assert.equal(response.status, 500);
    assert.deepEqual(await readJson(response), { error: 'Internal Server Error' });
  });
});

describe('single project API route', async () => {
  const route = await import('../../src/app/api/projects/[id]/route');

  it('GET returns one mapped project by id', async () => {
    const { eq } = mockSingleProject({
      data: {
        id: 'portfolio',
        num: 'PROJECT_01',
        title: 'Portfolio',
        description: 'Personal site',
        long_desc: 'Long description',
        icon: 'layout',
        features: ['API'],
        tech: ['Next.js'],
        github: 'https://github.com/example/portfolio',
        is_published: true,
        contributors: [{ name: 'Jirayus', github: 'https://github.com/jirayus' }],
      },
      error: null,
    });

    const response = await route.GET(new Request('http://localhost/api/projects/portfolio'), {
      params: { id: 'portfolio' },
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await readJson(response), {
      id: 'portfolio',
      num: 'PROJECT_01',
      title: 'Portfolio',
      description: 'Personal site',
      longDesc: 'Long description',
      icon: 'layout',
      features: ['API'],
      tech: ['Next.js'],
      github: 'https://github.com/example/portfolio',
      isPublished: true,
      contributors: [{ name: 'Jirayus', github: 'https://github.com/jirayus' }],
    });
    assert.deepEqual(eq.mock.calls[0].arguments, ['id', 'portfolio']);
  });

  it('GET returns 404 when the project is missing', async () => {
    mockSingleProject({ data: null, error: { message: 'not found' } });

    const response = await route.GET(new Request('http://localhost/api/projects/missing'), {
      params: { id: 'missing' },
    });

    assert.equal(response.status, 404);
    assert.deepEqual(await readJson(response), { error: 'not found' });
  });

  it('GET returns 500 when an unexpected error is thrown', async () => {
    supabase.from.mock.mockImplementationOnce(() => {
      throw new Error('network failure');
    });

    const response = await route.GET(new Request('http://localhost/api/projects/portfolio'), {
      params: { id: 'portfolio' },
    });

    assert.equal(response.status, 500);
    assert.deepEqual(await readJson(response), { error: 'Internal Server Error' });
  });

  it('PUT updates a project by id', async () => {
    const updatedProject = { id: 'portfolio', title: 'Updated Portfolio' };
    const { update, eq } = mockUpdateProject({ data: [updatedProject], error: null });
    const payload = {
      num: 'PROJECT_01',
      title: 'Updated Portfolio',
      description: 'Updated description',
      long_desc: 'Updated long description',
      icon: 'layers',
      features: ['Updated feature'],
      tech: ['Next.js'],
      github: 'https://github.com/example/portfolio',
      is_published: false,
    };

    const response = await route.PUT(jsonRequest(payload), {
      params: { id: 'portfolio' },
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await readJson(response), updatedProject);
    assert.deepEqual(update.mock.calls[0].arguments[0], payload);
    assert.deepEqual(eq.mock.calls[0].arguments, ['id', 'portfolio']);
  });

  it('PUT returns 400 when Supabase rejects the update', async () => {
    mockUpdateProject({ data: null, error: { message: 'invalid payload' } });

    const response = await route.PUT(jsonRequest({ title: 'Invalid' }), {
      params: { id: 'portfolio' },
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await readJson(response), { error: 'invalid payload' });
  });

  it('PUT returns 500 when the request body is invalid', async () => {
    const request = new Request('http://localhost/api/projects/portfolio', {
      method: 'PUT',
      body: '{not-json',
    });

    const response = await route.PUT(request, {
      params: { id: 'portfolio' },
    });

    assert.equal(response.status, 500);
    assert.deepEqual(await readJson(response), { error: 'Internal Server Error' });
  });
});
