
print("Creating mongo users...");
db = db.getSiblingDB("admin");
db.auth("admin", "admin");
db = db.getSiblingDB("proxy_pool");
db.createUser({user: 'ProxyPool', pwd: '12345678', roles: [{role: 'readWrite', db: 'proxy_pool'}]});
printjson(db.getUsers())
print("Mongo users created.");