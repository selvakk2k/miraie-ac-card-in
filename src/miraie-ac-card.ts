import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { MirAIeCardConfig } from './types';
import { styles } from './styles';

/* ── Card picker registration ── */
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'miraie-ac-card-in',
  name: 'MirAIe AC Card',
  description: 'A premium thermostat card for Panasonic MirAIe AC units',
  preview: true,
});

/* ─────────────────────────────────────────────
   Pure helpers (no side effects)
   ───────────────────────────────────────────── */

/** Parse "cv NNN" → number.  "cv 0" → 0.  Unknown → -1. */
function parseCv(opt: string): number {
  const m = /^cv[\s_]+(\d+)$/.exec((opt ?? '').trim());
  return m ? parseInt(m[1], 10) : -1;
}

/**
 * Detect Converti8 vs Converti7 by the presence of the 60 % and 50 % steps
 * (8-in-1 replaces the single 55 % step with 60 % + 50 %).
 */
function convertiLabel(options: string[]): string {
  if (!options?.length) return 'Convertible';
  return options.some(o => parseCv(o) === 60) && options.some(o => parseCv(o) === 50) ? 'Converti8' : 'Converti7';
}

/** Round to 2 dp, no trailing zeros. */
function fmt2(v: number | string): string {
  const n = Number(v);
  return isNaN(n) ? String(v) : n.toFixed(2);
}

