Building
--------
Install grunt
```
	# Setup
	npm install -g grunt-cli
```

Config package.json
```
	# Edit
	Name, author, email, site, version and devDependencies
```

Config Gruntfile.js
```
	# Edit
	proxy_url: local.nome_do_projeto

	# Add
	Concat vendor elements

```

Config bower.json
```
	# Edit
	Name, version and dependencies
```

Config hosts (etc/hosts)
```
	#Add
	127.0.0.1	local.nome_do_projeto
```

Config httpd-vhosts.conf
```
	<VirtualHost *:80>
	    DocumentRoot "caminho_do_projeto/front/_public"
	    ServerName "local.nome_do_projeto"
	</VirtualHost>
```

In the project folder install dependences:

```
	npm install grunt --save-dev
	bower install
```

In the project folder run:

```
	grunt w
```

Access the project through ```local.nome_do_projeto```