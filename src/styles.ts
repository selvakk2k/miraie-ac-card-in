import { css } from 'lit';

export const styles = css`
  :host {
    --card-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --text-primary: var(--primary-text-color, #e5e5e7);
    --text-secondary: var(--secondary-text-color, #8e8e93);
    --accent: var(--primary-color, #f9a825);
    --btn-bg: rgba(255, 255, 255, 0.06);
    --btn-hover: rgba(255, 255, 255, 0.12);
    --btn-active-bg: rgba(249, 168, 37, 0.15);
    --btn-active-border: rgba(249, 168, 37, 0.5);
    --section-gap: 16px;
  }

  ha-card {
    padding: 20px;
    border-radius: 16px;
    background: var(--card-bg);
    color: var(--text-primary);
    font-family: inherit;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--section-gap);
  }
  .header-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .title-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #636366;
    flex-shrink: 0;
  }
  .status-dot.online {
    background: #30d158;
  }
  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  .subtitle {
    font-size: 0.8rem;
    color: var(--text-secondary);
    padding-left: 14px;
  }
  .power-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: var(--btn-bg);
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  .power-btn.active {
    background: var(--accent);
    color: #1c1c1e;
  }
  .power-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ── Temperature ── */
  .temp-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--btn-bg);
    border-radius: 16px;
    padding: 12px 16px;
    margin-bottom: var(--section-gap);
  }
  .temp-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .temp-btn:hover:not(:disabled) {
    background: var(--btn-hover);
  }
  .temp-btn:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
  .temp-info {
    text-align: center;
  }
  .temp-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
  }
  .temp-room {
    display: block;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* ── Sections ── */
  .section {
    margin-bottom: var(--section-gap);
  }
  .section-title {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  /* ── Pill Buttons ── */
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--btn-bg);
    color: var(--text-secondary);
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .pill:hover:not(:disabled) {
    background: var(--btn-hover);
  }
  .pill.active {
    background: var(--btn-active-bg);
    border-color: var(--btn-active-border);
    color: var(--accent);
  }
  .pill:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .pill ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ── Toggle Grid ── */
  .toggles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .toggle-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: var(--btn-bg);
    cursor: pointer;
    transition: background 0.15s;
  }
  .toggle-card:hover {
    background: var(--btn-hover);
  }
  .toggle-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .toggle-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-secondary);
    --mdc-icon-size: 18px;
  }
  .toggle-icon.active {
    background: var(--btn-active-bg);
    color: var(--accent);
  }
  .toggle-label {
    font-size: 0.82rem;
    color: var(--text-primary);
  }

  /* ── Alert Banner ── */
  .alert-banner {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(244, 67, 54, 0.35);
    background: rgba(244, 67, 54, 0.06);
  }
  .alert-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .alert-icon {
    color: #f44336;
    --mdc-icon-size: 20px;
  }
  .alert-text {
    font-size: 0.82rem;
    font-weight: 600;
    color: #f44336;
  }
  .alert-hint {
    font-size: 0.75rem;
    color: #f44336;
  }

  /* ── Footer ── */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.72rem;
    color: var(--text-secondary);
  }
  .footer-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .footer-item ha-icon {
    --mdc-icon-size: 14px;
  }
  .footer-group {
    display: flex;
    gap: 12px;
  }

  /* ── Error state ── */
  .error {
    padding: 16px;
    color: #f44336;
    text-align: center;
  }
`;
