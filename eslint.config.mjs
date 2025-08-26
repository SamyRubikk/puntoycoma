// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Config base de Next + TS
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Reglas personalizadas
  {
    rules: {
      // ↓ No bloquees el build por usar "any" mientras limpiamos tipos
      "@typescript-eslint/no-explicit-any": "off",

      // ↓ Solo advertencia por variables sin usar; ignora nombres que empiecen con "_"
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // ↓ Permitimos <img> por ahora (luego migramos a <Image/>)
      "@next/next/no-img-element": "off",

      // Evita duplicar regla de JS cuando usamos la de TS
      "no-unused-vars": "off",

      // Mantén los hooks estrictos (esto sí arruina runtime si se rompe)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];
