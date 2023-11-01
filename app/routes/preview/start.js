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

export const loader = async ({params}) => {
  const session = await getSession(request.headers.get('Cookie'));

  session.set('preview', 'yes');

  return redirect(params.redirect ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}