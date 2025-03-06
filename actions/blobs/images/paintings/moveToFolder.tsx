import { copy } from '@vercel/blob';
 
export async function PUT(request: Request) {
  const form = await request.formData();
 
  const fromUrl = form.get('fromUrl') as string;
  const toPathname = form.get('toPathname') as string;
 
  const blob = await copy(fromUrl, toPathname, { access: 'public' });
 
  return Response.json(blob);
}