import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { MirAIeCardConfig } from './types';
import { styles } from './styles';

/* ── Register in card picker ── */
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'miraie-ac-card-in',
  name: 'MirAIe AC Card',
  description: 'A premium thermostat card for Panasonic MirAIe AC units',
  preview: true,
});

@customElement('miraie-ac-card-in')
export class MirAIeACCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: MirAIeCardConfig;

  static get styles() {
    return styles;
  }

  /* ── Visual Editor via getConfigForm ── */
  static getConfigForm() {
    return {
      schema: [
        {
          name: 'entity',
          required: true,
          selector: { entity: { domain: 'climate' } },
        },
        {
          name: 'name',
          selector: { text: {} },
        },
        {
          name: '',
          type: 'expandable',
          title: 'Convertible & Controls',
          icon: 'mdi:toggle-switch-outline',
          schema: [
            {
              name: 'convertible_mode_entity',
              selector: { entity: { domain: 'select' } },
            },
            {
              name: 'nanoe_switch',
              selector: { entity: { domain: 'switch' } },
            },
            {
              name: 'display_switch',
              selector: { entity: { domain: 'switch' } },
            },
            {
              name: 'coil_clean_button',
              selector: { entity: { domain: 'button' } },
            },
            {
              name: 'coil_cleaning_sensor',
              selector: { entity: { domain: 'binary_sensor' } },
            },
            {
              name: 'filter_alert_sensor',
              selector: { entity: { domain: 'binary_sensor' } },
            },
          ],
        },
        {
          name: '',
          type: 'expandable',
          title: 'Diagnostics & Energy',
          icon: 'mdi:chart-line',
          schema: [
            {
              name: 'rssi_sensor',
              selector: { entity: { domain: 'sensor' } },
            },
            {
              name: 'energy_today_sensor',
              selector: { entity: { domain: 'sensor' } },
            },
            {
              name: 'energy_yesterday_sensor',
              selector: { entity: { domain: 'sensor' } },
            },
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
  }

  /* ── Selective re-render ── */
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) return true;

    if (changedProps.has('hass') && this._config) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) return true;

      const watched = [
        this._config.entity,
        this._config.convertible_mode_entity,
        this._config.nanoe_switch,
        this._config.display_switch,
        this._config.coil_clean_button,
        this._config.coil_cleaning_sensor,
        this._config.filter_alert_sensor,
        this._config.rssi_sensor,
        this._config.energy_today_sensor,
        this._config.energy_yesterday_sensor,
      ].filter(Boolean) as string[];

      return watched.some(id => oldHass.states[id] !== this.hass.states[id]);
    }
    return false;
  }

  /* ── Render ── */
  protected render(): TemplateResult | null {
    if (!this.hass || !this._config) return null;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card><div class="error">Entity not found: ${this._config.entity}</div></ha-card>`;
    }

    const isOnline = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    const isOn = stateObj.state !== 'off' && isOnline;
    const a = stateObj.attributes;

    const friendlyName = this._config.name || a.friendly_name || 'AC';
    const targetTemp = a.temperature;
    const currentTemp = a.current_temperature;
    const minTemp = a.min_temp ?? 16;
    const maxTemp = a.max_temp ?? 30;
    const hvacMode = stateObj.state;
    const fanMode = a.fan_mode;
    const swingV = a.swing_mode;
    const swingH = a.swing_horizontal_mode;
    const presetMode = a.preset_mode;

    // Helper entity states — only looked up if configured
    const cfg = this._config;
    const convertible = cfg.convertible_mode_entity ? this.hass.states[cfg.convertible_mode_entity] : undefined;
    const nanoe = cfg.nanoe_switch ? this.hass.states[cfg.nanoe_switch] : undefined;
    const display = cfg.display_switch ? this.hass.states[cfg.display_switch] : undefined;
    const coilBtn = cfg.coil_clean_button ? this.hass.states[cfg.coil_clean_button] : undefined;
    const coilSensor = cfg.coil_cleaning_sensor ? this.hass.states[cfg.coil_cleaning_sensor] : undefined;
    const filterAlert = cfg.filter_alert_sensor ? this.hass.states[cfg.filter_alert_sensor] : undefined;
    const rssi = cfg.rssi_sensor ? this.hass.states[cfg.rssi_sensor] : undefined;
    const energyToday = cfg.energy_today_sensor ? this.hass.states[cfg.energy_today_sensor] : undefined;
    const energyYesterday = cfg.energy_yesterday_sensor ? this.hass.states[cfg.energy_yesterday_sensor] : undefined;

    return html`
      <ha-card>
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
            class="power-btn ${isOn ? 'active' : ''}"
            ?disabled=${!isOnline}
            @click=${() => this._togglePower(stateObj)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <!-- ── Temperature ── -->
        <div class="temp-bar">
          <button
            class="temp-btn"
            ?disabled=${!isOn || (targetTemp != null && Number(targetTemp) <= Number(minTemp))}
            @click=${() => this._adjustTemp(-1, targetTemp, minTemp)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="temp-info">
            <span class="temp-value">${isOn && targetTemp != null ? `${targetTemp}°C` : '--'}</span>
            <span class="temp-room">${currentTemp != null ? `Room: ${currentTemp}°C` : 'Room: --'}</span>
          </div>
          <button
            class="temp-btn"
            ?disabled=${!isOn || (targetTemp != null && Number(targetTemp) >= Number(maxTemp))}
            @click=${() => this._adjustTemp(1, targetTemp, maxTemp)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <!-- ── HVAC Modes ── -->
        <div class="section">
          <div class="section-title">Modes</div>
          <div class="pills">
            ${(a.hvac_modes || [])
              .filter((m: string) => m !== 'off')
              .map(
                (m: string) => html`
                  <button
                    class="pill ${hvacMode === m && isOn ? 'active' : ''}"
                    ?disabled=${!isOnline}
                    @click=${() => this._setHvacMode(m)}
                  >
                    <ha-icon icon="${this._modeIcon(m)}"></ha-icon>
                    ${this._modeLabel(m)}
                  </button>
                `,
              )}
          </div>
        </div>

        <!-- ── Fan & Swing ── -->
        <div class="section">
          <div class="section-title">Fan & Swing</div>
          <div class="pills">
            <button class="pill" ?disabled=${!isOn} @click=${() => this._cycleFan(stateObj)}>
              <ha-icon icon="mdi:fan"></ha-icon>
              Fan: ${fanMode ?? 'Auto'}
            </button>
            ${swingV != null
              ? html`
                  <button class="pill" ?disabled=${!isOn} @click=${() => this._cycleSwing(stateObj)}>
                    <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                    Swing V: ${swingV}
                  </button>
                `
              : ''}
            ${swingH != null
              ? html`
                  <button class="pill" ?disabled=${!isOn} @click=${() => this._cycleHSwing(stateObj)}>
                    <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                    Swing H: ${swingH}
                  </button>
                `
              : ''}
          </div>
        </div>

        <!-- ── Comfort Presets ── -->
        <div class="section">
          <div class="section-title">Comfort Presets</div>
          <div class="pills">
            ${['none', 'eco', 'boost'].map(
              (p) => html`
                <button
                  class="pill ${presetMode === p ? 'active' : ''}"
                  ?disabled=${!isOn}
                  @click=${() => this._setPreset(p)}
                >
                  <ha-icon icon="${this._presetIcon(p)}"></ha-icon>
                  ${p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              `,
            )}
          </div>
        </div>

        <!-- ── Convertible Mode ── -->
        ${convertible
          ? html`
              <div class="section">
                <div class="section-title">Capacity Limit (Convertible)</div>
                <div class="pills">
                  ${(convertible.attributes.options || []).map(
                    (opt: string) => html`
                      <button
                        class="pill ${convertible.state === opt ? 'active' : ''}"
                        ?disabled=${!isOn}
                        @click=${() => this._selectOption(cfg.convertible_mode_entity!, opt)}
                      >
                        ${opt === 'cv 0' ? 'Normal' : opt.replace('cv ', '') + '%'}
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : ''}

        <!-- ── Controls ── -->
        ${nanoe || display || coilBtn
          ? html`
              <div class="section">
                <div class="section-title">Controls</div>
                <div class="toggles">
                  ${nanoe
                    ? html`
                        <div class="toggle-card" @click=${() => this._toggleSwitch(cfg.nanoe_switch!, nanoe.state)}>
                          <div class="toggle-left">
                            <div class="toggle-icon ${nanoe.state === 'on' ? 'active' : ''}">
                              <ha-icon icon="mdi:air-purifier"></ha-icon>
                            </div>
                            <span class="toggle-label">Nanoe-G</span>
                          </div>
                          <ha-switch .checked=${nanoe.state === 'on'} ?disabled=${!isOnline}></ha-switch>
                        </div>
                      `
                    : ''}
                  ${display
                    ? html`
                        <div class="toggle-card" @click=${() => this._toggleSwitch(cfg.display_switch!, display.state)}>
                          <div class="toggle-left">
                            <div class="toggle-icon ${display.state === 'on' ? 'active' : ''}">
                              <ha-icon icon="mdi:eye"></ha-icon>
                            </div>
                            <span class="toggle-label">AC LED</span>
                          </div>
                          <ha-switch .checked=${display.state === 'on'} ?disabled=${!isOnline}></ha-switch>
                        </div>
                      `
                    : ''}
                  ${coilBtn
                    ? html`
                        <div class="toggle-card" @click=${() => this._pressButton(cfg.coil_clean_button!)}>
                          <div class="toggle-left">
                            <div class="toggle-icon ${coilSensor?.state === 'on' ? 'active' : ''}">
                              <ha-icon icon="mdi:spray-bottle"></ha-icon>
                            </div>
                            <span class="toggle-label">
                              ${coilSensor?.state === 'on' ? 'Cleaning…' : 'Coil Clean'}
                            </span>
                          </div>
                          <ha-icon icon="mdi:play-circle-outline" style="color:var(--text-secondary);margin-right:4px"></ha-icon>
                        </div>
                      `
                    : ''}
                  ${filterAlert?.state === 'on'
                    ? html`
                        <div class="alert-banner">
                          <div class="alert-left">
                            <ha-icon class="alert-icon" icon="mdi:air-filter"></ha-icon>
                            <span class="alert-text">Dirty Filter Alert!</span>
                          </div>
                          <span class="alert-hint">Clean Filter</span>
                        </div>
                      `
                    : ''}
                </div>
              </div>
            `
          : ''}

        <!-- ── Footer Diagnostics ── -->
        ${rssi || energyToday || energyYesterday
          ? html`
              <div class="footer">
                <div class="footer-item">
                  ${rssi
                    ? html`<ha-icon icon="mdi:wifi"></ha-icon><span>RSSI: ${rssi.state} ${rssi.attributes.unit_of_measurement ?? 'dBm'}</span>`
                    : ''}
                </div>
                <div class="footer-group">
                  ${energyToday
                    ? html`
                        <div class="footer-item">
                          <ha-icon icon="mdi:flash"></ha-icon>
                          <span>Today: ${energyToday.state} ${energyToday.attributes.unit_of_measurement ?? 'kWh'}</span>
                        </div>
                      `
                    : ''}
                  ${energyYesterday
                    ? html`
                        <div class="footer-item">
                          <ha-icon icon="mdi:flash-outline"></ha-icon>
                          <span>Yesterday: ${energyYesterday.state} ${energyYesterday.attributes.unit_of_measurement ?? 'kWh'}</span>
                        </div>
                      `
                    : ''}
                </div>
              </div>
            `
          : ''}
      </ha-card>
    `;
  }

  /* ═══════════════════════════════════════════════
     Service Calls
     ═══════════════════════════════════════════════ */

  private _togglePower(s: any): void {
    if (s.state !== 'off') {
      this.hass.callService('climate', 'set_hvac_mode', { entity_id: s.entity_id, hvac_mode: 'off' });
    } else {
      this.hass.callService('climate', 'turn_on', { entity_id: s.entity_id });
    }
  }

  private _adjustTemp(delta: number, current?: number, limit?: number): void {
    if (current == null) return;
    const next = Number(current) + delta;
    if (limit != null && ((delta < 0 && next < Number(limit)) || (delta > 0 && next > Number(limit)))) return;
    this.hass.callService('climate', 'set_temperature', { entity_id: this._config.entity, temperature: next });
  }

  private _setHvacMode(mode: string): void {
    this.hass.callService('climate', 'set_hvac_mode', { entity_id: this._config.entity, hvac_mode: mode });
  }

  private _cycleFan(s: any): void {
    const modes = s.attributes.fan_modes || [];
    if (!modes.length) return;
    const i = (modes.indexOf(s.attributes.fan_mode) + 1) % modes.length;
    this.hass.callService('climate', 'set_fan_mode', { entity_id: s.entity_id, fan_mode: modes[i] });
  }

  private _cycleSwing(s: any): void {
    const modes = s.attributes.swing_modes || [];
    if (!modes.length) return;
    const i = (modes.indexOf(s.attributes.swing_mode) + 1) % modes.length;
    this.hass.callService('climate', 'set_swing_mode', { entity_id: s.entity_id, swing_mode: modes[i] });
  }

  private _cycleHSwing(s: any): void {
    const modes = s.attributes.swing_horizontal_modes || [];
    if (!modes.length) return;
    const i = (modes.indexOf(s.attributes.swing_horizontal_mode) + 1) % modes.length;
    this.hass.callService('climate', 'set_swing_horizontal_mode', { entity_id: s.entity_id, swing_horizontal_mode: modes[i] });
  }

  private _setPreset(preset: string): void {
    this.hass.callService('climate', 'set_preset_mode', { entity_id: this._config.entity, preset_mode: preset });
  }

  private _selectOption(entityId: string, option: string): void {
    this.hass.callService('select', 'select_option', { entity_id: entityId, option });
  }

  private _toggleSwitch(entityId: string, currentState: string): void {
    this.hass.callService('switch', currentState === 'on' ? 'turn_off' : 'turn_on', { entity_id: entityId });
  }

  private _pressButton(entityId: string): void {
    this.hass.callService('button', 'press', { entity_id: entityId });
  }

  /* ═══════════════════════════════════════════════
     Label / Icon helpers
     ═══════════════════════════════════════════════ */

  private _modeLabel(m: string): string {
    const map: Record<string, string> = { cool: 'Cool', dry: 'Dry', fan_only: 'Fan', auto: 'Auto', heat: 'Heat', off: 'Off' };
    return map[m] ?? m.charAt(0).toUpperCase() + m.slice(1);
  }

  private _modeIcon(m: string): string {
    const map: Record<string, string> = {
      cool: 'mdi:snowflake', dry: 'mdi:water-percent', fan_only: 'mdi:fan',
      auto: 'mdi:cached', heat: 'mdi:fire',
    };
    return map[m] ?? 'mdi:air-conditioner';
  }

  private _presetIcon(p: string): string {
    const map: Record<string, string> = { eco: 'mdi:leaf', boost: 'mdi:rocket', none: 'mdi:close-circle-outline' };
    return map[p] ?? 'mdi:play-circle-outline';
  }

  public getCardSize(): number {
    return 4;
  }
}
