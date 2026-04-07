import { RequestHandler } from 'expo-router/server';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  note: string;
  submittedAt: string;
};

const dataDirectory = path.join(process.cwd(), 'data');
const submissionsFile = path.join(dataDirectory, 'contact-submissions.json');

async function readSubmissions() {
  try {
    const content = await readFile(submissionsFile, 'utf8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const POST: RequestHandler = async (request) => {
  try {
    const body = (await request.json()) as Partial<ContactSubmission>;

    const payload: ContactSubmission = {
      name: body.name?.trim() || '',
      email: body.email?.trim() || '',
      phone: body.phone?.trim() || '',
      note: body.note?.trim() || '',
      submittedAt: new Date().toISOString(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.note) {
      return Response.json(
        { error: 'Please provide name, email, phone number, and note.' },
        { status: 400 }
      );
    }

    await mkdir(dataDirectory, { recursive: true });
    const existing = await readSubmissions();
    existing.push(payload);
    await writeFile(submissionsFile, JSON.stringify(existing, null, 2), 'utf8');

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Unable to submit contact form right now.' }, { status: 500 });
  }
};
