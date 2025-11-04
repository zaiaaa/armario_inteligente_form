import { Suspense, lazy } from 'react';
import { Spinner } from '@chakra-ui/react'; // ou qualquer outro fallback leve

// Lazy import do Lottie
const DotLottieReact = lazy(() =>
  import('@lottiefiles/dotlottie-react').then(mod => ({ default: mod.DotLottieReact }))
);

const Loading = () => {
  return (
    <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
      <Suspense
        fallback={<Spinner size="xl" color="red.500" thickness="4px" speed="0.7s" />}
      >
        <DotLottieReact
          src="/animations/loading.json"
          loop
          autoplay
          style={{ width: 180, height: 180 }}
          fetchpriority="low"
        />
      </Suspense>
    </div>
  );
};

export { Loading };
