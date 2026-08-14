### Create the vite project and install it

`npm create vite@latest cms-app -- --template react-ts`
`cd cms-app`
`npm install`
`npm run dev`

### Install json-server

`npm install -D json-server`

#### Add to package.json inside scripts

`"server": "json-server db.json --port 3001"`

#### Create db.json

```{
  "users": [
    {
      "id": "1",
      "name": "Geraldo Borges",
      "email": "geraldo@cms.dev",
      "password": "senha123",
      "role": "admin"
    }
  ],
  "posts": []
}
```

### Install MUI Material library

`npm install @mui/material @emotion/react @emotion/styled`

`npm install @mui/icons-material @fontsource/roboto`

`npm install @mui/icons-material`

### Install React Router

`npm install react-router-dom`

### Install React Hook Form and Zod

`npm install react-hook-form zod @hookform/resolvers`
