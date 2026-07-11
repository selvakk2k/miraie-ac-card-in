# MirAIe AC Card

A premium Lovelace thermostat card for **Panasonic MirAIe AC** units on the Indian market.

Built for the [`ha-miraie-ac-in`](https://github.com/selvakk2k/ha-miraie-ac-in) custom integration.

## Features

| Feature | Description |
|---|---|
| **Temperature Control** | Set target temperature with +/− buttons |
| **HVAC Modes** | Auto, Cool, Dry, Fan |
| **Fan & Swing** | Cycle through fan speeds, vertical & horizontal swing |
| **Comfort Presets** | None, Eco, Boost |
| **Convertible Mode** | Capacity-limit selection |
| **Nanoe-G Purifier** | Toggle on/off |
| **Display LED** | Toggle the AC's LED panel |
| **Coil Clean** | One-tap coil cleaning trigger |
| **Filter Alert** | Visual banner when the filter needs cleaning |
| **Diagnostics** | Wi-Fi RSSI, today & yesterday energy consumption |
| **Visual Editor** | Full GUI configuration — no YAML required |

## Installation (HACS)

1. Open HACS → **Frontend** → ⋮ → **Custom repositories**
2. Add `https://github.com/selvakk2k/miraie-ac-card-in` as **Dashboard**
3. Install **MirAIe AC Card** and restart Home Assistant

## Configuration

Use the **visual editor** in the Lovelace dashboard:

1. Add Card → search for **MirAIe AC Card**
2. Select your `climate` entity
3. Expand **Convertible & Controls** to link optional entities
4. Expand **Diagnostics & Energy** for sensor entities

### YAML (manual)

```yaml
type: custom:miraie-ac-card-in
entity: climate.your_ac_entity
name: Living Room AC              # optional
convertible_mode_entity: select.your_convertible_select
nanoe_switch: switch.your_nanoe_switch
display_switch: switch.your_display_switch
coil_clean_button: button.your_coil_clean
coil_cleaning_sensor: binary_sensor.your_coil_cleaning
filter_alert_sensor: binary_sensor.your_filter_alert
rssi_sensor: sensor.your_wifi_signal
energy_today_sensor: sensor.your_today_energy
energy_yesterday_sensor: sensor.your_yesterday_energy
```

## License

MIT
