export interface AccountDetails {
  maskedEmail: string;
  lastLogin: string;
  dateRegistered: string;
  username: string;
}

export interface  LoginHistoryItem {
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string
}
export interface LoginHistory {
  loginHistory: Array<LoginHistoryItem>;
}
