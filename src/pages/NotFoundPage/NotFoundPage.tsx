import { Button } from '@/components/Button/Button';

/**
 * NotFoundPage
 *
 * Accessible 404 Not Found page for unmatched routes.
 */
export function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <Button>
        <a href="/">Go back home</a>
      </Button>
    </div>
  );
}
