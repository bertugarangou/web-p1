# web-p1
Projectes Web Pràctica 1

## NOTES :)

 - S'ignora la carpeta ***node_modules*** i ***dist*** tal com demana el profe. Es pot canviar al [.gitignore](https://github.com/bertugarangou/web-p1/blob/3f0a004110780ba055cb4889d1004bb01631fd79/.gitignore) si fa falta.
 - afegir el seguent text si no canvia res a scripts de package.json per automatitzar el compile amb `npm run build`
 ```
  "scripts": {
    "build": "npm run delete && npm run minifier && npm run copymedia && npm run copyfont && npm run cssmini && npm run cssmini-normalize && npm run jsmini1 && npm run jsmini2 && npm run checklinks",
    "start": "node app.js",
    "copyfont": "xcopy /i/s/r/h/y .\\src\\webfont\\ .\\dist\\webfont",
    "delete": "del /s/q dist",
    "checklinks": "npx check-html-links dist",
    "cssmini": "html-minifier --input-dir src\\css\\pages --output-dir dist\\css\\pages --file-ext css --remove-comments --collapse-whitespace --minify-js true --minify-css true",
    "cssmini-normalize": "html-minifier --input-dir src\\css --output-dir dist\\css --file-ext css --remove-comments --collapse-whitespace --minify-js true --minify-css true",
    "jsmini1": "uglifyjs src\\js\\pages\\index.js -o dist\\js\\pages\\index.js",
    "jsmini2":"uglifyjs src\\js\\pages\\form.js -o dist\\js\\pages\\form.js",
    "minifier": "html-minifier --input-dir src --output-dir dist --file-ext html --remove-comments --collapse-whitespace --minify-js true --minify-css true",
    "copymedia": "xcopy /i/s/r/h/y .\\src\\media\\ .\\dist\\media"
  },
 ```
`build`: compilar.
`start`: executar el servidor (necessari un sol cop).