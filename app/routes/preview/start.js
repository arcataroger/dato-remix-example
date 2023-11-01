import { redirect } from 'remix';
import { getSession, commitSession } from '~/sessions';

export const action = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  session.set('preview', 'yes');

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const loader = async ({request}) => {
  console.log('loader request', request)
  const session = await getSession(request.headers.get('Cookie'));

  session.set('preview', 'yes');

  return redirect(new URL(request.url).searchParams.get('redirect') ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}