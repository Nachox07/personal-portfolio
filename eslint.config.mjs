import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", ".worktrees/**"] }];

export default config;
