export default function LastUpdated({ timestamp }) {
  if (!timestamp) return null;

  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-100/80">
      Updated at {time}
    </p>
  );
}
