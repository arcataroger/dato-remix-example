import { redirect } from 'remix';
import { getSession, commitSession } from '~/sessions';

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  session.unset('preview');

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const loader = async ({request}) => {
  console.log('stop loader request', request)
  const session = await getSession(request.headers.get('Cookie'));

  session.unset('preview');

  return redirect(new URL(request.url).searchParams.get('redirect') ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}