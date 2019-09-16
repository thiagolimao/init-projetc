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
	# Add
	Concat vendor elements
```

Config bower.json
```
	# Edit
	Name, version and dependencies
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

Access the project through ```http://localhost:9000/```