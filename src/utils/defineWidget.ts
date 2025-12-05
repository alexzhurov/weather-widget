import { defineCustomElement } from "vue";

/**
 * Registers a Vue 3 component as a Web Component with Shadow DOM support.
 *
 * This utility wraps `defineCustomElement()` and simplifies widget creation by:
 * - mapping a Vue component to a custom HTML tag
 * - injecting the provided CSS strings directly into the component's ShadowRoot
 * - ensuring style isolation and predictable encapsulation
 *
 * @param {Object} options
 * @param {string} options.tag
 *        The custom element tag name to register.
 *        Must contain at least one hyphen (e.g. "weather-widget").
 *
 * @param {any} options.component
 *        The Vue component definition that will be converted into a Web Component.
 *
 * @param {string[]} options.styles
 *        A list of CSS strings that will be injected into the Shadow DOM.
 *        Useful for bundler-extracted CSS, icon fonts, resets, or theme overrides.
 *
 * @example
 * import App from "./App.vue";
 * import baseCss from "./base.css?inline";
 *
 * defineWidget({
 *   tag: "weather-widget",
 *   component: App,
 *   styles: [baseCss],
 * });
 */
export function defineWidget({
  tag,
  component,
  styles,
}: {
  tag: string;
  component: any;
  styles: string[];
}) {
  customElements.define(tag, defineCustomElement(component, { styles }));
}
