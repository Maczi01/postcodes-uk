# UK Postcode Searcher

[Demo](https://postcodes-uk.vercel.app/ "Demo on Vercel")

[Repo](https://github.com/Maczi01/postcodes-uk "Repo on Github")

UK Postcode Searcher is a tool designed to enable users to quickly and efficiently find postcodes across the United Kingdom.

What things you need to install and run:

with npm:

```bash
git clone https://github.com/Maczi01/postcodes-uk
cd uk-postcode-searcher
npm install
npm run dev
```

with Docker:

```bash
docker build -t postcodes-uk .
docker run -p 5000:5000 postcodes-uk
```

### Technologies and tools used:

- React & Vite - as framework and ecosystem
- Tailwind CSS - for styling
- Playwright - for testing
- Vercel - for deployment
- React Query - for data fetching
- TypeScript - for type safety
- ESLint & Prettier - for code quality
- Mapbox - for displaying maps