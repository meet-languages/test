# SSW - Entrega 5 - Prototipo 2
###Grupo 18
Autores del prototipo:
 
* Raúl Rodriguez Carracedo
* Óliver Luis Sanz San José
* Javier Ibáñez Soloaga
* Antonio Gamazo Ferrero
## Guía de instalación
### Instalación de node y npm
1. Instalación de nvm (Node Version Manager) mediante el comando:

		curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
 
 2. Cerrar la terminal y abrir una nueva para poder empezar a usar nvm
 3. Instalación de node y npm mediante el comando: 
 				
		nvm install node
		
Si en algún momento al ejecutar `node` o `npm` nos dice que no está instalado, debemos volver a usar el comando `nvm install node`.
### Instalación del proyecto
Al descomprimir el fichero `prototipo2_grupo18.zip` el proyecto ha quedado instalado en el directorio `meet-languages/`. Además en el directorio `mydb/` se encuentra la base de datos de ejemplo que utilizaremos.
### Instalación de paquetes con npm
1. Abrir una terminal en el directorio `meet-languages/`
2. Ejecutar el comando:

		npm install

3. Y a continuación:

		npm update
		
Puede que en la ejecuccion de los dos comandos anteriores se produzcan errores, pero no deberían afectar al funcionamiento del proyecto.
### Instalación de MongoDB
Lo primero es añadir el repositorio de MongoDB para que pueda instalarse mediante el comando apt-get. Para ello:

1. Ejecutar el comando:

		sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

2. El siguiente paso depende de tu sistema operativo. Para Ubuntu 16.04 se debe ejecutar el siguiente comando:

		echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
La guía de instalación con para otras distribuciones se encuentra [aquí.](https://docs.mongodb.com/manual/administration/install-on-linux/)

3. Actualizamos los repositorios:

		sudo apt-get update
		
4. Y finalmente instalamos MongoDB:

		sudo apt-get install -y mongodb-org


### Importar base de datos de ejemplo
Esto puede hacerse mediante la herramienta mongorestore mediante el comando:

		mongorestore -d mydb mydb/
		
`mydb/` indica la carpeta donde se aloja la base de datos a restaurar, que está contenida en `prototipo2_grupo18.zip`, así que este comando debe ejecutarse desde el directorio donde se ha extraído su contenido.
##Cómo iniciar el servidor
1. Lo primero es iniciar el proceso de MongoDB

		sudo service mongod start

2. Después vamos al directorio `meet-languages/` para iniciar el servidor:

		node server.js

3. Y en otra terminal, desde el mismo directorio, iniciamos el proceso que servirá el cliente a los usuarios

		npm start	

### Probar el prototipo
Al ejecutar el comando `npm start` se abrirá un navegador con el proyecto, pero también podemos hacerlo manualmente mediante la url `http://localhost:3000`.

		
