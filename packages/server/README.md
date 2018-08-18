# Refract-CMS Server

## Quick Start (TypeScript)

```
mkdir server
cd server
npm init
npm i -S express @refract-cms/server
```

`Create file index.ts`
```ts
import * as express from 'express';
import * as refract from '@refract-cms/server';

refract.configure({
  mongoConnectionString: '##YOUR_MONGO_URL##'
});

const app = express();
app.use(refract.router); 

const port = process.env.PORT || 3500; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

Use http://localhost:3500 as serverUrl. See details: https://www.npmjs.com/package/@refract-cms/core