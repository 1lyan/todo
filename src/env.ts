import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
  DATABASE_URL: String,
  JWT_PRIVATE_KEY: String
};

export let env: Env;

export function loadEnv(): void {
  env = load(schema);
}