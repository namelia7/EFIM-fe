// src/components/PrivateRoute.tsx
import { Navigate } from '@solidjs/router';
import { Show, Component, createEffect} from 'solid-js';
import { authState, checkAuthStatus } from '../stores/auth';
import Layout from '../layouts/Layout';

// Helper function untuk membuat protected route
export const withAuth = (Component: Component) => {
  return () => {
    // Check auth status when component loads
    createEffect(() => {
      checkAuthStatus();
    });

    return (
      <Show when={authState.isLoggedIn} fallback={<Navigate href="/login" />}>
        <Layout>
          <Component />
        </Layout>
      </Show>
    );
  };
};

// Component wrapper - menerima children
interface PrivateRouteProps {
  children: any; // atau JSX.Element
}

const PrivateRoute = (props: PrivateRouteProps) => {
  // Check auth status when component loads
  createEffect(() => {
    checkAuthStatus();
  });

  return (
    <Show when={authState.isLoggedIn} fallback={<Navigate href="/login" />}>
      <Layout>
        {props.children}
      </Layout>
    </Show>
  );
};

export default PrivateRoute;