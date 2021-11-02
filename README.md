# web-p1
Projectes Web Pràctica 1

## NOTES :)

 - S'ignora la carpeta ***node_modules*** i ***dist*** tal com demana el profe. Es pot canviar al [.gitignore](https://github.com/bertugarangou/web-p1/blob/3f0a004110780ba055cb4889d1004bb01631fd79/.gitignore) si fa falta.
 - afegir el seguent text si no canvia res a scripts de package.json per automatitzar el compile amb `npm run build`
 ```
  "scripts": {
    "delete": "del /s/q dist",
    "checklinks": "npx check-html-links dist",
    "minifier": "html-minifier --input-dir src --output-dir dist --file-ext html --remove-comments --collapse-whitespace --minify-js true --minify-css true",
    "copymedia": "xcopy /i/s/r/h/y .\\src\\media\\ .\\dist\\media",
    "build": "npm run delete && npm run minifier && npm run copymedia && npm run checklinks",

    "start": "node app.js"
  },
 ```
`build`: compilar.
`start`: executar el servidor (necessari un sol cop).