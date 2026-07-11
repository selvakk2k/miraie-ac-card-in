import { css } from 'lit';

export const styles = css`
  :host {
    --accent: var(--primary-color, #f39c12);
    --accent-rgb: 243, 156, 18;
    --text-primary: var(--primary-text-color, #e8e8e8);
    --text-secondary: var(--secondary-text-color, #888);
    --card-bg: var(--ha-card-background, var(--card-background-color, #1e1e1e));
    --surface: rgba(255,255,255,0.05);
    --surface-hover: rgba(255,255,255,0.09);
    --border: rgba(255,255,255,0.07);
    --active-bg: rgba(var(--accent-rgb), 0.15);
    --active-border: rgba(var(--accent-rgb), 0.45);
  }

  ha-card {
    background: var(--card-bg);
    border-radius: 18px;
    padding: 20px 18px 18px;
    color: var(--text-primary);
    font-family: inherit;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }
  .header-left { display: flex; flex-direction: column; gap: 3px; }
  .title-row { display: flex; align-items: center; gap: 7px; }
  .status-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #555; flex-shrink: 0;
  }
  .status-dot.online { background: #2ecc71; }
  .title { font-size: 1.05rem; font-weight: 700; }
  .subtitle { font-size: 0.78rem; color: var(--text-secondary); padding-left: 15px; }
  .power-btn {
    width: 46px; height: 46px; border-radius: 50%;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    background: var(--surface);
    color: var(--text-secondary);
    transition: all 0.2s;
    --mdc-icon-size: 22px;
  }
  .power-btn.on { background: var(--accent); color: #1a1a1a; }
  .power-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* ── Temperature Block ── */
  .temp-block {
    background: var(--surface);
    border-radius: 16px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }
  .temp-btn {
    width: 38px; height: 38px; border-radius: 50%;
    border: none; background: transparent;
    color: var(--text-secondary); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
    --mdc-icon-size: 20px;
  }
  .temp-btn:hover:not(:disabled) { background: var(--surface-hover); }
  .temp-btn:disabled { opacity: 0.25; cursor: not-allowed; }
  .temp-center { text-align: center; flex: 1; }
  .temp-value { font-size: 2rem; font-weight: 800; letter-spacing: -1px; }
  .temp-meta {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; margin-top: 4px;
  }
  .temp-meta-item {
    display: flex; align-items: center; gap: 4px;
    font-size: 0.75rem; color: var(--text-secondary);
  }
  .temp-meta-item ha-icon { --mdc-icon-size: 13px; }

  /* ── Section ── */
  .section { margin-bottom: 16px; }
  .section-title {
    font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--text-secondary); margin-bottom: 8px;
  }

  /* ── Pills ── */
  .pills { display: flex; flex-wrap: wrap; gap: 7px; }
  .pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 7px 14px; border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-secondary);
    font-size: 0.82rem; cursor: pointer;
    transition: all 0.18s; white-space: nowrap;
    --mdc-icon-size: 15px;
  }
  .pill:hover:not(:disabled) { background: var(--surface-hover); }
  .pill.active {
    background: var(--active-bg);
    border-color: var(--active-border);
    color: var(--accent);
  }
  .pill:disabled { opacity: 0.28; cursor: not-allowed; }

  /* ── Selection Panel (fan/swing picker) ── */
  .picker-panel {
    margin-top: 8px;
    background: var(--surface);
    border-radius: 12px;
    padding: 12px;
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .picker-option {
    padding: 6px 14px; border-radius: 16px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.8rem; cursor: pointer;
    transition: all 0.15s;
  }
  .picker-option:hover { background: var(--surface-hover); }
  .picker-option.selected {
    background: var(--active-bg);
    border-color: var(--active-border);
    color: var(--accent);
    font-weight: 600;
  }

  /* ── Slider (Convertible mode) ── */
  .slider-wrap {
    margin-top: 8px;
    background: var(--surface);
    border-radius: 12px;
    padding: 14px 16px 12px;
  }
  .slider-header {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 10px;
  }
  .slider-label {
    font-size: 0.82rem; font-weight: 600; color: var(--text-primary);
  }
  .slider-value {
    font-size: 0.82rem; font-weight: 700; color: var(--accent);
  }
  input[type=range] {
    width: 100%; height: 5px; border-radius: 4px;
    background: var(--border); appearance: none; cursor: pointer;
    accent-color: var(--accent);
    outline: none;
  }
  input[type=range]::-webkit-slider-thumb {
    appearance: none;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--accent); cursor: pointer;
    box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.5);
  }
  .slider-ticks {
    display: flex; justify-content: space-between;
    margin-top: 6px;
  }
  .slider-tick { font-size: 0.65rem; color: var(--text-secondary); }

  /* ── Toggle Cards ── */
  .toggles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .toggle-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--surface); cursor: pointer;
    transition: background 0.15s;
  }
  .toggle-card:hover { background: var(--surface-hover); }
  .toggle-left { display: flex; align-items: center; gap: 9px; }
  .toggle-icon {
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.06); color: var(--text-secondary);
    --mdc-icon-size: 17px;
  }
  .toggle-icon.active { background: var(--active-bg); color: var(--accent); }
  .toggle-label { font-size: 0.8rem; color: var(--text-primary); }
  .toggle-action { --mdc-icon-size: 18px; color: var(--text-secondary); margin-right: 2px; }

  /* ── Filter Alert ── */
  .alert-banner {
    grid-column: span 2;
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; border-radius: 12px;
    border: 1px solid rgba(244,67,54,0.3);
    background: rgba(244,67,54,0.05);
  }
  .alert-left { display: flex; align-items: center; gap: 8px; }
  .alert-icon { color: #f44336; --mdc-icon-size: 19px; }
  .alert-text { font-size: 0.8rem; font-weight: 700; color: #f44336; }
  .alert-hint { font-size: 0.72rem; color: #f44336; }

  /* ── Energy & Footer ── */
  .energy-row {
    display: flex; gap: 10px; margin-top: 4px;
  }
  .energy-card {
    flex: 1; border-radius: 14px;
    background: var(--surface); border: 1px solid var(--border);
    padding: 12px 14px;
  }
  .energy-label {
    font-size: 0.7rem; font-weight: 600; color: var(--text-secondary);
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;
  }
  .energy-value-row { display: flex; align-items: baseline; gap: 5px; }
  .energy-value {
    font-size: 1.35rem; font-weight: 800; color: var(--text-primary);
  }
  .energy-unit { font-size: 0.75rem; color: var(--text-secondary); }
  .energy-icon { --mdc-icon-size: 16px; color: var(--accent); margin-bottom: 2px; }

  .footer {
    display: flex; align-items: center; justify-content: center;
    padding-top: 12px; border-top: 1px solid var(--border);
    margin-top: 6px;
    font-size: 0.72rem; color: var(--text-secondary); gap: 6px;
  }
  .footer ha-icon { --mdc-icon-size: 13px; }

  /* ── Error ── */
  .error { padding: 20px; color: #f44336; text-align: center; font-size: 0.85rem; }
`;
