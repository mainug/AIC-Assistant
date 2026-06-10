import { Link } from "react-router-dom";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

function EmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      {eyebrow && <div className="empty-state-eyebrow">{eyebrow}</div>}
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-description">{description}</p>

      {actionLabel && actionHref && (
        <Link className="empty-state-action" to={actionHref}>
          {actionLabel}
        </Link>
      )}
    </section>
  );
}

export default EmptyState;
