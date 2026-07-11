import { css } from 'lit';

export const styles = css`
  /* ──────────────────────────────────────────────────────────
     Token layer — everything resolves from HA theme variables.
     --miraie-accent is overridden via inline style when
     the user sets accent_color in the card config.
     ────────────────────────────────────────────────────────── */
  :host {
    --miraie-accent:        var(--primary-color, #f39c12);

    /* Surfaces — HA supplies these; they flip between light/dark */
    --m-bg:                 var(--ha-card-background, var(--card-background-color, var(--lovelace-background)));
    --m-surface:            var(--secondary-background-color, rgba(128,128,128,0.08));
    --m-surface-hover:      rgba(128,128,128,0.15);
    --m-border:             var(--divider-color, rgba(128,128,128,0.14));

    /* Text */
    --m-text:               var(--primary-text-color);
    --m-text-2:             var(--secondary-text-color);

    /* Active state derived from accent */
    --m-active-bg:          color-mix(in srgb, var(--miraie-accent) 15%, transparent);
    --m-active-border:      color-mix(in srgb, var(--miraie-accent) 50%, transparent);
  }

  ha-card {
    background: var(--m-bg);
    border-radius: 18px;
    padding: 20px 18px 18px;
    color: var(--m-text);
    font-family: inherit;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .header-left { display: flex; flex-direction: column; gap: 3px; }
  .title-row   { display: flex; align-items: center; gap: 7px; }

  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--m-text-2); flex-shrink: 0;
  }
  .status-dot.online { background: var(--success-color, #2ecc71); }

  .title   { font-size: 1.05rem; font-weight: 700; }
  .subtitle { font-size: 0.78rem; color: var(--m-text-2); padding-left: 15px; }

  .power-btn {
    width: 46px; height: 46px; border-radius: 50%; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    background: var(--m-surface); color: var(--m-text-2);
    transition: all 0.2s; --mdc-icon-size: 22px;
  }
  .power-btn.on { background: var(--miraie-accent); color: var(--m-bg); }
  .power-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* ── Temperature block ── */
  .temp-block {
    background: var(--m-surface); border-radius: 16px;
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .temp-btn {
    width: 38px; height: 38px; border-radius: 50%; border: none;
    background: transparent; color: var(--m-text-2); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; --mdc-icon-size: 20px;
  }
  .temp-btn:hover:not(:disabled) { background: var(--m-surface-hover); }
  .temp-btn:disabled { opacity: 0.25; cursor: not-allowed; }
  .temp-center { text-align: center; flex: 1; }
  .temp-value  { font-size: 2rem; font-weight: 800; letter-spacing: -1px; }
  .temp-meta {
    display: flex; align-items: center; justify-content: center;
    gap: 16px; margin-top: 8px;
  }
  .temp-meta-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.95rem; font-weight: 500; color: var(--m-text);
  }
  .temp-meta-item ha-icon { --mdc-icon-size: 16px; color: var(--m-text-2); }

  /* ── Generic section ── */
  .section { margin-bottom: 22px; }
  .section-title {
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--m-text-2); margin-bottom: 8px;
  }

  /* ── Pills ── */
  .pills { display: flex; flex-wrap: wrap; gap: 10px; }
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 24px;
    border: 1px solid var(--m-border);
    background: var(--m-surface); color: var(--m-text-2);
    font-size: 0.85rem; cursor: pointer; white-space: nowrap;
    transition: all 0.18s; --mdc-icon-size: 15px;
  }
  .pill:hover:not(:disabled) { background: var(--m-surface-hover); }
  .pill.active {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: var(--miraie-accent);
  }
  .pill:disabled { opacity: 0.28; cursor: not-allowed; }

  @media (max-width: 450px) {
    .pills { gap: 6px; }
    .pill { padding: 7px 11px; font-size: 0.78rem; gap: 4px; }
    .pill ha-icon { --mdc-icon-size: 14px; }
  }

  /* ── Picker panel (fan / swing) ── */
  .picker-panel {
    margin-top: 8px; border-radius: 14px;
    background: var(--m-surface); border: 1px solid var(--m-border);
    padding: 14px; display: flex; flex-wrap: wrap; gap: 8px;
    animation: slideDown 0.15s ease;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .picker-opt {
    padding: 8px 16px; border-radius: 16px;
    border: 1px solid var(--m-border);
    background: transparent; color: var(--m-text-2);
    font-size: 0.85rem; cursor: pointer; transition: all 0.15s;
  }
  .picker-opt:hover { background: var(--m-surface-hover); }
  .picker-opt.sel {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: var(--miraie-accent); font-weight: 600;
  }

  /* ── Step slider (Convertible mode) ── */
  .step-slider-wrap {
    margin-top: 8px; border-radius: 14px;
    background: var(--m-surface); border: 1px solid var(--m-border);
    padding: 16px 16px 12px;
    animation: slideDown 0.15s ease;
  }
  .step-slider-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 18px;
  }
  .step-slider-title { font-size: 0.82rem; font-weight: 600; }
  .step-slider-val   { font-size: 0.9rem; font-weight: 800; color: var(--miraie-accent); }

  /* Track + notches */
  .step-track-outer {
    position: relative; height: 28px;
    display: flex; align-items: center;
    padding: 0 8px; /* half-notch inset so first/last dot don't clip */
  }
  .step-track-bg {
    position: absolute; left: 8px; right: 8px;
    height: 4px; border-radius: 2px; background: var(--m-border);
    overflow: visible;
  }
  .step-track-fill {
    position: absolute; top: 0; left: 0;
    height: 100%; border-radius: 2px;
    background: var(--miraie-accent);
    transition: width 0.2s ease;
  }
  .step-notches {
    position: absolute; left: 8px; right: 8px;
    top: 50%; transform: translateY(-50%);
    display: flex; justify-content: space-between; align-items: center;
  }
  .step-notch {
    width: 13px; height: 13px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--m-border);
    background: var(--m-bg);
    cursor: pointer; transition: all 0.15s; z-index: 1;
  }
  .step-notch.filled {
    background: var(--miraie-accent); border-color: var(--miraie-accent);
  }
  .step-notch.current {
    width: 19px; height: 19px;
    background: var(--miraie-accent); border-color: var(--miraie-accent);
    box-shadow: 0 0 0 4px var(--m-active-bg);
  }
  .step-notch:disabled { cursor: not-allowed; opacity: 0.4; }

  .step-labels {
    display: flex; justify-content: space-between;
    margin-top: 6px; padding: 0 2px;
  }
  .step-label { font-size: 0.65rem; color: var(--m-text-2); }

  /* ── Toggle Cards (controls) ── */
  .toggles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .toggle-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; border-radius: 14px;
    border: 1px solid var(--m-border); background: var(--m-surface);
    cursor: pointer; transition: background 0.15s;
  }
  .toggle-card:hover { background: var(--m-surface-hover); }
  .toggle-left { display: flex; align-items: center; gap: 9px; }
  .toggle-icon {
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    background: var(--m-surface-hover); color: var(--m-text-2);
    --mdc-icon-size: 17px;
  }
  .toggle-icon.active { background: var(--m-active-bg); color: var(--miraie-accent); }
  .toggle-label { font-size: 0.8rem; }
  .toggle-action { --mdc-icon-size: 18px; color: var(--m-text-2); margin-right: 2px; }

  /* ── Filter Alert Banner ── */
  .alert-banner {
    border-radius: 14px; border: 1px solid rgba(244,67,54,0.35);
    background: rgba(244,67,54,0.06); padding: 12px 14px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .alert-left { display: flex; align-items: center; gap: 9px; }
  .alert-icon { color: var(--error-color, #f44336); --mdc-icon-size: 20px; }
  .alert-text { font-size: 0.82rem; font-weight: 700; color: var(--error-color, #f44336); }
  .alert-hint { font-size: 0.72rem; color: var(--error-color, #f44336); }

  /* ── Energy Cards ── */
  .energy-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .energy-card {
    flex: 1; border-radius: 14px;
    background: var(--m-surface); border: 1px solid var(--m-border);
    padding: 12px 14px; cursor: pointer; transition: background 0.15s;
  }
  .energy-card:hover { background: var(--m-surface-hover); }
  .energy-label {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.7rem; font-weight: 600; color: var(--m-text-2);
    text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;
  }
  .energy-label ha-icon { --mdc-icon-size: 14px; color: var(--miraie-accent); }
  .energy-value-row { display: flex; align-items: baseline; gap: 4px; }
  .energy-value { font-size: 1.4rem; font-weight: 800; }
  .energy-unit  { font-size: 0.75rem; color: var(--m-text-2); }

  /* ── Footer ── */
  .footer {
    display: flex; align-items: center; justify-content: center;
    gap: 5px; padding-top: 12px; border-top: 1px solid var(--m-border);
    margin-top: 6px; font-size: 0.72rem; color: var(--m-text-2);
  }
  .footer ha-icon { --mdc-icon-size: 13px; }

  /* ── Error ── */
  .error { padding: 20px; color: var(--error-color, #f44336); text-align: center; font-size: 0.85rem; }
`;
