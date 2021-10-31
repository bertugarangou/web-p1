# web-p1
Projectes Web Pràctica 1

## NOTES :)

 - S'ignora la carpeta ***node_modules*** i ***dist*** tal com demana el profe. Es pot canviar al [.gitignore](https://github.com/bertugarangou/web-p1/blob/3f0a004110780ba055cb4889d1004bb01631fd79/.gitignore) si fa falta.
 - afegir el seguent text si no canvia res a scripts de package.json per automatitzar el compile amb `npm run build`
 ```
  "scripts": {
    "del-dist": "del /s/q dist",
    "check-links": "npx check-html-links dist",
    "compile": "html-minifier --input-dir src --output-dir dist --file-ext html --remove-comments --collapse-whitespace",
    "copy-media": "xcopy /i/s/r/h/y .\\src\\media\\ .\\dist\\media",
    "installnpm": "npm install",
    "build": "npm run installnpm && npm run del-dist && npm run compile && npm run copy-media && npm run check-links",
    "start": "node app.js"
  },
 ```
