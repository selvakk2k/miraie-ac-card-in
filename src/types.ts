export interface MirAIeCardConfig {
  type: string;
  entity: string;
  name?: string;
  convertible_mode_entity?: string;
  nanoe_switch?: string;
  display_switch?: string;
  coil_clean_button?: string;
  coil_cleaning_sensor?: string;
  filter_alert_sensor?: string;
  rssi_sensor?: string;
  energy_today_sensor?: string;
  energy_yesterday_sensor?: string;
}
