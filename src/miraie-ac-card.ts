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
  const m = /^cv\s+(\d+)$/.exec((opt ?? '').trim());
  return m ? parseInt(m[1], 10) : -1;
}

/**
 * Detect Converti8 vs Converti7 by the presence of the 60 % and 50 % steps
 * (8-in-1 replaces the single 55 % step with 60 % + 50 %).
 */
function convertiLabel(options: string[]): string {
  if (!options?.length) return 'Convertible';
  return options.includes('cv 60') && options.includes('cv 50') ? 'Converti8' : 'Converti7';
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

  static get styles() { return styles; }

  /* ── Native visual editor (HA renders this; no custom element needed) ── */
  static getConfigForm() {
    return {
      schema: [
        { name: 'entity',  required: true, selector: { entity: { domain: 'climate' } } },
        { name: 'name',    selector: { text: {} } },
        { name: 'accent_color', selector: { ui_color: {} } },
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
            { name: 'convertible_mode_entity', selector: { entity: { domain: 'select' } } },
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

  /* ── Selective re-render ── */
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config') || changedProps.has('_openPanel')) return true;
    if (changedProps.has('hass') && this._config) {
      const old = changedProps.get('hass') as HomeAssistant | undefined;
      if (!old) return true;
      const cfg = this._config;
      return [
        cfg.entity, cfg.room_temp_sensor, cfg.humidity_sensor,
        cfg.convertible_mode_entity, cfg.nanoe_switch, cfg.display_switch,
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
    const currentTemp  = roomSensor ? roomSensor.state : a.current_temperature;

    /* Humidity */
    const humidState   = cfg.humidity_sensor ? this.hass.states[cfg.humidity_sensor] : undefined;

    /* Helper entities */
    const convertible  = cfg.convertible_mode_entity  ? this.hass.states[cfg.convertible_mode_entity]  : undefined;
    const nanoe        = cfg.nanoe_switch              ? this.hass.states[cfg.nanoe_switch]              : undefined;
    const display      = cfg.display_switch            ? this.hass.states[cfg.display_switch]            : undefined;
    const coilBtn      = cfg.coil_clean_button         ? this.hass.states[cfg.coil_clean_button]         : undefined;
    const coilSensor   = cfg.coil_cleaning_sensor      ? this.hass.states[cfg.coil_cleaning_sensor]      : undefined;
    const filterAlert  = cfg.filter_alert_sensor       ? this.hass.states[cfg.filter_alert_sensor]       : undefined;
    const rssi         = cfg.rssi_sensor               ? this.hass.states[cfg.rssi_sensor]               : undefined;
    const energyToday  = cfg.energy_today_sensor       ? this.hass.states[cfg.energy_today_sensor]       : undefined;
    const energyYest   = cfg.energy_yesterday_sensor   ? this.hass.states[cfg.energy_yesterday_sensor]   : undefined;

    /* Convertible step-slider data */
    let cvOptions: string[] = [];
    let curCvOpt = 'cv 0';
    let isNativePresetCv = false;

    if (convertible) {
      cvOptions = (convertible.attributes?.options ?? []) as string[];
      curCvOpt = convertible.state ?? 'cv 0';
    } else if (a.preset_modes && a.preset_modes.some((p: string) => p.startsWith('cv '))) {
      cvOptions = a.preset_modes.filter((p: string) => p.startsWith('cv '));
      if (!cvOptions.includes('cv 0')) cvOptions.push('cv 0');
      curCvOpt = a.preset_mode?.startsWith('cv ') ? a.preset_mode : 'cv 0';
      isNativePresetCv = true;
    }

    // Sorted ascending: [40, 50, 60, ...] (without 0 = Normal)
    const cvNonZero  = cvOptions.filter(o => parseCv(o) > 0).sort((a, b) => parseCv(a) - parseCv(b));
    // All steps: Normal first, then ascending percentage steps
    const allCvSteps = ['cv 0', ...cvNonZero];
    const curCvIdx   = allCvSteps.indexOf(curCvOpt);   // 0 = Normal
    const cvGenLabel = convertiLabel(cvOptions);
    const fillPct    = cvNonZero.length > 0
      ? (curCvIdx / (allCvSteps.length - 1)) * 100
      : 0;

    /* Custom accent color applied as CSS var via inline style */
    let accentStyle = '';
    if (cfg.accent_color) {
      if (Array.isArray(cfg.accent_color)) {
        accentStyle = `rgb(${cfg.accent_color.join(',')})`;
      } else if (typeof cfg.accent_color === 'string') {
        const c = cfg.accent_color.toLowerCase();
        if (c === 'primary') accentStyle = 'var(--primary-color)';
        else if (c === 'accent') accentStyle = 'var(--accent-color)';
        else if (/^[a-z]+$/.test(c)) accentStyle = `var(--${c}-color, ${c})`;
        else accentStyle = c;
      }
    }
    const cardStyle = accentStyle
      ? `--miraie-accent: ${accentStyle};`
      : '';

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
              ${isOnline
                ? `${this._modeLabel(hvacMode)} • Fan: ${fanMode ?? 'Auto'}`
                : 'Offline'}
            </div>
          </div>
          <button
            class="power-btn ${isOn ? 'on' : ''}"
            ?disabled=${!isOnline}
            @click=${() => this._togglePower(stateObj)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <!-- ── Temperature ── -->
        <div class="temp-block">
          <button
            class="temp-btn"
            ?disabled=${!isOn || hvacMode === 'fan_only' || (targetTemp != null && Number(targetTemp) <= Number(minTemp))}
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
                  ${humidState.state}%
                </span>
              ` : ''}
            </div>
          </div>

          <button
            class="temp-btn"
            ?disabled=${!isOn || hvacMode === 'fan_only' || (targetTemp != null && Number(targetTemp) >= Number(maxTemp))}
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
          <div class="pills">
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
          <div class="pills">
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
          <div class="pills">
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
          <div class="section" style="${['dry', 'auto', 'fan_only'].includes(hvacMode) ? 'opacity: 0.5; pointer-events: none;' : ''}">
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
                    <button
                      class="step-notch
                        ${i < curCvIdx  ? 'filled'  : ''}
                        ${i === curCvIdx ? 'current' : ''}"
                      title="${i === 0 ? 'Normal' : `${parseCv(opt)}%`}"
                      ?disabled=${!isOn || ['dry', 'auto', 'fan_only'].includes(hvacMode)}
                      @click=${() => isNativePresetCv ? this._setPreset(opt) : this._selectOption(cfg.convertible_mode_entity!, opt)}
                    ></button>
                  `)}
                </div>
              </div>

              <!-- Edge labels -->
              <div class="step-labels">
                <span class="step-label">Normal</span>
                <span class="step-label">${parseCv(cvNonZero[cvNonZero.length - 1])}%</span>
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
                <div class="toggle-card"
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
                <div class="toggle-card"
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
                <div class="toggle-card"
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

  private _selectOption(entityId: string, option: string): void {
    this._haptic('selection');
    this.hass.callService('select', 'select_option', { entity_id: entityId, option });
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

  private _presetIcon(p: string): string {
    const map: Record<string, string> = {
      eco: 'mdi:leaf', boost: 'mdi:rocket', none: 'mdi:close-circle-outline',
    };
    return map[p] ?? 'mdi:play-circle-outline';
  }

  public getCardSize(): number { return 5; }
}