@customElement('miraie-ac-card-in')
export class MirAIeACCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: MirAIeCardConfig;

  /** Which expandable picker is open: 'fan' | 'swing_v' | 'swing_h' | null */
  @state() private _openPanel: string | null = null;
  @state() private _expanded: boolean = false;
  @state() private _ghDropdown: string | null = null;

  static get styles() { return styles; }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._handleWindowClick);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._handleWindowClick);
    super.disconnectedCallback();
  }

  private _handleWindowClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (this._ghDropdown && !path.includes(this)) {
      this._ghDropdown = null;
    }
  };

  /* ── Native visual editor (HA renders this; no custom element needed) ── */
  static getConfigForm() {
    return {
      schema: [
        { name: 'entity',  required: true, selector: { entity: { domain: 'climate' } } },
        { name: 'name',    selector: { text: {} } },
        { name: 'theme', selector: { select: { options: [{ label: 'Default HA Theme', value: 'default' }, { label: 'Material You', value: 'material_you' }] } } },
        { name: 'layout', selector: { select: { options: [{ label: 'Default (Full)', value: 'default' }, { label: 'Compact (Expandable)', value: 'compact' }] } } },
        { name: 'full_layout', selector: { select: { options: [{ label: 'Classic', value: 'default' }, { label: 'Google Home', value: 'google_home' }] } } },
        { name: 'accent_color', selector: { ui_color: {} } },
        { name: 'main_color', selector: { ui_color: {} } },
        {
          name: '', type: 'expandable', title: 'Display Sensors', icon: 'mdi:thermometer',
          schema: [
            { name: 'room_temp_sensor', selector: { entity: { domain: 'sensor' } } },
            { name: 'humidity_sensor',  selector: { entity: { domain: 'sensor' } } },
          ],
        },
        {
          name: '', type: 'expandable', title: 'Convertible & Controls', icon: 'mdi:toggle-switch-outline',
          schema: [

            { name: 'nanoe_switch',            selector: { entity: { domain: 'switch' } } },
            { name: 'display_switch',          selector: { entity: { domain: 'switch' } } },
            { name: 'coil_clean_button',       selector: { entity: { domain: 'button' } } },
            { name: 'coil_cleaning_sensor',    selector: { entity: { domain: 'binary_sensor' } } },
            {
              name: 'filter_alert_sensor',
              selector: { entity: { domain: 'binary_sensor' } },
              // helper text shown in editor
            },
          ],
        },
        {
          name: '', type: 'expandable', title: 'Diagnostics & Energy', icon: 'mdi:chart-line',
          schema: [
            { name: 'rssi_sensor',             selector: { entity: { domain: 'sensor' } } },
            { name: 'energy_today_sensor',     selector: { entity: { domain: 'sensor' } } },
            { name: 'energy_yesterday_sensor', selector: { entity: { domain: 'sensor' } } },
          ],
        },
      ],
    };
  }

  static getStubConfig() {
    return { type: 'custom:miraie-ac-card-in', entity: '' };
  }

  /* ── Config ── */
  public setConfig(config: MirAIeCardConfig): void {
    if (!config.entity || !config.entity.startsWith('climate.')) {
      throw new Error('Please define a valid climate entity.');
    }
    this._config = { ...config };
    this._openPanel = null;
  }

  /* ── Lifecycle ── */
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('_config')) {
      const theme = this._config?.theme || 'default';
      if (this.getAttribute('theme') !== theme) {
        this.setAttribute('theme', theme);
      }
    }
  }

  /* ── Selective re-render ── */
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config') || changedProps.has('_openPanel') || changedProps.has('_expanded') || changedProps.has('_ghDropdown')) return true;
    if (changedProps.has('hass') && this._config) {
      const old = changedProps.get('hass') as HomeAssistant | undefined;
      if (!old) return true;
      const cfg = this._config;
      return [
        cfg.entity, cfg.room_temp_sensor, cfg.humidity_sensor,
        cfg.nanoe_switch, cfg.display_switch,
        cfg.coil_clean_button, cfg.coil_cleaning_sensor, cfg.filter_alert_sensor,
        cfg.rssi_sensor, cfg.energy_today_sensor, cfg.energy_yesterday_sensor,
      ].filter(Boolean).some((id) => old.states[id!] !== this.hass.states[id!]);
    }
    return false;
  }

  /* ─────────────────────────────────────────────
     Render
     ───────────────────────────────────────────── */
  protected render(): TemplateResult | null {
    if (!this.hass || !this._config) return null;

    const cfg = this._config;
    const stateObj = this.hass.states[cfg.entity];
    if (!stateObj) {
      return html`<ha-card><div class="error">Entity not found: ${cfg.entity}</div></ha-card>`;
    }

    const a = stateObj.attributes;
    const isOnline = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    const isOn     = stateObj.state !== 'off' && isOnline;

    const friendlyName = cfg.name || a.friendly_name || 'AC';
    const targetTemp   = a.temperature;
    const minTemp      = a.min_temp ?? 16;
    const maxTemp      = a.max_temp ?? 30;
    const hvacMode     = stateObj.state;
    const fanMode      = a.fan_mode;
    const swingV       = a.swing_mode;
    const swingH       = a.swing_horizontal_mode;
    const presetMode   = a.preset_mode;

    /* Room temperature: external sensor overrides AC built-in */
    const roomSensor   = cfg.room_temp_sensor ? this.hass.states[cfg.room_temp_sensor] : undefined;
    let currentTemp: any = roomSensor ? roomSensor.state : a.current_temperature;
    if (currentTemp != null && !isNaN(Number(currentTemp))) {
      currentTemp = Number(currentTemp).toFixed(1);
    }

    /* Humidity */
    const humidState   = cfg.humidity_sensor ? this.hass.states[cfg.humidity_sensor] : undefined;
    let humidVal: any = humidState ? humidState.state : undefined;
    if (humidVal != null && !isNaN(Number(humidVal))) {
      humidVal = Number(humidVal).toFixed(1);
    }

    /* Helper entities */

    const nanoe        = cfg.nanoe_switch              ? this.hass.states[cfg.nanoe_switch]              : undefined;
    const display      = cfg.display_switch            ? this.hass.states[cfg.display_switch]            : undefined;
    const coilBtn      = cfg.coil_clean_button         ? this.hass.states[cfg.coil_clean_button]         : undefined;
    const coilSensor   = cfg.coil_cleaning_sensor      ? this.hass.states[cfg.coil_cleaning_sensor]      : undefined;
    const filterAlert  = cfg.filter_alert_sensor       ? this.hass.states[cfg.filter_alert_sensor]       : undefined;
    const rssi         = cfg.rssi_sensor               ? this.hass.states[cfg.rssi_sensor]               : undefined;
    const energyToday  = cfg.energy_today_sensor       ? this.hass.states[cfg.energy_today_sensor]       : undefined;
    const energyYest   = cfg.energy_yesterday_sensor   ? this.hass.states[cfg.energy_yesterday_sensor]   : undefined;
    const isCleaning   = coilSensor?.state === 'on';

    /* Convertible step-slider data */
    let cvOptions: string[] = [];
    let cvPrefix = 'cv_';

    if (a.preset_modes && a.preset_modes.some((p: string) => /^cv[\s_]/.test(p))) {
      cvOptions = a.preset_modes.filter((p: string) => /^cv[\s_]/.test(p));
      cvPrefix = cvOptions[0].substring(0, 3);
      if (!cvOptions.includes(`${cvPrefix}0`)) cvOptions.push(`${cvPrefix}0`);
    }
    let curCvOpt = a.preset_mode && /^cv[\s_]/.test(a.preset_mode) ? a.preset_mode : `${cvPrefix}0`;

    // Sorted ascending: [40, 50, 60, ...] (without 0 = Normal)
    const cvNonZero  = cvOptions.filter(o => parseCv(o) > 0).sort((a, b) => parseCv(a) - parseCv(b));
    // All steps: Normal first, then ascending percentage steps
    const allCvSteps = [`${cvPrefix}0`, ...cvNonZero];
    const curCvIdx   = allCvSteps.indexOf(curCvOpt);   // 0 = Normal
    const cvGenLabel = convertiLabel(cvOptions);
    const fillPct    = cvNonZero.length > 0
      ? (curCvIdx / (allCvSteps.length - 1)) * 100
      : 0;

    /* Custom accent and main colors applied as CSS vars via inline style */
    let accentStyle = '';
    if (this._config.accent_color) {
      if (Array.isArray(this._config.accent_color)) {
        accentStyle = `rgb(${this._config.accent_color.join(',')})`;
      } else if (typeof this._config.accent_color === 'string') {
        const c = this._config.accent_color.toLowerCase();
        if (c === 'primary') accentStyle = 'var(--primary-color)';
        else if (c === 'accent') accentStyle = 'var(--accent-color)';
        else if (/^[a-z-]+$/.test(c)) accentStyle = `var(--${c}-color, ${c})`;
        else accentStyle = c;
      }
    }

    let mainStyle = '';
    if (this._config.main_color) {
      if (Array.isArray(this._config.main_color)) {
        mainStyle = `rgb(${this._config.main_color.join(',')})`;
      } else if (typeof this._config.main_color === 'string') {
        const c = this._config.main_color.toLowerCase();
        if (c === 'primary') mainStyle = 'var(--primary-color)';
        else if (c === 'accent') mainStyle = 'var(--accent-color)';
        else if (/^[a-z-]+$/.test(c)) mainStyle = `var(--${c}-color, ${c})`;
        else mainStyle = c;
      }
    }
    
    const cardStyle = `${accentStyle ? `--miraie-accent: ${accentStyle}; ` : ''}${mainStyle ? `--m-bg: ${mainStyle}; ` : ''}`;

    if (cfg.layout === 'compact' && !this._expanded) {
      return this._renderCompact(stateObj, friendlyName, isOn, targetTemp, currentTemp, humidVal, hvacMode, minTemp, maxTemp, cardStyle);
    }

    if (cfg.full_layout === 'google_home') {
      return this._renderGoogleHomeFull(stateObj, friendlyName, isOn, targetTemp, currentTemp, humidVal, hvacMode, minTemp, maxTemp, cardStyle);
    }

    // Build an informative subtitle for the Classic layout
    let activeStrs: string[] = [];
    if (isOn) {
      activeStrs.push(this._modeLabel(hvacMode));
      if (presetMode && presetMode !== 'none') {
        if (/^cv[\s_]/.test(presetMode)) {
          const pct = parseCv(presetMode);
          activeStrs.push(pct === 0 ? 'Normal Limit' : pct + '% Limit');
        } else {
          activeStrs.push(presetMode.charAt(0).toUpperCase() + presetMode.slice(1));
        }
      }
      activeStrs.push(`Fan: ${fanMode ?? 'Auto'}`);
    }

    return html`
      <ha-card style="${cardStyle}">

        <!-- ── Header ── -->
        <div class="header">
          <div class="header-left">
            <div class="title-row">
              <span class="status-dot ${isOnline ? 'online' : ''}"></span>
              <span class="title">${friendlyName}</span>
            </div>
            <div class="subtitle">
              ${isOnline ? (isOn ? activeStrs.join(' • ') : 'Off') : 'Offline'}
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            ${cfg.layout === 'compact' ? html`
              <button class="power-btn" style="background: transparent;" @click=${() => { this._haptic('light'); this._expanded = false; }}>
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
            ` : ''}
            <button
              class="power-btn ${isOn ? 'on' : ''}"
              ?disabled=${!isOnline}
              @click=${() => this._togglePower(stateObj)}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
        </div>

        <!-- ── Temperature ── -->
        <div class="temp-block">
          <button
            class="temp-btn"
            ?disabled=${!isOn || hvacMode === 'fan_only' || (targetTemp != null && Number(targetTemp) <= Number(minTemp)) || isCleaning}
            @click=${() => this._adjustTemp(-1, targetTemp, minTemp)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>

          <div class="temp-center">
            <div class="temp-value">
              ${isOn ? (hvacMode === 'fan_only' ? 'FA' : (targetTemp != null ? `${targetTemp}°C` : '--')) : '--'}
            </div>
            <div class="temp-meta">
              <span class="temp-meta-item">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                ${currentTemp != null ? `${currentTemp}°C` : '--'}
              </span>
              ${humidState ? html`
                <span class="temp-meta-item">
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  ${humidVal}%
                </span>
              ` : ''}
            </div>
          </div>

          <button
            class="temp-btn"
            ?disabled=${!isOn || hvacMode === 'fan_only' || (targetTemp != null && Number(targetTemp) >= Number(maxTemp)) || isCleaning}
            @click=${() => this._adjustTemp(1, targetTemp, maxTemp)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <!-- ── Filter Alert (always visible if entity configured + active) ── -->
        ${filterAlert?.state === 'on' ? html`
          <div class="alert-banner">
            <div class="alert-left">
              <ha-icon class="alert-icon" icon="mdi:air-filter"></ha-icon>
              <span class="alert-text">Dirty Filter Alert!</span>
            </div>
            <span class="alert-hint">Clean your filter</span>
          </div>
        ` : ''}

        <!-- ── HVAC Modes ── -->
        <div class="section">
          <div class="section-title">Modes</div>
          <div class="pills" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}">
            ${(a.hvac_modes || []).filter((m: string) => m !== 'off').map((m: string) => html`
              <button
                class="pill ${hvacMode === m && isOn ? 'active' : ''}"
                ?disabled=${!isOnline}
                @click=${() => this._setHvacMode(m)}
              >
                <ha-icon icon="${this._modeIcon(m)}"></ha-icon>
                ${this._modeLabel(m)}
              </button>
            `)}
          </div>
        </div>

        <!-- ── Fan & Swing ── -->
        <div class="section">
          <div class="section-title">Fan & Swing</div>
          <div class="pills" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}">
            <button
              class="pill ${this._openPanel === 'fan' ? 'active' : ''}"
              ?disabled=${!isOn || hvacMode === 'dry'}
              @click=${() => this._togglePanel('fan')}
            >
              <ha-icon icon="mdi:fan"></ha-icon>
              Fan: ${fanMode ?? 'Auto'}
            </button>

            ${swingV != null ? html`
              <button
                class="pill ${this._openPanel === 'swing_v' ? 'active' : ''}"
                ?disabled=${!isOn}
                @click=${() => this._togglePanel('swing_v')}
              >
                <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                Swing V: ${swingV}
              </button>
            ` : ''}

            ${swingH != null ? html`
              <button
                class="pill ${this._openPanel === 'swing_h' ? 'active' : ''}"
                ?disabled=${!isOn}
                @click=${() => this._togglePanel('swing_h')}
              >
                <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                Swing H: ${swingH}
              </button>
            ` : ''}
          </div>

          ${this._openPanel === 'fan' ? html`
            <div class="picker-panel">
              ${(a.fan_modes || []).map((m: string) => html`
                <button class="picker-opt ${fanMode === m ? 'sel' : ''}"
                        @click=${() => { this._setFanMode(stateObj, m); this._openPanel = null; }}>
                  ${m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              `)}
            </div>
          ` : ''}

          ${this._openPanel === 'swing_v' ? html`
            <div class="picker-panel">
              ${(a.swing_modes || []).map((m: string) => html`
                <button class="picker-opt ${swingV === m ? 'sel' : ''}"
                        @click=${() => { this._setSwing(stateObj, m); this._openPanel = null; }}>
                  ${m}
                </button>
              `)}
            </div>
          ` : ''}

          ${this._openPanel === 'swing_h' ? html`
            <div class="picker-panel">
              ${(a.swing_horizontal_modes || []).map((m: string) => html`
                <button class="picker-opt ${swingH === m ? 'sel' : ''}"
                        @click=${() => { this._setHSwing(stateObj, m); this._openPanel = null; }}>
                  ${m}
                </button>
              `)}
            </div>
          ` : ''}
        </div>

        <!-- ── Comfort Presets ── -->
        <div class="section">
          <div class="section-title">Comfort Presets</div>
          <div class="pills" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}">
            ${['none', 'eco', 'boost'].map(p => html`
              <button
                class="pill ${presetMode === p ? 'active' : ''}"
                ?disabled=${!isOn || (['dry', 'auto', 'fan_only'].includes(hvacMode) && p !== 'none')}
                @click=${() => this._setPreset(p)}
              >
                <ha-icon icon="${this._presetIcon(p)}"></ha-icon>
                ${p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            `)}
          </div>
        </div>

        <!-- ── Convertible Mode — stepped notch slider ── -->
        ${cvNonZero.length > 0 ? html`
          <div class="section" style="${['dry', 'auto', 'fan_only'].includes(hvacMode) || isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}">
            <div class="section-title">${cvGenLabel}</div>
            <div class="step-slider-wrap">
              <div class="step-slider-header">
                <span class="step-slider-title">Capacity Limit</span>
                <span class="step-slider-val">
                  ${curCvIdx === 0 ? 'Normal' : `${parseCv(curCvOpt)}%`}
                </span>
              </div>

              <!-- Track + notch dots -->
              <div class="step-track-outer">
                <div class="step-track-bg">
                  <div class="step-track-fill" style="width: ${fillPct}%"></div>
                </div>
                <div class="step-notches">
                  ${allCvSteps.map((opt, i) => html`
                    <div class="notch-wrapper">
                      <button
                        class="step-notch
                          ${i < curCvIdx  ? 'filled'  : ''}
                          ${i === curCvIdx ? 'current' : ''}"
                        title="${i === 0 ? 'Normal' : `${parseCv(opt)}%`}"
                        ?disabled=${!isOn || ['dry', 'auto', 'fan_only'].includes(hvacMode)}
                        @click=${() => this._setPreset(opt)}
                      ></button>
                      <span class="notch-label ${i === curCvIdx ? 'current' : ''}">${i === 0 ? 'N' : parseCv(opt)}</span>
                    </div>
                  `)}
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ── Controls (Nanoe, Display, Coil Clean) ── -->
        ${nanoe || display || coilBtn ? html`
          <div class="section">
            <div class="section-title">Controls</div>
            <div class="toggles">
              ${nanoe ? html`
                <div class="toggle-card" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}"
                     @click=${() => this._toggleSwitch(cfg.nanoe_switch!, nanoe.state)}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${nanoe.state === 'on' ? 'active' : ''}">
                      <ha-icon icon="mdi:air-purifier"></ha-icon>
                    </div>
                    <span class="toggle-label">nanoe™</span>
                  </div>
                  <ha-switch .checked=${nanoe.state === 'on'} ?disabled=${!isOnline}></ha-switch>
                </div>
              ` : ''}
              ${display ? html`
                <div class="toggle-card" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}"
                     @click=${() => this._toggleSwitch(cfg.display_switch!, display.state)}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${display.state === 'on' ? 'active' : ''}">
                      <ha-icon icon="mdi:eye"></ha-icon>
                    </div>
                    <span class="toggle-label">AC LED</span>
                  </div>
                  <ha-switch .checked=${display.state === 'on'} ?disabled=${!isOnline}></ha-switch>
                </div>
              ` : ''}
              ${coilBtn ? html`
                <div class="toggle-card ${isOn ? 'disabled' : ''}"
                     @click=${() => this._pressButton(cfg.coil_clean_button!)}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${coilSensor?.state === 'on' ? 'active' : ''}">
                      <ha-icon icon="mdi:spray-bottle"></ha-icon>
                    </div>
                    <span class="toggle-label">
                      ${coilSensor?.state === 'on' ? 'Cleaning…' : 'Coil Clean'}
                    </span>
                  </div>
                  <ha-icon class="toggle-action" icon="mdi:play-circle-outline"></ha-icon>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- ── Energy Cards ── -->
        ${energyToday || energyYest ? html`
          <div class="section">
            <div class="section-title">Energy Consumption</div>
            <div class="energy-row">
              ${energyToday ? html`
                <div class="energy-card" @click=${() => this._showMoreInfo(cfg.energy_today_sensor!)}>
                  <div class="energy-label">
                    <ha-icon icon="mdi:flash"></ha-icon>
                    ${energyToday.attributes.friendly_name ?? 'Today'}
                  </div>
                  <div class="energy-value-row">
                    <span class="energy-value">${fmt2(energyToday.state)}</span>
                    <span class="energy-unit">${energyToday.attributes.unit_of_measurement ?? 'kWh'}</span>
                  </div>
                </div>
              ` : ''}
              ${energyYest ? html`
                <div class="energy-card" @click=${() => this._showMoreInfo(cfg.energy_yesterday_sensor!)}>
                  <div class="energy-label">
                    <ha-icon icon="mdi:flash-outline"></ha-icon>
                    ${energyYest.attributes.friendly_name ?? 'Yesterday'}
                  </div>
                  <div class="energy-value-row">
                    <span class="energy-value">${fmt2(energyYest.state)}</span>
                    <span class="energy-unit">${energyYest.attributes.unit_of_measurement ?? 'kWh'}</span>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- ── Wi-Fi Footer ── -->
        ${rssi ? html`
          <div class="footer">
            <ha-icon icon="mdi:wifi"></ha-icon>
            <span>RSSI: ${rssi.state} ${rssi.attributes.unit_of_measurement ?? 'dBm'}</span>
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  /* ─────────────────────────────────────────────
     Panel toggle
     ───────────────────────────────────────────── */
  private _togglePanel(name: string): void {
    this._haptic('selection');
    this._openPanel = this._openPanel === name ? null : name;
  }

  /* ─────────────────────────────────────────────
     Service calls & Actions
     ───────────────────────────────────────────── */
  private _haptic(type: 'success' | 'warning' | 'failure' | 'info' | 'selection' | 'light' | 'medium' | 'heavy' = 'light'): void {
    this.dispatchEvent(new CustomEvent('haptic', { detail: type, bubbles: true, composed: true }));
  }

  private _showMoreInfo(entityId: string): void {
    this._haptic('selection');
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  private _togglePower(s: any): void {
    this._haptic('medium');
    if (s.state !== 'off') {
      this.hass.callService('climate', 'set_hvac_mode', { entity_id: s.entity_id, hvac_mode: 'off' });
    } else {
      this.hass.callService('climate', 'turn_on', { entity_id: s.entity_id });
    }
  }

  private _adjustTemp(delta: number, current?: number, limit?: number): void {
    this._haptic('light');
    if (current == null) return;
    const next = Number(current) + delta;
    if (limit != null && ((delta < 0 && next < Number(limit)) || (delta > 0 && next > Number(limit)))) return;
    this.hass.callService('climate', 'set_temperature', { entity_id: this._config.entity, temperature: next });
  }

  private _setHvacMode(mode: string): void {
    this._haptic('light');
    this.hass.callService('climate', 'set_hvac_mode', { entity_id: this._config.entity, hvac_mode: mode });
  }

  private _setFanMode(s: any, mode: string): void {
    this._haptic('selection');
    this.hass.callService('climate', 'set_fan_mode', { entity_id: s.entity_id, fan_mode: mode });
  }

  private _setSwing(s: any, mode: string): void {
    this._haptic('selection');
    this.hass.callService('climate', 'set_swing_mode', { entity_id: s.entity_id, swing_mode: mode });
  }

  private _setHSwing(s: any, mode: string): void {
    this._haptic('selection');
    this.hass.callService('climate', 'set_swing_horizontal_mode', { entity_id: s.entity_id, swing_horizontal_mode: mode });
  }

  private _setPreset(preset: string): void {
    this._haptic('light');
    this.hass.callService('climate', 'set_preset_mode', { entity_id: this._config.entity, preset_mode: preset });
  }



  private _toggleSwitch(entityId: string, currentState: string): void {
    this._haptic('light');
    this.hass.callService('switch', currentState === 'on' ? 'turn_off' : 'turn_on', { entity_id: entityId });
  }

  private _pressButton(entityId: string): void {
    this._haptic('medium');
    this.hass.callService('button', 'press', { entity_id: entityId });
  }

  /* ─────────────────────────────────────────────
     Label / Icon helpers
     ───────────────────────────────────────────── */
  private _modeLabel(m: string): string {
    const map: Record<string, string> = {
      cool: 'Cool', dry: 'Dry', fan_only: 'Fan', auto: 'Auto', heat: 'Heat', off: 'Off',
    };
    return map[m] ?? m.charAt(0).toUpperCase() + m.slice(1);
  }

  private _modeIcon(m: string): string {
    const map: Record<string, string> = {
      cool: 'mdi:snowflake', dry: 'mdi:water-percent',
      fan_only: 'mdi:fan', auto: 'mdi:cached', heat: 'mdi:fire',
    };
    return map[m] ?? 'mdi:air-conditioner';
  }

  private _modeColor(m: string): string {
    const map: Record<string, string> = {
      cool:     'rgba(100, 181, 246, 0.18)',
      dry:      'rgba(129, 199, 132, 0.18)',
      fan_only: 'rgba(179, 157, 219, 0.18)',
      auto:     'rgba(255, 183,  77, 0.18)',
      heat:     'rgba(255, 138, 101, 0.18)',
    };
    return map[m] ?? 'rgba(128, 128, 128, 0.12)';
  }

  private _presetIcon(p: string): string {
    const map: Record<string, string> = {
      eco: 'mdi:leaf', boost: 'mdi:rocket', none: 'mdi:close-circle-outline',
    };
    return map[p] ?? 'mdi:play-circle-outline';
  }

  private _renderGoogleHomeFull(
    stateObj: any, name: string, isOn: boolean,
    targetTemp: number, currentTemp: number, humidVal: any,
    hvacMode: string, minTemp: number, maxTemp: number,
    cardStyle: string
  ) {
    const cfg = this._config;
    const a = stateObj.attributes;
    const modes = a.hvac_modes || [];
    const fanMode      = a.fan_mode;
    const fanModes     = a.fan_modes || [];
    const swingV       = a.swing_mode;
    const swingVModes  = a.swing_modes || [];
    const swingH       = a.swing_horizontal_mode;
    const swingHModes  = a.swing_horizontal_modes || [];
    
    const isOnline = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    const displayValue = isOn ? (hvacMode === 'fan_only' ? 'FA' : (targetTemp != null ? `${targetTemp}°` : '--')) : 'Off';
    const subValue = currentTemp != null ? `Indoor ${currentTemp}°` : '';

    // Split presets into standard presets and convertible options
    let stdPresets: string[] = ['none'];
    let cvOptions: string[] = [];
    if (a.preset_modes) {
      stdPresets = Array.from(new Set(['none', ...a.preset_modes.filter((p: string) => !/^cv[\s_]/.test(p))]));
      cvOptions = a.preset_modes.filter((p: string) => /^cv[\s_]/.test(p));
      if (cvOptions.length > 0) {
        const cvPrefix = cvOptions[0].substring(0, 3);
        if (!cvOptions.includes(`${cvPrefix}0`)) cvOptions.push(`${cvPrefix}0`);
      }
    }
    const cvSorted = cvOptions.sort((x, y) => parseCv(y) - parseCv(x));

    const nanoe        = cfg.nanoe_switch              ? this.hass.states[cfg.nanoe_switch]              : undefined;
    const display      = cfg.display_switch            ? this.hass.states[cfg.display_switch]            : undefined;
    const coilBtn      = cfg.coil_clean_button         ? this.hass.states[cfg.coil_clean_button]         : undefined;
    const coilSensor   = cfg.coil_cleaning_sensor      ? this.hass.states[cfg.coil_cleaning_sensor]      : undefined;
    const energyToday  = cfg.energy_today_sensor       ? this.hass.states[cfg.energy_today_sensor]       : undefined;
    const energyYest   = cfg.energy_yesterday_sensor   ? this.hass.states[cfg.energy_yesterday_sensor]   : undefined;
    const rssi         = cfg.rssi_sensor               ? this.hass.states[cfg.rssi_sensor]               : undefined;
    const isCleaning   = coilSensor?.state === 'on';

    const presetMode = a.preset_mode;
    let activeStrs: string[] = [];
    if (isOn) {
      activeStrs.push(this._modeLabel(hvacMode));
      if (presetMode && presetMode !== 'none' && !/^cv[\s_]/.test(presetMode)) {
        activeStrs.push(presetMode.charAt(0).toUpperCase() + presetMode.slice(1));
      }
    }
    const modeString = activeStrs.join(' • ');

    return html`
      <ha-card style="${cardStyle}" class="gh-full-card">
        <div class="gh-header">
          <div class="gh-header-left">
            <ha-icon class="gh-icon" icon="mdi:air-conditioner"></ha-icon>
            <div class="gh-title">${name}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            ${this._config.layout === 'compact' ? html`
              <button class="gh-power-btn" style="background: transparent; color: var(--m-text-2);" @click=${() => { this._haptic('light'); this._expanded = false; }}>
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
            ` : ''}
            <button class="gh-power-btn ${isOn ? 'on' : ''}" ?disabled=${isCleaning} style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}" @click=${(e: Event) => this._togglePower(stateObj)}>
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
        </div>

        <div class="gh-center">
          <div class="gh-value-large">${displayValue}</div>
          <div class="gh-subtitle-large">
            <div style="display: flex; align-items: center; gap: 16px; justify-content: center;">
              ${currentTemp != null ? html`
                <span style="display: flex; align-items: center; gap: 5px;">
                  <ha-icon icon="mdi:thermometer" style="--mdc-icon-size: 16px;"></ha-icon>${currentTemp}°
                </span>` : ''}
              ${humidVal != null ? html`
                <span style="display: flex; align-items: center; gap: 5px;">
                  <ha-icon icon="mdi:water-percent" style="--mdc-icon-size: 16px;"></ha-icon>${humidVal}%
                </span>` : ''}
            </div>
            ${isOn ? html`
              <div style="display: flex; justify-content: center; margin-top: 10px;">
                <span class="gh-mode-pill" style="background: ${this._modeColor(hvacMode)};">
                  <ha-icon icon="${this._modeIcon(hvacMode)}" style="--mdc-icon-size: 14px;"></ha-icon>
                  ${this._modeLabel(hvacMode)}
                </span>
              </div>` : ''}
          </div>
        </div>

        <div class="gh-action-row" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}">
          <button class="gh-circular-btn" ?disabled=${!isOn || hvacMode === 'fan_only'} @click=${(e: Event) => { e.stopPropagation(); const step = Number(a.target_temp_step ?? 1); this._adjustTemp(-step, targetTemp, minTemp); }}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div style="width: 48px;"></div>
          <button class="gh-circular-btn" ?disabled=${!isOn || hvacMode === 'fan_only'} @click=${(e: Event) => { e.stopPropagation(); const step = Number(a.target_temp_step ?? 1); this._adjustTemp(step, targetTemp, maxTemp); }}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <div class="gh-select-container" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}">
          <!-- Mode Dropdown -->
          <div class="gh-select-wrapper ${this._ghDropdown === 'mode' ? 'active' : ''}">
            <button class="gh-custom-select" @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = this._ghDropdown === 'mode' ? null : 'mode'; }}>
              <span>Mode: ${this._modeLabel(hvacMode)}</span>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
            ${this._ghDropdown === 'mode' ? html`
              <div class="gh-dropdown-menu">
                ${modes.map((mode: string) => html`
                  <button class="gh-dropdown-item ${hvacMode === mode ? 'active' : ''}" 
                       @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = null; this._setHvacMode(mode); }}>
                    ${this._modeLabel(mode)}
                  </button>
                `)}
              </div>
            ` : ''}
          </div>

          <!-- Preset Dropdown -->
          <div class="gh-select-wrapper ${this._ghDropdown === 'preset' ? 'active' : ''}" style="${!isOn || hvacMode === 'fan_only' ? 'opacity: 0.5; pointer-events: none;' : ''}">
            <button class="gh-custom-select" @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = this._ghDropdown === 'preset' ? null : 'preset'; }}>
              <span>Preset: ${stateObj.attributes.preset_mode === 'none' || !stateObj.attributes.preset_mode || /^cv[\s_]/.test(stateObj.attributes.preset_mode) ? 'Normal' : stateObj.attributes.preset_mode.charAt(0).toUpperCase() + stateObj.attributes.preset_mode.slice(1)}</span>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
            ${this._ghDropdown === 'preset' ? html`
              <div class="gh-dropdown-menu">
                ${stdPresets.map((p: string) => {
                  const isActive = stateObj.attributes.preset_mode === p || (p === 'none' && (!stateObj.attributes.preset_mode || /^cv[\s_]/.test(stateObj.attributes.preset_mode)));
                  return html`
                    <button class="gh-dropdown-item ${isActive ? 'active' : ''}" 
                         @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = null; this._setPreset(p); }}>
                      ${p === 'none' ? 'Normal' : p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  `;
                })}
              </div>
            ` : ''}
          </div>

          <!-- Convertible Dropdown -->
          ${cvSorted.length > 0 ? html`
            <div class="gh-select-wrapper ${this._ghDropdown === 'cv' ? 'active' : ''}" style="${!isOn || ['dry', 'auto', 'fan_only'].includes(hvacMode) ? 'opacity: 0.5; pointer-events: none;' : ''}">
              <button class="gh-custom-select" @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = this._ghDropdown === 'cv' ? null : 'cv'; }}>
                <span>Limit: ${stateObj.attributes.preset_mode && /^cv[\s_]/.test(stateObj.attributes.preset_mode) ? (parseCv(stateObj.attributes.preset_mode) === 0 ? 'Normal' : parseCv(stateObj.attributes.preset_mode) + '%') : 'Normal'}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${this._ghDropdown === 'cv' ? html`
                <div class="gh-dropdown-menu">
                  ${cvSorted.map((cv: string) => {
                    const pct = parseCv(cv);
                    const isActive = stateObj.attributes.preset_mode === cv || (pct === 0 && (!stateObj.attributes.preset_mode || !/^cv[\s_]/.test(stateObj.attributes.preset_mode)));
                    return html`
                      <button class="gh-dropdown-item ${isActive ? 'active' : ''}" 
                           @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = null; this._setPreset(cv); }}>
                        ${pct === 0 ? 'Normal' : pct + '%'}
                      </button>
                    `;
                  })}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Fan Speed Dropdown -->
          ${fanModes.length > 0 ? html`
            <div class="gh-select-wrapper ${this._ghDropdown === 'fan' ? 'active' : ''}" style="${!isOn || hvacMode === 'dry' ? 'opacity: 0.5; pointer-events: none;' : ''}">
              <button class="gh-custom-select" @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = this._ghDropdown === 'fan' ? null : 'fan'; }}>
                <span>Fan: ${fanMode ? (fanMode.charAt(0).toUpperCase() + fanMode.slice(1)) : 'Auto'}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${this._ghDropdown === 'fan' ? html`
                <div class="gh-dropdown-menu">
                  ${fanModes.map((m: string) => html`
                    <button class="gh-dropdown-item ${fanMode === m ? 'active' : ''}" 
                         @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = null; this._setFanMode(stateObj, m); }}>
                      ${m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  `)}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Vertical Swing (Vanes V) Dropdown -->
          ${swingVModes.length > 0 || swingV != null ? html`
            <div class="gh-select-wrapper ${this._ghDropdown === 'swing_v' ? 'active' : ''}" style="${!isOn ? 'opacity: 0.5; pointer-events: none;' : ''}">
              <button class="gh-custom-select" @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = this._ghDropdown === 'swing_v' ? null : 'swing_v'; }}>
                <span>Swing V: ${swingV ? (swingV.charAt(0).toUpperCase() + swingV.slice(1)) : 'Auto'}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${this._ghDropdown === 'swing_v' ? html`
                <div class="gh-dropdown-menu">
                  ${swingVModes.map((m: string) => html`
                    <button class="gh-dropdown-item ${swingV === m ? 'active' : ''}" 
                         @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = null; this._setSwing(stateObj, m); }}>
                      ${m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  `)}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Horizontal Swing (Vanes H) Dropdown -->
          ${swingHModes.length > 0 || swingH != null ? html`
            <div class="gh-select-wrapper ${this._ghDropdown === 'swing_h' ? 'active' : ''}" style="${!isOn ? 'opacity: 0.5; pointer-events: none;' : ''}">
              <button class="gh-custom-select" @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = this._ghDropdown === 'swing_h' ? null : 'swing_h'; }}>
                <span>Swing H: ${swingH ? (swingH.charAt(0).toUpperCase() + swingH.slice(1)) : 'Auto'}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${this._ghDropdown === 'swing_h' ? html`
                <div class="gh-dropdown-menu">
                  ${swingHModes.map((m: string) => html`
                    <button class="gh-dropdown-item ${swingH === m ? 'active' : ''}" 
                         @click=${(e: Event) => { e.stopPropagation(); this._ghDropdown = null; this._setHSwing(stateObj, m); }}>
                      ${m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  `)}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>

        ${nanoe || display || coilBtn || energyToday || energyYest ? html`
          <div class="gh-extra-chips">
            ${nanoe ? html`<div class="gh-chip ${nanoe.state === 'on' ? 'active' : ''}" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}" @click=${() => this._toggleSwitch(cfg.nanoe_switch!, nanoe.state)}><ha-icon icon="mdi:virus-outline"></ha-icon>Nanoe</div>` : ''}
            ${display ? html`<div class="gh-chip ${display.state === 'on' ? 'active' : ''}" style="${isCleaning ? 'opacity: 0.5; pointer-events: none;' : ''}" @click=${() => this._toggleSwitch(cfg.display_switch!, display.state)}><ha-icon icon="mdi:lightbulb-outline"></ha-icon>Display</div>` : ''}
            ${coilBtn || coilSensor ? html`<div class="gh-chip ${coilSensor?.state === 'on' ? 'active' : ''}" @click=${() => coilBtn ? this._pressButton(cfg.coil_clean_button!) : null}><ha-icon icon="mdi:spray"></ha-icon>${coilSensor?.state === 'on' ? 'Cleaning...' : 'Clean Coil'}</div>` : ''}
            ${energyToday && energyYest ? html`
              <div class="gh-chip-text"><ha-icon icon="mdi:lightning-bolt"></ha-icon>Today: ${fmt2(energyToday.state)} kWh • Yesterday: ${fmt2(energyYest.state)} kWh</div>
            ` : html`
              ${energyToday ? html`<div class="gh-chip-text"><ha-icon icon="mdi:lightning-bolt"></ha-icon>Today: ${fmt2(energyToday.state)} kWh</div>` : ''}
              ${energyYest ? html`<div class="gh-chip-text"><ha-icon icon="mdi:lightning-bolt"></ha-icon>Yesterday: ${fmt2(energyYest.state)} kWh</div>` : ''}
            `}
          </div>
        ` : ''}
        
        ${rssi ? html`
          <div class="gh-footer-text">
            <ha-icon icon="mdi:wifi"></ha-icon> ${rssi.state} dBm
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  private _renderCompact(stateObj: any, name: string, isOn: boolean, targetTemp: any, currentTemp: any, humidVal: any, hvacMode: string, minTemp: any, maxTemp: any, cardStyle: string): TemplateResult {
    const isOnline = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    const displayValue = isOn ? (hvacMode === 'fan_only' ? 'FA' : (targetTemp != null ? `${targetTemp}°` : '--')) : 'Off';
    const isCleaning = this.hass.states[this._config.coil_cleaning_sensor!]?.state === 'on';
    
    const a = stateObj.attributes;
    const presetMode = a.preset_mode;
    let activeStrs: string[] = [];
    if (isOn) {
      activeStrs.push(this._modeLabel(hvacMode));
      if (presetMode && presetMode !== 'none') {
        if (/^cv[\s_]/.test(presetMode)) {
          const pct = parseCv(presetMode);
          activeStrs.push(pct === 0 ? 'Normal' : pct + '%');
        } else {
          activeStrs.push(presetMode.charAt(0).toUpperCase() + presetMode.slice(1));
        }
      }
    }
    const modeString = activeStrs.length ? activeStrs.join(' • ') : '';

    return html`
      <ha-card style="${cardStyle}" class="compact-card" @click=${() => { this._haptic('selection'); this._expanded = true; }}>
        <div class="compact-header">
          <button class="compact-icon-btn ${isOn ? 'on' : ''}" ?disabled=${isCleaning} @click=${(e: Event) => { e.stopPropagation(); this._togglePower(stateObj); }}>
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
          <div class="compact-title">${name}</div>
          <ha-icon class="compact-chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        
        <div class="compact-center">
          <div class="compact-value">${displayValue}</div>
        </div>

        <div class="compact-footer">
          <button class="compact-action-btn" ?disabled=${!isOn || hvacMode === 'fan_only'} @click=${(e: Event) => { e.stopPropagation(); this._adjustTemp(-1, targetTemp, minTemp); }}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="compact-subtitle" style="display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.2;">
            <div style="display: flex; align-items: center; gap: 12px;">
              ${currentTemp != null ? html`
                <span style="display: flex; align-items: center; gap: 4px;">
                  <ha-icon icon="mdi:thermometer" style="--mdc-icon-size: 14px;"></ha-icon>${currentTemp}°
                </span>` : ''}
              ${humidVal != null ? html`
                <span style="display: flex; align-items: center; gap: 4px;">
                  <ha-icon icon="mdi:water-percent" style="--mdc-icon-size: 14px;"></ha-icon>${humidVal}%
                </span>` : ''}
            </div>
            ${modeString ? html`<div style="font-size: 0.75rem; opacity: 0.7;">${modeString}</div>` : ''}
          </div>
          <button class="compact-action-btn" ?disabled=${!isOn || hvacMode === 'fan_only'} @click=${(e: Event) => { e.stopPropagation(); this._adjustTemp(1, targetTemp, maxTemp); }}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </ha-card>
    `;
  }

  public getCardSize(): number { return this._config?.layout === 'compact' && !this._expanded ? 2 : 5; }
}
