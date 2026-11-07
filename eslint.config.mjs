import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next already registers eslint-plugin-jsx-a11y; here we only raise its rules to errors.
const a11yRules = {
  "jsx-a11y/alt-text": "error",
  "jsx-a11y/anchor-has-content": "error",
  "jsx-a11y/anchor-is-valid": "error",
  "jsx-a11y/aria-props": "error",
  "jsx-a11y/aria-proptypes": "error",
  "jsx-a11y/aria-role": "error",
  "jsx-a11y/aria-unsupported-elements": "error",
  "jsx-a11y/heading-has-content": "error",
  "jsx-a11y/html-has-lang": "error",
  "jsx-a11y/iframe-has-title": "error",
  "jsx-a11y/img-redundant-alt": "error",
  "jsx-a11y/interactive-supports-focus": "error",
  "jsx-a11y/label-has-associated-control": "error",
  "jsx-a11y/no-autofocus": "error",
  "jsx-a11y/no-noninteractive-element-interactions": "error",
  "jsx-a11y/role-has-required-aria-props": "error",
  "jsx-a11y/role-supports-aria-props": "error",
  "jsx-a11y/tabindex-no-positive": "error",
};

const config = [
  ...nextCoreWebVitals,
  { rules: a11yRules },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "tests/**/*.d.ts", ".agents/**", "playwright-report/**", "test-results/**"] },
];

export default config;
