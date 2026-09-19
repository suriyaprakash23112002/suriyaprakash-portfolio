import {
  FiAlertCircle,
  FiCheckCircle,
  FiInbox,
  FiLoader,
  FiX,
} from "react-icons/fi";

export function AdminLoader({ label = "Loading..." }) {
  return (
    <div className="admin-ui-loader" role="status" aria-live="polite">
      <div className="admin-ui-loader-mark">
        <span>SP</span>
        <i />
      </div>
      <div className="admin-ui-loader-copy">
        <strong>{label}</strong>
        <span>PORTFOLIO ADMIN</span>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}) {
  return (
    <div className="admin-ui-page-header">
      <div className="admin-ui-page-heading">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {actions && (
        <div className="admin-ui-page-actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export function AdminAlert({ type = "success", children }) {
  if (!children) return null;

  return (
    <div className={`admin-ui-alert admin-ui-alert-${type}`}>
      {type === "error" ? <FiAlertCircle /> : <FiCheckCircle />}
      <span>{children}</span>
    </div>
  );
}

export function AdminEmptyState({
  icon,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="admin-ui-empty">
      <div className="admin-ui-empty-icon">
        {icon || <FiInbox />}
      </div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function AdminModal({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
  size = "md",
}) {
  if (!open) return null;

  return (
    <div
      className="admin-ui-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        className={`admin-ui-modal admin-ui-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="admin-ui-modal-header">
          <div>
            {eyebrow && <span>{eyebrow}</span>}
            <h2>{title}</h2>
          </div>

          <button
            type="button"
            className="admin-ui-icon-button"
            onClick={onClose}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="admin-ui-modal-body">{children}</div>

        {footer && (
          <div className="admin-ui-modal-footer">{footer}</div>
        )}
      </section>
    </div>
  );
}

export function AdminSaving({ label = "Saving..." }) {
  return (
    <>
      <FiLoader className="admin-ui-spin" />
      {label}
    </>
  );
}
