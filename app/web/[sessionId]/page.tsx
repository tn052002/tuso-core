import { WebOracle } from '../WebOracle';
import '../web.css';

type WebSessionPageProps = {
  params: {
    sessionId: string;
  };
};

export default function WebSessionPage({ params }: WebSessionPageProps) {
  return <WebOracle anonymousSessionId={params.sessionId} />;
}
