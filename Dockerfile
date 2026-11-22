# XynoTech site — static Next.js export served by a hardened nginx.
# Coolify: Build Pack = Dockerfile, Ports Exposes = 80.

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# next build (output: "export" -> /app/out) + scripts/postbuild-security.mjs
# (strict CSP from inline-script hashes -> /app/build-security/csp.conf)
RUN npm run build

# ---- serve ----
FROM nginx:1.27-alpine
RUN rm -f /etc/nginx/conf.d/default.conf && mkdir -p /etc/nginx/snippets
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/build-security/csp.conf /etc/nginx/snippets/csp.conf
COPY --from=build /app/out /usr/share/nginx/html
# .htaccess is only for Apache/cPanel; nginx denies dotfiles anyway.
RUN rm -f /usr/share/nginx/html/.htaccess && nginx -t
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO /dev/null http://127.0.0.1/ || exit 1
