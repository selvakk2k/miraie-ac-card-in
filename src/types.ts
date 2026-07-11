export interface MirAIeCardConfig {
  type: string;
  entity: string;
  name?: string;
  // Optional sensor overrides
  room_temp_sensor?: string;
  humidity_sensor?: string;
  // Controls
  convertible_mode_entity?: string;
  nanoe_switch?: string;
  display_switch?: string;
  coil_clean_button?: string;
  coil_cleaning_sensor?: string;
  filter_alert_sensor?: string;
  // Diagnostics
  rssi_sensor?: string;
  energy_today_sensor?: string;
  energy_yesterday_sensor?: string;
}
