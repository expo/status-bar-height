declare module "@expo/status-bar-height" {
  const StatusBarHeight: {
    addEventListener: (handler: (height: number) => any) => void;
    removeEventListener: (handler: (height: number) => any) => void;
    getAsync: () => Promise<number>;
  }

  export default StatusBarHeight;
}
