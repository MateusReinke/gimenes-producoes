# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bab01358-d97c-4922-8a13-9866ec003249

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bab01358-d97c-4922-8a13-9866ec003249) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bab01358-d97c-4922-8a13-9866ec003249) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploy no Coolify

O projeto inclui um `Dockerfile` multi-stage na raiz, pronto para ser usado no [Coolify](https://coolify.io/).

1. No Coolify, crie um novo recurso **Application** apontando para este repositório e a branch desejada.
2. Build Pack: **Dockerfile** (detectado automaticamente).
3. Em **Network > Ports Exposes**, use **5000** — é a porta padrão em que o servidor escuta dentro do container (definida via `EXPOSE`/`PORT` no Dockerfile).
4. Health check (opcional, recomendado no Coolify): caminho `/api/health`, mesma porta do passo acima — o Dockerfile já define um `HEALTHCHECK` equivalente.
5. Variáveis de ambiente: nenhuma é obrigatória para o app subir. Opcionalmente, defina `YOUTUBE_API_KEY` para habilitar a seção "Últimos Vídeos" (busca automaticamente o canal `@gimenesproducoesmusicais`; para usar outro canal, defina `YOUTUBE_CHANNEL_HANDLE` com o handle ou `YOUTUBE_CHANNEL_ID` com o ID direto) — sem a chave, a seção simplesmente não aparece no site.
6. Clique em **Deploy**.

### Usando uma porta diferente de 5000

O valor em **Ports Exposes** do Coolify só configura o proxy (Traefik/Caddy) — ele precisa apontar para a porta em que o servidor **realmente** está escutando dentro do container, senão o app fica em loop de restart ("Restarting", unhealthy). Para mudar a porta:

1. Em **Environment Variables**, adicione `PORT=<porta desejada>` (ex.: `PORT=80`).
2. Em **Network > Ports Exposes**, use o **mesmo valor**.
3. Se usar o Healthcheck da aba própria do Coolify, ajuste a porta lá também.
4. Clique em **Redeploy** (não só Restart, para os labels do proxy serem regerados com a porta nova).

O container roda como usuário não-root, mas o `node` recebe a capability `cap_net_bind_service` no build, então portas privilegiadas (ex. `80`) funcionam normalmente via `PORT` sem precisar rodar como root.

Detalhes do build:

- `npm run build` gera o bundle do client (Vite) em `dist/public`.
- `npm run start` sobe o servidor Express, que serve a API em `/api/*` e os arquivos estáticos (com fallback de SPA) na mesma porta.
- Os dados (eventos, músicos, vídeos, etc.) usam armazenamento em memória (`MemStorage`) e são reiniciados a cada deploy/restart, pois ainda não há um banco de dados conectado. O schema Drizzle em `shared/schema.ts` já está pronto para uma futura migração para Postgres — nesse caso, adicione um serviço de banco de dados no Coolify, defina `DATABASE_URL` e implemente uma versão do `IStorage` baseada em Drizzle.
