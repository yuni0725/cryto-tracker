import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    lightBgColor: string;
    lightAccentColor: string;
    accentColor: string;
  }
}
