import { css } from 'lit';

export const styles = css`
  /* ──────────────────────────────────────────────────────────
     Default Token Layer (Standard Home Assistant)
     ────────────────────────────────────────────────────────── */
  :host {
    --miraie-accent:        var(--primary-color, #f39c12);

    /* Surfaces */
    --m-bg:                 var(--ha-card-background, var(--card-background-color, var(--lovelace-background)));
    --m-surface:            var(--secondary-background-color, rgba(128,128,128,0.08));
    --m-surface-hover:      rgba(128,128,128,0.15);
    --m-border:             var(--divider-color, rgba(128,128,128,0.14));

    /* Text */
    --m-text:               var(--primary-text-color);
    --m-text-2:             var(--secondary-text-color);
    --m-on-accent:          var(--text-primary-color, var(--m-bg));

    /* Active state */
    --m-active-bg:          color-mix(in srgb, var(--miraie-accent) 15%, transparent);
    --m-active-border:      color-mix(in srgb, var(--miraie-accent) 50%, transparent);
  }

  /* ──────────────────────────────────────────────────────────
     Material You Token Layer (Activated via Config)
     ────────────────────────────────────────────────────────── */
  :host([theme="material_you"]) {
    --miraie-accent:        var(--md-sys-color-primary, var(--primary-color, #f39c12));

    /* Surfaces - using surface-variant or surface-container for better contrast against background */
    --m-bg:                 var(--md-sys-color-surface-variant, var(--md-sys-color-surface, var(--ha-card-background, var(--card-background-color, var(--lovelace-background)))));
    --m-surface:            var(--md-sys-color-surface, var(--secondary-background-color, rgba(128,128,128,0.08)));
    --m-surface-hover:      var(--md-sys-color-surface-variant-hover, var(--hover-color, rgba(128,128,128,0.15)));
    --m-border:             var(--md-sys-color-outline-variant, var(--md-sys-color-outline, var(--divider-color, rgba(128,128,128,0.14))));

    /* Text */
    --m-text:               var(--md-sys-color-on-surface, var(--primary-text-color));
    --m-text-2:             var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
    --m-on-accent:          var(--md-sys-color-on-primary, var(--text-primary-color, var(--m-bg)));

    /* Active state */
    --m-active-bg:          var(--md-sys-color-secondary-container, color-mix(in srgb, var(--miraie-accent) 15%, transparent));
    --m-active-border:      var(--md-sys-color-secondary, color-mix(in srgb, var(--miraie-accent) 50%, transparent));
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
  .power-btn.on { background: var(--miraie-accent); color: var(--m-on-accent); }
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
  .step-slider-val { font-size: 0.9rem; font-weight: 800; color: var(--miraie-accent); }
  .step-track-outer {
    position: relative; height: 4px; margin: 16px 6px 28px;
  }
  .step-track-bg {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--m-border); border-radius: 2px;
  }
  .step-track-fill {
    height: 100%; background: var(--miraie-accent); border-radius: 2px;
    transition: width 0.3s ease;
  }
  .step-notches {
    position: absolute; top: -4px; left: 0; width: 100%; height: 12px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .notch-wrapper {
    position: relative; display: flex; justify-content: center; width: 12px; height: 12px;
  }
  .step-notch {
    width: 12px; height: 12px; border-radius: 50%; padding: 0;
    background: var(--m-surface-hover); border: 2px solid var(--m-border);
    cursor: pointer; transition: all 0.2s;
  }
  .step-notch:hover:not(:disabled) { transform: scale(1.3); }
  .step-notch.filled { background: var(--miraie-accent); border-color: var(--miraie-accent); }
  .step-notch.current {
    transform: scale(1.4); background: var(--miraie-accent);
    border-color: var(--m-surface); box-shadow: 0 0 0 1px var(--miraie-accent);
  }
  .step-notch:disabled { cursor: not-allowed; opacity: 0.4; }
  
  .notch-label {
    position: absolute; top: 16px; font-size: 0.65rem; color: var(--m-text-2); font-weight: 600;
  }
  .notch-label.current { color: var(--miraie-accent); font-weight: 700; }
  .step-label { font-size: 0.65rem; color: var(--m-text-2); }

  /* ── Toggle Cards (controls) ── */
  .toggles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .toggle-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; border-radius: 14px;
    border: 1px solid var(--m-border); background: var(--m-surface);
    cursor: pointer; transition: background 0.15s;
  }
  .toggle-card:hover:not(.disabled) { background: var(--m-surface-hover); }
  .toggle-card.disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }
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

  /* ──────────────────────────────────────────────────────────
     Compact View (Google Home Style)
     ────────────────────────────────────────────────────────── */
  .compact-card {
    cursor: pointer;
    transition: background 0.2s;
    background: var(--m-bg);
    border-radius: 28px;
    padding: 4px;
    box-sizing: border-box;
  }
  .compact-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 12px 0 12px;
  }
  .compact-icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--m-border);
    color: var(--m-text-2);
    cursor: pointer;
    transition: 0.2s;
    outline: none;
  }
  .compact-icon-btn:hover {
    background: rgba(128, 128, 128, 0.15);
  }
  .compact-icon-btn.on {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: var(--miraie-accent);
  }
  .compact-title {
    font-weight: 500;
    font-size: 1rem;
    flex: 1;
    margin-left: 4px;
    color: var(--m-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .compact-chevron {
    color: var(--m-text-2);
    opacity: 0.5;
  }
  .compact-center {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
  .compact-value {
    font-size: 2.5rem;
    font-weight: 400;
    color: var(--m-text);
  }
  .compact-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 12px 12px;
  }
  .compact-action-btn {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: transparent;
    border: 1px solid var(--m-border);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--m-text);
    cursor: pointer;
    transition: 0.2s;
    outline: none;
  }
  .compact-action-btn:hover:not(:disabled) {
    background: rgba(128, 128, 128, 0.15);
  }
  .compact-action-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .compact-subtitle {
    color: var(--m-text-2);
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* ──────────────────────────────────────────────────────────
     Google Home Full View
     ────────────────────────────────────────────────────────── */
  .gh-full-card {
    background: var(--m-bg);
    border-radius: 28px;
    padding: 16px;
    box-sizing: border-box;
  }
  .gh-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 24px;
  }
  .gh-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .gh-icon {
    color: var(--m-text-2);
    --mdc-icon-size: 20px;
  }
  .gh-title {
    font-weight: 500;
    font-size: 1.05rem;
    color: var(--m-text);
  }
  .gh-power-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--m-text-2);
    cursor: pointer;
    transition: 0.2s;
    outline: none;
  }
  .gh-power-btn:hover {
    background: rgba(128, 128, 128, 0.15);
  }
  .gh-power-btn.on {
    background: var(--m-active-bg);
    color: var(--miraie-accent);
  }
  .gh-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 0 16px 0;
  }
  .gh-value-large {
    font-size: 5rem;
    font-weight: 400;
    line-height: 1.1;
    color: var(--m-text);
  }
  .gh-subtitle-large {
    font-size: 1rem;
    font-weight: 500;
    color: var(--m-text-2);
    margin-top: 8px;
  }
  .gh-action-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }
  .gh-circular-btn {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(128, 128, 128, 0.15);
    border: none;
    color: var(--m-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    --mdc-icon-size: 32px;
  }
  .gh-circular-btn:hover {
    background: rgba(128, 128, 128, 0.25);
  }
  .gh-circular-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .gh-pill-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .gh-pill {
    flex: 1 1 calc(50% - 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 16px;
    border-radius: 20px;
    background: rgba(128, 128, 128, 0.15);
    border: none;
    color: var(--m-text);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
  }
  .gh-pill:hover {
    background: rgba(128, 128, 128, 0.25);
  }
  .gh-pill.active {
    background: var(--m-active-bg);
    color: var(--miraie-accent);
  }
  .gh-extra-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 16px;
  }
  .gh-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 16px;
    background: rgba(128, 128, 128, 0.15);
    color: var(--m-text-2);
    font-size: 0.8rem;
    cursor: pointer;
    --mdc-icon-size: 16px;
  }
  .gh-chip.active {
    color: var(--miraie-accent);
  }
  .gh-chip-text {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 16px;
    background: rgba(128, 128, 128, 0.15);
    color: var(--m-text-2);
    font-size: 0.8rem;
    --mdc-icon-size: 16px;
  }
`;
