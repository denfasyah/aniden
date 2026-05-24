export default function NavbarStyles() {
  return (
    <style jsx global>{`
      .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        color: var(--text-secondary);
        transition: all 0.2s ease;
        outline: none;
        background: transparent;
        border: none;
        cursor: pointer;
        position: relative;
      }
      .icon-btn:hover {
        background: color-mix(in srgb, var(--primary) 14%, transparent);
        color: var(--primary);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 25%, transparent);
      }
      .icon-btn:focus-visible {
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 50%, transparent);
      }
      .profile-btn {
        border-color: color-mix(in srgb, var(--primary) 40%, transparent);
        background: color-mix(in srgb, var(--primary) 10%, transparent);
        color: var(--primary);
        transition: all 0.3s ease;
      }
      .profile-btn:hover {
        border-color: var(--primary);
        box-shadow: 0 0 12px color-mix(in srgb, var(--primary) 40%, transparent);
      }
      .dropdown-item:hover {
        background: color-mix(in srgb, var(--primary) 12%, transparent);
      }
      .dropdown-item:hover span,
      .dropdown-item:hover .text-sm {
        color: var(--primary);
      }
      .search-input {
        background: color-mix(in srgb, var(--primary) 8%, transparent);
        border-color: color-mix(in srgb, var(--primary) 35%, transparent);
        color: var(--text-primary);
      }
      .search-input::placeholder {
        color: var(--text-secondary);
      }
      .search-input:focus {
        border-color: color-mix(in srgb, var(--primary) 60%, transparent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent);
      }
      .mobile-nav-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary);
        transition: all 0.2s ease;
        width: 100%;
        cursor: pointer;
        background: transparent;
        border: none;
        text-align: left;
      }
      .mobile-nav-link:hover {
        background: color-mix(in srgb, var(--primary) 10%, transparent);
        color: var(--primary);
      }
      .mobile-sub-link {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        transition: all 0.2s ease;
        gap: 10px;
      }
      .mobile-sub-link:hover {
        background: color-mix(in srgb, var(--primary) 10%, transparent);
        color: var(--primary);
      }
    `}</style>
  );
}