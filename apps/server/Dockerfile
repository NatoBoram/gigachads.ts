FROM ghcr.io/pnpm/pnpm AS base
RUN pnpm runtime set node --global

FROM base AS build
COPY --from=repo . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build --filter=@natoboram/gigachads.ts-server
RUN pnpm deploy --filter=@natoboram/gigachads.ts-server --legacy --prod /prod/server

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 3000
CMD [ "pnpm", "start" ]
