export type EventsProps = {
  events: Record<string, ((e?: any) => void) | undefined>;
};

export type APIError = {
  reason: string;
};
